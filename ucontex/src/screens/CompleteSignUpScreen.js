import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  LayoutAnimation,
  UIManager,
  ToastAndroid,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Form, Content, Label, Input, Item, Button, Icon} from 'native-base';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import PhoneInput from 'react-native-phone-input';

import Spinner from 'react-native-loading-spinner-overlay';
import ModalPhoneInput from '../components/ModalPhoneInput';
import {signUpFormField, signUpUser, validateEmail} from '../actions';

class CompleteSignUpScreen extends Component {
  static navigationOptions = {
    title: 'Create Account',
  };
  state = {
    secureTextEntry: true,

    pickerData: null,
  };

  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData(),
    });
  }
  componentDidUpdate(prevProps) {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
    //if(this.state.emailSignupError)
  }

  onHandleSubmit() {
    const {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      email,
      username,
      password,
      phone,
    } = this.props;
    let trimmedEmail = email.trim();
    this.props.signUpUser(
      {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        username,
        email: trimmedEmail,
        password,
        phone,
        isphoneValid: this.phone.isValidNumber(),
      },
      () => {
        this.props.navigation.navigate('ConfirmEmail');
      },
    );
  }

  togglePassword() {
    if (this.state.secureTextEntry) {
      this.setState({secureTextEntry: false});
    } else {
      this.setState({secureTextEntry: true});
    }
  }

  renderButton() {
    // if (this.props.loading) {
    //   return <Spinner size="large" />;
    // }
    return (
      <Button
        block
        style={styles.btnStyle}
        onPress={this.onHandleSubmit.bind(this)}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
          Sign Up
        </Text>
      </Button>
    );
  }
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

  onPressFlag = () => {
    this.myCountryPicker.open();
  };

  selectCountry = country => {
    this.phone.selectCountry(country.iso2);
  };

  render() {
    //console.log(this.props.errorEmail);

    return (
      <KeyboardAwareScrollView
        // style={{ backgroundColor: "#4c69a5" }}
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={styles.containerStyles}
        scrollEnabled={true}
        enableOnAndroid>
        <Spinner
          visible={this.props.loading}
          overlayColor="rgba(0, 0, 0, 0.8)"
          color="#ffffff"
        />
        <Form>
          <Item floatingLabel style={styles.inputStyle}>
            <Label>Email</Label>
            <Input
              onChangeText={text =>
                this.props.signUpFormField({prop: 'email', value: text})
              }
              value={this.props.email}
              //onKeyPress={text => console.log(text)}
            />
          </Item>
          <PhoneInput
            ref={ref => {
              this.phone = ref;
            }}
            initialCountry="ng"
            onPressFlag={this.onPressFlag}
            style={styles.inputPhoneStyle}
            value={this.props.phone}
            onChangePhoneNumber={text =>
              this.props.signUpFormField({prop: 'phone', value: text})
            }
          />

          <ModalPhoneInput
            onRef={ref => {
              this.myCountryPicker = ref;
            }}
            data={this.state.pickerData}
            onChange={country => {
              this.selectCountry(country);
            }}
            cancelText="Cancel"
          />

          <Item floatingLabel style={styles.inputStyle}>
            <Label>Password</Label>
            <Input
              secureTextEntry={this.state.secureTextEntry}
              onChangeText={text =>
                this.props.signUpFormField({prop: 'password', value: text})
              }
              value={this.props.password}
            />

            <Icon name="eye" onPress={this.togglePassword.bind(this)} />
          </Item>

          {/* {this.showErrorMsg()} */}

          <View>{this.renderButton()}</View>
        </Form>
        <Button
          transparent
          style={{alignSelf: 'center'}}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={{color: '#000', fontSize: 15, padding: 10}}>
            By signing up, you agree to our Terms & Privacy Policy.
          </Text>
        </Button>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyles: {
    backgroundColor: '#fff',
    paddingTop: '5%',
    paddingLeft: '17rem',
    paddingRight: '17rem',
    paddingBottom: '25rem',
  },
  textStyle: {
    color: '#000',
    fontSize: 15,

    alignSelf: 'center',
  },
  btnStyle: {
    height: 50,
    borderRadius: 2,
    backgroundColor: '#44a4f7',
    marginTop: 30,
    marginBottom: 15,
  },

  inputStyle: {
    marginBottom: '30rem',
    marginLeft: 0,
    borderColor: '#000',
  },
  inputPhoneStyle: {
    marginBottom: '30rem',
    marginTop: '50rem',
    borderBottomWidth: 0.7,
    borderColor: '#000',
    marginLeft: 0,
  },
  inputOtherStyle: {
    marginBottom: '45rem',
    marginLeft: 0,
    borderColor: '#000',
  },
  errorMsg: {
    color: 'red',
    fontSize: '12rem',
    marginTop: '-32rem',
  },
});

const mapStateToProps = ({auth}) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    password,
    phone,

    errorEmail,
    signupFormError,
    loading,
  } = auth;

  return {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    password,
    phone,

    errorEmail,
    signupFormError,
    loading,
  };
};
export default connect(
  mapStateToProps,
  {signUpFormField, signUpUser, validateEmail},
)(CompleteSignUpScreen);
