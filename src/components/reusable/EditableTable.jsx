import { useState } from "react";

const EditableTable = ({ table, onCellChange, onColumnNameChange }) => {
  const [editingCell, setEditingCell] = useState(null); // { row, col }
  const [editingCol, setEditingCol] = useState(null);   // index of column being edited

  const handleDoubleClick = (rowIdx, colIdx) => {
    setEditingCell({ row: rowIdx, col: colIdx });
  };

  const handleColDoubleClick = (colIdx) => {
    setEditingCol(colIdx);
  };

  const columnCount = table.columns.length;
  const columnWidth = `w-[${100 / columnCount}%]`; // dynamic width string for columns

  return (
    <div className="overflow-auto bg-white rounded-lg shadow p-4">
      <h2 className="text-2xl font-bold mb-4">{table.name}</h2>

      <table className="w-full table-fixed border border-collapse">
        <colgroup>
          {table.columns.map((_, idx) => (
            <col key={idx} style={{ width: `${100 / columnCount}%` }} />
          ))}
        </colgroup>
        
        <thead>
          <tr>
            {table.columns.map((colName, colIdx) => (
              <th
                key={colIdx}
                className="border px-3 py-2 text-gray-600 text-left font-semibold bg-gray-100 cursor-pointer"
                onDoubleClick={() => handleColDoubleClick(colIdx)}
              >
                {editingCol === colIdx ? (
                  <input
                    type="text"
                    value={colName}
                    onChange={(e) => onColumnNameChange(colIdx, e.target.value)}
                    onBlur={() => setEditingCol(null)}
                    autoFocus
                    className="w-full border rounded p-1 text-xs"
                  />
                ) : (
                  <h2 className="font-bold text-sm">{colName}</h2>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {table.data.map((row, rowIdx) => (
            <tr key={rowIdx} className="p-2">
              {row.map((cell, colIdx) => (
                <td
                  key={colIdx}
                  className="border px-3 py-2 text-sm bg-white hover:bg-gray-50 cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(rowIdx, colIdx)}
                >
                  {editingCell?.row === rowIdx && editingCell?.col === colIdx ? (
                    <input
                      type="text"
                      className="w-full border rounded p-1 text-sm"
                      value={cell}
                      onChange={(e) => onCellChange(rowIdx, colIdx, e.target.value)}
                      onBlur={() => setEditingCell(null)}
                      autoFocus
                    />
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
