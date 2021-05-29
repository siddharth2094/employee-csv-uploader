import { axiosInstance as axios } from "../../utils";

export const fetchEmployeeListService = (query) => {
  const { limit, skip, sortType, sortKey, search } = query;
  let axiosQuery = `/employee/employeeList?limit=${limit}&skip=${skip}&sortType=${sortType}`;
  if (sortKey) {
    axiosQuery = `/employee/employeeList?limit=${limit}&skip=${skip}&sortType=${sortType}&sortKey=${sortKey}`;
  }
  if (search) {
    axiosQuery = `/employee/employeeList?limit=${limit}&skip=${skip}&sortType=${sortType}&search=${search}`;
  }
  if (sortKey && search) {
    axiosQuery = `/employee/employeeList?limit=${limit}&skip=${skip}&sortType=${sortType}&sortKey=${sortKey}&search=${search}`;
  }
  return axios.get(axiosQuery);
};

export const uploadEmployeeDataService = (formData) =>
  axios.post("/employee/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteEmployeeDataService = (_id) =>
  axios.delete(`/employee/${_id}`);
