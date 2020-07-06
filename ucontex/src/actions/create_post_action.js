import {RNS3} from 'react-native-aws3';
import _ from 'lodash';
import axios from 'axios';
import {
  CREATE_POST_MEDIA,
  CHECK_MEDIA_TO_DELETE,
  DELETE_CREATE_POST_MEDIA,
  CREATE_POST_FORM_FIELD,
  CREATE_POST_ERROR,
  RESET_CREATE_POST_FIELDS,
  SELECT_PEOPLE_TO_PIN,
  IS_POSTING,
  CREATE_POST_SUCCESS,
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
  FETCH_POST,
  IS_FETCHING_POST,
  IS_FETCHING_USER_POST,
  FETCH_USER_POST_ERROR,
  SHOW_POST_COMMENT_BOX,
  SHARE_SUCCESS,
  REFRESH_POST,
  UPDATE_POST_DATA,
} from './types';
import {
  BASE_URL,
  ACCESSKEY,
  SECRETKEY,
  SUCCESSACTIONSTATUS,
  REGION,
} from '../config';
import {Toast} from '../service';

export const choosePostMedia = media => {
  return {
    type: CREATE_POST_MEDIA,
    payload: media,
  };
};
export const imageBrowserOpen = () => {
  return {
    type: IS_IMAGE_BROWSER_OPEN,
    payload: true,
  };
};

export const checkMediaToDelete = ({showDeleteBtn, index}) => {
  //alert(index);
  return {
    type: CHECK_MEDIA_TO_DELETE,
    payload: {showDeleteBtn, index},
  };
};

export const deleteMedia = index => {
  return {
    type: DELETE_CREATE_POST_MEDIA,
    payload: index,
  };
};
export const removePeopleToPin = index => {
  return {
    type: REMOVE_PEOPLE_TO_PIN,
    payload: index,
  };
};

export const createPostFormField = ({prop, value}) => {
  return {
    type: CREATE_POST_FORM_FIELD,
    payload: {prop, value},
  };
};
export const createPostError = error => {
  return {
    type: CREATE_POST_ERROR,
    payload: value,
  };
};
export const resetCreatePostFields = () => {
  return {
    type: RESET_CREATE_POST_FIELDS,
  };
};
export const selectPoepleToPin = user => {
  return {
    type: SELECT_PEOPLE_TO_PIN,
    payload: user,
  };
};

