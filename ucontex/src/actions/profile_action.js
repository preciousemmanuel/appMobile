import { RNS3 } from "react-native-aws3";
import _ from "lodash";
import axios from "axios";

import { Toast } from "../service";

import {
  BASE_URL,
  ACCESSKEY,
  SECRETKEY,
  SUCCESSACTIONSTATUS,
  REGION
} from "../config";

import {
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
  PROFILE_UPDATE_SUCCESS,
  SELECT_ACTIVE_FOLLOWERS_USER,
  FETCH_PROFILE,
  IS_FOLLOW_SUCCESS,
  IS_FOLLOW_BTN_CLICK,
  IS_LOADING_USERS_PROFILE
} from "./types";

export const chooseProfilePic = pics => {
  return {
    type: CHOOSE_PROFILE_PICS_INITIAL,
    payload: pics
  };
};
export const chooseCoverPic = pics => {
  return {
    type: CHOOSE_COVER_PHOTO,
    payload: pics
  };
};

export const profileFormField = ({ prop, value }) => {
  return {
    type: PROFILE_FORM_FIELDS,
    payload: { prop, value }
  };
};

export const checkImageToDelete = ({ showDeleteBtn, index }) => {
  //alert(index);
  return {
    type: CHECK_IMAGE_TO_DELETE,
    payload: { showDeleteBtn, index }
  };
};
export const checkCoverImageToDelete = ({ showDeleteBtn, index }) => {
  //alert(index);
  return {
    type: CHECK_COVER_IMAGE_TO_DELETE,
    payload: { showDeleteBtn, index }
  };
};
export const deleteImage = index => {
  return {
    type: DELETE_PROFILE_PICS_INITIAL,
    payload: index
  };
};
export const deleteCoverImage = index => {
  return {
    type: DELETE_COVER_PHOTO,
    payload: index
  };
};
export const clearMsg = () => {
  return {
    type: CLEAR_ERR_MSG
  };
};

