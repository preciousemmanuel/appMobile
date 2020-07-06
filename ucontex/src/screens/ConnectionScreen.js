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
  Input,
} from 'native-base';

import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';

import PeopleMayFollowSection from '../components/PeopleMayFollowSection';

import {followUser} from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
class ConnectionScreen extends Component {
  // componentDidMount() {
  //   this.setState({ data });
  //   this.arrayData = data;
  // }

  renderFollowButton = type => {
    if (type == 1) {
      return (
        <View style={styles.followingButtonStyle}>
          <Text style={styles.followTextStyle}>Following</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity style={styles.followButtonStyle}>
        <Text style={{color: '#707070', fontWeight: '300'}}>Follow</Text>
      </TouchableOpacity>
    );
  };

  onHandleFollow = userToFollow => {
    const {userId, token} = this.props;

    this.props.followUser({userId, token, userToFollow});
  };

  renderFollowingData = () => {
    if (_.size(this.props.userData.data.userData.following) < 1) {
      return <Text>You do not follow anyone yet.</Text>;
    }
    return this.props.userData.data.userData.following
      .slice(0, 10)
      .map((data, index) => {
        return (
          <View key={index} style={styles.followRowStyle}>
            <TouchableWithoutFeedback
              onPress={() => {
                //console.log("dfg", this.props.item.owner.id);
                this.props.navigation.navigate('UsersProfile', {
                  user: data.id,
                });
              }}>
              <Image
                resizeMode="cover"
                style={styles.profileImageStyle}
                source={require('../assets/user.png')}
              />
            </TouchableWithoutFeedback>
            <View>
              <TouchableWithoutFeedback
                onPress={() => {
                  //console.log("dfg", this.props.item.owner.id);
                  this.props.navigation.navigate('UsersProfile', {
                    user: data.id,
                  });
                }}>
                <Text style={styles.profileNameStyle}>
                  {data.firstName + ' ' + data.lastName}
                </Text>
              </TouchableWithoutFeedback>
              <Text style={styles.discriptionStyle}>{data.description}</Text>
            </View>
            <View
              style={[
                styles.followingButtonStyle,
                {backgroundColor: '#44a4f7'},
              ]}>
              <Text style={styles.followTextStyle}>Following</Text>
            </View>
          </View>
        );
      });
  };
  renderFollowersData = () => {
    if (_.size(this.props.userData.data.userData.followers) < 1) {
      return <Text>No one follows you yet.</Text>;
    }
    return this.props.userData.data.userData.followers
      .slice(0, 10)
      .map((data, index) => {
        return (
          <View key={index} style={styles.followRowStyle}>
            <TouchableWithoutFeedback
              onPress={() => {
                //console.log("dfg", this.props.item.owner.id);
                this.props.navigation.navigate('UsersProfile', {
                  user: data.id,
                });
              }}>
              <Image
                resizeMode="cover"
                style={styles.profileImageStyle}
                source={require('../assets/user.png')}
              />
            </TouchableWithoutFeedback>
            <View>
              <TouchableWithoutFeedback
                onPress={() => {
                  //console.log("dfg", this.props.item.owner.id);
                  this.props.navigation.navigate('UsersProfile', {
                    user: data.id,
                  });
                }}>
                <Text style={styles.profileNameStyle}>
                  {data.firstName + ' ' + data.lastName}
                </Text>
              </TouchableWithoutFeedback>
              <Text style={styles.discriptionStyle}>{data.description}</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.onHandleFollow(data.id)}
              style={[
                styles.followingButtonStyle,
                {
                  backgroundColor: '#ffffff',
                  borderColor: '#707070',
                  borderStyle: 'solid',
                  borderWidth: 1,
                },
              ]}>
              <Text style={[styles.followTextStyle, {color: '#707070'}]}>
                Follow
              </Text>
            </TouchableOpacity>
          </View>
        );
      });
  };

  render() {
    //  console.log("pee", this.props.userData.data);
    const {userData} = this.props.userData.data;
    const {
      titleStyle,
      containerStyle,
      profileImageStyle,
      itemContainerStyle,
      followButtonStyle,
      headerTitleStyle,
      followContainerStyle,
      followRowStyle,
      profileNameStyle,
      discriptionStyle,
      followTextStyle,
    } = styles;

    return (
      <View style={{flex: 1}}>
        <Spinner
          // size="medium"
          visible={this.props.isFollowBtnClick}
          color="#44a4f7"
          overlayColor="rgba(0, 0, 0, 0.1)"
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.menuContainerStyle}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ProfileFollowing', {
                  user: this.props.userId,
                })
              }>
              <Text style={{fontWeight: '800'}}>
                Following
                <Text> {_.size(userData.following)}</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ProfileFollow', {
                  user: this.props.userId,
                })
              }>
              <Text style={{fontWeight: '800'}}>
                Followers
                <Text> {_.size(userData.followers)}</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{fontWeight: '800'}}>Invite</Text>
            </TouchableOpacity>
          </View>
          <PeopleMayFollowSection />
          <View style={containerStyle}>
            <View style={followContainerStyle}>
              <Text style={titleStyle}>People you follow</Text>
              {this.renderFollowingData()}
            </View>

            <View style={followContainerStyle}>
              <Text style={titleStyle}>People that follows you</Text>

              {this.renderFollowersData()}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  titleStyle: {
    fontWeight: '500',
    marginBottom: '25rem',
  },
  containerStyle: {
    paddingLeft: '18rem',
    paddingBottom: '18rem',
    paddingRight: '18rem',
    marginRight: '29rem',
  },
  itemContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '22rem',
  },
  profileImageStyle: {
    width: '50rem',
    height: '50rem',
    marginRight: '12rem',
  },

  headerTitleStyle: {
    color: '#44a4f7',
    fontSize: '18rem',
    fontWeight: '500',
    lineHeight: '20rem',
  },
  followButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100rem',
    height: '30rem',
    borderRadius: '10rem',
    borderColor: '#707070',
    borderStyle: 'solid',
    borderWidth: 1,
    marginRight: '10rem',
  },
  followingButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '60rem',
    height: '20rem',
    borderRadius: '10rem',
    backgroundColor: '#44a4f7',
    marginLeft: '24rem',
    marginRight: '10rem',
    marginTop: '20rem',
  },
  personIconStyle: {
    fontSize: '10rem',
    color: '#707070',
    marginRight: '5rem',
  },
  menuContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '16rem',
    paddingRight: '16rem',
    paddingTop: '19rem',
  },
  followContainerStyle: {
    marginTop: '20rem',
  },
  followRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '30rem',
  },
  profileNameStyle: {
    fontSize: '15rem',
    fontWeight: '500',
  },
  discriptionStyle: {
    color: '#707070',
    fontSize: '12rem',
    fontWeight: '400',
    width: '200rem',
  },
  followTextStyle: {color: '#ffffff', fontSize: '10rem', fontWeight: '200'},
});

const mapStateToProps = ({profileSetup, auth}) => {
  const {isFollowBtnClick} = profileSetup;
  const {userId, token, userData} = auth;
  //  console.log("pee", userData);
  return {userData, userId, token, isFollowBtnClick};
};
export default connect(
  mapStateToProps,
  {followUser},
)(ConnectionScreen);
