import {
  IS_FETCHING_COMMENT,
  FETCH_COMMENTS,
  CREATE_COMMENT_FORM_FIELD,
  IS_COMMENTING,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR
} from "../actions/types";

const INITIAL_STATE = {
  // showDropdownItem: null,
  commentData: [],
  isFetchingComments: false,
  is_commenting: false,
  commentMsg: "",
  postCommentId: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_COMMENT_FORM_FIELD:
      //console.log(action.payload);
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };
      break;
    case FETCH_COMMENTS:
      //console.log("red", action.payload);
      //alert(...action.payload);
      return {
        ...state,
        commentData: [...state.commentData, ...action.payload],
        isFetchingComments: false
      };
      break;
    case IS_FETCHING_COMMENT:
      //console.log("red", action.payload);
      //alert(...action.payload);
      return { ...state, isFetchingComments: true };
      break;
    case IS_COMMENTING:
      return {
        ...state,
        is_commenting: true
      };
      break;
    case POST_COMMENT_ERROR:
      //console.log(action.payload);
      return {
        ...state,
        //errorMsg: action.payload,
        postCommentId: null,
        is_commenting: false,
        isFetchingComments: false
      };
      break;
    case POST_COMMENT_SUCCESS:
      //  console.log("create post", [...state.postData]);
      //  let initialPost = state.postData.reverse();
      return {
        ...state,
        //errorMsg: action.payload,
        is_commenting: false,
        commentMsg: "",
        postCommentId: null,
        commentData: [action.payload, ...state.commentData]
      };
      //console.log("create post", postData);
      break;
    default:
      return state;
  }
};
