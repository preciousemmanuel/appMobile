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

import ProfileGallery from '../components/ProfileGallery';
import ProgressiveImage from '../components/ProgressiveImage';
import ProgressiveRoundImage from '../components/ProgressiveRoundImage';
import Moment from 'moment';

import {STATUS_BAR} from '../config';
const SCREEN_WIDTH = Dimensions.get('window').width;
class ProfileScreen extends Component {
  state = {enableScrollViewScroll: true, showHeader: false};

  handleScroll = event => {
    //  console.log(event.nativeEvent.contentOffset.y);
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
            marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
            backgroundColor: '#fff',
            shadowColor: 'rgba(0, 0, 0, 0.16)',
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 5,
            elevation: 2,
          }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack(null)}>
              <Icon style={{color: '#44a4f7'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={{color: '#44a4f7'}}>My Profile</Text>
          </Body>
        </Header>
      );
    }
  };

  renderCoverPhoto = () => {
    const {userData} = this.props.userData.data;
    if (userData.coverPhoto !== null) {
      return (
        <ProgressiveImage
          source={{
            uri: userData.coverPhoto.url,
          }}
          thumbnail={require('../assets/placeholder.png')}
          resizeMode="cover"
          style={styles.coverImageStyle}
        />
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
    const {userData} = this.props.userData.data;
    if (userData.profilePictures.length > 0) {
      let numberOfPicx = userData.profilePictures.length;
      return (
        <ProgressiveRoundImage
          source={{
            uri: userData.profilePictures[numberOfPicx - 1].url,
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
  renderAboutMe = () => {
    const {userData} = this.props.userData.data;
    if (
      typeof userData.description !== 'null' &&
      typeof userData.description !== 'undefined'
    ) {
      return <Text>{userData.description}</Text>;
    }
    return <Text>Add a description about yourself</Text>;
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

    const {userData} = this.props.userData.data;

    let topStyle;
    if (!this.state.showHeader) {
      topStyle = {
        flex: 1,
        marginTop: Platform.OS == 'ios' ? 0 : Constants.statusBarHeight,
      };
    } else {
      topStyle = {flex: 1};
    }
    return (
      <View style={topStyle}>
        {this.renderHeader()}

        {/* <ScrollView
          onScroll={this.handleScroll}
          scrollEnabled={this.state.enableScrollViewScroll}
        > */}
        <ScrollView onScroll={this.handleScroll} nestedScrollEnabled={true}>
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
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('EditProfile')}
              style={editProfileButton}>
              <Text>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <Text style={userNameStyle}>
            {userData.firstName + ' ' + userData.lastName}
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
                        Moment(userData.dateOfBirth).format('MMM D YYYY')}
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
                        Moment(userData.createdAt).format('MMM D YYYY')}
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
              <Text style={{fontWeight: '800'}}>13000 </Text>
              <Text style={{color: '#707070'}}>Following</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ProfileFollow')}
              style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: '800'}}>50000 </Text>
              <Text style={{color: '#707070'}}>Followers</Text>
            </TouchableOpacity>
          </View>

          <Tabs
            style={tabMenuConatinerStyle}
            tabsContainerStyle={{backgroundColor: '#fff'}}
            tabBarUnderlineStyle={{backgroundColor: '#44a4f7'}}>
            <Tab
              heading={
                <TabHeading style={{backgroundColor: '#fff'}}>
                  <Icon name="book" style={{color: '#707070'}} />
                </TabHeading>
              }>
              <Text>Tab1</Text>
            </Tab>
            <Tab
              heading={
                <TabHeading
                  style={{backgroundColor: '#fff'}}
                  textStyle={{color: '#707070'}}
                  activeTextStyle={{color: '#44a4f7', fontWeight: 'normal'}}>
                  <Icon name="images" style={{color: '#707070'}} />
                </TabHeading>
              }>
              <ProfileGallery />

              {/* <ProfileGallery
              // onTouchStarts={() => {
              //   this.onEnableScroll(false);
              // }}
              // onMomentumScrollEnd={() => {
              //   this.onEnableScroll(true);
              // }}
              /> */}
            </Tab>
            <Tab
              heading={
                <TabHeading style={{backgroundColor: '#fff'}}>
                  <Icon name="ribbon" style={{color: '#707070'}} />
                </TabHeading>
              }>
              <Text>Tab3</Text>
            </Tab>
            <Tab
              heading={
                <TabHeading style={{backgroundColor: '#fff'}}>
                  <Icon name="more" style={{color: '#707070'}} />
                </TabHeading>
              }>
              <View style={{paddingBottom: 10}}>
                <ScrollView>
                  <ListItem icon>
                    <Left>
                      <Icon name="link" style={{color: '#ababab'}} />
                    </Left>
                    <Body style={{borderBottomWidth: 0}}>
                      <Text style={{color: '#686767'}}>Profile Link</Text>
                    </Body>
                  </ListItem>

                  <ListItem icon>
                    <Left>
                      <Icon name="bookmark" style={{color: '#ababab'}} />
                    </Left>
                    <Body style={{borderBottomWidth: 0}}>
                      <Text style={{color: '#686767'}}>Saved Items</Text>
                    </Body>
                  </ListItem>
                  <ListItem icon>
                    <Left>
                      <Icon name="archive" style={{color: '#ababab'}} />
                    </Left>
                    <Body style={{borderBottomWidth: 0}}>
                      <Text style={{color: '#686767'}}>Scheduled Messages</Text>
                    </Body>
                  </ListItem>
                  <ListItem icon>
                    <Left>
                      <Icon name="analytics" style={{color: '#ababab'}} />
                    </Left>
                    <Body style={{borderBottomWidth: 0}}>
                      <Text style={{color: '#686767'}}>Acivity Log</Text>
                    </Body>
                  </ListItem>
                  <ListItem icon>
                    <Left>
                      <Icon name="settings" style={{color: '#ababab'}} />
                    </Left>
                    <Body style={{borderBottomWidth: 0}}>
                      <Text style={{color: '#686767'}}>Settings</Text>
                    </Body>
                  </ListItem>
                </ScrollView>
              </View>
            </Tab>
          </Tabs>
        </ScrollView>
        {/* </ScrollView> */}
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
});

const mapStateToProps = ({profileSetup}) => {
  const {userData} = profileSetup;
  console.log('users', userData);
  return {userData};
};
export default connect(mapStateToProps)(ProfileScreen);
