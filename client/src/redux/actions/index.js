import * as actionTypes from "../actionTypes";

import toast from "toastr";
import {
  fetchEmployeeListService,
  uploadEmployeeDataService,
  deleteEmployeeDataService,
} from "../services/employee-services";

export const updatePageIndex = (pageIndex) => (dispatch) =>
  dispatch({ type: actionTypes.SET_PAGE_INDEX, payload: pageIndex });

export const updateQuery = (query) => (dispatch) => {
  console.log(query);
  dispatch({ type: actionTypes.SET_QUERY, payload: query });
};

export const fetchEmployeesList = (query) => async (dispatch) => {
  try {
    const res = await fetchEmployeeListService(query);
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
    const res = await uploadEmployeeDataService(formData);
    if (res && res.status === 201) {
      toast.success(res.data.message);
      cb();
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const deleteEmployeeData = (_id, cb) => async () => {
  try {
    const res = await deleteEmployeeDataService(_id);
    if (res && res.status === 200) {
      toast.success(res.data.message);
      cb();
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {}
};