export const saveProfilePicture = (
  { imageSource, schedule_profile_time, userId, token },
  callback
) => {
  //alert(userId + " " + token);
  return dispatch => {
    dispatch({ type: IS_LOADING_PROFILE });
    const config = {
      keyPrefix: "profilePictures/",
      bucket: "ucontex-profile-bucket",
      region: REGION,
      accessKey: ACCESSKEY,
      secretKey: SECRETKEY,
      successActionStatus: SUCCESSACTIONSTATUS
      //acl: "public-write"
    };

    // let file = {
    //   // `uri` can also be a file system path (i.e. file://)
    //   uri:
    //     "file:///data/data/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fucontex-8f7b2544-a976-4361-9729-d1aa61806e68/ImagePicker/66d6fd06-fbbb-4203-9950-441ef884c2d7.jpg",
    //   name: "image.png",
    //   type: "image/png"
    // };
    const uniqueImageName =
      Math.floor(100000 + Math.random() * 900000) + Date.now();
    let imageSourceArray = imageSource.map((pic, index) => {
      // pic.type = "image/jpeg";
      // pic.name = "userid" + index;
      //console.log(response);
      return {
        uri: pic,
        type: "image/png",
        name: uniqueImageName + index + ".jpg"
      };
    });
    console.log(imageSourceArray);
    //this holds all the reference to the pics
    let imageRefArray = [];

    imageSourceArray.map(async image => {
      try {
        let response = await RNS3.put(image, config);
        //alert("iii");
        console.log("dsa", response);
        if (response.status === 201) {
          //alert(response.body.postResponse.location);
          imageRefArray.push(response.body.postResponse.location);
        } else {
          dispatch({
            type: PROFILE_UPDATE_FAILED,
            payload: "Profile picture upload error"
          });
          Toast.showToast("Cannot update profile picture");
        }
        if (imageRefArray.length > 0) {
          console.log("ree", imageRefArray);
          //send images and userdata to the server
          const url = `${BASE_URL}users/update-profile`;
          console.log("my", url);
          const headers = {
            token
          };

          let reqData = [
            { profilePictureRotationTime: schedule_profile_time },
            { profilePictures: imageRefArray }
          ];
          console.log("reqData", reqData, userId, token);

          const datas = {
            userId,
            fields: reqData
          };

          let { data } = await axios.post(url, datas, { headers });
          console.log("profilePics", data);
          dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data });
          Toast.showToast("Profile picture updated successfully");
          callback();
        }
      } catch (err) {
        console.log(err);
        let errorMsg =
          typeof err.response.data === "undefined"
            ? "Pofile picture upload error"
            : err.response.data;
        dispatch({ type: PROFILE_UPDATE_FAILED, payload: errorMsg });
        Toast.showToast(JSON.stringify(errorMsg));
        //console.log(e);
      }
    });
  };
};
export const saveCoverPhoto = (
  { imageCoverSource, userId, token },
  callback
) => {
  return dispatch => {
    dispatch({ type: IS_LOADING_PROFILE });
    const config = {
      keyPrefix: "coverPhoto/",
      bucket: "ucontex-profile-bucket",
      region: REGION,
      accessKey: ACCESSKEY,
      secretKey: SECRETKEY,
      successActionStatus: SUCCESSACTIONSTATUS
      //acl: "public-write"
    };
    //alert(imageSource.toString())
    // let file = {
    //   // `uri` can also be a file system path (i.e. file://)
    //   uri:
    //     "file:///data/data/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fucontex-8f7b2544-a976-4361-9729-d1aa61806e68/ImagePicker/66d6fd06-fbbb-4203-9950-441ef884c2d7.jpg",
    //   name: "image.png",
    //   type: "image/png"
    // };
    const uniqueImageName =
      Math.floor(100000 + Math.random() * 900000) + Date.now();
    let imageSourceArray = imageCoverSource.map((pic, index) => {
      // pic.type = "image/jpeg";
      // pic.name = "userid" + index;
      //console.log(response);
      return {
        uri: pic,
        type: "image/png",
        name: uniqueImageName + index + ".jpg"
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
          dispatch({
            type: PROFILE_UPDATE_FAILED,
            payload: "Cover photo upload error"
          });
          Toast.showToast("Cannot update cover photo");
        }
        if (imageRefArray.length > 0) {
          console.log(imageRefArray);
          //send images and userdata to the server
          const url = `${BASE_URL}users/update-profile`;
          const headers = {
            token: token
          };

          let reqData = [{ coverPhoto: imageRefArray.toString() }];

          let { data } = await axios.post(
            url,
            {
              userId,
              fields: reqData
            },
            { headers }
          );
          console.log("coverphoto", data);
          dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data });
          Toast.showToast("Cover picture updated successfully");
          callback();
          // if (typeof data.error != "null") {
          //   dispatch({ type: PROFILE_UPDATE_FAILED, payload: data.error });
          //}
        }
      } catch (err) {
        console.log(err.response.data);
        let errorMsg =
          typeof err.response.data == "undefined"
            ? "Cover photo upload error2"
            : err.response.data;
        dispatch({ type: PROFILE_UPDATE_FAILED, payload: errorMsg });
        Toast.showToast(JSON.stringify(errorMsg));
        //console.log(e);
      }
    });
  };
};

