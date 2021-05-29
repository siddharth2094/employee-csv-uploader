import * as actionTypes from "../actionTypes";
import { axiosInstance as axios } from "../../utils";
import toast from "toastr";

export const updatePageIndex = (pageIndex) => (dispatch) =>
  dispatch({ type: actionTypes.SET_PAGE_INDEX, payload: pageIndex });

export const updateQuery = (query) => (dispatch) => {
  console.log(query);
  dispatch({ type: actionTypes.SET_QUERY, payload: query });
};

export const fetchEmployeesList = (query) => async (dispatch) => {
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
  try {
    const res = await axios.get(axiosQuery);
    if (res && res.status === 200) {
      console.log(res.data);
      dispatch({
        type: actionTypes.FETCH_EMPLOYEE_LIST,
        payload: res.data,
      });
    }
  } catch (error) {}
};

export const uploadEmployeeData = (formData, cb) => async (dispatch) => {
  try {
    const res = await axios.post("/employee/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res && res.status === 201) {
      toast.success(res.data.message);
      cb();
    }
  } catch (error) {}
};
