import { useState, useEffect } from "react";
import Sidebar from "../components/templates_sidebar";
import { FaList, FaPlus, FaTable } from "react-icons/fa";
import searchIcon from '../assets/search.png';
import EditableTable from "../components/reusable/EditableTable";

const dummyTable = {
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
  ]
};

const Tables = () => {
  const [ selectedTable, setSelectedTable ] = useState(null);

  const [tables, setTables] = useState({});
  const handleColumnNameChange = (colIdx, newName) => {
  setTables(prev => {
    const updated = JSON.parse(JSON.stringify(prev));
    updated[selectedTable].columns[colIdx] = newName;
    return updated;
  });
};
const [searchQuery, setSearchQuery] = useState("");

 

  useEffect(() => {
    const formattedTable = {
      id: dummyTable.id,
      name: dummyTable.name,
      data: dummyTable.rows.map(row => dummyTable.columns.map(col => row.data[col.name] || "")),
      columns: dummyTable.columns.map(col => col.name)
    };

    setTables({ [dummyTable.id]: formattedTable });
    // setSelectedTable(dummyTable.id);
  }, [setSelectedTable]);

const handleAddColumn = () => {
  const newColName = prompt("Enter a name for the new column:");
  if (!newColName) return;

  setTables(prev => {
    const updated = JSON.parse(JSON.stringify(prev)); // deep clone
    const table = updated[selectedTable];

    // Prevent duplicate column names
    if (table.columns.includes(newColName)) {
      alert("A column with this name already exists.");
      return prev;
    }

    table.columns.push(newColName);
    table.data = table.data.map(row => [...row, ""]);
    return updated;
  });
};


const handleAddRow = () => {
  setTables(prev => {
    const updated = JSON.parse(JSON.stringify(prev)); 
    const table = updated[selectedTable];
    const colCount = table.columns.length;
    table.data.push(new Array(colCount).fill(""));
    return updated;
  });
};

  const handleCreateTable = () => {
    const id = Date.now().toString();
    const newTable = {
      id,
      name: `Table ${Object.keys(tables).length + 1}`,
      data: [["", ""], ["", ""]],
      columns: ["Column 1", "Column 2"]
    };
    setTables({ ...tables, [id]: newTable });
    setSelectedTable(id);
  };

  const handleCellChange = (rowIdx, colIdx, value) => {
    setTables(prev => {
      const updated = { ...prev };
      updated[selectedTable].data[rowIdx][colIdx] = value;
      return updated;
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
