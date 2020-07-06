import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  LayoutAnimation,
  UIManager,
  ToastAndroid,
  Platform,
} from 'react-native';
import {Form, Content, Label, Input, Item, Button, Icon} from 'native-base';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';

import {signUpFormField, loginUser} from '../actions';
//import Spinner from "../components/Spinner";
import {HITSLOP} from '../config';
// let showErrorEmailIcon;
// let showErrorPasswordIcon;
class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {secureTextEntry: true};
  onHandleLogin() {
    console.log('auth', email, password);
    const {email, password} = this.props;
    let trimmedEmail = email.trim();
    this.props.loginUser({email: trimmedEmail, password}, () => {
      this.props.navigation.navigate('HomeScreen');
    });
  }

  componentDidUpdate(prevProps) {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
    // if (
    //   this.props.emailLoginError !== prevProps.emailLoginError &&
    //   this.props.emailLoginError !== ""
    // ) {
    //   showErrorEmailIcon = <Icon name="close-circle" />;
    //   this.setState({ emailLoginError: true, passwordLoginError: false });
    // }
    //
    // if (
    //   this.props.emailLoginError !== prevProps.emailLoginError &&
    //   this.props.emailLoginError == ""
    // ) {
    //   showErrorEmailIcon = <Icon />;
    //   this.setState({ emailLoginError: false });
    // }
    //
    // //for password
    //
    // if (
    //   this.props.passwordLoginError !== prevProps.passwordLoginError &&
    //   this.props.passwordLoginError !== ""
    // ) {
    //   showErrorPasswordIcon = <Icon name="close-circle" />;
    //   this.setState({ passwordLoginError: true, emailLoginError: false });
    // }
    //
    // if (
    //   this.props.passwordLoginError !== prevProps.passwordLoginError &&
    //   this.props.passwordLoginError === ""
    // ) {
    //   showErrorPasswordIcon = <Icon />;
    //   this.setState({ passwordLoginError: false });
    // }
  }
  renderButton() {
    // if (this.props.loginLoading) {
    //   return (
    //     <View style={{ marginTop: 7 }}>
    //       <Spinner size="large" />
    //     </View>
    //   );
    // }
    return (
      <View>
        <Button
          block
          style={styles.btnStyle}
          onPress={() => this.onHandleLogin()}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
            Log In
          </Text>
        </Button>

        <Button
          transparent
          style={{alignSelf: 'center'}}
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={{color: '#fff', fontSize: 18}}>
            No account yet? Create one
          </Text>
        </Button>
        <Button
          transparent
          style={{alignSelf: 'center'}}
          onPress={() => this.props.navigation.navigate('ForgotPassword')}>
          <Text style={{color: '#fff', fontSize: 18}}>Forgot password?</Text>
        </Button>
      </View>
    );
  }
  // showErrorMsg() {
  //   if (
  //     this.props.errorMsg !== null &&
  //     typeof this.props.errorMsg !== "undefined"
  //   ) {
  //     ToastAndroid.showWithGravityAndOffset(
  //       this.props.errorMsg,
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM,
  //       25,
  //       50
  //     );
  //     // return (
  //     //   <Text style={{ color: "red", marginTop: 10, marginBottom: 5 }}>
  //     // );
  //   }
  //   //     {this.props.errorMsg}
  //   //   </Text>
  // }

  togglePassword() {
    if (this.state.secureTextEntry) {
      this.setState({secureTextEntry: false});
    } else {
      this.setState({secureTextEntry: true});
    }
  }

  showVisiblePasswordIcon() {
    if (this.state.secureTextEntry) {
      return (
        <Icon
          name="eye"
          style={{color: '#ffffff'}}
          onPress={this.togglePassword.bind(this)}
          hitslop={HITSLOP}
        />
      );
    }
    return (
      <Icon
        name="eye-off"
        style={{color: '#ffffff'}}
        onPress={this.togglePassword.bind(this)}
        hitslop={HITSLOP}
      />
    );
  }
  render() {
    // if (this.props.emailLoginError !== "") {
    //   showErrorEmailIcon = <Icon name="close-circle" />;
    //   //this.setState({ emailLoginError: true });
    // }
    // if (this.props.passwordLoginError) {
    //   showErrorPasswoIcon = <Icon name="close-circle" />;
    // }
    return (
      <View style={{flex: 1, backgroundColor: '#44a4f7'}}>
        <Spinner
          visible={this.props.loginLoading}
          overlayColor="rgba(0, 0, 0, 0.8)"
          color="#ffffff"
        />
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          scrollEnabled={true}
          enableOnAndroid
          showsVerticalScrollIndicator={false}>
          <View style={styles.containerStyles}>
            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>Ucontex</Text>
            </View>
            <View>
              <Form>
                <Item floatingLabel style={styles.inputItemStyle}>
                  <Label style={{color: '#fff'}}>Email </Label>
                  <Input
                    style={styles.inputStyle}
                    onChangeText={text =>
                      this.props.signUpFormField({prop: 'email', value: text})
                    }
                    value={this.props.email}
                  />
                  {/* {showErrorEmailIcon} */}
                </Item>
                <Item
                  floatingLabel
                  style={[styles.inputItemStyle, {marginBottom: 0}]}>
                  <Label style={{color: '#fff'}}>Password</Label>
                  <Input
                    style={styles.inputStyle}
                    secureTextEntry={this.state.secureTextEntry}
                    onChangeText={text =>
                      this.props.signUpFormField({
                        prop: 'password',
                        value: text,
                      })
                    }
                    value={this.props.password}
                  />
                  {this.showVisiblePasswordIcon()}
                  {/* {showErrorPasswordIcon} */}
                </Item>

                <View>{this.renderButton()}</View>
              </Form>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyles: {
    flex: 1,
    backgroundColor: '#44a4f7',
    paddingTop: '35%',
    paddingLeft: '16rem',
    paddingRight: '16rem',
  },
  textStyle: {
    color: '#fff',
    fontSize: '30rem',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  btnStyle: {
    height: '50rem',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 6,
    borderRadius: 2,
    marginTop: '64rem',
  },
  textContainer: {
    marginBottom: '15rem',
  },
  inputStyle: {
    color: '#fff',
  },
  inputItemStyle: {
    marginBottom: '30rem',
    color: '#fff',
    marginLeft: 0,
  },
  errorMsg: {
    color: 'red',
    fontSize: '12rem',
    marginTop: '-32rem',
  },
});

const mapStateToProps = ({auth}) => {
  const {
    email,
    password,
    loading,
    emailLoginError,
    passwordLoginError,
    loginLoading,
  } = auth;
  console.log('authdd', email);
  return {
    email,
    password,
    loginLoading,
    emailLoginError,
    passwordLoginError,
  };
};

export default connect(
  mapStateToProps,
  {signUpFormField, loginUser},
)(LoginScreen);
