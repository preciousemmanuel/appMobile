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
} from 'native-base';

import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import Modal from 'react-native-modal';
import ScaleImage from 'react-native-scalable-image';

import {FORMAT_NUM_VALUES, STATUS_BAR} from '../config';
import UserNewsFeedSection from '../components/UserNewsFeedSection';
import UserContestSection from '../components/UserContestSection';
import ProfileGallery from '../components/ProfileGallery';
import ProgressiveImage from '../components/ProgressiveImage';
import ProgressiveRoundImage from '../components/ProgressiveRoundImage';
import Moment from 'moment';
import {fetchUsersProfile, followUser, unFollowUser} from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
class UsersProfileScreen extends React.PureComponent {
  state = {
    enableScrollViewScroll: true,
    showHeader: false,
    showProfilePicxModal: false,
    showCoverPicxModal: false,
    newsfeed: false,
    contest: false,
  };

  componentDidMount() {
    const user = this.props.navigation.getParam('user');
    //  console.log("uid", user, this.props.userId);
    this.props.fetchUsersProfile({
      user,
      token: this.props.token,
      authUser: this.props.userId,
    });
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.navigation.getParam('user') !==
      prevProps.navigation.getParam('user')
    ) {
      const user = this.props.navigation.getParam('user');
      this.props.fetchUsersProfile({
        user,
        token: this.props.token,
        authUser: this.props.userId,
      });
    }
  }

  handleShowSection = section => {
    switch (section) {
      case 1:
        this.setState({
          newsfeed: true,
          contest: false,
          participantSection: false,
          viewSection: false,
        });
        break;
      case 2:
        this.setState({
          newsfeed: false,
          contest: false,
          participantSection: false,
          viewSection: false,
        });
        break;
      case 3:
        this.setState({
          newsfeed: false,
          contest: true,
          // participantSection: true,
          // viewSection: false
        });
        break;
      case 4:
        this.setState({
          newsfeed: false,
          contest: false,
          participantSection: false,
          viewSection: true,
          joinSection: true,
        });
        break;
      case 5:
        this.setState({
          newsfeed: false,
          contest: false,
          participantSection: false,
          viewSection: false,
          joinSection: true,
        });
        break;
      default:
    }
  };
  renderContent = () => {
    if (this.state.newsfeed) {
      return (
        <UserNewsFeedSection
          navigation={this.props.navigation}
          user={this.props.navigation.getParam('user')}
        />
      );
    }
    if (this.state.contest) {
      return (
        <UserContestSection
          navigation={this.props.navigation}
          user={this.props.navigation.getParam('user')}
        />
      );
    }

    // if (this.state.participantSection) {
    //   <AwardContestDetailSection
    //     singleContestData={this.props.singleContestData}
    //   />;
    // }
  };
  handleScroll = event => {
    console.log('eveeeee', event.nativeEvent.contentOffset.y);
    if (event.nativeEvent.contentOffset.y >= 37) {
      if (!this.state.showHeader) {
        this.setState({showHeader: true});
      }
    } else {
      if (this.state.showHeader) {
        this.setState({showHeader: false});
      }
    }
  };

  onEnableScroll = (value: boolean) => {
    this.setState({
      enableScrollViewScroll: value,
    });
  };
  renderHeader = () => {
    if (this.state.showHeader) {
      return (
        <Header
          style={{
            //marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
            backgroundColor: '#fff',
            // shadowColor: "rgba(0, 0, 0, 0.16)",
            // shadowOffset: { width: 0, height: 0 },
            // shadowRadius: 5,
            // elevation: 2
          }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack(null)}>
              <Icon style={{color: '#44a4f7'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={styles.headerTitleStyle}>
              {this.props.usersProfileData.firstName + ' Profile'}
            </Text>
          </Body>
        </Header>
      );
    }
  };

  renderCoverPhoto = () => {
    const {usersProfileData} = this.props;
    const data = {...usersProfileData.coverPhoto};
    //console.log("coverPhoto", data.url);
    if (usersProfileData.coverPhoto !== null) {
      return (
        <TouchableWithoutFeedback
          onPress={() => this.setState({showCoverPicxModal: true})}>
          <ProgressiveImage
            source={{
              uri: data.url,
            }}
            thumbnail={require('../assets/placeholder.png')}
            resizeMode="cover"
            style={styles.coverImageStyle}
          />
        </TouchableWithoutFeedback>
      );
    }
    return (
      <Image
        source={require('../assets/coverphoto1.png')}
        resizeMode="cover"
        style={styles.coverImageStyle}
      />
    );
  };
  renderProfilePhoto = () => {
    const {usersProfileData} = this.props;
    const profileImages = {...usersProfileData.profilePictures};
    const sizePhoto = _.size(profileImages);
    if (sizePhoto > 0) {
      //let numberOfPicx = sizePhoto;
      return (
        <TouchableWithoutFeedback
          onPress={() => this.setState({showProfilePicxModal: true})}>
          <ProgressiveRoundImage
            source={{
              uri: profileImages[sizePhoto - 1].url,
            }}
            thumbnail={require('../assets/placeholder.png')}
            resizeMode="cover"
            style={styles.profilePicxStyle}
          />
        </TouchableWithoutFeedback>
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
  renderAboutMe = () => {
    const {usersProfileData} = this.props;
    //  console.log(usersProfileData);
    if (
      usersProfileData.description !== 'null' &&
      typeof usersProfileData.description !== 'undefined' &&
      usersProfileData.description !== ''
    ) {
      return <Text>{usersProfileData.description}</Text>;
    }
    return <Text>No Description Yet</Text>;
  };

  handleDateOfBirth = () => {
    let date = new Date(this.props.userData.data.userData.dateOfBirth);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    return (
      <Text style={styles.detailIconTextStyle}>
        {'Born ' + dt + ' , ' + month + ' , ' + year}
      </Text>
    );
  };

  showEditButton = () => {
    if (this.props.usersProfileData.id === this.props.userId) {
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('EditProfile')}
          style={[styles.editProfileButton, {borderColor: '#44a4f7'}]}>
          <Text>Edit Profile</Text>
        </TouchableOpacity>
      );
    } else {
      // console.log(this.checkIfUserAlreadyFollowed(this.props.userId));
      if (this.checkIfUserAlreadyFollowed(this.props.userId)) {
        //logined user has already followed this user with profile
        if (this.props.isFollowBtnClick) {
          return (
            <TouchableWithoutFeedback style={styles.editProfileButton}>
              <ActivityIndicator size="small" color="#44a4f7" />
            </TouchableWithoutFeedback>
          );
        }
        return (
          <View>
            <TouchableOpacity
              onPress={this.onHandleUnFollow}
              style={styles.editProfileButton}>
              <Text>Unfollow</Text>
            </TouchableOpacity>
            <Text style={styles.followingTextStyle}>following</Text>
          </View>
        );
      } else {
        //login user is not followed
        if (this.props.isFollowBtnClick) {
          return (
            <TouchableWithoutFeedback style={styles.editProfileButton}>
              <ActivityIndicator size="small" color="#44a4f7" />
            </TouchableWithoutFeedback>
          );
        }
        return (
          <TouchableOpacity
            onPress={this.onHandleFollow}
            style={styles.editProfileButton}>
            <Text>Follow</Text>
          </TouchableOpacity>
        );
      }
    }
  };

  //this method checks if this user has been followed by
  //logined user.
  checkIfUserAlreadyFollowed = userId => {
    // console.log("tp", typeof this.props.usersProfileData.followers);
    if (typeof this.props.usersProfileData.followers !== 'undefined') {
      return this.props.usersProfileData.followers.some(obj => {
        return obj.id === userId;
      });
    }
  };

  onHandleFollow = () => {
    const {userId, token, usersProfileData} = this.props;

    this.props.followUser({userId, token, userToFollow: usersProfileData.id});
  };
  onHandleUnFollow = () => {
    const {userId, token, usersProfileData} = this.props;

    this.props.unFollowUser({
      userId,
      token,
      userToUnfollow: usersProfileData.id,
    });
  };

  showProfilePicxModal = () => {
    const {usersProfileData} = this.props;
    const profileImages = {...usersProfileData.profilePictures};
    const sizePhoto = _.size(profileImages);
    if (sizePhoto > 0) {
      //let numberOfPicx = sizePhoto;
      return (
        <ScaleImage
          width={SCREEN_WIDTH - 30}
          source={{uri: profileImages[sizePhoto - 1].url}}
        />
      );
    }
    return (
      <ScaleImage
        width={SCREEN_WIDTH - 30}
        source={require('../assets/user.png')}
      />
    );
  };
  showCoverPicxModal = () => {
    const {usersProfileData} = this.props;
    const data = {...usersProfileData.coverPhoto};
    //console.log("coverPhoto", data.url);
    if (usersProfileData.coverPhoto !== null) {
      return <ScaleImage width={SCREEN_WIDTH - 30} source={{uri: data.url}} />;
    }
    return (
      <ScaleImage
        width={SCREEN_WIDTH - 30}
        source={require('../assets/coverphoto1.png')}
      />
    );
  };

  renderUserData = () => {
    const {usersProfileData} = this.props;
    const {
      coverImageStyle,
      backButtonContainerStyle,
      profilePicxStyle,
      profilePixContainerStyle,
      editProfileButton,
      userNameStyle,
      detailSectionStyle,
      detailIconStyle,
      detailIconTextStyle,
      followPanelStyle,
      tabMenuConatinerStyle,
      activeTabStyle,
      inActiveTabStyle,
    } = styles;
    return (
      <View style={{backgroundColor: '#ffffff'}}>
        <View>
          {this.renderCoverPhoto()}
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack(null)}
            style={backButtonContainerStyle}>
            <Icon name="arrow-round-back" style={{color: '#44a4f7'}} />
          </TouchableOpacity>
        </View>
        <View style={profilePixContainerStyle}>
          {this.renderProfilePhoto()}
          {this.showEditButton()}
        </View>
        <Text style={userNameStyle}>
          {usersProfileData.firstName + ' ' + usersProfileData.lastName}
        </Text>
        <View style={detailSectionStyle}>
          <View style={{flex: 1}}>
            {this.renderAboutMe()}

            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="pin" style={detailIconStyle} />
                  <Text style={detailIconTextStyle}>Nigeria</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="pizza" style={detailIconStyle} />
                  <Text style={styles.detailIconTextStyle}>
                    {'Born ' +
                      Moment(usersProfileData.dateOfBirth).format('MMM D YYYY')}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="calendar" style={detailIconStyle} />
                  <Text style={detailIconTextStyle}>
                    {'Joined ' +
                      Moment(usersProfileData.createdAt).format('MMM D YYYY')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={followPanelStyle}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ProfileFollowing')}
            style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: '800'}}>
              {_.size(usersProfileData.following)}{' '}
            </Text>
            <Text style={{color: '#707070'}}>Following</Text>
          </TouchableOpacity>
          {/* onPress={() =>
            this.props.navigation.navigate("Comment", {
              postId: this.props.item.id
            })
          } */}
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ProfileFollow', {
                user: usersProfileData.id,
              })
            }
            style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: '800'}}>
              {_.size(usersProfileData.followers)}{' '}
            </Text>
            <Text style={{color: '#707070'}}>Followers</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabMenuConatinerStyle}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            // onPress={() => this.handleShowSection(1)}
            onPress={() =>
              this.props.navigation.navigate('UsersNewsFeed', {
                user: usersProfileData.id,
                name: usersProfileData.firstName,
              })
            }>
            <Icon
              name="book"
              style={this.state.newsfeed ? activeTabStyle : inActiveTabStyle}
            />
            <Text style={{fontWeight: '500', marginLeft: 7}}>
              {FORMAT_NUM_VALUES(usersProfileData.totalPosts)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="images" style={{color: '#707070'}} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            onPress={() =>
              this.props.navigation.navigate('UserContest', {
                user: usersProfileData.id,
                name: usersProfileData.firstName,
              })
            }>
            <Icon
              name="ribbon"
              style={this.state.contest ? activeTabStyle : inActiveTabStyle}
            />
            <Text style={{fontWeight: '500', marginLeft: 7}}>
              {FORMAT_NUM_VALUES(usersProfileData.totalContests)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="more" style={{color: '#707070'}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    //console.log("gethjhj", this.props.selectedMedia);
    const {
      coverImageStyle,
      backButtonContainerStyle,
      profilePicxStyle,
      profilePixContainerStyle,
      editProfileButton,
      userNameStyle,
      detailSectionStyle,
      detailIconStyle,
      detailIconTextStyle,
      followPanelStyle,
      tabMenuConatinerStyle,
    } = styles;

    //const { userData } = this.props.userData.data;
    const {usersProfileData, navigation, is_loading} = this.props;

    let topStyle;
    if (!this.state.showHeader) {
      topStyle = {
        flex: 1,
        //marginTop: Platform.OS == 'ios' ? 0 : Constants.statusBarHeight,
      };
    } else {
      topStyle = {flex: 1};
    }
    if (is_loading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
          }}>
          <ActivityIndicator size="large" color="#44a4f7" />
        </View>
      );
    }

    return (
      <View style={[topStyle, {backgroundColor: '#f3f3f3'}]}>
        {this.renderHeader()}

        {/* <ScrollView
              onScroll={this.handleScroll}
              scrollEnabled={this.state.enableScrollViewScroll}
            > */}
        <Modal
          isVisible={this.state.showProfilePicxModal}
          onBackdropPress={() =>
            this.setState({
              showProfilePicxModal: false,
            })
          }>
          {this.showProfilePicxModal()}
        </Modal>
        <Modal
          isVisible={this.state.showCoverPicxModal}
          onBackdropPress={() =>
            this.setState({
              showCoverPicxModal: false,
            })
          }>
          {this.showCoverPicxModal()}
        </Modal>

        {/* </ScrollView> */}
        <ScrollView onScroll={this.handleScroll}>
          {this.renderUserData()}
          {/* {this.renderContent()} */}
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  coverImageStyle: {
    width: '100%',
    height: '190rem',
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
    justifyContent: 'space-between',
    paddingLeft: '17rem',
    paddingRight: '17rem',
  },
  editProfileButton: {
    width: '87rem',
    height: '27rem',
    borderRadius: '10rem',
    borderColor: '#000000',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    marginTop: '11rem',
    justifyContent: 'center',
    alignItems: 'center',
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
    minHeight: '110rem',
    // shadowColor: "rgba(0, 0, 0, 0.16)",
    // shadowOffset: { width: 0, height: 0 },
    // shadowRadius: 2,
    // elevation: 2,
    // borderColor: "#e4e4e4",
    // borderStyle: "solid",
    // borderWidth: 1,
    backgroundColor: '#ffffff',
    marginRight: '9rem',
    marginLeft: '9rem',
    marginTop: '30rem',
    marginBottom: '15rem',
  },
  detailIconStyle: {
    color: '#44a4f7',
    // 707070
    marginRight: '2rem',
    fontSize: '19rem',
  },
  detailIconTextStyle: {
    fontSize: '12rem',
  },
  followPanelStyle: {
    width: '100%',
    height: '55rem',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    backgroundColor: '#ffffff',
    elevation: 2,
    marginTop: '8rem',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabMenuConatinerStyle: {
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 1,
    backgroundColor: '#ffffff',
    marginTop: '9rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '20rem',
    paddingRight: '20rem',
    alignItems: 'center',
    paddingBottom: '10rem',
    borderBottomWidth: '1rem',
    borderBottomColor: '#f0f0f0',
  },
  addButtonStyle: {
    width: '40rem',
    height: '40rem',
    borderRadius: '50rem',
    backgroundColor: '#44a4f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonContStyle: {
    marginTop: '10rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreOptionContainerStyle: {
    width: '125rem',
    minHeight: '76rem',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: '3rem', height: 0},
    shadowRadius: '6rem',
    borderRadius: '2rem',
    borderColor: '#f7f8f9',
    borderStyle: 'solid',
    borderWidth: '1rem',
    backgroundColor: '#ffffff',
    elevation: '3rem',

    position: 'absolute',
    top: '36rem',
    right: '18rem',
    justifyContent: 'space-between',
    paddingTop: '12rem',
    paddingBottom: '12rem',
  },
  modalUnfinishStyle: {
    width: '100%',
    height: '300rem',
    backgroundColor: '#ffffff',

    margin: 0,
    position: 'absolute',
    bottom: 0,
  },
  removeButtonStyle: {
    position: 'absolute',
    top: '7rem',
    right: '7rem',
    width: '13rem',
    height: '13rem',
  },
  closeIconStyle: {
    color: '#707070',
    fontSize: '15rem',
  },
  secondPanel: {
    width: SCREEN_WIDTH,

    height: '190rem',

    shadowColor: 'rgba(0, 0, 0, 0.87)',

    shadowOffset: {width: '-2rem', height: 0},

    shadowRadius: '8rem',

    borderTopLeftRadius: '12rem',

    borderTopRightRadius: '12rem',

    borderBottomLeftRadius: 0,

    borderBottomRightRadius: 0,

    backgroundColor: '#eff0f2',
    // backgroundColor: "red",
    position: 'absolute',
    bottom: 0,
  },
  curvePanel: {
    justifyContent: 'center',
    paddingLeft: '24rem',
    width: SCREEN_WIDTH,
    height: '48rem',

    shadowColor: 'rgba(0, 0, 0, 0.16)',

    shadowOffset: {width: '1rem', height: 0},

    shadowRadius: '2rem',

    borderTopLeftRadius: '12rem',

    borderTopRightRadius: '12rem',

    borderBottomLeftRadius: 0,

    borderBottomRightRadius: 0,

    backgroundColor: '#ffffff',
  },
  listContainerStyle: {
    paddingTop: '19rem',
  },
  selectImageOptionContainerStyle: {
    marginTop: '30rem',
  },
  modalTitleStyle: {
    color: '#000',
    fontSize: '20rem',
    fontWeight: '500',
    lineHeight: '20rem',
    paddingTop: '20rem',
    paddingLeft: '20rem',
  },
  followingTextStyle: {
    color: '#44a4f7',
    fontSize: '10rem',
    marginLeft: '10rem',
  },
  headerTitleStyle: {
    color: '#44a4f7',
    fontSize: '18rem',
    fontWeight: '500',
    lineHeight: '20rem',
  },
  activeTabStyle: {
    color: '#44a4f7',
  },
  inActiveTabStyle: {
    color: '#707070',
  },
});

const mapStateToProps = ({profileSetup, auth, post}) => {
  const {usersProfileData, is_loading, isFollowBtnClick} = profileSetup;
  const {token, userId, userData} = auth;

  console.log('profsa', usersProfileData);
  return {
    userData,
    usersProfileData,
    token,
    userId,
    is_loading,
    isFollowBtnClick,
  };
};
export default connect(
  mapStateToProps,
  {fetchUsersProfile, followUser, unFollowUser},
)(UsersProfileScreen);
