import * as actionTypes from "../actionTypes";

const initialState = {
  employee: {
    data: [],
    count: 0,
  },
  pageIndex: 0,
  query: {
    limit: 25,
    skip: 0,
    sortType: "asc",
    sortKey: "",
    search: "",
  },
};

const employeeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.FETCH_EMPLOYEE_LIST:
      return { ...state, employee: { ...action.payload } };
    case actionTypes.SET_PAGE_INDEX:
      return { ...state, pageIndex: action.payload };
    case actionTypes.SET_QUERY:
      return { ...state, query: { ...action.payload } };
    default:
      return { ...state };
  }
};

export default employeeReducer;
