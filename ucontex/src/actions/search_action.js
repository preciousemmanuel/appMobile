import { RNS3 } from "react-native-aws3";
import _ from "lodash";
import axios from "axios";
import {
  SEARCH_USER_FORM_FIELD,
  IS_SEARCHING,
  SEARCH_SUCCESS,
  SEARCH_ERROR
} from "./types";
import {
  BASE_URL,
  ACCESSKEY,
  SECRETKEY,
  SUCCESSACTIONSTATUS,
  REGION
} from "../config";
import { Toast } from "../service";

export const searchUserFormField = searchTerm => {
  //console.log("act", mediaItem);
  return {
    type: SEARCH_USER_FORM_FIELD,
    payload: searchTerm
  };
};

export const searchUser = (searchTerm, userId, token) => {
  return async dispatch => {
    if (searchTerm === "") {
      Toast.showToast("Enter your seach term");
    } else {
      try {
        dispatch({ type: IS_SEARCHING });
        const url = `${BASE_URL}users/search/$searchTerm`;

        // console.log("jkkkjkjk");
        //console.log(url, token, postId, userId);
        const headers = {
          token
        };
        let { data } = await axios.get(url, { params: { userId }, headers });
        console.log("userAction", data);
        if (data.users.length > 0) {
          dispatch({ type: SEARCH_SUCCESS, payload: data.users });
        } else {
          dispatch({ type: SEARCH_SUCCESS, payload: data.users });
          Toast.showToast("No user found!");
        }

        //Toast.showToast("Reaction successfull");
      } catch (e) {
        console.log("error", e);
        //Toast.showToast(JSON.stringify(e.response.data));
        dispatch({ type: SEARCH_ERROR });
        Toast.showToast(JSON.stringify(e.response.data.error));
      }
    }
  };
};
