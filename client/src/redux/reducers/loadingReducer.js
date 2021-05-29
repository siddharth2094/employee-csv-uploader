import * as actionTypes from "../actionTypes";

const initialState = {
  isLoading: false,
};

const loadingReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return { ...state };
  }
};

export default loadingReducer;
