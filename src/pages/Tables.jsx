import { useState, useEffect } from "react";
import Sidebar from "../components/templates_sidebar";
import { FaList, FaPlus, FaTable } from "react-icons/fa";
import searchIcon from "../assets/search.png";
import EditableTable from "../components/reusable/EditableTable";
import useTableApi from "../components/hooks/useTableApi";

const fallbackDummy = {
  id: "1",
  name: "Project Timeline",
  description: "Tracks project milestones",
  columns: [
    { id: 1, name: "Task", data_type: "text" },
    { id: 2, name: "Deadline", data_type: "text" },
  ],
  rows: [
    { id: 1, data: { Task: "Design mockups", Deadline: "2025-06-20" } },
    { id: 2, data: { Task: "Finalize UI", Deadline: "2025-06-30" } },
  ],
};

const Tables = () => {
  const [tables, setTables] = useState({});
  const [selectedTable, setSelectedTable] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    fetchAllTables,
    fetchTableById,
    createTable,
    addColumn,
    addRow,
    updateCell,
    error,
  } = useTableApi();

  const formatTableData = (table) => {
    return {
      id: table.id,
      name: table.name,
      description: table.description,
      columnData: table.columns,
      columns: table.columns.map((col) => col.name),
      rowData: table.rows,
      data: table.rows.map((row) =>
        table.columns.map((col) => row.data[col.name] || "")
      ),
    };
  };

  // Fetch all tables once
  useEffect(() => {
    const initTables = async () => {
      const res = await fetchAllTables();

      if (res && Array.isArray(res)) {
        const formatted = {};
        for (const table of res) {
          formatted[table.id] = formatTableData(table);
        }
        setTables(formatted);
      } else {
        const fallback = formatTableData(fallbackDummy);
        setTables({ [fallback.id]: fallback });
       // setSelectedTable(fallback.id);
      }
    };
    initTables();
  }, []);

  const handleAddColumn = async () => {
    const newColName = prompt("Enter column name:");
    if (!newColName || !selectedTable) return;

    const table = tables[selectedTable];
    if (table.columns.includes(newColName)) {
      alert("Column already exists");
      return;
    }

    const response = await addColumn({
      tableId: selectedTable,
      name: newColName,
    });

    if (response?.id) {
      const newCol = response;
      setTables((prev) => {
        const updated = { ...prev };
        updated[selectedTable].columnData.push(newCol);
        updated[selectedTable].columns.push(newCol.name);
        updated[selectedTable].data = updated[selectedTable].data.map((row) => [...row, ""]);
        return updated;
      });
    } else {
      alert("Error adding column.");
    }
  };

  const handleAddRow = async () => {
    const table = tables[selectedTable];
    const values = table.columns.reduce((acc, col) => {
      acc[col] = "";
      return acc;
    }, {});

    const response = await addRow({ tableId: selectedTable, values });

    if (response?.id) {
      setTables((prev) => {
        const updated = { ...prev };
        updated[selectedTable].rowData.push(response);
        updated[selectedTable].data.push(table.columns.map((col) => response.data[col]));
        return updated;
      });
    } else {
      alert("Error adding row.");
    }
  };

  const handleCreateTable = async () => {
    const name = prompt("Enter table name:");
    const description = prompt("Enter table description:");
    if (!name || !description) return;

    const res = await createTable({ name, description });

    if (res?.id) {
      const fullTable = await fetchTableById(res.id);
      if (fullTable) {
        const formatted = formatTableData(fullTable);
        setTables((prev) => ({ ...prev, [formatted.id]: formatted }));
        setSelectedTable(formatted.id);
      }
    } else {
      alert("Error creating table.");
    }
  };

  const handleCellChange = async (rowIdx, colIdx, value) => {
    const table = tables[selectedTable];
    const row = table.rowData[rowIdx];
    const column = table.columnData[colIdx];

    setTables((prev) => {
      const updated = { ...prev };
      updated[selectedTable].data[rowIdx][colIdx] = value;
      return updated;
    });

    // Persist change
    await updateCell({
      tableId: selectedTable,
      rowId: row.id,
      columnId: column.id,
      value,
    });
  };

  const handleColumnNameChange = (colIdx, newName) => {
    setTables((prev) => {
      const updated = { ...prev };
      updated[selectedTable].columns[colIdx] = newName;
      return updated;
    });
  };
  const handleCellBlur = async (rowIdx, colIdx, value) => {
  const table = tables[selectedTable];
  const row = table.rowData[rowIdx];
  const column = table.columnData[colIdx];

  await updateCell({
    tableId: selectedTable,
    rowId: row.id,
    columnId: column.id,
    value,
  });
};


  const filteredTables = Object.values(tables).filter((table) =>
    table.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const list_items = [
    { icon: <FaList />, label: "Tables", active: false },
    ...filteredTables.map((table) => ({
      icon: <FaTable />,
      label: table.name,
      name: table.name,
      active: table.id === selectedTable,
      onClick: () => setSelectedTable(table.id),
    })),
  ];

  return (
    <div className="min-h-fit flex bg-gray-100 ml-[255px] -mt-8 p-6 overflow-hidden">
      <Sidebar items={list_items} setSelected={setSelectedTable} />

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
              placeholder="Search for templates by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleCreateTable}
              className="bg-red-700 text-white text-xs font-semibold px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <FaPlus className="w-4 h-4" />
              Create Table
            </button>

            {selectedTable && (
              <>
                <button
                  onClick={handleAddColumn}
                  className="bg-red-700 text-white text-xs font-semibold px-6 py-3 rounded-xl flex items-center gap-2"
                >
                  <FaPlus className="w-4 h-4" />
                  Add Column
                </button>
                <button
                  onClick={handleAddRow}
                  className="bg-red-700 text-white text-xs font-semibold px-6 py-3 rounded-xl flex items-center gap-2"
                >
                  <FaPlus className="w-4 h-4" />
                  Add Row
                </button>
              </>
            )}
          </div>
        </div>

        {selectedTable && tables[selectedTable] ? (
        <EditableTable
        table={tables[selectedTable]}
        onCellChange={handleCellChange}
        onCellBlur={handleCellBlur}
        onColumnNameChange={handleColumnNameChange}
/>
        ) : (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-4xl text-gray-500 font-extrabold">Create A New Table</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tables;
