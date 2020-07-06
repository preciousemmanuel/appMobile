import {Dimensions} from 'react-native';

export const BASE_URL = 'https://ucontex.herokuapp.com/';
//export const BASE_URL = 'http://192.168.1.102:1337/';
//amazon s3 config details
export const REGION = 'us-east-1';
export const ACCESSKEY = 'AKIAIPEE55LM3MKTQDWQ';
export const SECRETKEY = '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';
export const SUCCESSACTIONSTATUS = 201;
export const SCHEDULE_PROFILE_TIME = {
  USE_ALL: 'USE_ALL',
  EVERY_HOUR: 'EVERY_HOUR',
  EVERY_DAY: 'EVERY_DAY',
  EVERY_WEEK: 'EVERY_WEEK',
  STATIC: 'STATIC',
};
export const FORMAT_NUM_VALUES = value => {
  if (value >= 1000000) {
    value = value / 1000000 + 'M';
  } else if (value >= 1000) {
    value = value / 1000 + 'K';
  }
  return value;
};

export const CONTEST_SERVICE_PERCENT = 0.3;

export const CONTEST_STATUS = {
  ONGOING: 1,
  CLOSED: 2,
  TRENDING: 3,
};

export const colour = {
  MAIN_COLOR: '#44a4f7',
};

export const HITSLOP = {top: 40, bottom: 40, left: 40, right: 40};

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const STATUS_BAR = 20;
