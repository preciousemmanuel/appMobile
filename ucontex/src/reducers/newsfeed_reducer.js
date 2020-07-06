import { SELECT_MEDIA_TO_VIEW } from "../actions/types";

const INITIAL_STATE = {
  selectMedia: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_MEDIA_TO_VIEW:
      //console.log("red", action.payload);
      //alert(...action.payload);
      return { selectedMedia: action.payload };
      break;

    default:
      return state;
  }
};
