import Moment from 'moment';
import {RNS3} from 'react-native-aws3';
import _ from 'lodash';
import axios from 'axios';

import {
  SELECT_CONTEST_MORE,
  CREATE_CONTEST_MEDIA,
  IS_CREATING_CONTEST,
  CREATE_CONTEST_SUCCESS,
  CREATE_CONTEST_ERROR,
  CHECK_CONTEST_MEDIA_TO_DELETE,
  CONTEST_PAYMENT,
  CLEAR_DROP_DOWN_PROPS,
  CREATE_CONTEST_FORM_FIELD,
  UPDATE_CONTEST_END_DATE,
  DEDUCE_WINNERS_AMOUNT_FROM_TOTAL,
  IS_FETCHING_CONTEST,
  FETCH_CONTEST,
  FETCH_CONTEST_ERROR,
  FETCH_SINGLE_CONTEST,
  FETCH_SINGLE_CONTEST_ERROR,
  IS_FETCHING_SINGLE_CONTEST,
  JOIN_CONTEST,
  FETCH_PARTICIPANTS_SUCCESS,
  IS_FETCHING_PARTICIPANTS,
  FETCH_PARTICIPANTS_ERROR,
  RESET_PARTICIPANTS,
  RESET_CONTEST,
  FETCH_ONGOING_CONTEST,
  FETCH_TRENDING_CONTEST,
  FETCH_CLOSED_CONTEST,
  IS_JOINING_CONTEST,
  FETCH_USER_CONTEST,
} from './types';
import {Toast} from '../service';

import {
  CONTEST_SERVICE_PERCENT,
  BASE_URL,
  ACCESSKEY,
  SECRETKEY,
  SUCCESSACTIONSTATUS,
  REGION,
} from '../config';

export const selectContestMore = item => {
  //console.log("act", mediaItem);
  return {
    type: SELECT_CONTEST_MORE,
    payload: 'drop' + item,
  };
};
export const clearDropdownProps = () => {
  //console.log("act", mediaItem);
  return {
    type: CLEAR_DROP_DOWN_PROPS,
  };
};

export const chooseContestMedia = media => {
  return {
    type: CREATE_CONTEST_MEDIA,
    payload: media,
  };
};

export const checkContestImageToDelete = ({showDeleteBtn, index}) => {
  //alert(index);
  return {
    type: CHECK_CONTEST_MEDIA_TO_DELETE,
    payload: {showDeleteBtn, index},
  };
};

export const createContestFormField = ({prop, value}) => {
  return {
    type: CREATE_CONTEST_FORM_FIELD,
    payload: {prop, value},
  };
};
export const createContestNextHander = (data, callback) => {
  return dispatch => {
    if (data.title === '') {
      Toast.showToast('Contest name must be entered');
    } else if (data.category === '') {
      Toast.showToast('Contest category must be selected');
    } else if (data.description === '') {
      Toast.showToast('Contest description must be entered');
    } else if (data.awardType === '') {
      Toast.showToast('Award type must be selected');
    } else if (data.contestAmount === '' || data.contestAmount < 100) {
      Toast.showToast('Contest amount must be entered');
    } else {
      const contestEndDate = Moment().add(1, 'months');
      dispatch({type: UPDATE_CONTEST_END_DATE, payload: contestEndDate});
      callback();
    }
  };
};
export const onEnterContestAmount = (
  amount,
  firstPositionPercent,
  secondPositionPercent,
  thirdPositionPercent,
) => {
  const amountT = parseInt(amount);

  const serviceCharge = CONTEST_SERVICE_PERCENT * amountT;
  const deduceWinnerAmount = amountT - serviceCharge;
  const firstPositionAmount =
    (parseInt(firstPositionPercent) / 100) * deduceWinnerAmount;
  const secondPositionAmount =
    (parseInt(secondPositionPercent) / 100) * deduceWinnerAmount;
  const thirdPositionAmount =
    (parseInt(thirdPositionPercent) / 100) * deduceWinnerAmount;
  return {
    type: DEDUCE_WINNERS_AMOUNT_FROM_TOTAL,
    payload: {
      amount,
      deduceWinnerAmount,
      firstPositionAmount,
      secondPositionAmount,
      thirdPositionAmount,
      firstPositionPercent,
      secondPositionPercent,
      thirdPositionPercent,
    },
  };
};

export const handleContestPayment = (transId, callback) => {
  return dispatch => {
    console.log('transdd', transId);
    dispatch({type: CONTEST_PAYMENT, payload: transId});
    callback();
  };
};

