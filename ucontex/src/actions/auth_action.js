import _ from 'lodash';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {Toast} from '../service';

import {
  SIGNUP_FORM_FIELDS,
  FORM_ERROR,
  VALIDATE_EMAIL_SUCCESS,
  ERROR_EMAIL,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  IS_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_EMAIL_ERROR,
  IS_LOGIN_LOADING,
  CONFIRM_EMAIL_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
  UPDATE_AUTH_USER,
  LOGOUT,
} from './types';

import {BASE_URL} from '../config';

export const signUpFormField = ({prop, value}) => {
  return {
    type: SIGNUP_FORM_FIELDS,
    payload: {prop, value},
  };
};

//this action creator checks if a field exist
// export const checkFieldExist = ({ prop, value }) => {
//   return async dispatch => {
//     try {
//       dispatch({ type: SIGNUP_FORM_FIELDS, payload: { prop, value } });
//
//       const url = `${BASE_URL}users/check-detail-availability`;
//       let { data } = await axios.post(url, {
//         field: prop,
//         value
//       });
//       //const { data:response } = data;
//       if (prop == "email") {
//         if (validateEmail(value)) {
//           dispatch({ type: SIGNUP_EMAIL_SUCCESS, payload: "Email is valid" });
//           if (prop == "email" && data.data == "available") {
//             dispatch({
//               type: SIGNUP_EMAIL_SUCCESS,
//               payload: "Email is available"
//             });
//           } else {
//             dispatch({ type: SIGNUP_EMAIL_ERROR, payload: "Email is taken" });
//           }
//         } else {
//           dispatch({ type: SIGNUP_EMAIL_ERROR, payload: "Email is not valid" });
//         }
//       }
//       if (prop == "phone" && value.length > 5 && data.data == "available") {
//         dispatch({
//           type: SIGNUP_PHONE_SUCCESS,
//           payload: "Phone number is available"
//         });
//         console.log("act_suc");
//       } else if (
//         prop == "phone" &&
//         value.length > 5 &&
//         data.data !== "available"
//       ) {
//         dispatch({
//           type: SIGNUP_PHONE_ERROR,
//           payload: "Phone number is taken"
//         });
//         console.log("act_fal");
//       }
//       if (prop == "username" && value.length > 2 && data.data == "available") {
//         dispatch({
//           type: SIGNUP_USERNAME_SUCCESS,
//           payload: "Username is available"
//         });
//       } else if (
//         prop == "username" &&
//         value.length > 2 &&
//         data.data !== "available"
//       ) {
//         dispatch({
//           type: SIGNUP_USERNAME_ERROR,
//           payload: "Username is taken"
//         });
//       }
//       //console.log(response.data);
//     } catch (e) {
//       console.log(e.data);
//     }
//   };
// };

export const nextButtonClick = (
  {firstName, lastName, gender, dateOfBirth},
  callback,
) => {
  if (firstName == '') {
    console.log(firstName);
    Toast.showToast('First name must be filled!');
    return {
      type: SIGNUP_FAILED,
      payload: 'First name must be filled!',
    };
  } else if (lastName == '') {
    Toast.showToast('Last name must be filled!');
    return {
      type: SIGNUP_FAILED,
      payload: 'Last name must be filled!',
    };
  } else if (gender == '') {
    Toast.showToast('Gender must be filled!');
    return {
      type: SIGNUP_FAILED,
      payload: 'Gender must be filled!',
    };
  } else if (dateOfBirth == '') {
    Toast.showToast('Date of birth must be filled!');
    return {
      type: SIGNUP_FAILED,
      payload: 'Date of birth must be filled!',
    };
  } else {
    callback();
    return {
      type: SIGNUP_FAILED,
      payload: null,
    };
  }
};

export const validateEmail = text => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {
    console.log('Email is Not Correct');
    return false;
  } else {
    return true;
  }
  // else {
  //   console.log("Email is Correct");
  //   return {
  //     type: VALIDATE_EMAIL_SUCCESS,
  //     payload: text
  //   };
  // }
};

