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
import FastImage from 'react-native-fast-image';
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
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScaleImage from 'react-native-scalable-image';

import {publishPost} from '../actions';
import ProgressiveRoundImage from '../components/ProgressiveRoundImage';

import {STATUS_BAR} from '../config';

const SCREEN_WIDTH = Dimensions.get('window').width;
class PreviewCreatePostScreen extends Component {
  onPublishPost = () => {
    const {
      category,
      message,
      postMedia,
      userData,
      token,
      userId,
      usersToPin,
    } = this.props;
    this.props.publishPost(
      {
        category,
        message,
        postMedia,
        userId,
        token,
        usersToPin,
      },
      () => {
        this.props.navigation.navigate('NewsFeed');
      },
    );
  };
  renderMedia = () => {
    if (this.props.postMedia.length > 0) {
      return this.props.postMedia.map((media, index) => {
        return (
          <View
            key={index}
            style={{
              marginBottom: 5,

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              style={{flex: 1, minHeight: 300, width: SCREEN_WIDTH}}
              source={{uri: media.file}}
            />
          </View>
        );
      });
    } else {
      return <Text style={{alignSelf: 'center'}}>No Image to preview</Text>;
    }
  };
  renderProfileImage = () => {
    //console.log("edss", this.props.userData);
    if (this.props.userData.data.userData.profilePictures.length > 0) {
      let numberOfPicx = this.props.userData.data.userData.profilePictures
        .length;
      return (
        <ProgressiveRoundImage
          resizeMode="cover"
          style={styles.profileImageNetStyle}
          source={{
            uri: this.props.userData.data.userData.profilePictures[
              numberOfPicx - 1
            ].url,
          }}
        />
      );
    } else {
      return (
        <Image
          resizeMode="cover"
          source={require('../assets/user.png')}
          style={profileImageStyle}
        />
      );
    }
  };

  renderPublishButton = () => {
    if (this.props.message !== '' || this.props.postMedia.length > 0) {
      return (
        <Button onPress={this.onPublishPost} style={styles.publishButtonStyle}>
          <Text style={{color: '#ffffff'}}>Publish</Text>
        </Button>
      );
    }
    return;
  };

  render() {
    //console.log("gethjhj", this.props.selectedMedia);
    const {
      containerStyle,
      titleStyle,
      postContainerStyle,
      profileTitleNameStyle,
      headerStyle,
      profileImageStyle,
      headerTitleStyle,
      publishButtonStyle,
      firstPanelStyle,
    } = styles;

    let message = '';

    if (this.props.message !== '') {
      message = this.props.message;
    } else {
      message = 'No Post to preview';
    }
    return (
      <View style={containerStyle}>
        <Header
          style={{
            //marginTop: Platform.OS == 'ios' ? 0 : STATUS_BARt,
            backgroundColor: '#fff',
          }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack(null)}>
              <Icon style={{color: '#44a4f7'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={headerTitleStyle}>Preview Post</Text>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('CreatePost')}>
              <Text style={{color: '#44a4f7'}}>Edit Post</Text>
            </Button>
          </Right>
        </Header>

        <ScrollView>
          <Spinner
            visible={this.props.loading}
            color="#44a4f7"
            overlayColor="rgba(0, 0, 0, 0)"
          />
          <View style={{marginTop: 10}}>
            <View style={firstPanelStyle}>
              <View style={headerStyle}>
                <ProfilePicture
                  onPress={() =>
                    this.props.navigation.navigate('UsersProfile', {
                      user: this.props.userId,
                    })
                  }
                  style={styles.profileImageNetStyle}
                  profilePictures={
                    this.props.userData.data.userData.profilePictures
                  }
                />
                <Text style={profileTitleNameStyle}>
                  {this.props.userData.data.userData.firstName +
                    ' ' +
                    this.props.userData.data.userData.lastName}
                </Text>
              </View>

              <Text style={styles.titleStyle}>{message}</Text>
            </View>

            {this.renderMedia()}

            {this.renderPublishButton()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  titleStyle: {},

  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageStyle: {
    alignSelf: 'stretch',
    borderRadius: '75rem',
    width: '46rem',
    height: '46rem',
    marginRight: '15rem',
  },
  profileImageNetStyle: {
    width: '46rem',
    height: '46rem',
    marginRight: '15rem',
  },
  profileTitleNameStyle: {
    fontSize: '15rem',
    color: '#000',
    fontWeight: '700',
  },
  headerTitleStyle: {
    color: '#44a4f7',
    fontSize: '18rem',
    fontWeight: '500',
    lineHeight: '20rem',
  },

  publishButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '105rem',
    height: '35rem',
    marginLeft: '10rem',
    backgroundColor: '#44a4f7',
    alignSelf: 'center',
    marginBottom: '20rem',
  },
  firstPanelStyle: {
    paddingLeft: '18rem',
    paddingRight: '18rem',
    marginBottom: '10rem',
  },
});

const mapStateToProps = ({post, auth}) => {
  const {
    postMedia,
    index,
    message,
    category,
    location,
    loading,
    usersToPin,
  } = post;
  //const {} = profileSetup;
  const {userId, token, userData} = auth;
  return {
    postMedia,
    index,
    usersToPin,
    message,
    category,
    userData,
    location,
  };
};
export default connect(
  mapStateToProps,
  {publishPost},
)(PreviewCreatePostScreen);
