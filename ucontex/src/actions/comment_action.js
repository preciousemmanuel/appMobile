import { RNS3 } from "react-native-aws3";
import _ from "lodash";
import axios from "axios";
import {
  IS_FETCHING_COMMENT,
  FETCH_COMMENTS,
  CREATE_COMMENT_FORM_FIELD,
  IS_COMMENTING,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR
} from "./types";
import {
  BASE_URL,
  ACCESSKEY,
  SECRETKEY,
  SUCCESSACTIONSTATUS,
  REGION
} from "../config";
import { Toast } from "../service";

export const fetchComment = ({ postId, token, authUser, page }) => {
  return async dispatch => {
    try {
      dispatch({ type: IS_FETCHING_COMMENT });
      const url = `${BASE_URL}post/${postId}/comments`;

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
      // console.log("data", data);

      dispatch({ type: FETCH_COMMENTS, payload: data.post.comments });
    } catch (e) {
      console.log("error", e);
      dispatch({ type: POST_COMMENT_ERROR });
      //Toast.showToast(JSON.stringify(e.response.data));
      //dispatch({ type: CREATE_POST_ERROR });
    }
  };
};

export const commentFormField = ({ prop, value }) => {
  return {
    type: CREATE_COMMENT_FORM_FIELD,
    payload: { prop, value }
  };
};
export const commentOnPost = ({ commentMsg, postId, userId, token }) => {
  return async dispatch => {
    if (commentMsg === "" || commentMsg === null) {
      Toast.showToast("Comment must not be empty");
    } else {
      try {
        dispatch({ type: IS_COMMENTING });
        const url = `${BASE_URL}post/${postId}/comment`;

        // console.log("jkkkjkjk");
        console.log(url, token, postId, userId);
        const headers = {
          token
        };
        let { data } = await axios.put(
          url,
          { userId, message: commentMsg },
          { headers }
        );
        console.log("datacom", data);
        dispatch({ type: POST_COMMENT_SUCCESS, payload: data.comment });
        Toast.showToast("Comment is sent");
      } catch (e) {
        console.log("error", e);
        //Toast.showToast(JSON.stringify(e.response.data));
        dispatch({ type: POST_COMMENT_ERROR });
        Toast.showToast(JSON.stringify(e.response.data));
      }
    }
  };
};