export const proccessAsyncAuth = (tokenUser, callback) => {
  return dispatch => {
    //  console.log("asynctoken", tokenUser);
    dispatch({type: SIGNUP_SUCCESS, payload: tokenUser});
    dispatch({type: UPDATE_AUTH_USER, payload: tokenUser});
    callback();
  };
};
export const signUpUser = (
  {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    password,
    phone,
    isphoneValid,
  },
  callback,
) => {
  return async dispatch => {
    try {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      let userToken = await AsyncStorage.getItem('user');
      if (userToken) {
        dispatch({type: SIGNUP_SUCCESS, payload: userToken});
        dispatch({type: UPDATE_AUTH_USER, payload: userToken});
      } else {
        if (phone === '' || email === '' || password === '') {
          Toast.showToast('All fields must be filled!');
          dispatch({
            type: SIGNUP_FAILED,
            payload: 'All fields must be filled!',
          });
        } else if (password.length < 4) {
          Toast.showToast('Password length must not be less than 6');
          dispatch({
            type: SIGNUP_FAILED,
            payload: 'Password length must not be less than 6',
          });
        } else if (!isphoneValid) {
          Toast.showToast('Phone number is invalid');
          dispatch({
            type: SIGNUP_FAILED,
            payload: 'Phone number is invalid',
          });
        } else if (reg.test(email.trim()) === false) {
          Toast.showToast('Oops!!! Email format is incorrect');
          dispatch({
            type: SIGNUP_FAILED,
            payload: 'Oops!!! Email format is incorrect',
          });
        } else {
          dispatch({type: IS_LOADING});
          const url = `${BASE_URL}signup`;
          //console.log(url);
          let {data} = await axios.post(url, {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            gender: gender,
            email: email.trim(),
            password: password,
            phone: phone,
          });
          //console.log("fff");
          console.log('success');
          console.log('signup', data, data.data.token);
          //await AsyncStorage.setItem("user", JSON.stringify(data));
          dispatch({type: SIGNUP_SUCCESS, payload: data});
          //dispatch({ type: UPDATE_AUTH_USER, payload: data });
          callback();
          // console.log("success");
          // console.log(data, data.token);
        }
      }
    } catch (err) {
      console.log('ed', err);
      Toast.showToast(err.response.data.error);
      dispatch({type: SIGNUP_FAILED, payload: err.response.data.error});
      console.log('error');
      console.log(err.response.data);
    }
  };
};

export const loginUser = ({email, password}, callback) => {
  return async dispatch => {
    try {
      // let userToken = await AsyncStorage.getItem("user");
      // if (userToken) {
      //   dispatch({ type: LOGIN_SUCCESS, payload: userToken });
      // } else {
      if (email === '') {
        Toast.showToast('Email or Username cannot be empty!');
        // dispatch({
        //   type: LOGIN_EMAIL_ERROR,
        //   payload: "Email or Username cannot be empty!"
        // });
      } else if (password === '') {
        Toast.showToast('Password cannot be empty!');
        // dispatch({
        //   type: LOGIN_PASSWORD_ERROR,
        //   payload: "Password cannot be empty!"
        // });
      } else {
        dispatch({type: IS_LOGIN_LOADING});
        const url = `${BASE_URL}signin`;
        let {data} = await axios.post(url, {
          emailOrPhone: email,
          password,
        });

        if (data.ERR_CODE == 'ERR_USER_NOT_FOUND') {
          Toast.showToast(data.error);
          dispatch({type: LOGIN_EMAIL_ERROR, payload: data.error});
        } else if (data.ERR_CODE == 'ERR_INCORRECT_PASSWORD') {
          Toast.showToast(data.error);
          dispatch({type: LOGIN_PASSWORD_ERROR, payload: data.error});
        } else {
          //  console.log("login", data);
          //let value = await AsyncStorage.setItem("user", JSON.stringify(data));
          dispatch({type: LOGIN_SUCCESS, payload: data});
          //  dispatch({ type: UPDATE_AUTH_USER, payload: data });
          callback();
        }
        // if (response.d == 200) {
        //   //store token
        //   AsyncStorage.setItem("userToken", response.data.token);
        //   dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        //   callback();
        // } else {
        //   dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        // }
      }
    } catch (err) {
      console.log(err);
      // const err = typeof e.response.data === "undefined" ? e : e.response.data;
      dispatch({type: LOGIN_FAILED, payload: JSON.stringify(err)});
      Toast.showToast(JSON.stringify(err));
    }
  };
};

export const confirmEmail = ({userId, verifyCode, token}, callback) => {
  return async dispatch => {
    try {
      console.log('code' + verifyCode);
      dispatch({type: IS_LOADING});
      if (verifyCode === '') {
        dispatch({
          type: SIGNUP_FAILED,
          payload: 'Field cannot be empty',
        });
      } else {
        const url = `${BASE_URL}users/confirm-email`;
        const headers = {
          token,
        };
        let {data} = await axios.post(
          url,
          {
            userId,
            token: verifyCode,
          },
          {headers},
        );
        console.log(data);
        Toast.showToast('Email verification is successful');
        dispatch({
          type: CONFIRM_EMAIL_SUCCESS,
          payload: 'Email verification is successful!',
        });
        callback();
      }
    } catch (err) {
      console.log(err.response.data);
      Toast.showToast(err.response.data.error);
      dispatch({type: SIGNUP_FAILED, payload: err.response.data.error});
    }
  };
};

export const resendVerificationCode = ({userId, token}) => {
  return async dispatch => {
    try {
      dispatch({type: IS_LOADING});

      const url = `${BASE_URL}users/resend-token`;
      const headers = {
        token,
      };
      let {data} = await axios.post(
        url,
        {
          userId,
        },
        {headers},
      );
      console.log(data);
      Toast.showToast(data.data);
      dispatch({
        type: CONFIRM_EMAIL_SUCCESS,
        payload: data.data,
      });
    } catch (err) {
      console.log('eb', err.response.data);
      Toast.showToast(err.response.data);
      dispatch({type: SIGNUP_FAILED, payload: err.response.data});
    }
  };
};

export const logout = () => {
  return {type: LOGOUT};
};
