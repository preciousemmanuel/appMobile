import {
  SEARCH_USER_FORM_FIELD,
  IS_SEARCHING,
  SEARCH_SUCCESS,
  SEARCH_ERROR
} from "../actions/types";

const INITIAL_STATE = {
  isSearhing: false,
  searchTerm: "",
  users: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_USER_FORM_FIELD:
      //console.log("red", action.payload);
      //alert(...action.payload);
      return { searchTerm: action.payload };
      break;

    case IS_SEARCHING:
      //console.log("red", action.payload);
      //alert(...action.payload);
      return { ...state, isSearhing: true };
      break;
    case SEARCH_SUCCESS:
      //console.log("red", action.payload);
      //alert(...action.payload);
      return { ...state, isSearhing: false, users: action.payload };
      break;
    case SEARCH_SUCCESS:
      //console.log("red", action.payload);
      //alert(...action.payload);
      return { ...state, isSearhing: false };
      break;

    default:
      return state;
  }
};
