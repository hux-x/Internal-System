import { useState, useEffect } from "react";
import Sidebar from "../components/templates_sidebar";
import { FaList, FaPlus, FaTable } from "react-icons/fa";
import searchIcon from "../assets/search.png";
import EditableTable from "../components/reusable/EditableTable";
import useTableApi from "../components/hooks/useTableApi";

const Tables = () => {
  const [tables, setTables] = useState({});
  const [selectedTable, setSelectedTable] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const {
    fetchAllTables,
    fetchTableById,
    createTable,
    addRow,
    addColumn,
    updateCell,
    loading: apiLoading,
    error: apiError,
  } = useTableApi();

  const formatTableData = (table) => {
    if (!table) return null;
    
    return {
      id: table.id,
      name: table.name,
      description: table.description,
      columnData: table.columns || [],
      columns: (table.columns || []).map((col) => col.name),
      rowData: table.rows || [],
      data: (table.rows || []).map((row) =>
        (table.columns || []).map((col) => row.data?.[col.name] || "")
      ),
    };
  };

  const refreshTable = async (tableId) => {
    try {
      const table = await fetchTableById(tableId);
      if (table) {
        const formatted = formatTableData(table);
        setTables(prev => ({ ...prev, [tableId]: formatted }));
        return true;
      }
    } catch (error) {
      console.error("Error refreshing table:", error);
      return false;
    }
  };

  // Initialize tables
  useEffect(() => {
    const initTables = async () => {
      try {
        const res = await fetchAllTables();
        
        if (res?.length > 0) {
          const formattedTables = {};
          await Promise.all(res.map(async (table) => {
            const fullTable = await fetchTableById(table.id);
            if (fullTable) {
              formattedTables[table.id] = formatTableData(fullTable);
            }
          }));

          setTables(formattedTables);
          
         
        }
        setInitialLoadComplete(true);
      } catch (err) {
        console.error("Error initializing tables:", err);
        setInitialLoadComplete(true);
      }
    };
    initTables();
  }, []);

  const handleAddColumn = async () => {
    const newColName = prompt("Enter column name:");
    if (!newColName || !selectedTable) return;

    try {
      const response = await addColumn({
        tableId: selectedTable,
        name: newColName
      });

      if (response?.id) {
        await refreshTable(selectedTable);
      }
    } catch (error) {
      console.error("Failed to add column:", error);
      alert("Failed to add column. Please try again.");
    }
  };

  const handleAddRow = async () => {
    if (!selectedTable) return;

    try {
      const response = await addRow({ 
        tableId: selectedTable, 
        values: tables[selectedTable]?.columns?.reduce((acc, col) => {
          acc[col] = "";
          return acc;
        }, {}) || {}
      });

      if (response?.id) {
        await refreshTable(selectedTable);
      }
    } catch (error) {
      console.error("Failed to add row:", error);
      alert("Failed to add row. Please try again.");
    }
  };

  const handleCreateTable = async () => {
    const name = prompt("Enter table name:");
    const description = prompt("Enter table description:");
    if (!name || !description) return;

    try {
      const res = await createTable({ name, description });
      if (res?.id) {
        await refreshTable(res.id);
        setSelectedTable(res.id);
      }
    } catch (error) {
      console.error("Failed to create table:", error);
      alert("Failed to create table. Please try again.");
    }
  };

  const handleCellChange = async (rowIdx, colIdx, value) => {
    if (!selectedTable || !tables[selectedTable]) return;

    const table = tables[selectedTable];
    const row = table.rowData[rowIdx];
    const column = table.columnData[colIdx];

    // Optimistic update
    setTables(prev => ({
      ...prev,
      [selectedTable]: {
        ...prev[selectedTable],
        data: prev[selectedTable].data.map((r, rIdx) => 
          rIdx === rowIdx ? r.map((c, cIdx) => cIdx === colIdx ? value : c) : r
        ),
        rowData: prev[selectedTable].rowData.map((rd, rdIdx) => 
          rdIdx === rowIdx ? {
            ...rd,
            data: {
              ...rd.data,
              [column.name]: value
            }
          } : rd
        )
      }
    }));

    try {
      await updateCell({
        tableId: selectedTable,
        rowId: row.id,
        columnId: column.id,
        value,
      });
    } catch (error) {
      console.error("Failed to update cell:", error);
      // Revert on error
      setTables(prev => ({
        ...prev,
        [selectedTable]: {
          ...prev[selectedTable],
          data: prev[selectedTable].data.map((r, rIdx) => 
            rIdx === rowIdx ? r.map((c, cIdx) => cIdx === colIdx ? row.data[column.name] : c) : r
          ),
          rowData: prev[selectedTable].rowData.map((rd, rdIdx) => 
            rdIdx === rowIdx ? {
              ...rd,
              data: {
                ...rd.data,
                [column.name]: row.data[column.name]
              }
            } : rd
          )
        }
      }));
    }
  };

  const filteredTables = Object.values(tables).filter(table =>
    table?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-fit flex bg-gray-100 ml-[285px]  overflow-hidden">
      <Sidebar 
        items={[
          { icon: <FaList />, label: "Tables", active: false },
          ...filteredTables.map(table => ({
            icon: <FaTable />,
            label: table.name,
            active: table.id === selectedTable,
            onClick: () => setSelectedTable(table.id),
          }))
        ]} 
      />

      <div className="flex-1 flex flex-col">
        <div className="bg-white p-4 flex justify-between items-center mb-6">
          <div className="relative w-1/4">
            <img
              src={searchIcon}
              alt="Search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            />
            <input
              type="text"
              className="bg-gray-200 rounded-xl pl-10 pr-4 py-2 w-full text-xs"
              placeholder="Search tables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleCreateTable}
              disabled={apiLoading}
              className="bg-red-700 text-white text-xs font-semibold px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50"
            >
              <FaPlus className="w-4 h-4" />
              {apiLoading ? "Creating..." : "Create Table"}
            </button>

            {selectedTable && (
              <>
                <button
                  onClick={handleAddColumn}
                  disabled={apiLoading}
                  className="bg-red-700 text-white text-xs font-semibold px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50"
                >
                  <FaPlus className="w-4 h-4" />
                  {apiLoading ? "Adding..." : "Add Column"}
                </button>
                <button
                  onClick={handleAddRow}
                  disabled={apiLoading}
                  className="bg-red-700 text-white text-xs font-semibold px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50"
                >
                  <FaPlus className="w-4 h-4" />
                  {apiLoading ? "Adding..." : "Add Row"}
                </button>
              </>
            )}
          </div>
        </div>

        {!initialLoadComplete ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
          </div>
        ) : selectedTable && tables[selectedTable] ? (
          <EditableTable
            key={selectedTable}
            table={tables[selectedTable]}
            onCellChange={handleCellChange}
            isLoading={apiLoading}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-4xl text-gray-500 font-extrabold">
              {apiLoading ? "Loading..." : "No table selected"}
            </h1>
          </div>
        )}

        {apiError && (
          <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {apiError.message || "An error occurred"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tables;