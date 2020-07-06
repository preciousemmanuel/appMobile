import {
  SHOW_LOVE_X_ICON,
  IS_REACTING,
  REACTION_SUCCESS,
  REACTION_ERROR,
  UNDO_SHOW_LOVE_X_ICON,
} from '../actions/types';

const INITIAL_STATE = {
  showLoveExpressionPostIndex: null,
  isReacting: false,
  reaction: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_LOVE_X_ICON:
      //console.log("red", action.payload);
      //alert(...action.payload);
      return {...state, showLoveExpressionPostIndex: action.payload};
      break;
    case UNDO_SHOW_LOVE_X_ICON:
      //console.log("red", action.payload);
      //alert(...action.payload);
      return {...state, showLoveExpressionPostIndex: null};
      break;
    case IS_REACTING:
      //console.log("red", action.payload);
      //alert(...action.payload);
      return {...state, isReacting: true};
      break;
    case REACTION_SUCCESS:
      //console.log("red", action.payload);
      //alert(...action.payload);
      return {
        ...state,
        isReacting: false,
        showLoveExpressionPostIndex: null,
        reaction: action.payload,
      };
      break;
    case REACTION_ERROR:
      //console.log("red", action.payload);
      //alert(...action.payload);
      return {...state, isReacting: false, reaction: {}};
      break;

    default:
      return state;
  }
};