export const publishPost = (
  {category, message, postMedia, userId, token, usersToPin},
  callback,
) => {
  return dispatch => {
    if (message === '' && postMedia.length < 1) {
      //print cannot br empty
      Toast.showToast('Nothing to post');
    } else {
      //good to go
      dispatch({type: IS_POSTING});
      const config = {
        keyPrefix: 'createPostPictures/',
        bucket: 'ucontex-profile-bucket',
        region: REGION,
        accessKey: ACCESSKEY,
        secretKey: SECRETKEY,
        successActionStatus: SUCCESSACTIONSTATUS,
        //acl: "public-write"
      };

      let usersToPinId;

      const uniqueImageName =
        Math.floor(100000 + Math.random() * 900000) + Date.now();

      if (postMedia.length > 0) {
        //user post images
        let imageSourceArray = postMedia.map((pic, index) => {
          // pic.type = "image/jpeg";
          // pic.name = "userid" + index;
          //console.log(response);
          return {
            uri: pic.file,
            type: 'image/png',
            name: uniqueImageName + index + '.jpg',
          };
        });
        console.log(imageSourceArray);
        //this holds all the reference to the pics
        let imageRefArray = [];

        imageSourceArray.map(async image => {
          try {
            let response = await RNS3.put(image, config);
            //alert("iii");
            console.log(response);
            if (response.status === 201) {
              //alert(response.body.postResponse.location);
              imageRefArray.push(response.body.postResponse.location);
            } else {
              Toast.showToast('Images Failed to upload');
              dispatch({
                type: CREATE_POST_ERROR,
              });
            }
            if (
              imageRefArray.length > 0 &&
              imageSourceArray.length === imageRefArray.length
            ) {
              console.log(imageRefArray);
              //send images and userdata to the server
              const url = `${BASE_URL}post`;
              const headers = {
                token: token,
              };
              if (usersToPin.length > 0) {
                usersToPinId = usersToPin.map(user => user.id);
              } else {
                usersToPinId = [];
              }

              let {data} = await axios.post(
                url,
                {
                  userId,
                  message,
                  images: imageRefArray,
                  privacy: parseInt(category),
                  taggedPeople: usersToPinId,
                },
                {headers},
              );
              console.log('post data', data.data);

              dispatch({type: CREATE_POST_SUCCESS, payload: data.data});
              Toast.showToast('Create post is successful');
              callback();
            }
          } catch (err) {
            console.log('error', err);
            Toast.showToast(err.response.data);
            dispatch({type: CREATE_POST_ERROR, payload: err.response.data});
            //console.log(e);
          }
        });
      } else {
        //user did not post with images
        const url = `${BASE_URL}post`;
        const headers = {
          token: token,
        };

        if (usersToPin.length > 0) {
          usersToPinId = usersToPin.map(user => user.id);
        } else {
          usersToPinId = [];
        }
        console.log('pin', usersToPin, 'pinpost', usersToPinId);

        let {data} = axios
          .post(
            url,
            {
              userId,
              message,
              privacy: parseInt(category),
              taggedPeople: usersToPinId,
            },
            {headers},
          )
          .then(({data}) => {
            console.log('post data', data.data);

            dispatch({type: CREATE_POST_SUCCESS, payload: data.data});
            Toast.showToast('Create post is successful');
            callback();
          })
          .catch(err => {
            dispatch({type: CREATE_POST_ERROR, payload: err.response.data});
            Toast.showToast(err.response.data);
          });
      }
    }
  };
};

export const fetchPost = ({token, userId, page}) => {
  return async dispatch => {
    try {
      dispatch({type: IS_FETCHING_POST});
      const url = `${BASE_URL}post`;

      // console.log("jkkkjkjk");
      // console.log("url", token);
      const headers = {
        token,
      };
      let {data} = await axios.get(url, {
        params: {userId, page},
        headers,
      });
      //  console.log('post datasd', data);

      dispatch({type: FETCH_POST, payload: data.data.posts});
    } catch (e) {
      console.log('post error', e);
      Toast.showToast(JSON.stringify(e.response.data));
      dispatch({type: FETCH_POST_ERROR});
    }
  };
};
export const refreshPost = ({token, userId}) => {
  return async dispatch => {
    try {
      dispatch({type: IS_POST_REFRESH});
      const url = `${BASE_URL}post`;
      //
      // console.log("jkkkjkjk");
      // console.log("url", token);
      const headers = {
        token,
      };
      let {data} = await axios.get(url, {
        params: {userId, page: 1},
        headers,
      });
      console.log('post data', data);

      dispatch({type: REFRESH_POST, payload: data.data.posts});
    } catch (e) {
      console.log(e);
      Toast.showToast(JSON.stringify(e.response.data));
      dispatch({type: CREATE_POST_ERROR});
    }
  };
};

// export const handleLoadMore=()

export const fetchSinglePost = ({postId, token, authUser, page}) => {
  return async dispatch => {
    try {
      dispatch({type: IS_POSTING});
      const url = `${BASE_URL}post/${postId}`;

      // console.log("jkkkjkjk");
      //console.log(url, token, authUser);
      const headers = {
        token,
      };
      let {data} = await axios.get(url, {
        params: {userId: authUser, page},
        headers,
        withCredentials: true,
      });
      // let { data } = await axios.get(url, {
      //   params: { user: userId },
      //   headers
      // });
      console.log('data', data);

      dispatch({type: FETCH_SINGLE_POST, payload: data});
    } catch (e) {
      console.log('error', e);
      //Toast.showToast(JSON.stringify(e.response.data));
      //dispatch({ type: CREATE_POST_ERROR });
    }
  };
};

