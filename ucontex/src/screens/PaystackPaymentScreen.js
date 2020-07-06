import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Form,
  Content,
  Label,
  Input,
  Item,
  Button,
  Picker,
  Icon,
  Header,
  Left,
  Right,
  Body,
  CheckBox,
  ListItem,
} from 'native-base';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import RNPaystack from 'react-native-paystack';
import {STATUS_BAR} from '../config';

import {createContestFormField, handleContestPayment} from '../actions';

import {colour} from '../config';
import {Toast} from '../service';

class PaystackPaymentScreen extends Component {
  state = {isProcessing: false};
  chargeCard() {
    const {
      cvc,
      cardNumber,
      expiryMonth,
      expiryYear,
      totalAmount,
      userData,
    } = this.props;
    this.setState({isProcessing: true});
    RNPaystack.chargeCard({
      cardNumber,
      expiryMonth,
      expiryYear,
      cvc,
      email: userData.data.userData.email,
      amountInKobo: totalAmount * 100,
    })
      .then(response => {
        console.log(response); // do stuff with the token
        this.setState({isProcessing: false}, () => {
          this.props.handleContestPayment(response.reference, () => {
            this.props.navigation.navigate('ProcessingCreateContest');
          });
        });
        Toast.showToast('Payment is successful.');
      })
      .catch(error => {
        console.log(error); // error is a javascript Error object
        console.log(error.message);
        console.log(error.code);
        this.setState({isProcessing: false});
        Alert.alert('Payment Info', error.message);
      });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Spinner
          visible={this.state.isProcessing}
          color="#ffffff"
          textContent="Processing..."
          overlayColor="rgba(0, 0, 0, 0.7)"
          textStyle={{color: '#ffffff'}}
        />
        <Header
          style={{
            //marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
            backgroundColor: '#fff',
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOffset: {width: 0, height: 1},
            shadowRadius: 3,
            elevation: 3,
            borderBottomWidth: 1,
            borderBottomColor: '#fafafb',
          }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{color: '#44a4f7'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '500',
                color: colour.MAIN_COLOR,
              }}>
              Payment
            </Text>
          </Body>
          <Right>
            <Button transparent onPress={this.chargeCard.bind(this)}>
              <Text style={{color: '#44a4f7'}}>Pay</Text>
            </Button>
          </Right>
        </Header>
        <KeyboardAwareScrollView
          style={{backgroundColor: '#4c69a5'}}
          resetScrollToCoords={{x: 0, y: 0}}
          contentContainerStyle={styles.containerStyles}
          scrollEnabled={true}
          enableOnAndroid>
          <View style={styles.titleContainerStyle}>
            <Text style={{color: '#44a4f7'}}>
              Funds are kept in Escrow account only to be released to the
              winners of the contest.
            </Text>
            <TouchableOpacity style={{alignSelf: 'flex-start'}}>
              <Text style={{color: '#44a4f7'}}>Read more...</Text>
            </TouchableOpacity>
          </View>
          <Form>
            <Item floatingLabel style={styles.inputStyle} error>
              <Label>Card Number</Label>
              <Input
                keyboardType="numeric"
                onChangeText={text =>
                  this.props.createContestFormField({
                    prop: 'cardNumber',
                    value: text,
                  })
                }
                value={this.props.cardNumber}
              />
            </Item>
            <Item floatingLabel style={styles.inputOtherStyle}>
              <Label>Expiry Month</Label>
              <Input
                keyboardType="numeric"
                maxLength={2}
                placeholder="01"
                onChangeText={text =>
                  this.props.createContestFormField({
                    prop: 'expiryMonth',
                    value: text,
                  })
                }
                value={this.props.expiryMonth}
              />
              {/* {showErrorLnameIcon} */}
            </Item>
            <Item floatingLabel style={styles.inputOtherStyle}>
              <Label>Expiry Year</Label>
              <Input
                keyboardType="numeric"
                maxLength={2}
                placeholder="20"
                onChangeText={text =>
                  this.props.createContestFormField({
                    prop: 'expiryYear',
                    value: text,
                  })
                }
                value={this.props.expiryYear}
              />
              {/* {showErrorLnameIcon} */}
            </Item>
            <Item floatingLabel style={styles.inputOtherStyle}>
              <Label>CVC</Label>
              <Input
                keyboardType="numeric"
                maxLength={3}
                placeholder="899"
                onChangeText={text =>
                  this.props.createContestFormField({
                    prop: 'cvc',
                    value: text,
                  })
                }
                value={this.props.cvc}
              />
              {/* {showErrorLnameIcon} */}
            </Item>
            <Item floatingLabel style={styles.inputOtherStyle}>
              <Label>Amount</Label>
              <Input editable={false} value={this.props.totalAmount} />
            </Item>
            <ListItem
              floatingLabel
              style={[
                styles.inputOtherStyle,
                {borderWidth: 0, borderColor: '#ffffff'},
              ]}>
              <CheckBox color="#44a4f7" />
              <Body>
                <Text>Save for future use</Text>
              </Body>
            </ListItem>
            <Text style={{color: '#000', fontSize: 15, lineHeight: 20}}>
              By clicking transfer, you accept our financial terms and policies.
            </Text>
            <Button
              block
              style={styles.btnStyle}
              onPress={this.chargeCard.bind(this)}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                Pay
              </Text>
            </Button>
          </Form>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  titleContainerStyle: {
    paddingLeft: '16rem',
    paddingRight: '16rem',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '80rem',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    backgroundColor: '#ffffff',
    elevation: 2,
    marginTop: '10rem',
  },
  containerStyles: {
    // flex: 1,
    backgroundColor: '#fff',
    paddingTop: '7%',
    paddingLeft: '17rem',
    paddingRight: '17rem',
    paddingBottom: '25rem',
  },
  textStyle: {
    color: '#000',
    fontSize: '15rem',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  btnStyle: {
    height: '50rem',
    borderRadius: '2rem',
    backgroundColor: '#44a4f7',
    marginTop: '37rem',
  },
  textContainer: {
    marginBottom: '7rem',
    paddingLeft: '10rem',
  },
  inputStyle: {
    marginBottom: '30rem',
    marginLeft: 0,
    borderColor: '#000',
  },
  inputOtherStyle: {
    marginBottom: '45rem',
    marginLeft: 0,
    borderColor: '#000',
  },
});
const mapStateToProps = ({auth, contest}) => {
  const {userData} = auth;
  const {
    contestMedia,
    title,
    description,
    contestAmount,
    category,
    website,
    awardType,
    otherAwards,
    firstPositionAmount,
    secondPositionAmount,
    thirdPositionAmount,
    totalAmount,
    contestEndDate,
    cardNumber,
    expiryYear,
    expiryMonth,
    cvc,
  } = contest;
  return {
    userData,
    cardNumber,
    expiryYear,
    expiryMonth,
    totalAmount,
    cvc,
  };
};
export default connect(
  mapStateToProps,
  {createContestFormField, handleContestPayment},
)(PaystackPaymentScreen);