export const createContest = (datax, callback) => {
  return dispatch => {
    //good to go
    //dispatch({ type: IS_CREATING_CONTEST });
    const config = {
      keyPrefix: 'createContest/',
      bucket: 'ucontex-profile-bucket',
      region: REGION,
      accessKey: ACCESSKEY,
      secretKey: SECRETKEY,
      successActionStatus: SUCCESSACTIONSTATUS,
      //acl: "public-write"
    };

    console.log('databbbb', datax);

    const uniqueImageName =
      Math.floor(100000 + Math.random() * 900000) + Date.now();

    const url = `${BASE_URL}contest?userId=${datax.userId}`;
    const headers = {
      //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      token: datax.token,
    };

    if (datax.contestMedia.length > 0) {
      //user post images
      let imageSourceArray = datax.contestMedia.map((pic, index) => {
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
            // dispatch({
            //   type: CREATE_POST_ERROR
            // });
          }
          if (
            imageRefArray.length > 0 &&
            imageSourceArray.length === imageRefArray.length
          ) {
            console.log(
              'uurrr',
              datax.userId,
              datax.transId,
              datax.contestEndDate,
              imageRefArray,
              url,
            );
            //send images and userdata to the server
            // const url = `${BASE_URL}contest`;
            // const headers = {
            //   token: token
            // };

            let {data} = await axios.post(
              url,
              {
                images: imageRefArray,
                userId: datax.userId,
                description: datax.description,
                name: datax.title,
                category: datax.category,
                website: datax.website,
                awardType: datax.awardType,
                totalAmount: datax.totalAmount,
                winnersCount: 0,
                otherAwards: datax.otherAwards,
                firstPositionAmount: datax.firstPositionAmount,
                secondPositionAmount: datax.secondPositionAmount,
                thirdPositionAmount: datax.thirdPositionAmount,
                firstPositionPercent: 40,
                secondPositionPercent: 20,
                thirdPositionPercent: 10,
                amount: datax.contestAmount,
                endDate: datax.contestEndDate,
                transactionRef: datax.transId,
              },
              {headers},
            );
            console.log('contest data', data);

            dispatch({type: CREATE_CONTEST_SUCCESS, payload: data.data});
            //  Toast.showToast("Contest is successful");
            callback();
          }
        } catch (err) {
          console.log('erroress', err.response.data);
          Toast.showToast(JSON.stringify(err.response.data));
          dispatch({
            type: CREATE_CONTEST_ERROR,
            payload: JSON.stringify(err.response.data),
          });
          //dispatch({ type: CREATE_POST_ERROR, payload: err.response.data });
          //console.log(e);
        }
      });
    } else {
      //user did not post with images

      let {data} = axios
        .post(
          url,
          {
            userId: datax.userId,
            description: datax.description,

            category: datax.category,
            website: datax.website,

            awardType: datax.awardType,
            totalAmount: datax.totalAmount,
            winnersCount: 0,
            otherAwards: datax.otherAwards,
            firstPositionAmount: datax.firstPositionAmount,
            secondPositionAmount: datax.secondPositionAmount,
            thirdPositionAmount: datax.thirdPositionAmount,
            firstPositionPercent: 40,
            secondPositionPercent: 20,
            thirdPositionPercent: 10,
            amount: datax.contestAmount,
            endDate: datax.contestEndDate,
            transactionRef: datax.transId,
          },
          {headers},
        )
        .then(({data}) => {
          console.log('contest data', data);

          dispatch({type: CREATE_CONTEST_SUCCESS, payload: data.data});
          // Toast.showToast("Create post is successful");
          //  Toast.showToast("Contest is successful");
          callback();
        })
        .catch(err => {
          dispatch({type: CREATE_CONTEST_ERROR, payload: err.response.data});
          Toast.showToast('eroors', err.response.data);
        });
    }
  };
};

