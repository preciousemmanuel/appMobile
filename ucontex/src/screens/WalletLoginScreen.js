import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  LayoutAnimation,
  UIManager,
  ToastAndroid,
  NetInfo,
  Platform,
} from 'react-native';
import {Form, Content, Label, Input, Item, Button, Icon} from 'native-base';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';

import {signUpFormField, loginUser} from '../actions';
// import Spinner from "../components/Spinner";
import ProfilePicture from '../components/ProfilePicture';
// let showErrorEmailIcon;
// let showErrorPasswordIcon;

class WalletLoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {secureTextEntry: true};
  onHandleLogin() {
    const {userData, password} = this.props;

    this.props.loginUser(
      {email: userData.data.userData.email, password},
      () => {
        this.props.navigation.navigate('Wallet');
      },
    );
  }

  componentDidUpdate(prevProps) {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }
  renderButton() {
    return (
      <View>
        <Button
          onPress={() => this.onHandleLogin()}
          block
          style={styles.btnStyle}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
            Submit
          </Text>
        </Button>
      </View>
    );
  }

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
        />
      );
    }
    return (
      <Icon
        name="eye-off"
        style={{color: '#ffffff'}}
        onPress={this.togglePassword.bind(this)}
      />
    );
  }
  render() {
    const {
      userId,
      userData,
      password,
      signUpFormField,
      navigation,
    } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#44a4f7'}}>
        <Spinner
          visible={this.props.loginLoading}
          color="#000000"
          overlayColor="rgba(0, 0, 0, 0.6)"
        />
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          scrollEnabled={true}
          enableOnAndroid
          showsVerticalScrollIndicator={false}>
          <View style={styles.containerStyles}>
            <View style={{alignSelf: 'center'}}>
              <ProfilePicture
                onPress={() =>
                  navigation.navigate('UsersProfile', {
                    user: userId,
                  })
                }
                style={styles.profilePicxStyle}
                profilePictures={userData.data.userData.profilePictures}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>Wallet</Text>
            </View>
            <View>
              <Form>
                <Item
                  floatingLabel
                  style={[styles.inputItemStyle, {marginBottom: 0}]}>
                  <Label style={{color: '#fff'}}>Enter your password</Label>
                  <Input
                    style={styles.inputStyle}
                    secureTextEntry={this.state.secureTextEntry}
                    onChangeText={text =>
                      signUpFormField({
                        prop: 'password',
                        value: text,
                      })
                    }
                    value={password}
                  />
                  {this.showVisiblePasswordIcon()}
                  {/* {showErrorPasswordIcon} */}
                </Item>

                <View>{this.renderButton()}</View>
                <Button
                  transparent
                  style={{alignSelf: 'center'}}
                  onPress={() => navigation.navigate('HomeScreen')}>
                  <Text style={{color: '#fff', fontSize: 18}}>Go back</Text>
                </Button>
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
  profilePicxStyle: {
    width: '55rem',
    height: '55rem',
    marginRight: 0,
    borderColor: '#ffffff',
    borderWidth: '3rem',
  },
});

const mapStateToProps = ({auth, profileSetup}) => {
  const {email, password, loginLoading, userData} = auth;
  //const {userData} = profileSetup;
  console.log(email, password);
  return {
    email,
    password,
    loginLoading,
    userData,
  };
};

export default connect(
  mapStateToProps,
  {signUpFormField, loginUser},
)(WalletLoginScreen);
