import {
  CREATE_POST_MEDIA,
  CHECK_MEDIA_TO_DELETE,
  DELETE_CREATE_POST_MEDIA,
  CREATE_POST_FORM_FIELD,
  CREATE_POST_ERROR,
  CREATE_POST_SUCCESS,
  RESET_CREATE_POST_FIELDS,
  SELECT_PEOPLE_TO_PIN,
  IS_POSTING,
  FETCH_POST,
  IS_POST_REFRESH,
  IS_IMAGE_BROWSER_OPEN,
  FETCH_SINGLE_POST,
  IS_POST_DELETING,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAILED,
  RESET_POST_DATA,
  IS_POST_EDITING,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  FETCH_USER_POST,
  REMOVE_PEOPLE_TO_PIN,
  FETCH_POST_ERROR,
  REFRESH_POST,
  IS_FETCHING_POST,
  SHOW_POST_COMMENT_BOX,
  IS_FETCHING_USER_POST,
  FETCH_USER_POST_ERROR,
  SHARE_SUCCESS,
  UPDATE_POST_DATA,
} from '../actions/types';

const INITIAL_STATE = {
  postMedia: [],
  errorMsg: null,
  showDeleteBtn: false,
  index: null,
  category: '',
  message: '',
  location: null,
  usersToPin: [],
  isPosting: false,
  refresh: false,
  postData: [],
  imageBrowserOpen: false,
  singlePostData: {},
  isPostDeleting: false,
  indexOfPost: null,
  is_editing: false,
  showLoveExpressionPostIndex: null,
  usersPostData: [],
  loadingPost: false,
  loadingAllPost: false,
  postCommentId: null,
  page: 8,
  userPage: 8, //this is for fetch post by userCount
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_POST_MEDIA:
      return {
        ...state,
        postMedia: [...state.postMedia, ...action.payload],
        errorMsg: null,
        showDeleteBtn: false,
        index: null,
        imageBrowserOpen: false,
      };
      break;
    case IS_IMAGE_BROWSER_OPEN:
      return {
        ...state,
        imageBrowserOpen: action.payload,
      };
      break;

    case DELETE_CREATE_POST_MEDIA:
      return {
        ...state,
        errorMsg: null,
        showDeleteBtn: false,
        index: null,
        postMedia: state.postMedia.filter(
          item => item != state.postMedia[action.payload],
        ),
      };
      break;
    case REMOVE_PEOPLE_TO_PIN:
      return {
        ...state,
        usersToPin: state.usersToPin.filter(
          item => item != state.usersToPin[action.payload],
        ),
      };
      break;
    case CHECK_MEDIA_TO_DELETE:
      return {
        ...state,
        errorMsg: null,
        showDeleteBtn: action.payload.showDeleteBtn,
        index: action.payload.index,
      };
    case CREATE_POST_FORM_FIELD:
      //console.log(action.payload);
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
        errorMsg: null,
      };
      break;

    case CREATE_POST_ERROR:
      //console.log(action.payload);
      return {
        ...state,
        //errorMsg: action.payload,
        isPosting: false,
      };
      break;
    case CREATE_POST_SUCCESS:
      //  console.log("create post", [...state.postData]);
      //let initialPost = state.postData.reverse();
      return {
        ...state,
        //errorMsg: action.payload,
        isPosting: false,
        index: null,
        category: '',
        message: '',
        location: null,
        usersToPin: [],
        postMedia: [],
        postData: [...action.payload, ...state.postData],
      };
      //console.log("create post", postData);
      break;
    case RESET_CREATE_POST_FIELDS:
      //console.log(action.payload);
      return {
        ...state,
        errorMsg: null,
        location: null,
        message: '',
        postMedia: [],
        usersToPin: [],
      };
      break;
    case SELECT_PEOPLE_TO_PIN:
      return {
        ...state,
        usersToPin: [...state.usersToPin, action.payload],
      };
      break;
    case IS_POSTING:
      return {...state, isPosting: true};
      break;
    case IS_FETCHING_USER_POST:
      return {...state, loadingPost: true};
      break;
    case IS_FETCHING_POST:
      return {...state, loadingAllPost: true};
      break;
    case IS_POST_REFRESH:
      return {...state, refresh: true};
      break;
    case FETCH_POST_ERROR:
      return {...state, loadingAllPost: false};
      break;
    case FETCH_POST:
      return {
        ...state,
        loadingAllPost: false,
        postData: [...state.postData, ...action.payload],
        //postData: [...action.payload]
      };
      break;
    case REFRESH_POST:
      return {
        ...state,
        refresh: false,
        //postData: [...state.postData, ...action.payload]
        postData: [...action.payload],
      };
      break;
    case FETCH_SINGLE_POST:
      const images = action.payload.posts[0].images.map(image => {
        return {file: image.url};
      });
      return {
        ...state,
        isPosting: false,
        loading: false,
        loadingPost: false,
        refresh: false,
        message: action.payload.posts[0].message,
        category: action.payload.posts[0].privacy,
        postMedia: images,
        singlePostData: action.payload,
        commentData: action.payload.posts[0].comments,
      };
      break;
    case FETCH_USER_POST:
      return {
        ...state,
        isPosting: false,
        loadingPost: false,
        refresh: false,
        usersPostData: action.payload,
      };
      break;
    case IS_IMAGE_BROWSER_OPEN:
      return {...state, imageBrowserOpen: true};
      break;

    case FETCH_USER_POST_ERROR:
      return {
        ...state,
        loadingPost: false,
      };
      break;

    case IS_POST_DELETING:
      return {
        ...state,
        isPostDeleting: true,
      };
      break;
    case SHARE_SUCCESS:
      return {
        ...state,
        isPostDeleting: false,
      };
      break;
    case POST_DELETE_SUCCESS:
      //  console.log("create post", [...state.postData]);
      //  let initialPost = state.postData.reverse();
      return {
        ...state,
        //errorMsg: action.payload,
        isPostDeleting: false,
        postData: state.postData.filter(
          item => item != state.postData[action.payload],
        ),
      };
      //console.log("create post", postData);
      break;
    case POST_DELETE_FAILED:
      return {
        ...state,
        isPostDeleting: false,
      };
      break;
    case RESET_POST_DATA:
      return {
        ...state,
        message: '',
        postMedia: [],
      };
      break;
    case IS_POST_EDITING:
      return {
        ...state,
        is_editing: true,
      };
      break;

    case EDIT_POST_ERROR:
      //console.log(action.payload);
      return {
        ...state,
        //errorMsg: action.payload,
        is_editing: false,
      };
      break;
    case SHOW_POST_COMMENT_BOX:
      //console.log(action.payload);
      return {
        ...state,
        //errorMsg: action.payload,
        postCommentId: action.payload,
      };
      break;
    case UPDATE_POST_DATA:
      console.log('red post', action.payload);
      return {
        ...state,
        //errorMsg: action.payload,
        postData: action.payload,
      };
      break;
    case EDIT_POST_SUCCESS:
      //  console.log("create post", [...state.postData]);
      // const prevPost = state.postData.reverse();
      return {
        ...state,
        //errorMsg: action.payload,
        isPosting: false,
        loadingPost: false,
        is_editing: false,
        loading: false,
        index: null,
        category: '',
        message: '',
        location: null,
        usersToPin: [],
        postMedia: [],
        postData: [...action.payload, ...state.postData],
      };
      //console.log("create post", postData);
      break;

    default:
      return state;
  }
};
