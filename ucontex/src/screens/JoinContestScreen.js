import React, {Component} from 'react';
import {
  Text,
  View,
  Platform,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Container,
  Content,
} from 'native-base';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Moment from 'moment';
import ScaleImage from 'react-native-scalable-image';
import Spinner from 'react-native-loading-spinner-overlay';

import ProgressiveImage from '../components/ProgressiveImage';
import ProgressiveRoundImage from '../components/ProgressiveRoundImage';
import ContestParticipants from '../components/ContestParticipants';

import {handleJoinContest} from '../actions';

import {STATUS_BAR} from '../config';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const IMAGE_HEIGHT = 190;
//const IMAGE_HEIGHT = 250;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 64 : -96;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;
const THEME_COLOR = '#44a4f7';
const FADED_THEME_COLOR = 'rgba(85,186,255, 0.8)';

class JoinContestScreen extends Component {
  scroll = new Animated.Value(0);
  ascroll = new Animated.Value(0);

  textColor = this.ascroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT / 5, SCROLL_HEIGHT],
    outputRange: [THEME_COLOR, FADED_THEME_COLOR, '#ffffff'],
    extrapolate: 'clamp',
  });
  tabBg = this.ascroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: ['#ffffff', THEME_COLOR],
    extrapolate: 'clamp',
  });

  tabY = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: [0, 0, 1],
  });
  opacity = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: [1, 0],
  });
  viewScale = this.scroll.interpolate({
    inputRange: [-10, 0],
    outputRange: [1.1, 1],
    extrapolateRight: 'clamp',
  });

  constructor(props) {
    super(props);
    this.scroll.addListener(
      Animated.event([{value: this.ascroll}], {useNativeDriver: false}),
    );
  }
  heights = [300, 400, 400, 400];
  state = {
    height: 300,
    showCoverPicxModal: false,
  };

  renderCoverPhoto = () => {
    if (this.props.singleContestData[0].images.length > 0) {
      return (
        <TouchableWithoutFeedback
          onPress={() => this.setState({showCoverPicxModal: true})}>
          <Animated.Image
            source={{uri: this.props.singleContestData[0].images[0].url}}
            resizeMode="cover"
            style={styles.coverImageStyle}
          />
        </TouchableWithoutFeedback>
      );
    }
    return (
      <Animated.Image
        source={require('../assets/coverphoto1.png')}
        resizeMode="cover"
        style={styles.coverImageStyle}
      />
    );
  };
  renderProfilePhoto = () => {
    if (this.props.singleContestData[0].owner.profilePictures.length > 0) {
      let numberOfPicx = this.props.singleContestData[0].owner.profilePictures
        .length;
      return (
        <ProgressiveRoundImage
          source={{
            uri: this.props.singleContestData[0].owner.profilePictures[
              numberOfPicx - 1
            ].url,
          }}
          thumbnail={require('../assets/placeholder.png')}
          resizeMode="cover"
          style={styles.profilePicxStyle}
        />
      );
    }
    return (
      <ProgressiveRoundImage
        source={require('../assets/user.png')}
        resizeMode="cover"
        style={styles.profilePicxStyle}
      />
    );
  };

  showCoverPicxModal = () => {
    const {singleContestData} = this.props;

    //console.log("coverPhoto", data.url);
    if (singleContestData[0].images.length > 0) {
      return (
        <ScaleImage
          width={SCREEN_WIDTH - 30}
          source={{uri: singleContestData[0].images[0].url}}
        />
      );
    }
  };

  handleJoinContest = () => {
    const {userId, token, singleContestData, navigation} = this.props;
    this.props.handleJoinContest(
      {contestId: singleContestData[0].id, userId, token},
      () => {
        navigation.navigate('Contest');
      },
    );
  };
  render() {
    //console.log("gethjhj", this.props.selectedMedia);
    const {
      coverImageStyle,
      backButtonContainerStyle,
      profilePicxStyle,
      profilePixContainerStyle,
      titleContestStyle,
      userNameStyle,
      detailSectionStyle,
      detailIconStyle,
      detailIconTextStyle,

      tabMenuConatinerStyle,
    } = styles;

    const {singleContestData, isFetchingSingleContest} = this.props;

    let topStyle = {
      flex: 1,
      marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
    };

    return (
      <View style={topStyle}>
        <Spinner
          visible={this.props.isFetchingSingleContest}
          color="#44a4f7"
          overlayColor="rgba(0, 0, 0, 0.6)"
        />
        <Modal
          isVisible={this.state.showCoverPicxModal}
          onBackdropPress={() =>
            this.setState({
              showCoverPicxModal: false,
            })
          }>
          {this.showCoverPicxModal()}
        </Modal>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={5}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.scroll}}}],
            {useNativeDriver: true},
          )}
          style={{zIndex: 0}}>
          <Animated.View
            style={{
              marginBottom: 5,
              transform: [
                {translateY: Animated.multiply(this.scroll, 0.65)},
                {scale: this.viewScale},
              ],
              opacity: this.opacity,
            }}>
            <View>
              {this.renderCoverPhoto()}
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack(null)}
                style={backButtonContainerStyle}>
                <Icon name="arrow-round-back" style={{color: '#44a4f7'}} />
              </TouchableOpacity>
            </View>
            <View style={profilePixContainerStyle}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('UsersProfile', {
                    user: singleContestData[0].owner.id,
                  })
                }>
                {this.renderProfilePhoto()}
              </TouchableOpacity>
              <Text style={titleContestStyle}>{singleContestData[0].name}</Text>
            </View>
            <Text style={userNameStyle}>
              {/* // {userData.firstName + " " + userData.lastName} */}
            </Text>
          </Animated.View>
          {/* <Animated.View
            style={{ transform: [{ translateY: this.tabY }], zIndex: 1 }}
          > */}

          <Animated.View
            style={[
              {
                transform: [{translateY: this.tabY}],
              },
              tabMenuConatinerStyle,
            ]}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('DetailContest', {
                  contestId: singleContestData[0].id,
                })
              }
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#707070'}}>Info</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#707070'}}>Award</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#707070'}}>Participants</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#707070'}}>Views</Text>
            </TouchableOpacity>
          </Animated.View>

          <Content>
            <View style={styles.categoryContainerStyle}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  alignItems: 'center',
                  marginBottom: 15,
                }}>
                <Text style={styles.textStyle}>
                  By participating in this contest you agree to our
                  <Text style={{color: '#44a4f7'}}>
                    {' '}
                    Terms and Conditions and Contest Rules.{' '}
                  </Text>
                  Here are <Text style={{color: '#44a4f7'}}> tips </Text>
                  to enable you win the award.
                </Text>
              </View>
              <Button
                onPress={() => this.handleJoinContest()}
                style={styles.publishButtonStyle}>
                <Text style={{color: '#ffffff'}}>Continue</Text>
              </Button>
            </View>
          </Content>

          {/* </Animated.View> */}
          {/* </ScrollView> */}
          {/* </ScrollView> */}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  coverImageStyle: {
    width: '100%',
    height: IMAGE_HEIGHT,
  },
  backButtonContainerStyle: {
    width: '31rem',
    height: '31rem',
    borderRadius: '75rem',
    backgroundColor: '#e4e4e4',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '9rem',
    left: '17rem',
  },

  profilePicxStyle: {
    width: '80rem',
    height: '80rem',
    borderColor: '#ffffff',
    borderWidth: '3rem',
    marginTop: '-30rem',
  },
  profilePixContainerStyle: {
    flexDirection: 'row',

    paddingLeft: '17rem',
    paddingRight: '17rem',
  },
  titleContestStyle: {
    marginLeft: '19rem',
    fontWeight: '800',
    marginTop: '11rem',
  },
  userNameStyle: {
    color: '#000000',
    marginLeft: '15rem',
    marginTop: '8rem',
    fontSize: '15rem',
    fontWeight: '800',
    lineHeight: '20rem',
  },
  detailSectionStyle: {
    padding: '7rem',
    width: '95%',
    minHeight: '90rem',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    elevation: 2,
    borderColor: '#e4e4e4',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    marginRight: '9rem',
    marginLeft: '9rem',
    marginTop: '16rem',
  },
  detailIconStyle: {
    color: '#707070',
    marginRight: '2rem',
    fontSize: '19rem',
  },
  detailIconTextStyle: {
    fontSize: '12rem',
  },

  tabMenuConatinerStyle: {
    // flex: 1,
    // justifyContent: "center",
    // height: "60rem",
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 1,
    elevation: 2,

    zIndex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    // marginTop: "9rem",
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '20rem',
    paddingRight: '20rem',
    alignItems: 'center',
    paddingBottom: '10rem',
    paddingTop: '10rem',
  },

  categoryContainerStyle: {
    padding: '13rem',
    minHeight: '200rem',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    backgroundColor: '#ffffff',
    elevation: 2,
    marginTop: '5rem',
  },
  statusIconStyle: {
    width: '8rem',
    height: '8rem',
    borderRadius: '75rem',
    marginRight: '4rem',
    marginTop: '3rem',
  },
  textStyle: {
    lineHeight: '35rem',
    // color: "#fe0686"
  },
  sectionStyle: {
    marginBottom: '30rem',
  },
  joinButtonStyle: {
    width: '60rem',
    height: '25rem',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#44a4f7',
    marginRight: '16rem',
  },
  participantsContainerStyle: {
    padding: '17rem',
  },
  publishButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '45rem',
    marginTop: '29rem',
    backgroundColor: '#44a4f7',
    alignSelf: 'center',
    marginBottom: '30rem',
  },
});

const mapStateToProps = ({profileSetup, auth, contest}) => {
  const {userData} = profileSetup;
  const {userId, token} = auth;
  const {singleContestData, isFetchingSingleContest} = contest;
  console.log('media', singleContestData, isFetchingSingleContest);
  return {
    userData,
    userId,
    token,
    singleContestData,
    isFetchingSingleContest,
  };
};
export default connect(
  mapStateToProps,
  {handleJoinContest},
)(JoinContestScreen);
