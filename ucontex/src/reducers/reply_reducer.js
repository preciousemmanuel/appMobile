import {
  IS_FETCHING_REPLY,
  FETCH_REPLIES,
  REPLY_FORM_FIELD,
  IS_REPLYING,
  REPLY_SUCCESS,
  REPLY_ERROR
} from "../actions/types";

const INITIAL_STATE = {
  // showDropdownItem: null,
  replyData: [],
  isFetchingReplies: false,
  is_replying: false,
  replyMsg: "",
  commentId: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REPLY_FORM_FIELD:
      //console.log(action.payload);
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };
      break;
    case FETCH_REPLIES:
      //console.log("red", action.payload);
      //alert(...action.payload);
      return {
        ...state,
        replyData: [...state.replyData, ...action.payload],
        isFetchingReplies: false
      };
      break;
    case IS_FETCHING_REPLY:
      //console.log("red", action.payload);
      //alert(...action.payload);
      return { ...state, isFetchingReplies: true };
      break;
    case IS_REPLYING:
      return {
        ...state,
        is_replying: true
      };
      break;
    case REPLY_ERROR:
      //console.log(action.payload);
      return {
        ...state,
        //errorMsg: action.payload,
        commentId: null,
        is_replying: false,
        isFetchingReplies: false
      };
      break;
    case REPLY_SUCCESS:
      return {
        ...state,
        is_replying: false,
        replyMsg: "",
        commentId: null,
        replyData: [action.payload, ...state.replyData]
      };
      //console.log("create post", postData);
      break;
    default:
      return state;
  }
};
