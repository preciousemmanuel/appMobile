import React, {Component} from 'react';
import {
  Text,
  View,
  Platform,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Textarea,
  Item,
  Picker,
  DatePicker,
  Right,
  ListItem,
  Label,
  Form,
  Input,
  Container,
  Content,
} from 'native-base';

import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
// import Moment from "moment";
//import Rave from 'react-native-rave';

import {Toast} from '../service';
import {handleContestPayment} from '../actions';

class FlutterWavePaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onSuccess(data) {
    console.log('success', data);
    // You can get the transaction reference from successful transaction charge response returned and handle your transaction verification here
    // const contestEndDate = Moment().add("months", 1);

    if (typeof data.data == 'object') {
      if (typeof data.data.txRef != 'undefined') {
        this.props.handleContestPayment(data.data.txRef, () => {
          this.props.navigation.navigate('ProcessingCreateContest');
        });
      } else {
        //  fetchResponse(data.data.tx.txRef);
        this.props.handleContestPayment(data.data.tx.txRef, () => {
          this.props.navigation.navigate('ProcessingCreateContest');
        });
      }
    } else {
      this.props.handleContestPayment(data.txRef, () => {
        this.props.navigation.navigate('ProcessingCreateContest');
      });
    }
  }

  onFailure(data) {
    console.log('error', data);

    if (typeof data.data.txRef != 'undefined') {
      this.props.handleContestPayment(data.data.txRef, () => {
        this.props.navigation.navigate('ProcessingCreateContest');
      });
    } else {
      //  fetchResponse(data.data.tx.txRef);
      Toast.showToast(data.message);
    }
  }

  onClose() {
    //navigate to the desired screen on rave close
    this.props.navigation.navigate('PreviewCreateContest');
  }

  render() {
    //console.log("gethjhj", this.props.selectedMedia);

    //const { userData } = this.props.userData.data;

    return (
      <View />
      // <Rave
      //   amount={this.props.totalAmount}
      //   country="NG"
      //   currency="NGN"
      //   email={this.props.userData.data.userData.email}
      //   firstname={this.props.userData.data.userData.firstName}
      //   lastname={this.props.userData.data.userData.lastName}
      //   publickey="FLWPUBK-afbac421536c965c2e3baa208f0fecf8-X"
      //   encryptionkey="fff60104b32dacd69fd12006"
      //   // meta={[
      //   //   { metaname: "color", metavalue: "red" },
      //   //   { metaname: "storelocation", metavalue: "ikeja" }
      //   // ]}
      //   production={false}
      //   onSuccess={res => this.onSuccess(res)}
      //   onFailure={e => this.onFailure(e)}
      //   onClose={e => this.onClose(e)}
      // />
    );
  }
}

const styles = EStyleSheet.create({});

const mapStateToProps = ({profileSetup, auth, contest}) => {
  const {
    contestMedia,
    title,
    description,
    contestAmount,
    category,
    gender,
    website,
    awardType,
    otherAwards,
    firstPositionAmount,
    secondPositionAmount,
    thirdPositionAmount,
    totalAmount,
    contestEndDate,
  } = contest;
  const {userData} = profileSetup;
  const {userId, token} = auth;

  return {
    userData,
    contestEndDate,
    contestMedia,
    title,
    description,
    contestAmount,
    category,
    gender,
    website,
    awardType,
    otherAwards,
    firstPositionAmount,
    secondPositionAmount,
    thirdPositionAmount,
    totalAmount,
    userId,
    token,
  };
};
export default connect(
  mapStateToProps,
  {handleContestPayment},
)(FlutterWavePaymentScreen);
