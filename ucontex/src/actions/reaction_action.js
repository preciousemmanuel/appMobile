import {RNS3} from 'react-native-aws3';
import _ from 'lodash';
import axios from 'axios';
import {
  SHOW_LOVE_X_ICON,
  IS_REACTING,
  REACTION_SUCCESS,
  REACTION_ERROR,
  UNDO_SHOW_LOVE_X_ICON,
} from './types';
import {
  BASE_URL,
  ACCESSKEY,
  SECRETKEY,
  SUCCESSACTIONSTATUS,
  REGION,
} from '../config';
import {Toast} from '../service';

export const showLoveExpressionIcon = item => {
  //console.log("act", mediaItem);
  return {
    type: SHOW_LOVE_X_ICON,
    payload: 'xpression' + item,
  };
};
export const unDoLoveExpressionIcons = () => {
  //console.log("act", mediaItem);
  return {
    type: UNDO_SHOW_LOVE_X_ICON,
  };
};

export const reactOnPost = ({reactionType, postId, userId, token}) => {
  return async dispatch => {
    if (reactionType === null) {
      Toast.showToast('You must choose reaction');
    } else {
      try {
        dispatch({type: IS_REACTING});
        const url = `${BASE_URL}post/${postId}/react`;

        // console.log("jkkkjkjk");
        console.log(url, token, postId, userId);
        const headers = {
          token,
        };
        let {data} = await axios.put(url, {userId, reactionType}, {headers});
        console.log('datacom', data);
        dispatch({type: REACTION_SUCCESS, payload: data.data});
        Toast.showToast('Reaction successfull');
      } catch (e) {
        console.log('error', e);
        //Toast.showToast(JSON.stringify(e.response.data));
        dispatch({type: REACTION_ERROR});
        Toast.showToast(JSON.stringify(e.response.data.error));
      }
    }
  };
};
export const deleteReactionPost = ({
  reactionType,
  reactionId,
  userId,
  token,
}) => {
  return async dispatch => {
    if (reactionType === null) {
      Toast.showToast('You must choose reaction');
    } else {
      try {
        dispatch({type: IS_REACTING});
        const url = `${BASE_URL}reaction/${reactionId}`;

        // console.log("jkkkjkjk");
        console.log(url, token, reactionId, userId);
        const headers = {
          token,
        };
        //await axios.delete(url, { data: { userId }, headers });
        let {data} = await axios.delete(url, {data: {userId}, headers});
        console.log('datacom', data);
        dispatch({type: REACTION_SUCCESS, payload: data.comment});
        Toast.showToast('Reaction deleted');
      } catch (e) {
        console.log('error', e);
        //Toast.showToast(JSON.stringify(e.response.data));
        dispatch({type: REACTION_ERROR});
        Toast.showToast(JSON.stringify(e.response.data.error));
      }
    }
  };
};
