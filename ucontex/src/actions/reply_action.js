import { RNS3 } from "react-native-aws3";
import _ from "lodash";
import axios from "axios";
import {
  IS_FETCHING_REPLY,
  FETCH_REPLIES,
  REPLY_FORM_FIELD,
  IS_REPLYING,
  REPLY_SUCCESS,
  REPLY_ERROR
} from "./types";
import {
  BASE_URL,
  ACCESSKEY,
  SECRETKEY,
  SUCCESSACTIONSTATUS,
  REGION
} from "../config";
import { Toast } from "../service";

export const fetchReply = ({ commentId, token, authUser, page }) => {
  return async dispatch => {
    try {
      dispatch({ type: IS_FETCHING_REPLY });
      const url = `${BASE_URL}comment/${commentId}/reply`;

      // console.log("jkkkjkjk");
      console.log(url, token, authUser);
      const headers = {
        token
      };
      let { data } = await axios.get(url, {
        params: { userId: authUser, page },
        headers,
        withCredentials: true
      });
      // let { data } = await axios.get(url, {
      //   params: { user: userId },
      //   headers
      // });
      console.log("replies", data);

      dispatch({ type: FETCH_REPLIES, payload: data.reply });
    } catch (e) {
      console.log("error", e);
      dispatch({ type: REPLY_ERROR });
      //Toast.showToast(JSON.stringify(e.response.data));
      //dispatch({ type: CREATE_POST_ERROR });
    }
  };
};

export const replyFormField = ({ prop, value }) => {
  return {
    type: REPLY_FORM_FIELD,
    payload: { prop, value }
  };
};
export const replyComment = ({ message, commentId, userId, token }) => {
  return async dispatch => {
    if (message === "" || message === null) {
      Toast.showToast("field must not be empty");
    } else {
      try {
        dispatch({ type: IS_REPLYING });
        const url = `${BASE_URL}comment/${commentId}/reply`;

        // console.log("jkkkjkjk");
        console.log(url, token, commentId, userId);
        const headers = {
          token
        };
        let { data } = await axios.post(url, { userId, message }, { headers });
        console.log("datacom", data);
        dispatch({ type: REPLY_SUCCESS, payload: data.reply });
        Toast.showToast("Reply is sent");
      } catch (e) {
        console.log("error", e);
        //Toast.showToast(JSON.stringify(e.response.data));
        dispatch({ type: REPLY_ERROR });
        Toast.showToast(JSON.stringify(e.response.data));
      }
    }
  };
};
