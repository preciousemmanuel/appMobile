import {
  SELECT_MEDIA_TO_VIEW,
  IS_LOADING_PROFILE,
  CLEAR_ERR_MSG
} from "./types";

export const selectMediaView = (mediaItem, callback) => {
  //console.log("act", mediaItem);
  callback();
  return {
    type: SELECT_MEDIA_TO_VIEW,
    payload: mediaItem
  };
};
