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
  Title,
  Textarea,
  Item,
  Picker,
  Right,
  ListItem,
  Tab,
  Tabs,
  TabHeading,
  Container,
  Content,
  ScrollableTab,
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
import InfoContestSection from '../components/InfoContestSection';
import AwardContestDetailSection from '../components/AwardContestDetailSection';
import JoinContestSection from '../components/JoinContestSection';

import {fetchSingleContest, handleJoinContest} from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const IMAGE_HEIGHT = 190;
//const IMAGE_HEIGHT = 250;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 64 : -96;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;
const THEME_COLOR = '#44a4f7';
const FADED_THEME_COLOR = 'rgba(85,186,255, 0.8)';

import {STATUS_BAR} from '../config';

class DetailContestScreen extends Component {
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
    infoSection: true,
    awardSection: false,
    participantSection: false,
    viewSection: false,
    joinSection: false,
  };
  componentWillMount() {
    const contestId = this.props.navigation.getParam('contestId');
    const {userId, token} = this.props;
    this.props.fetchSingleContest({
      contestId,
      userId,
      token,
    });
  }
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

  renderJoinButton = () => {
    const {singleContestData, userId} = this.props;
    if (singleContestData[0].owner.id === userId) {
      //hide button this is the user that creted this contest
      return;
    } else {
      if (!singleContestData[0].joined) {
        return (
          <Button
            onPress={() => this.handleShowSection(5)}
            style={styles.joinButtonStyle}>
            <Text style={{color: '#ffffff'}}>Join</Text>
          </Button>
        );
      }
      return;
    }
  };

  handleShowSection = section => {
    switch (section) {
      case 1:
        this.setState({
          infoSection: true,
          awardSection: false,
          participantSection: false,
          viewSection: false,
        });
        break;
      case 2:
        this.setState({
          infoSection: false,
          awardSection: true,
          participantSection: false,
          viewSection: false,
        });
        break;
      case 3:
        this.setState({
          infoSection: false,
          awardSection: false,
          participantSection: true,
          viewSection: false,
        });
        break;
      case 4:
        this.setState({
          infoSection: false,
          awardSection: false,
          participantSection: false,
          viewSection: true,
          joinSection: true,
        });
        break;
      case 5:
        this.setState({
          infoSection: false,
          awardSection: false,
          participantSection: false,
          viewSection: false,
          joinSection: true,
        });
        break;
      default:
    }
  };
  renderContent = () => {
    if (this.state.infoSection) {
      return (
        <InfoContestSection singleContestData={this.props.singleContestData} />
      );
    }
    if (this.state.awardSection) {
      return (
        <AwardContestDetailSection
          singleContestData={this.props.singleContestData}
        />
      );
    }
    if (this.state.participantSection) {
      return (
        <ParticipantContestDetailSection
          singleContestData={this.props.singleContestData}
        />
      );
    }
    if (this.state.joinSection) {
      return (
        <JoinContestSection
          singleContestData={this.props.singleContestData}
          handleJoinContest={() => this.handleJoinContest()}
        />
      );
    }
    // if (this.state.participantSection) {
    //   <AwardContestDetailSection
    //     singleContestData={this.props.singleContestData}
    //   />;
    // }
  };

  handleParticipants = () => {
    this.props.navigation.navigate('ContestParticipants', {
      contestId: this.props.singleContestData[0].id,
    });
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
      activeTabStyle,
      inActiveTabStyle,
      tabMenuConatinerStyle,
    } = styles;

    const {singleContestData, isFetchingSingleContest, navigation} = this.props;

    let topStyle = {
      flex: 1,
      //  marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
    };
    if (isFetchingSingleContest || singleContestData.length === 0) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" style={{color: '#44a4f7'}} />
        </View>
      );
    } else {
      return (
        <View style={topStyle}>
          <Spinner
            visible={this.props.isJoiningContest}
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
                  onPress={() => navigation.goBack(null)}
                  style={backButtonContainerStyle}>
                  <Icon name="arrow-round-back" style={{color: '#44a4f7'}} />
                </TouchableOpacity>
              </View>
              <View style={profilePixContainerStyle}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UsersProfile', {
                      user: singleContestData[0].owner.id,
                    })
                  }>
                  {this.renderProfilePhoto()}
                </TouchableOpacity>
                <Text style={titleContestStyle}>
                  {singleContestData[0].name}
                </Text>
              </View>
              <Text style={userNameStyle}>
                {/* // {userData.firstName + " " + userData.lastName} */}
              </Text>
              {this.renderJoinButton()}
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
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={() => this.handleShowSection(1)}>
                <Text
                  style={
                    this.state.infoSection ? activeTabStyle : inActiveTabStyle
                  }>
                  Info
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleShowSection(2)}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={
                    this.state.awardSection ? activeTabStyle : inActiveTabStyle
                  }>
                  Award
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleParticipants()}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={
                    this.state.participantSection
                      ? activeTabStyle
                      : inActiveTabStyle
                  }>
                  Participants
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleShowSection(4)}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={
                    this.state.viewSection ? activeTabStyle : inActiveTabStyle
                  }>
                  Views
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {this.renderContent()}

            {/* </Animated.View> */}
            {/* </ScrollView> */}
            {/* </ScrollView> */}
          </Animated.ScrollView>
        </View>
      );
    }
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

  textStyle: {
    lineHeight: '20rem',
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
  activeTabStyle: {
    color: '#44a4f7',
  },
  inActiveTabStyle: {
    color: '#707070',
  },
});

const mapStateToProps = ({profileSetup, auth, contest}) => {
  const {userData} = profileSetup;
  const {userId, token} = auth;
  const {
    singleContestData,
    isFetchingSingleContest,
    isJoiningContest,
  } = contest;
  console.log(
    'media',
    singleContestData,
    isFetchingSingleContest,
    isJoiningContest,
  );
  return {
    userData,
    userId,
    token,
    singleContestData,
    isFetchingSingleContest,
    isJoiningContest,
  };
};
export default connect(
  mapStateToProps,
  {fetchSingleContest, handleJoinContest},
)(DetailContestScreen);
