import {
  SELECT_CONTEST_MORE,
  CLEAR_DROP_DOWN_PROPS,
  CHECK_CONTEST_MEDIA_TO_DELETE,
  CONTEST_PAYMENT,
  IS_CREATING_CONTEST,
  CREATE_CONTEST_ERROR,
  //RESET_CREATE_POST_FIELDS,
  CREATE_CONTEST_FORM_FIELD,
  DEDUCE_WINNERS_AMOUNT_FROM_TOTAL,
  CREATE_CONTEST_MEDIA,
  UPDATE_CONTEST_END_DATE,
  CREATE_CONTEST_SUCCESS,
  IS_FETCHING_CONTEST,
  FETCH_CONTEST,
  FETCH_CONTEST_ERROR,
  FETCH_SINGLE_CONTEST,
  FETCH_SINGLE_CONTEST_ERROR,
  IS_FETCHING_SINGLE_CONTEST,
  JOIN_CONTEST,
  IS_FETCHING_PARTICIPANTS,
  FETCH_PARTICIPANTS_SUCCESS,
  FETCH_PARTICIPANTS_ERROR,
  RESET_PARTICIPANTS,
  RESET_CONTEST,
  FETCH_ONGOING_CONTEST,
  FETCH_TRENDING_CONTEST,
  FETCH_CLOSED_CONTEST,
  IS_JOINING_CONTEST,
  FETCH_USER_CONTEST,
} from '../actions/types';

