import React, { Component } from "react";
import {
  View,
  Text,
  ToastAndroid,
  Image,
  TouchableOpacity,
  Easing,
  Animated
} from "react-native";
import { Form, Content, Label, Input, Item, Button } from "native-base";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import {
  confirmEmail,
  signUpFormField,
  resendVerificationCode
} from "../actions";

class ConfirmEmailScreen extends Component {
  static navigationOptions = {
    title: "Confirm Email"
  };

  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.animateIcon();
  }

  animateIcon() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 1,
      tension: 1
    }).start();
  }

  _onConfirmEmail() {
    const { verifyCode, userId, token } = this.props;
    //alert(userData.token + " " + userData.data.id);
    this.props.confirmEmail(
      {
        verifyCode,
        userId,
        token
      },
      () => {
        this.props.navigation.navigate("InitialSetup");
      }
    );
  }
  _onResendVerification = () => {
    const { verifyCode, token, userId } = this.props;
    //alert(userData.token + " " + userData.data.id);
    this.props.resendVerificationCode({
      userId,
      token
    });
  };

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
      <View style={styles.containerStyles}>
        <Spinner
          visible={this.props.loading}
          overlayColor="rgba(0, 0, 0, 0.7)"
          color="#333"
        />
        <Animated.Image
          source={require("../assets/checked.png")}
          resizeMode="cover"
          style={[
            styles.successIconStyle,
            { transform: [{ scale: this.animatedValue }] }
          ]}
        />
        <View style={styles.textContainer}>
          <Text
            style={[styles.textStyle, { color: "green", marginBottom: 10 }]}
          >
            Account creation is successful!
          </Text>
          <Text style={styles.textStyle}>
            Please confirm your email by entering the code sent to your mail.
          </Text>
        </View>
        <Content>
          <Form>
            <Item floatingLabel style={styles.inputOtherStyle}>
              <Label>Enter verification code</Label>
              <Input
                onChangeText={text =>
                  this.props.signUpFormField({
                    prop: "verifyCode",
                    value: text
                  })
                }
                value={this.props.verifyCode}
              />
            </Item>

            <Button
              onPress={this._onConfirmEmail.bind(this)}
              block
              style={styles.btnStyle}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                Confirm
              </Text>
            </Button>
          </Form>
          <Button
            transparent
            style={{ alignSelf: "center" }}
            onPress={() => this._onResendVerification()}
          >
            <Text style={{ color: "#000", fontSize: 15 }}>
              Did not get verification code? Resend
            </Text>
          </Button>
        </Content>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyles: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "15%",
    paddingLeft: "17rem",
    paddingRight: "17rem"
  },
  textStyle: {
    color: "#000",
    fontSize: "15rem",

    alignSelf: "center"
  },
  btnStyle: {
    height: "50rem",
    borderRadius: "2rem",
    backgroundColor: "#44a4f7",
    marginTop: "30rem",
    marginBottom: "15rem"
  },
  textContainer: {
    marginBottom: "30rem"
  },
  inputOtherStyle: {
    marginLeft: 0,
    borderColor: "#000"
  },
  successIconStyle: {
    alignSelf: "center",
    width: "60rem",
    height: "60rem",
    marginBottom: "10rem"
  }
});

const mapStateToProps = ({ auth }) => {
  const {
    userData,
    signupFormError,
    verifyCode,
    loading,
    userId,
    token
  } = auth;
  console.log("con" + verifyCode);
  return { userData, verifyCode, loading, signupFormError, userId, token };
};

export default connect(
  mapStateToProps,
  { confirmEmail, signUpFormField, resendVerificationCode }
)(ConfirmEmailScreen);
