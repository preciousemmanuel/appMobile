import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  LayoutAnimation,
  UIManager,
  ToastAndroid
} from "react-native";
import { Form, Content, Label, Input, Item, Button, Icon } from "native-base";
import { connect } from "react-redux";
import EStyleSheet from "react-native-extended-stylesheet";
import _ from "lodash";

import Spinner from "../components/Spinner";
import {
  signUpFormField,
  signUpUser,
  validateEmail,
  checkFieldExist
} from "../actions";

class CompleteSignUpScreen extends React.PureComponent {
  static navigationOptions = {
    title: "Create Account"
  };
  state = {
    secureTextEntry: true,
    emailSignupError: null,
    phoneSignupError: null,
    usernameSignupError: null
  };
  componentDidUpdate(prevProps) {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
    if (
      this.props.emailSignupError !== prevProps.emailSignupError &&
      this.props.emailSignupError !== ""
    ) {
      //console.log("me");
      this.setState({ emailSignupError: true });
      this.showEmailInput();
    } else if (
      this.props.emailSignupSuccess !== prevProps.emailSignupSuccess &&
      this.props.emailSignupSuccess !== ""
    ) {
      //console.log("cor");
      this.setState({ emailSignupError: false });
      this.showEmailInput();
    }
    //for phone number
    else if (
      this.props.phoneSignupError !== prevProps.phoneSignupError &&
      this.props.phoneSignupError !== ""
    ) {
      console.log("hom");
      this.setState({ phoneSignupError: true });
      this.showPhoneInput();
    } else if (
      this.props.phoneSignupError !== prevProps.phoneSignupError &&
      this.props.phoneSignupSuccess !== ""
    ) {
      console.log("phone");
      console.log(prevProps.phoneSignupSuccess);
      this.setState({ phoneSignupError: false });
      this.showPhoneInput();
    } else if (
      this.props.phoneSignupSuccess !== prevProps.phoneSignupSuccess &&
      this.props.phoneSignupSuccess !== ""
    ) {
      console.log("phone");
      console.log(prevProps.phoneSignupSuccess);
      this.setState({ phoneSignupError: false });
      this.showPhoneInput();
    }
    //for username section
    else if (
      this.props.usernameSignupError !== prevProps.usernameSignupError &&
      this.props.usernameSignupError !== ""
    ) {
      //console.log("me");
      this.setState({ usernameSignupError: true });
      this.showUsernameInput();
    } else if (
      this.props.usernameSignupError !== prevProps.usernameSignupError &&
      this.props.usernameSignupSuccess !== ""
    ) {
      //console.log("cor");
      this.setState({ usernameSignupError: false });
      this.showUsernameInput();
    } else if (
      this.props.usernameSignupSuccess !== prevProps.usernameSignupSuccess &&
      this.props.usernameSignupSuccess !== ""
    ) {
      //console.log("cor");
      this.setState({ usernameSignupError: false });
      this.showUsernameInput();
    }
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
      phone
    } = this.props;
    this.props.signUpUser(
      {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        username,
        email,
        password,
        phone
      },
      () => {
        this.props.navigation.navigate("InitialSetup");
      }
    );
  }
  showEmailInput() {
    if (_.isNull(this.state.emailSignupError)) {
      return (
        <Item floatingLabel style={styles.inputStyle}>
          <Label>Email</Label>
          <Input
            onChangeText={text =>
              this.props.checkFieldExist({ prop: "email", value: text })
            }
            value={this.props.email}
            //onKeyPress={text => console.log(text)}
          />
        </Item>
      );
    }
    if (this.state.emailSignupError) {
      //console.log("ffff");
      return (
        <View>
          <Item floatingLabel error style={styles.inputStyle}>
            <Label>Email</Label>
            <Input
              onChangeText={text =>
                this.props.checkFieldExist({ prop: "email", value: text })
              }
              value={this.props.email}
              //onKeyPress={text => console.log(text)}
            />
            <Icon name="close-circle" />
          </Item>
          <Text style={styles.errorMsg}>{this.props.emailSignupError}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Item floatingLabel success style={styles.inputStyle}>
            <Label>Email</Label>
            <Input
              onChangeText={text =>
                this.props.checkFieldExist({ prop: "email", value: text })
              }
              value={this.props.email}
              //onKeyPress={text => console.log(text)}
            />
            <Icon name="checkmark-circle" />
          </Item>
          <Text style={[styles.errorMsg, { color: "green" }]}>
            {this.props.emailSignupSuccess}
          </Text>
        </View>
      );
    }
  }

  showPhoneInput() {
    if (_.isNull(this.state.phoneSignupError)) {
      return (
        <Item floatingLabel style={styles.inputOtherStyle}>
          <Label>Phone</Label>
          <Input
            onChangeText={text =>
              this.props.checkFieldExist({ prop: "phone", value: text })
            }
            value={this.props.phone}
          />
        </Item>
      );
    }
    if (this.state.phoneSignupError) {
      //console.log("ffff");
      return (
        <View>
          <Item floatingLabel error style={styles.inputOtherStyle}>
            <Label>Phone</Label>
            <Input
              onChangeText={text =>
                this.props.checkFieldExist({ prop: "phone", value: text })
              }
              value={this.props.phone}
              //onKeyPress={text => console.log(text)}
            />
            <Icon name="close-circle" />
          </Item>
          <Text style={styles.errorMsg}>{this.props.phoneSignupError}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Item floatingLabel success style={styles.inputOtherStyle}>
            <Label>Phone</Label>
            <Input
              onChangeText={text =>
                this.props.checkFieldExist({ prop: "phone", value: text })
              }
              value={this.props.phone}
              //onKeyPress={text => console.log(text)}
            />
            <Icon name="checkmark-circle" />
          </Item>
          <Text style={[styles.errorMsg, { color: "green" }]}>
            {this.props.phoneSignupSuccess}
          </Text>
        </View>
      );
    }
  }

  showUsernameInput() {
    if (_.isNull(this.state.usernameSignupError)) {
      return (
        <Item floatingLabel style={styles.inputOtherStyle}>
          <Label>Username</Label>
          <Input
            onChangeText={text =>
              this.props.checkFieldExist({ prop: "username", value: text })
            }
            value={this.props.username}
          />
        </Item>
      );
    }
    if (this.state.usernameSignupError) {
      //console.log("ffff");
      return (
        <View>
          <Item floatingLabel error style={styles.inputOtherStyle}>
            <Label>Username</Label>
            <Input
              onChangeText={text =>
                this.props.checkFieldExist({ prop: "username", value: text })
              }
              value={this.props.username}
              //onKeyPress={text => console.log(text)}
            />
            <Icon name="close-circle" />
          </Item>
          <Text style={styles.errorMsg}>{this.props.usernameSignupError}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Item floatingLabel success style={styles.inputOtherStyle}>
            <Label>Username</Label>
            <Input
              onChangeText={text =>
                this.props.checkFieldExist({ prop: "username", value: text })
              }
              value={this.props.username}
              //onKeyPress={text => console.log(text)}
            />
            <Icon name="checkmark-circle" />
          </Item>
          <Text style={[styles.errorMsg, { color: "green" }]}>
            {this.props.usernameSignupSuccess}
          </Text>
        </View>
      );
    }
  }

  togglePassword() {
    if (this.state.secureTextEntry) {
      this.setState({ secureTextEntry: false });
    } else {
      this.setState({ secureTextEntry: true });
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button
        block
        style={styles.btnStyle}
        onPress={this.onHandleSubmit.bind(this)}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
          Sign Up
        </Text>
      </Button>
    );
  }
  showErrorMsg() {
    if (this.props.signupFormError !== "") {
      ToastAndroid.showWithGravityAndOffset(
        this.props.signupFormError,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      // return (
      //   <Text style={{ color: "red", marginTop: 10, marginBottom: 5 }}>
      // );
    }
    //     {this.props.errorMsg}
    //   </Text>
  }
  render() {
    //console.log(this.props.errorEmail);

    return (
      <ScrollView>
        <View style={styles.containerStyles}>
          <Form>
            {this.showEmailInput()}
            {this.showPhoneInput()}
            {this.showUsernameInput()}
            <Item floatingLabel style={styles.inputStyle}>
              <Label>Password</Label>
              <Input
                secureTextEntry={this.state.secureTextEntry}
                onChangeText={text =>
                  this.props.signUpFormField({ prop: "password", value: text })
                }
                value={this.props.password}
              />

              <Icon name="eye" onPress={this.togglePassword.bind(this)} />
            </Item>

            {this.showErrorMsg()}

            <View>{this.renderButton()}</View>
          </Form>
          <Button
            transparent
            style={{ alignSelf: "center" }}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={{ color: "#000", fontSize: 15, padding: 10 }}>
              By signing up, you agree to our Terms & Privacy Policy
            </Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyles: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "15%",
    paddingLeft: "17rem",
    paddingRight: "17rem",
    paddingBottom: "25rem"
  },
  textStyle: {
    color: "#000",
    fontSize: 15,

    alignSelf: "center"
  },
  btnStyle: {
    height: 50,
    borderRadius: 2,
    backgroundColor: "#44a4f7",
    marginTop: 30,
    marginBottom: 15
  },
  textContainer: {
    marginBottom: 30
  },
  inputStyle: {
    marginBottom: "30rem",
    marginLeft: 0,
    borderColor: "#000"
  },
  inputOtherStyle: {
    marginBottom: "45rem",
    marginLeft: 0,
    borderColor: "#000"
  },
  errorMsg: {
    color: "red",
    fontSize: "12rem",
    marginTop: "-32rem"
  }
});

const mapStateToProps = ({ auth }) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    password,
    phone,
    username,
    errorEmail,
    signupFormError,
    loading,
    emailSignupError,
    emailSignupSuccess,
    phoneSignupError,
    phoneSignupSuccess,
    usernameSignupError,
    usernameSignupSuccess
  } = auth;

  console.log(phoneSignupSuccess);
  console.log("pre 1" + phoneSignupError);
  return {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    password,
    phone,
    username,
    errorEmail,
    signupFormError,
    loading,
    emailSignupError,
    emailSignupSuccess,
    phoneSignupError,
    phoneSignupSuccess,
    usernameSignupError,
    usernameSignupSuccess
  };
};
export default connect(
  mapStateToProps,
  { signUpFormField, signUpUser, validateEmail, checkFieldExist }
)(CompleteSignUpScreen);