export const fetchUsersPost = ({userId, token, authUser, page}) => {
  return async dispatch => {
    try {
      dispatch({type: IS_FETCHING_USER_POST});
      const url = `${BASE_URL}users/${userId}/posts`;

      // console.log("jkkkjkjk");
      console.log('testt', url, token, authUser);
      const headers = {
        token,
      };
      let {data} = await axios.get(url, {
        params: {userId: authUser, page},
        headers,
        withCredentials: true,
      });
      // let { data } = await axios.get(url, {
      //   params: { user: userId },
      //   headers
      // });
      // console.log("usersposts", data);

      dispatch({type: FETCH_USER_POST, payload: data.posts});
    } catch (e) {
      console.log('error123', e);
      Toast.showToast(JSON.stringify(e.response.data));
      dispatch({type: FETCH_USER_POST_ERROR});
    }
  };
};

export const deletePost = ({postId, indexOfPost, userId, token}) => {
  return async dispatch => {
    try {
      dispatch({type: IS_POST_DELETING});
      const url = `${BASE_URL}post/${postId}`;

      // console.log("jkkkjkjk");
      console.log(url, token, postId, userId);
      const headers = {
        token,
      };
      let {data} = await axios.delete(url, {data: {userId}, headers});

      dispatch({type: POST_DELETE_SUCCESS, payload: indexOfPost});

      Toast.showToast('Post delete successfull');
    } catch (e) {
      console.log('error', e);
      //Toast.showToast(JSON.stringify(e.response.data));
      dispatch({type: POST_DELETE_FAILED});
      Toast.showToast(JSON.stringify(e.response.data));
    }
  };
};
export const share = ({postId, message, userId, token}, callback) => {
  return async dispatch => {
    try {
      dispatch({type: IS_POST_DELETING});
      const url = `${BASE_URL}post/${postId}/share`;

      // console.log("jkkkjkjk");
      // console.log(url, token, postId, userId);
      const headers = {
        token,
      };
      console.log(headers);
      let {data} = await axios.post(url, {userId, message}, {headers: headers});
      console.log(data);
      callback();
      dispatch({type: SHARE_SUCCESS});

      Toast.showToast('Post shared successfully');
    } catch (e) {
      console.log('error', e);
      //Toast.showToast(JSON.stringify(e.response.data));
      dispatch({type: SHARE_SUCCESS});
      Toast.showToast(JSON.stringify(e.response.data));
    }
  };
};
export const resetData = () => {
  return {
    type: RESET_POST_DATA,
  };
};