export const fetchContest = ({token, userId, page, status}) => {
  return async dispatch => {
    try {
      dispatch({type: IS_FETCHING_CONTEST});
      const url = `${BASE_URL}contest`;

      // console.log("jkkkjkjk");
      // console.log("url", token);
      const headers = {
        token,
      };
      let {data} = await axios.get(url, {
        params: {userId, page, status},
        headers,
      });
      console.log('contest datasd', data, status);

      if (status === 1) {
        dispatch({
          type: FETCH_ONGOING_CONTEST,
          payload: {
            contests: data.contests,
            page,
            status,
            totalContests: data.totalContests,
            totalClosedContests: data.totalClosedContests,
            totalOngoingContests: data.totalOngoingContests,
          },
        });
      } else if (status === 2) {
        dispatch({
          type: FETCH_CLOSED_CONTEST,
          payload: {
            contests: data.contests,
            page,
            status,
            totalContests: data.totalContests,
            totalClosedContests: data.totalClosedContests,
            totalOngoingContests: data.totalOngoingContests,
          },
        });
      } else if (status === 3) {
        dispatch({
          type: FETCH_TRENDING_CONTEST,
          payload: {
            contests: data.contests,
            page,
            status,
            totalContests: data.totalContests,
            totalClosedContests: data.totalClosedContests,
            totalOngoingContests: data.totalOngoingContests,
          },
        });
      } else {
        dispatch({
          type: FETCH_CONTEST,
          payload: {
            contests: data.contests,
            page,
            status,
            totalContests: data.totalContests,
            totalClosedContests: data.totalClosedContests,
            totalOngoingContests: data.totalOngoingContests,
          },
        });
      }
    } catch (e) {
      console.log(e);
      Toast.showToast(JSON.stringify(e.response.data));
      dispatch({type: FETCH_CONTEST_ERROR});
    }
  };
};

export const fetchSingleContest = ({contestId, userId, token}) => {
  return async dispatch => {
    try {
      dispatch({type: IS_FETCHING_SINGLE_CONTEST});
      const url = `${BASE_URL}contest/${contestId}`;

      // console.log("jkkkjkjk");
      console.log('url', url, token);
      const headers = {
        token,
      };
      let {data} = await axios.get(url, {
        params: {userId},
        headers,
      });
      //console.log("contest datasd", data);

      dispatch({type: FETCH_SINGLE_CONTEST, payload: data.contest});
    } catch (e) {
      console.log(e);
      Toast.showToast(JSON.stringify(e.response.data));
      dispatch({type: FETCH_SINGLE_CONTEST_ERROR});
    }
  };
};

export const handleJoinContest = ({contestId, userId, token}, callback) => {
  return async dispatch => {
    try {
      dispatch({type: IS_JOINING_CONTEST});
      const url = `${BASE_URL}contest/${contestId}/join`;

      // console.log("jkkkjkjk");
      console.log(url, token, contestId, userId);
      const headers = {
        token,
      };
      let {data} = await axios.put(url, {userId}, {headers});
      console.log('datacom', data);
      dispatch({type: JOIN_CONTEST});
      Toast.showToast('You have successfull join this contest');
      callback();
    } catch (e) {
      console.log('error', e);
      //Toast.showToast(JSON.stringify(e.response.data));
      dispatch({type: JOIN_CONTEST});
      Toast.showToast(JSON.stringify(e.response.data));
    }
  };
};

export const fetchParticipants = ({
  contestId,
  userId,
  token,
  pageParticipant,
}) => {
  return async dispatch => {
    try {
      dispatch({type: IS_FETCHING_PARTICIPANTS});
      const url = `${BASE_URL}contest/${contestId}/contestants`;

      // console.log("jkkkjkjk");
      console.log('url', url, token);
      const headers = {
        token,
      };
      let {data} = await axios.get(url, {
        params: {userId, page: pageParticipant},
        headers,
      });
      console.log('contest datasd', data);

      dispatch({type: FETCH_PARTICIPANTS_SUCCESS, payload: data.contestants});
    } catch (e) {
      console.log(e);
      Toast.showToast(JSON.stringify(e.response.data));
      dispatch({type: FETCH_PARTICIPANTS_ERROR});
    }
  };
};

export const resetParticipants = () => {
  return {type: RESET_PARTICIPANTS};
};
export const resetContest = () => {
  return {type: RESET_CONTEST};
};

export const fetchUsersContest = ({userId, token, authUser, page}) => {
  return async dispatch => {
    try {
      dispatch({type: IS_FETCHING_CONTEST});
      const url = `${BASE_URL}users/${userId}/contests`;

      // console.log("jkkkjkjk");
      console.log('testt', url, userId, token, authUser);
      const headers = {
        token,
      };
      let {data} = await axios.get(url, {
        params: {userId: authUser, page, status: 10},
        headers,
      });
      // let { data } = await axios.get(url, {
      //   params: { user: userId },
      //   headers
      // });
      console.log('usersposts', data);

      dispatch({type: FETCH_USER_CONTEST, payload: data.contests});
    } catch (e) {
      console.log('error123', e);
      //Toast.showToast(JSON.stringify(e.response.data));
      //dispatch({ type: CREATE_POST_ERROR });
    }
  };
};
