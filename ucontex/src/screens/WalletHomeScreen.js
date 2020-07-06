import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  Platform,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Item,
  Container,
  Content,
  Input,
  Right,
} from 'native-base';

import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';

import Moment from 'moment';

import ProfilePicture from '../components/ProfilePicture';
// import NewsFeedItems from "../components/NewsFeedItems";

import {fetchUsersPost} from '../actions';

import {colour, STATUS_BAR} from '../config';
const SCREEN_WIDTH = Dimensions.get('window').width;

class WalletHomeScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {bottomLocation: 0};
  }

  render() {
    //console.log("gethjhj", this.props.selectedMedia);
    const {profilePicxStyle, profilePixContainerStyle, currencyStyle} = styles;

    //const { userData } = this.props.userData.data;
    const {
      userId,
      navigation,

      userData,
    } = this.props;

    // if (loadingPost) {
    //   return (
    //     <View
    //       style={{
    //         flex: 1,
    //         justifyContent: "center",
    //         alignItems: "center",
    //         backgroundColor: "#ffffff"
    //       }}
    //     >
    //       <ActivityIndicator size="large" color="#44a4f7" />
    //     </View>
    //   );
    // }

    return (
      <View style={{flex: 1}}>
        <Header
          style={{
            //  marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
            backgroundColor: colour.MAIN_COLOR,
          }}>
          <Left>
            <Button transparent onPress={() => navigation.openDrawer()}>
              <Icon style={{color: '#ffffff'}} name="menu" />
            </Button>
          </Left>
          <Body>
            <Text style={styles.headerTitleStyle}>Home</Text>
          </Body>
          <Right>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon style={{color: '#ffffff'}} name="cog" />
            </Button>
          </Right>
        </Header>

        <View>
          <View style={styles.firstPanelStyle}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity style={styles.buttonStyle}>
                <Text style={{color: '#ffffff'}}>Wallets</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}
                style={[styles.buttonStyle, {backgroundColor: '#ffffff'}]}>
                <Text style={{color: '#000000'}}>Profile</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.imageContainerStyle}>
              <ProfilePicture
                onPress={() =>
                  navigation.navigate('UsersProfile', {
                    user: userId,
                  })
                }
                style={styles.profilePicxStyle}
                profilePictures={userData.data.userData.profilePictures}
              />
              <Text
                style={{
                  color: '#ffffff',
                  marginTop: 10,
                  fontWeight: '800',
                  letterSpacing: 0.69,
                }}>
                {userData.data.userData.firstName +
                  ' ' +
                  userData.data.userData.lastName}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 26,
              }}>
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    resizeMode="cover"
                    source={require('../assets/naira.png')}
                    style={styles.currencyStyle}
                  />
                  <Text style={styles.amountStyle}>35,600</Text>
                </View>
                <Text style={styles.bottomTextStyle}>Current Balance</Text>
              </View>

              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    resizeMode="cover"
                    source={require('../assets/utex.png')}
                    style={styles.currencyStyle}
                  />
                  <Text style={styles.amountStyle}>35,600</Text>
                </View>
                <Text style={styles.bottomTextStyle}>Utext Balance</Text>
              </View>
            </View>
          </View>
          <View style={{padding: 5, marginTop: -15}}>
            <View style={styles.secondPanelStyle}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon name="alert" />
                <Text>Recieved from uconex</Text>

                <Text>12000</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = EStyleSheet.create({
  imageContainerStyle: {
    alignSelf: 'center',
    marginTop: '41rem',
    alignItems: 'center',
  },
  profilePicxStyle: {
    width: '78rem',
    height: '78rem',
    marginRight: 0,
    // borderColor: "#ffffff",
    // borderWidth: "3rem",
    // marginTop: "-30rem"
  },

  userNameStyle: {
    color: '#000000',
    marginLeft: '15rem',
    marginTop: '8rem',
    fontSize: '15rem',
    fontWeight: '800',
    lineHeight: '20rem',
  },

  currencyStyle: {
    width: '16rem',
    height: '16rem',
  },
  amountStyle: {
    color: '#ffffff',
    fontWeight: '300',
    fontSize: '19rem',
  },
  firstPanelStyle: {
    width: '100%',
    height: '326rem',
    padding: '30rem',
    backgroundColor: colour.MAIN_COLOR,
  },
  buttonStyle: {
    width: '62rem',
    height: '24rem',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 3, height: 0},
    shadowRadius: 6,
    borderRadius: '38rem',
    borderColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#44a4f7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomTextStyle: {
    color: '#ffffff',
    fontSize: '9rem',
    fontWeight: '400',
    letterSpacing: 0.6,
  },

  secondPanelStyle: {
    padding: '20rem',
    minHeight: '100rem',
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    backgroundColor: '#ffffff',
  },

  headerTitleStyle: {
    color: '#ffffff',
    fontSize: '18rem',
    fontWeight: '500',
    lineHeight: '20rem',
  },
});

const mapStateToProps = ({auth}) => {
  const {token, userId, userData} = auth;
  //  const {userData} = profileSetup;

  return {
    token,
    userId,
    userData,
  };
};
export default connect(
  mapStateToProps,
  {fetchUsersPost},
)(WalletHomeScreen);