const INITIAL_STATE = {
  // showDropdownItem: null,
  contestMedia: [],
  errorMsg: null,
  showDeleteBtn: false,
  index: null,
  category: '',
  description: '',
  title: '',
  gender: '',
  website: '',
  awardType: 'cash',
  contestAmount: 0.0,
  otherAwards: '',
  firstPositionAmount: '0.0',
  secondPositionAmount: '0.0',
  thirdPositionAmount: '0.0',
  firstPositionPercent: '40',
  secondPositionPercent: '20',
  thirdPositionPercent: '10',
  totalAmount: '0.0',
  contestEndDate: null,
  isCreateContest: false,
  transId: null,
  contestData: [],
  contestOngoingData: [],
  contestTrendingData: [],
  contestClosedData: [],
  isFetchingAllContest: false,
  page: 1,
  pageParticipant: 1,
  participants: [],
  isFetchingParticipant: false,
  singleContestData: [],
  isFetchingSingleContest: false,
  isJoiningContest: false,
  totalContests: 0,
  totalClosedContests: 0,
  totalOngoingContests: 0,
  contestUserData: [],
  cardNumber: '',
  expiryMonth: '',
  expiryYear: '',
  cvc: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_CONTEST_MORE:
      //console.log("red", action.payload);
      //alert(...action.payload);
      return {showDropdownItem: action.payload};
      break;
    case CLEAR_DROP_DOWN_PROPS:
      return {
        ...state,
        showDropdownItem: null,
      };
      break;

    case CHECK_CONTEST_MEDIA_TO_DELETE:
      return {
        ...state,
        showDeleteBtn: action.payload.showDeleteBtn,
        index: action.payload.index,
      };
    case CREATE_CONTEST_FORM_FIELD:
      //console.log(action.payload);
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };
      break;
    case CREATE_CONTEST_MEDIA:
      return {
        ...state,
        contestMedia: [...action.payload],

        showDeleteBtn: false,
        index: null,
        imageBrowserOpen: false,
      };
      break;
    case DEDUCE_WINNERS_AMOUNT_FROM_TOTAL:
      //console.log(action.payload);
      return {
        ...state,
        totalAmount: action.payload.amount,
        contestAmount: action.payload.deduceWinnerAmount,
        firstPositionAmount: action.payload.firstPositionAmount,
        secondPositionAmount: action.payload.secondPositionAmount,
        thirdPositionAmount: action.payload.thirdPositionAmount,
        firstPositionPercent: action.payload.firstPositionPercent,
        secondPositionPercent: action.payload.secondPositionPercent,
        thirdPositionPercent: action.payload.thirdPositionPercent,
      };
      break;

    case IS_CREATING_CONTEST:
      //console.log(action.payload);
      return {
        ...state,
        isCreateContest: true,
      };
      break;
    case IS_FETCHING_PARTICIPANTS:
      //console.log(action.payload);
      return {
        ...state,
        isFetchingParticipant: true,
      };
      break;
    case IS_JOINING_CONTEST:
      //console.log(action.payload);
      return {
        ...state,
        isJoiningContest: true,
      };
      break;
    case IS_FETCHING_CONTEST:
      //console.log(action.payload);
      return {
        ...state,
        isFetchingAllContest: true,
      };
      break;
    case FETCH_USER_CONTEST:
      //console.log(action.payload);
      return {
        ...state,
        isFetchingAllContest: false,

        contestUserData: [...action.payload],
      };
      break;
    case FETCH_CONTEST:
      //console.log(action.payload);
      return {
        ...state,
        isFetchingAllContest: false,
        page: action.payload.page,
        totalContests: action.payload.totalContests,
        totalOngoingContests: action.payload.totalOngoingContests,
        totalClosedContests: action.payload.totalOngoingContests,
        contestData: [...state.contestData, ...action.payload.contests],
      };
      break;
    case FETCH_ONGOING_CONTEST:
      console.log('red ong', action.payload.contests);
      return {
        ...state,
        isFetchingAllContest: false,
        page: action.payload.page,
        totalContests: action.payload.totalContests,
        totalOngoingContests: action.payload.totalOngoingContests,
        totalClosedContests: action.payload.totalOngoingContests,
        contestOngoingData: [
          ...state.contestOngoingData,
          ...action.payload.contests,
        ],
      };
      break;
    case FETCH_CLOSED_CONTEST:
      //console.log(action.payload);
      return {
        ...state,
        isFetchingAllContest: false,
        page: action.payload.page,
        totalContests: action.payload.totalContests,
        totalOngoingContests: action.payload.totalOngoingContests,
        totalClosedContests: action.payload.totalOngoingContests,
        contestClosedData: [
          ...state.contestClosedData,
          ...action.payload.contests,
        ],
      };
      break;
    case FETCH_TRENDING_CONTEST:
      //console.log(action.payload);
      return {
        ...state,
        isFetchingAllContest: false,
        page: action.payload.page,
        totalContests: action.payload.totalContests,
        totalOngoingContests: action.payload.totalOngoingContests,
        totalClosedContests: action.payload.totalOngoingContests,
        contestTrendingData: [
          ...state.contestTrendingData,
          ...action.payload.contests,
        ],
      };
      break;
    case FETCH_SINGLE_CONTEST:
      //console.log(action.payload);
      return {
        ...state,
        isFetchingSingleContest: false,
        singleContestData: action.payload,
      };
      break;
    case FETCH_CONTEST_ERROR:
      //console.log(action.payload);
      return {
        ...state,
        isFetchingAllContest: false,
      };
      break;
    case JOIN_CONTEST:
      return {
        ...state,
        isJoiningContest: false,
      };
      break;
    case FETCH_SINGLE_CONTEST_ERROR:
      //console.log(action.payload);
      return {
        ...state,
        isFetchingSingleContest: false,
      };
      break;
    case FETCH_PARTICIPANTS_SUCCESS:
      //console.log(action.payload);
      return {
        ...state,
        participants: [...state.participants, ...action.payload],
        isFetchingParticipant: false,
      };
      break;
    case FETCH_PARTICIPANTS_ERROR:
      //console.log(action.payload);
      return {
        ...state,
        isFetchingParticipant: false,
      };
      break;
    case RESET_PARTICIPANTS:
      //console.log(action.payload);
      return {
        ...state,
        participants: [],
      };
      break;
    case RESET_CONTEST:
      return {
        ...state,
        contestData: [],
      };
      break;
    case IS_FETCHING_SINGLE_CONTEST:
      //console.log(action.payload);
      return {
        ...state,
        isFetchingSingleContest: true,
      };
      break;

    case CONTEST_PAYMENT:
      //console.log(action.payload);
      return {
        ...state,
        isCreateContest: true,
        transId: action.payload,
      };
      break;
    case CREATE_CONTEST_SUCCESS:
      //console.log(action.payload);
      return {
        ...state,
        ...INITIAL_STATE,
        contestData: [...action.payload, ...state.contestData],
      };
      break;
    case CREATE_CONTEST_ERROR:
      //console.log(action.payload);
      return {
        ...state,
        isCreateContest: false,
      };
      break;
    case UPDATE_CONTEST_END_DATE:
      //console.log(action.payload);
      return {
        ...state,
        contestEndDate: action.payload,
      };
      break;
    default:
      return state;
  }
};
