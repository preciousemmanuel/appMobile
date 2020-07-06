import {
  SIGNUP_FORM_FIELDS,
  FORM_ERROR,
  ERROR_EMAIL,
  VALIDATE_EMAIL_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  IS_LOGIN_LOADING,
  LOGIN_EMAIL_ERROR,
  LOGIN_PASSWORD_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  IS_LOADING,
  CONFIRM_EMAIL_SUCCESS,
  LOGOUT,
  //profile picx and profile update
  CHOOSE_PROFILE_PICS_INITIAL,
  DELETE_PROFILE_PICS_INITIAL,
  IS_LOADING_PROFILE,
  PROFILE_FORM_FIELDS,
  PROFILE_UPDATE_FAILED,
  CHECK_IMAGE_TO_DELETE,
  CHECK_COVER_IMAGE_TO_DELETE,
  CHOOSE_COVER_PHOTO,
  DELETE_COVER_PHOTO,
  CLEAR_ERR_MSG,
  PROFILE_UPDATE_SUCCESS
} from "../actions/types";
import { SCHEDULE_PROFILE_TIME } from "../config";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  password: "",
  aboutMe: "",
  website: "",
  loading: false,
  errorEmail: null,
  token: null,
  userId: null,
  signupFormError: null,
  userData: {},
  errorMsg: null,
  verifyCode: null,
  loginLoading: false,
  isAuth: false,

  //profile state
  imageSource: [],
  imageCoverSource: [],
  is_loading: false,
  schedule_profile_time: SCHEDULE_PROFILE_TIME.USE_ALL,
  index: null,
  coverPhotoIndex: null,
  showDeleteBtn: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_FORM_FIELDS:
      //console.log(action.payload);
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
        errorMsg: null,
        signupFormError: null
      };
      break;

    case ERROR_EMAIL:
      return { ...state, errorEmail: true, email: action.payload };
      break;

    case IS_LOADING:
      return { ...state, loading: true, errorMsg: null, signupFormError: null };
      break;
    case IS_LOGIN_LOADING:
      return {
        ...state,
        loginLoading: true,
        errorMsg: null,
        signupFormError: null
      };
      break;
    case SIGNUP_SUCCESS:
      console.log("kkkjg " + action.payload.data.userData.firstName);
      return {
        ...state,
        userData: action.payload,
        token: action.payload.data.token,
        userId: action.payload.data.userData.id,
        loading: false,
        signupFormError: null,
        isAuth: true
      };

      break;
    case SIGNUP_FAILED:
      return { ...state, signupFormError: action.payload, loading: false };

      break;
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: true,
        errorMsg: null,
        signupFormError: null,
        userData: action.payload,
        token: action.payload.data.token,
        userId: action.payload.data.userData.id,
        isAuth: true
      };

      break;
    case CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        verifyCode: null,
        loading: false
      };

      break;
    case LOGIN_FAILED:
      return { ...state, loginLoading: false };
      break;
    case LOGOUT:
      return { ...INITIAL_STATE };
      break;
    case CHOOSE_PROFILE_PICS_INITIAL:
      return {
        ...state,
        imageSource: [...state.imageSource, action.payload],
        errorMsg: null,
        showDeleteBtn: false,
        index: null
      };
      break;
    case CHOOSE_COVER_PHOTO:
      return {
        ...state,
        imageCoverSource: [action.payload],
        errorMsg: null,
        showDeleteBtn: false,
        coverPhotoIndex: null
      };
      break;
    case DELETE_PROFILE_PICS_INITIAL:
      return {
        ...state,
        errorMsg: null,
        showDeleteBtn: false,
        index: null,
        imageSource: state.imageSource.filter(
          item => item != state.imageSource[action.payload]
        )
      };
      break;
    case DELETE_COVER_PHOTO:
      return {
        ...state,
        errorMsg: null,
        showDeleteBtn: false,
        coverPhotoIndex: null,
        imageCoverSource: state.imageCoverSource.filter(
          item => item != state.imageCoverSource[action.payload]
        )
      };
      break;
    case CHECK_IMAGE_TO_DELETE:
      return {
        ...state,
        errorMsg: null,
        showDeleteBtn: action.payload.showDeleteBtn,
        index: action.payload.index
      };
    case CHECK_COVER_IMAGE_TO_DELETE:
      return {
        ...state,
        errorMsg: null,
        showDeleteBtn: action.payload.showDeleteBtn,
        coverPhotoIndex: action.payload.index
      };
      break;
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        imageSource: [],
        imageCoverSource: [],

        userData: action.payload,
        // token: action.payload.token,
        // userId: action.payload.data.id,
        is_loading: false
      };

      break;
    case PROFILE_UPDATE_FAILED:
      return { ...state, is_loading: false, errorMsg: action.payload };
      break;
    case PROFILE_FORM_FIELDS:
      //console.log(action.payload);
      return { ...state, [action.payload.prop]: action.payload.value };
      break;
    default:
      return state;
  }
};
