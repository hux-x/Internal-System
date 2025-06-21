import useApi from "./useApi";

const useTableApi = () => {
  const { request, loading, error } = useApi();

  const fetchAllTables = () =>
    request({ endpoint: "/tables/", method: "GET" });

  const fetchTableById = (tableId) =>
    request({ endpoint: `/tables/${tableId}/`, method: "GET" });

  const createTable = ({ name, description }) =>
    request({
      endpoint: "/tables/create/",
      method: "POST",
      body: { name, description },
    });

  const addRow = ({ tableId, values }) =>
    request({
      endpoint: `/tables/${tableId}/add-row/`,
      method: "POST",
      body: { values },
    });

  const addColumn = ({ tableId, name }) =>
    request({
      endpoint: `/tables/${tableId}/add-column/`,
      method: "POST",
      body: { name, data_type: "text" },
    });

  const updateCell = ({ tableId, rowId, columnId, value }) =>
    request({
      endpoint: `/tables/${tableId}/rows/${rowId}/columns/${columnId}/update-cell/`,
      method: "PATCH",
      body: { value },
    });

  return {
    fetchAllTables,
    fetchTableById,
    createTable,
    addRow,
    addColumn,
    updateCell,
    loading,
    error,
  };
};

export default useTableApi;
