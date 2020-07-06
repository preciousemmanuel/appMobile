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
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScaleImage from 'react-native-scalable-image';
import FastImage from 'react-native-fast-image';
import ProgressiveRoundImage from '../components/ProgressiveRoundImage';
import ProfilePicture from '../components/ProfilePicture';

import {STATUS_BAR} from '../config';

const SCREEN_WIDTH = Dimensions.get('window').width;
class PreviewContestPostScreen extends Component {
  renderMedia = () => {
    if (this.props.contestMedia.length > 0) {
      return (
        <View style={{marginBottom: 5}}>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            style={{flex: 1, minHeight: 300, width: SCREEN_WIDTH}}
            source={{uri: this.props.contestMedia[0].file}}
          />
        </View>
      );
    } else {
      return (
        <Text style={{alignSelf: 'center', marginTop: 20, marginBottom: 20}}>
          Please select image. Contest with image is highly recommended!
        </Text>
      );
    }
  };

  renderPublishButton = () => {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('PaystackPayment')}
        style={styles.publishButtonStyle}>
        <Text style={{color: '#ffffff'}}>Continue</Text>
      </Button>
    );
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

    return (
      <View style={containerStyle}>
        <Header
          style={{
            //marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
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
            <Text style={headerTitleStyle}>Preview mode</Text>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('CreateContest')}>
              <Text style={{color: '#44a4f7'}}>Edit</Text>
            </Button>
          </Right>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 22}}>
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
                <View>
                  <Text style={profileTitleNameStyle}>
                    {this.props.userData.data.userData.firstName}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={[
                        styles.statusIconStyle,
                        {backgroundColor: '#55f976'},
                      ]}
                    />
                    <Text style={styles.categoryTitleStyle}>
                      {this.props.category + ' Promotion'}
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.titleBrandStyles}>{this.props.title}</Text>

              <Text style={styles.titleStyle}>{this.props.description}</Text>
            </View>

            <View>{this.renderMedia()}</View>

            <View style={styles.otherContainerStyle}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text style={{color: '#686767', fontWeight: '300'}}>
                    ₦{this.props.contestAmount}
                  </Text>
                  <Text style={{color: '#000000', fontWeight: '300'}}>
                    Prize Award
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={{color: '#686767', fontWeight: '300'}}>0</Text>
                  <Text style={{color: '#000000', fontWeight: '300'}}>
                    Participants
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={{color: '#686767', fontWeight: '300'}}>0</Text>
                  <Text style={{color: '#000000', fontWeight: '300'}}>
                    Views
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Button style={styles.joinButtonStyle}>
                    <Text style={{color: '#ffffff'}}>Join</Text>
                  </Button>
                </View>
              </View>
            </View>

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
    fontWeight: '800',
  },
  categoryTitleStyle: {
    color: '#ababab',
    // fontFamily: "Avenir",
    fontSize: '12rem',
    fontWeight: '500',
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
    width: '90%',
    height: '45rem',
    marginTop: '29rem',
    backgroundColor: '#44a4f7',
    alignSelf: 'center',
    marginBottom: '30rem',
  },
  firstPanelStyle: {
    paddingLeft: '18rem',
    paddingRight: '18rem',
    marginBottom: '10rem',
  },
  statusIconStyle: {
    width: '8rem',
    height: '8rem',
    borderRadius: '75rem',
    marginRight: '4rem',
    marginTop: '3rem',
  },
  titleBrandStyles: {
    marginTop: '35rem',
    marginBottom: '15rem',
    color: '#000000',
    fontSize: '15rem',
    fontWeight: '800',
  },
  joinButtonStyle: {
    width: '60rem',
    height: '25rem',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#44a4f7',
    alignSelf: 'center',
  },
  otherContainerStyle: {
    padding: '14rem',
  },
});

const mapStateToProps = ({contest, auth}) => {
  const {contestMedia, title, description, contestAmount, category} = contest;

  const {userId, token, userData} = auth;
  console.log('conP', contestMedia);
  return {
    contestMedia,
    title,
    description,
    contestAmount,
    category,
    userData,
  };
};
export default connect(mapStateToProps)(PreviewContestPostScreen);
