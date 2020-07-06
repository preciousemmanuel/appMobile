import React, {Component} from 'react';
import {View, Text, ScrollView, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
} from 'native-base';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {STATUS_BAR} from '../config';

import {signUpFormField, nextButtonClick} from '../actions';

import {colour} from '../config';

class FundTransferBankScreen extends Component {
  static navigationOptions = {
    title: 'Fund Transfer',
  };

  onHandlePress() {
    const {firstName, lastName, gender, dateOfBirth} = this.props;
    this.props.nextButtonClick(
      {firstName, lastName, gender, dateOfBirth},
      () => {
        this.props.navigation.navigate('CompleteSignUp');
      },
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          style={{
            marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
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
                fontSize: 15,
                fontWeight: '500',
                color: colour.MAIN_COLOR,
              }}>
              Fund Transfer
            </Text>
          </Body>
        </Header>
        <KeyboardAwareScrollView
          style={{backgroundColor: '#4c69a5'}}
          resetScrollToCoords={{x: 0, y: 0}}
          contentContainerStyle={styles.containerStyles}
          scrollEnabled={true}
          enableOnAndroid>
          <Form>
            <Item floatingLabel style={styles.inputStyle} error>
              <Label>Bank Name</Label>
              <Input
                onChangeText={text =>
                  this.props.signUpFormField({prop: 'firstName', value: text})
                }
                value={this.props.firstName}
              />
            </Item>
            <Item floatingLabel style={styles.inputOtherStyle}>
              <Label>Account No.</Label>
              <Input
                onChangeText={text =>
                  this.props.signUpFormField({prop: 'lastName', value: text})
                }
                value={this.props.lastName}
              />
              {/* {showErrorLnameIcon} */}
            </Item>
            <Item floatingLabel style={styles.inputOtherStyle}>
              <Label>Amount</Label>
              <Input
                onChangeText={text =>
                  this.props.signUpFormField({prop: 'lastName', value: text})
                }
                value={this.props.lastName}
              />
              {/* {showErrorLnameIcon} */}
            </Item>
            <Item floatingLabel style={styles.inputOtherStyle}>
              <Label>Add Note</Label>
              <Input
                onChangeText={text =>
                  this.props.signUpFormField({prop: 'lastName', value: text})
                }
                value={this.props.lastName}
              />
              {/* {showErrorLnameIcon} */}
            </Item>
            <Item floatingLabel style={styles.inputOtherStyle}>
              <Label>Transaction Password</Label>
              <Input
                onChangeText={text =>
                  this.props.signUpFormField({prop: 'lastName', value: text})
                }
                value={this.props.lastName}
              />
              {/* {showErrorLnameIcon} */}
            </Item>

            <Text style={{color: '#000', fontSize: 15, lineHeight: 20}}>
              By clicking transfer, you accept our financial terms and policies.
            </Text>

            <Button
              block
              style={styles.btnStyle}
              onPress={this.onHandlePress.bind(this)}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                Transfer
              </Text>
            </Button>
          </Form>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
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
const mapStateToProps = ({auth}) => {
  const {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    loading,
    signupFormError,
  } = auth;
  return {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    loading,
    signupFormError,
  };
};
export default connect(
  mapStateToProps,
  {signUpFormField, nextButtonClick},
)(FundTransferBankScreen);
