import React, {Component} from 'react';
import {View, Text, ScrollView, ToastAndroid} from 'react-native';
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
  DatePicker,
} from 'native-base';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import {signUpFormField, nextButtonClick} from '../actions';

// let showErrorFnameIcon,
//   showErrorLnameIcon,
//   showErrorGenderIcon,
//   showErrorDobIcon;

class SignUpScreen extends Component {
  static navigationOptions = {
    title: 'Create Account',
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
  // renderErrorText() {
  //   if (this.props.formError) {
  //     return (
  //       <Text style={{ color: "red", padding: 5 }}>
  //         All Fields must be filled!
  //       </Text>
  //     );
  //   }
  // }
  // showErrorMsg() {
  //   if (
  //     this.props.signupFormError !== null &&
  //     typeof this.props.signupFormError !== "undefined"
  //   ) {
  //     ToastAndroid.showWithGravityAndOffset(
  //       this.props.signupFormError,
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM,
  //       25,
  //       50
  //     );
  //   }
  // }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        <KeyboardAwareScrollView
          style={{backgroundColor: '#4c69a5'}}
          resetScrollToCoords={{x: 0, y: 0}}
          contentContainerStyle={styles.containerStyles}
          scrollEnabled={true}
          enableOnAndroid>
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>
              Create your account in few steps to join Ucontex community
            </Text>
          </View>
          <Form>
            <Item floatingLabel style={styles.inputStyle} error>
              <Label>First Name</Label>
              <Input
                onChangeText={text =>
                  this.props.signUpFormField({prop: 'firstName', value: text})
                }
                value={this.props.firstName}
              />
            </Item>
            <Item floatingLabel style={styles.inputOtherStyle}>
              <Label>Last Name</Label>
              <Input
                onChangeText={text =>
                  this.props.signUpFormField({prop: 'lastName', value: text})
                }
                value={this.props.lastName}
              />
              {/* {showErrorLnameIcon} */}
            </Item>
            <Item
              // error={this.props.genderSignupError}
              picker
              style={styles.inputOtherStyle}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                //style={{ width: undefined }}
                placeholder="Gender"
                placeholderStyle={{color: '#000'}}
                selectedValue={this.props.gender}
                onValueChange={text =>
                  this.props.signUpFormField({prop: 'gender', value: text})
                }>
                <Picker.Item label="Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
              {/* {showErrorGenderIcon} */}
            </Item>
            <Item error={this.props.dobSignupError} style={styles.inputStyle}>
              <DatePicker
                //defaultDate={new Date(2018, 4, 4)}
                minimumDate={new Date(1800, 1, 1)}
                maximumDate={new Date(2006, 12, 31)}
                locale={'en'}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                placeHolderText="Date of Birth"
                textStyle={{color: '#000'}}
                placeHolderTextStyle={{color: '#000'}}
                onDateChange={newDate =>
                  this.props.signUpFormField({
                    prop: 'dateOfBirth',
                    value: newDate,
                  })
                }
                disabled={false}
              />
            </Item>

            {/* {this.showErrorMsg()} */}

            <Button
              block
              style={styles.btnStyle}
              onPress={this.onHandlePress.bind(this)}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                Next
              </Text>
            </Button>
          </Form>

          <Button
            transparent
            style={{alignSelf: 'center'}}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={{color: '#000', fontSize: 18}}>
              Already have an account? Login
            </Text>
          </Button>
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
    marginTop: '30rem',
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
)(SignUpScreen);