export const editProfile = ({
  firstName,
  lastName,
  aboutMe,
  website,
  dateOfBirth,
  imageSource,
  imageCoverSource,
  userId,
  token
}) => {
  return dispatch => {
    if (firstName === "") {
      console.log("name empty");
      Toast.showToast("First name must not be empty");
    } else if (lastName === "") {
      console.log("lastname empty");
      Toast.showToast("Last name must not be empty");
    } else if (dateOfBirth === "") {
      Toast.showToast("Datebirth must not be empty");
    } else {
      dispatch({ type: IS_LOADING_PROFILE });
      const configCoverPhoto = {
        keyPrefix: "coverPhoto/",
        bucket: "ucontex-profile-bucket",
        region: REGION,
        accessKey: ACCESSKEY,
        secretKey: SECRETKEY,
        successActionStatus: SUCCESSACTIONSTATUS
        //acl: "public-write"
      };
      const configProfilePhoto = {
        keyPrefix: "profilePictures/",
        bucket: "ucontex-profile-bucket",
        region: REGION,
        accessKey: ACCESSKEY,
        secretKey: SECRETKEY,
        successActionStatus: SUCCESSACTIONSTATUS
        //acl: "public-write"
      };

      const uniqueImageName =
        Math.floor(100000 + Math.random() * 900000) + Date.now();
      if (imageCoverSource.length > 0 && imageSource.length > 0) {
        console.log("token", token);
        //user change coverPhoto and profilePics
        let coverImageSourceArray = imageCoverSource.map((pic, index) => {
          // pic.type = "image/jpeg";
          // pic.name = "userid" + index;
          //console.log(response);
          return {
            uri: pic,
            type: "image/png",
            name: uniqueImageName + index + ".jpg"
          };
        });
        //this holds all the reference to the pics
        let coverImageRefArray = [];

        coverImageSourceArray.map(async image => {
          try {
            let response = await RNS3.put(image, configCoverPhoto);
            //alert("iii");
            console.log(response);
            if (response.status === 201) {
              //alert(response.body.postResponse.location);
              coverImageRefArray.push(response.body.postResponse.location);
            } else {
              Toast.showToast("Cover photo upload error");
            }
            if (coverImageRefArray.length > 0) {
              //upload profile image
              let profileImageSourceArray = imageSource.map((pic, index) => {
                // pic.type = "image/jpeg";
                // pic.name = "userid" + index;
                //console.log(response);
                return {
                  uri: pic,
                  type: "image/png",
                  name: uniqueImageName + index + ".jpg"
                };
              });
              //this holds all the reference to the pics
              let profileImageRefArray = [];
              profileImageSourceArray.map(async image => {
                let response = await RNS3.put(image, configProfilePhoto);
                //alert("iii");
                console.log(response);
                if (response.status === 201) {
                  //alert(response.body.postResponse.location);
                  profileImageRefArray.push(
                    response.body.postResponse.location
                  );
                } else {
                  dispatch({
                    type: PROFILE_UPDATE_FAILED
                  });
                  Toast.showToast("Profile photo upload error");
                }
                if (profileImageRefArray.length > 0) {
                  const url = `${BASE_URL}users/update-profile`;
                  const headers = {
                    token: token
                  };

                  let reqData = [
                    {
                      coverPhoto: coverImageRefArray.toString()
                    },
                    { profilePictures: profileImageRefArray },
                    { firstName },
                    { lastName },
                    { dateOfBirth },
                    { description: aboutMe }
                    // {website}
                  ];

                  let { data } = await axios.post(
                    url,
                    {
                      userId,
                      fields: reqData
                    },
                    { headers }
                  );

                  dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data });
                  Toast.showToast("Profile update is successful");
                }
              });
            }
          } catch (err) {
            console.log(err.response.data);
            let errorMsg =
              typeof err.response.data == "undefined"
                ? " Photo upload error"
                : err.response.data;
            // dispatch({ type: PROFILE_UPDATE_FAILED, payload: errorMsg });

            dispatch({ type: PROFILE_UPDATE_FAILED, payload: errorMsg });
            Toast.showToast(JSON.stringify(errorMsg));
            //console.log(e);
          }
        });
      } else if (imageSource.length > 0) {
        //user updates only profileImage
        console.log("token", token);
        let profileImageSourceArray = imageSource.map((pic, index) => {
          // pic.type = "image/jpeg";
          // pic.name = "userid" + index;
          //console.log(response);
          return {
            uri: pic,
            type: "image/png",
            name: uniqueImageName + index + ".jpg"
          };
        });
        console.log(profileImageSourceArray);
        //this holds all the reference to the pics
        let profileImageRefArray = [];

        profileImageSourceArray.map(async image => {
          try {
            let response = await RNS3.put(image, configProfilePhoto);
            //alert("iii");
            console.log(response);
            if (response.status === 201) {
              //alert(response.body.postResponse.location);
              profileImageRefArray.push(response.body.postResponse.location);
            } else {
              Toast.showToast("Profile photo upload error");
              dispatch({
                type: PROFILE_UPDATE_FAILED
                //payload: "Profile photo upload error"
              });
            }
            if (profileImageRefArray.length > 0) {
              //console.log(imageRefArray);
              //send images and userdata to the server
              const url = `${BASE_URL}users/update-profile`;
              const headers = {
                token: token
              };
              console.log("arra", profileImageRefArray);
              let reqData = [
                {
                  profilePictures: profileImageRefArray
                },
                { firstName },
                { lastName },
                { dateOfBirth },
                { description: aboutMe }
              ];

              let { data } = await axios.post(
                url,
                {
                  userId,
                  fields: reqData
                },
                { headers }
              );
              console.log(
                "pic",
                firstName,
                lastName,
                " dsds ",
                token,
                " id ",
                userId,
                data
              );
              Toast.showToast("Profile update is successful");
              dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data });

              // if (typeof data.error != "null") {
              //   dispatch({ type: PROFILE_UPDATE_FAILED, payload: data.error });
              //}
            }
          } catch (err) {
            console.log(err.response.data);
            let errorMsg =
              typeof err.response.data == "undefined"
                ? "Profile photo upload error"
                : err.response.data;
            Toast.showToast(errorMsg);
            dispatch({ type: PROFILE_UPDATE_FAILED });
            //console.log(e);
          }
        });
      } else if (imageCoverSource.length > 0) {
        //user updates only coverPhoto
        console.log("token", token);
        let coverImageSourceArray = imageCoverSource.map((pic, index) => {
          // pic.type = "image/jpeg";
          // pic.name = "userid" + index;
          //console.log(response);
          return {
            uri: pic,
            type: "image/png",
            name: uniqueImageName + index + ".jpg"
          };
        });
        console.log(coverImageSourceArray);
        //this holds all the reference to the pics
        let coverImageRefArray = [];

        coverImageSourceArray.map(async image => {
          try {
            let response = await RNS3.put(image, configCoverPhoto);
            //alert("iii");
            console.log(response);
            if (response.status === 201) {
              //alert(response.body.postResponse.location);
              coverImageRefArray.push(response.body.postResponse.location);
            } else {
              // dispatch({
              //   type: PROFILE_UPDATE_FAILED,
              //   payload: "Cover photo upload error"
              // });
              Toast.showToast("Cover photo upload error");
              dispatch({
                type: PROFILE_UPDATE_FAILED,
                payload: "Cover photo upload error"
              });
            }
            if (coverImageRefArray.length > 0) {
              //console.log(imageRefArray);
              //send images and userdata to the server
              const url = `${BASE_URL}users/update-profile`;
              const headers = {
                token: token
              };

              console.log(coverImageRefArray.toString());
              let reqData = [
                { coverPhoto: coverImageRefArray.toString() },
                { firstName },
                { lastName },
                { dateOfBirth },
                { description: aboutMe }
              ];

              let { data } = await axios.post(
                url,
                {
                  userId,
                  fields: reqData
                },
                { headers }
              );
              console.log(
                "coverSoc",
                firstName,
                lastName,
                " dsds ",
                token,
                " id ",
                userId,
                data
              );
              Toast.showToast("Profile update is successful");
              dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data });

              // if (typeof data.error != "null") {
              //   dispatch({ type: PROFILE_UPDATE_FAILED, payload: data.error });
              //}
            }
          } catch (err) {
            console.log(
              "dsds",
              firstName,
              lastName,
              userId,
              " kjjkjk ",
              token,
              err.response.data
            );
            let errorMsg =
              typeof err.response.data == "undefined"
                ? "Cover photo upload error"
                : err.response.data;
            // dispatch({ type: PROFILE_UPDATE_FAILED, payload: errorMsg });
            //console.log(e);
            Toast.showToast(errorMsg);
            dispatch({ type: PROFILE_UPDATE_FAILED });
          }
        });
      } else {
        //user does not update profile and cover Images
        const url = `${BASE_URL}users/update-profile`;
        const headers = {
          token: token
        };

        let reqData = [
          {
            firstName,
            lastName,
            dateOfBirth,
            description: aboutMe,
            website
          }
        ];

        axios
          .post(
            url,
            {
              userId,
              fields: reqData
            },
            { headers }
          )
          .then(({ data }) => {
            console.log("numb", data);
            Toast.showToast("Profile update is successful");
            dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data });
          })
          .catch(err => {
            console.log(
              "sds",
              firstName,
              lastName,
              userId,
              " kjjkjk ",
              token,
              err.response.data
            );
            let errorMsg =
              typeof err.response.data == "undefined"
                ? "Cover photo upload error"
                : err.response.data;
            Toast.showToast(errorMsg);
            dispatch({ type: PROFILE_UPDATE_FAILED, payload: errorMsg });
          });
      }
    }
  };
};