export const editPost = (
  {postId, category, message, postMedia, userId, token},
  callback,
) => {
  return dispatch => {
    dispatch({type: IS_POST_EDITING});
    const config = {
      keyPrefix: 'createPostPictures/',
      bucket: 'ucontex-profile-bucket',
      region: REGION,
      accessKey: ACCESSKEY,
      secretKey: SECRETKEY,
      successActionStatus: SUCCESSACTIONSTATUS,
      //acl: "public-write"
    };

    const uniqueImageName =
      Math.floor(100000 + Math.random() * 900000) + Date.now();

    console.log('me', postId, category, message, postMedia, userId, token);
    if (postMedia.length > 0) {
      //filter the image that is not chosen from the device ie the one
      //that the user wants to edit.
      let filterArray = postMedia.filter((pic, index) => {
        return pic.file.startsWith('http') !== true;
      });

      let imageSourceArray = filterArray.map((picx, index) => {
        // pic.type = "image/jpeg";
        // pic.name = "userid" + index;
        //console.log(response);
        return {
          uri: picx.file,
          type: 'image/png',
          name: uniqueImageName + index + '.jpg',
        };
      });
      console.log('new', filterArray, imageSourceArray);
      //this holds all the reference to the pics
      let imageRefArray = [];
      //check if user selects new image
      if (imageSourceArray.length > 0) {
        //user select new image
        imageSourceArray.map(async image => {
          try {
            let response = await RNS3.put(image, config);
            //alert("iii");
            console.log('imgs res', response);
            if (response.status === 201) {
              //alert(response.body.postResponse.location);
              imageRefArray.push(response.body.postResponse.location);
            } else {
              Toast.showToast('Images Failed to upload');
              dispatch({
                type: EDIT_POST_ERROR,
              });
            }
            if (
              imageRefArray.length > 0 &&
              imageSourceArray.length === imageRefArray.length
            ) {
              //get previously uploaded images
              //
              let previousUploadedImages = postMedia.filter((pic, index) => {
                return pic.file.startsWith('http') === true;
              });

              //this is to extract object value from previousUploadedImages array
              const getValeOfImages = previousUploadedImages.map(
                elem => elem.file,
              );
              const imagesArrayInsert = [...getValeOfImages, ...imageRefArray];
              console.log('ref', imagesArrayInsert, 'fdff', imageRefArray);
              //send images and userdata to the server
              const url = `${BASE_URL}post/${postId}/edit`;
              const headers = {
                token: token,
              };
              const fieldsToUpdate = {
                message,
                images: imagesArrayInsert,
                privacy: parseInt(category),
              };
              let {data} = await axios.put(
                url,
                {
                  userId,
                  fieldsToUpdate,
                },
                {headers},
              );
              console.log('post data', data);

              dispatch({type: EDIT_POST_SUCCESS, payload: data.post});
              Toast.showToast('Edit post is successful');
              callback();
            }
          } catch (err) {
            console.log('error', err);
            const error =
              typeof err.response.data !== 'undefined'
                ? err.response.data
                : err;
            Toast.showToast(JSON.stringify(error));
            dispatch({type: EDIT_POST_ERROR, payload: error});
            //console.log(e);
          }
        });
      } else {
        //no new image seected,just insrt text
        const url = `${BASE_URL}post/${postId}/edit`;
        console.log(url);
        const headers = {
          token: token,
        };
        const fieldsToUpdate = {
          message,
          privacy: parseInt(category),
        };
        let {data} = axios
          .put(
            url,
            {
              userId,
              fieldsToUpdate,
            },
            {headers},
          )
          .then(({data}) => {
            console.log('post data', data.post);

            dispatch({type: EDIT_POST_SUCCESS, payload: data.post});
            Toast.showToast('Edit post is successfull');
            callback();
          })
          .catch(err => {
            const error =
              typeof err.response.data !== 'undefined'
                ? err.response.data
                : err;

            dispatch({type: EDIT_POST_ERROR, payload: error});
            Toast.showToast(JSON.stringify(error));
          });
      }
    } else {
      //user did not post with images
      const url = `${BASE_URL}post/${postId}/edit`;
      const headers = {
        token: token,
      };
      const fieldsToUpdate = {
        message,
        privacy: parseInt(category),
      };
      let {data} = axios
        .put(
          url,
          {
            userId,
            fieldsToUpdate,
          },
          {headers},
        )
        .then(({data}) => {
          console.log('post data', data.data);

          dispatch({type: EDIT_POST_SUCCESS, payload: data.post});
          Toast.showToast('Edit post is successful');
          callback();
        })
        .catch(err => {
          const error =
            typeof err.response.data !== 'undefined' ? err.response.data : err;
          dispatch({type: EDIT_POST_ERROR, payload: error});
          Toast.showToast(JSON.stringify(error));
        });
    }
  };
};

export const handleShowPostCommentBox = postId => {
  console.log('postssComm', postId);
  return {
    type: SHOW_POST_COMMENT_BOX,
    payload: postId,
  };
};
export const updatePostData = postData => {
  //console.log('postssComm', postId);
  return {
    type: UPDATE_POST_DATA,
    payload: postData,
  };
};
