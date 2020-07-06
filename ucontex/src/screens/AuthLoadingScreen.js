import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import {proccessAsyncAuth} from '../actions';

const SCREEN_HEIGTH = Dimensions.get('window').height;

class AuthLoadingScreen extends Component {
  state = {
    token: null,
  };
  async componentDidMount() {
    if (this.props.isAuth) {
      this.props.navigation.navigate('HomeScreen');
    } else {
      this.props.navigation.navigate('Auth');
    }
    //this.props.navigation.navigate("Auth");
    // try {
    //   let token = await AsyncStorage.getItem("user");
    //   if (token) {
    //     const data = JSON.parse(token);
    //     this.props.proccessAsyncAuth(data, () => {
    //       //  alert();
    //       this.props.navigation.navigate("HomeScreen");
    //     });
    //     //this.setState({ token: true });
    //   } else {
    //     //this.setState({ token: false });
    //     this.props.navigation.navigate("Auth");
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  }
  componentDidUpdate(prevprops, prevState) {
    if (this.props.isAuth !== prevprops.isAuth) {
      // if (this.state.token) {
      // } else {
      // }
    }
  }
  render() {
    return (
      <View style={styles.containerStyles}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }
}

const styles = {
  containerStyles: {
    backgroundColor: '#44a4f7',
    width: '100%',
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    height: SCREEN_HEIGTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const mapStateToProps = ({auth}) => {
  const {isAuth} = auth;
  return {isAuth};
};

export default connect(
  mapStateToProps,
  {proccessAsyncAuth},
)(AuthLoadingScreen);
