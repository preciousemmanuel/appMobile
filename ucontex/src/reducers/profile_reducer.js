import {
  // CHOOSE_PROFILE_PICS_INITIAL,
  // DELETE_PROFILE_PICS_INITIAL,
  IS_LOADING_USERS_PROFILE,
  // PROFILE_FORM_FIELDS,
  // PROFILE_UPDATE_FAILED,
  // CHECK_IMAGE_TO_DELETE,
  // CHECK_COVER_IMAGE_TO_DELETE,
  // CHOOSE_COVER_PHOTO,
  // DELETE_COVER_PHOTO,
  //PROFILE_UPDATE_SUCCESS,
  SELECT_ACTIVE_FOLLOWERS_USER,
  FETCH_PROFILE,
  IS_FOLLOW_SUCCESS,
  IS_FOLLOW_BTN_CLICK
} from "../actions/types";

const INITIAL_STATE = {
  is_loading: false,
  errorMsg: null,
  selectedProfileId: null,
  usersProfileData: {},
  isFollowBtnClick: false
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_LOADING_USERS_PROFILE:
      return { ...state, is_loading: true };
      break;

    case SELECT_ACTIVE_FOLLOWERS_USER:
      return {
        selectedProfileId: action.payload
      };

      break;
    case FETCH_PROFILE:
      //  console.log("reduc prof", action.payload);
      return {
        ...state,
        usersProfileData: action.payload,
        is_loading: false
      };

      break;
    case IS_FOLLOW_BTN_CLICK:
      //  console.log("reduc prof", action.payload);
      return {
        ...state,
        isFollowBtnClick: true
      };

      break;
    case IS_FOLLOW_SUCCESS:
      //  console.log("reduc prof", action.payload);
      return {
        ...state,
        isFollowBtnClick: false
      };

      break;
    default:
      return state;
  }
};