export const selectActiveFollowerUser = ({ userId, token }) => {
  return {
    type: SELECT_ACTIVE_FOLLOWERS_USER,
    payload: userId
  };
};

export const fetchUsersProfile = ({ user, token, authUser }) => {
  return async dispatch => {
    try {
      dispatch({ type: IS_LOADING_USERS_PROFILE });
      const url = `${BASE_URL}users/${user}`;

      // console.log("jkkkjkjk");
      //console.log(url, token, authUser);
      const headers = {
        token
      };
      let { data } = await axios.get(url, {
        params: { userId: authUser },
        headers,
        withCredentials: true
      });
      // let { data } = await axios.get(url, {
      //   params: { user: userId },
      //   headers
      // });
      //console.log("user Profile", data.data);

      dispatch({ type: FETCH_PROFILE, payload: data.data });
    } catch (e) {
      console.log("error", e);
      //Toast.showToast(JSON.stringify(e.response.data));
      //dispatch({ type: CREATE_POST_ERROR });
    }
  };
};
export const followUser = ({ userId, token, userToFollow }) => {
  return async dispatch => {
    try {
      dispatch({
        type: IS_FOLLOW_BTN_CLICK
      });
      const url = `${BASE_URL}users/follow`;
      const headers = {
        token
      };
      let { data } = await axios.put(
        url,
        {
          userId,
          userToFollow
        },
        { headers }
      );
      console.log(data);
      dispatch({
        type: IS_FOLLOW_SUCCESS
      });
      Toast.showToast("Follow successfull");
    } catch (e) {
      console.log(e);
      dispatch({
        type: IS_FOLLOW_SUCCESS
      });
      Toast.showToast(e.response.data);
    }
  };
};
export const unFollowUser = ({ userId, token, userToUnfollow }) => {
  return async dispatch => {
    try {
      dispatch({
        type: IS_FOLLOW_BTN_CLICK
      });
      const url = `${BASE_URL}users/unfollow`;
      const headers = {
        token
      };
      let { data } = await axios.put(
        url,
        {
          userId,
          userToUnfollow
        },
        { headers }
      );
      console.log("yea", data);
      dispatch({
        type: IS_FOLLOW_SUCCESS
      });
      Toast.showToast("unFollow  successfull");
    } catch (e) {
      console.log(e);
      dispatch({
        type: IS_FOLLOW_SUCCESS
      });
      Toast.showToast(e.response.data);
    }
  };
};
