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
import _ from 'lodash';

import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import {STATUS_BAR} from '../config';

import ProgressiveRoundImage from '../components/ProgressiveRoundImage';
import {selectActiveFollowerUser, fetchUsersProfile} from '../actions';

const data = [
  {
    id: '1',
    name: 'Precious Emmma',
    follow: 1,
    following: 0,
  },
  {
    id: '2',
    name: 'Grace Bucks',
    follow: 1,
    following: 0,
  },
  {
    id: '3',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '4',
    name: 'Precious',
    follow: 1,
    following: 1,
  },
  {
    id: '5',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '6',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '7',
    name: 'Precious Emmanuel',
    follow: 1,
    following: 1,
  },
  {
    id: '8',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '9',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '10',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '11',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '12',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '13',
    name: 'Dickson John',
    follow: 1,
    following: 0,
  },
  {
    id: '14',
    name: 'Ola Jobs',
    follow: 1,
    following: 1,
  },
  {
    id: '15',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '16',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
];

const SCREEN_WIDTH = Dimensions.get('window').width;
class ProfileFollowersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.arrayData = [];
  }

  componentDidMount() {
    // this.setState({ data });
    // this.arrayData = data;
    const user = this.props.navigation.getParam('user');
    //  console.log("uid", user, this.props.userId);
    this.props.fetchUsersProfile({
      user,
      token: this.props.token,
      authUser: this.props.userId,
    });
  }

  searchFilterFunction = text => {
    const newData = this.arrayData.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({data: newData});
  };

  renderHeader = () => {
    return (
      <View searchBar rounded style={{marginBottom: 10}}>
        <Item>
          <Icon name="ios-search" style={{color: '#e4e4e4'}} />
          <Input
            placeholderTextColor="#e4e4e4"
            placeholder="Search Followers"
            onChangeText={text => this.searchFilterFunction(text)}
          />
          <Icon name="ios-people" style={{color: '#e4e4e4'}} />
        </Item>
      </View>
    );
  };

  checkIfUserAlreadyFollowed = () => {
    // console.log("tp", typeof this.props.usersProfileData.followers);
    if (typeof this.props.usersProfileData.followers !== 'undefined') {
      return this.props.usersProfileData.followers.some(obj => {
        return obj.id === this.props.userId;
      });
    }
  };

  renderFollowButton = () => {
    if (this.checkIfUserAlreadyFollowed()) {
      //login user is a follower
      return (
        <View style={styles.followingButtonStyle}>
          <Text style={{color: '#ffffff'}}>Following</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity style={styles.followButtonStyle}>
        <Text style={{color: '#707070', fontWeight: '300'}}>Follow</Text>
      </TouchableOpacity>
    );
  };

  renderProfileImage = user => {
    console.log('edss', user);
    if (user.profilePictures.length > 0) {
      let numberOfPicx = user.profilePictures.length;
      return (
        <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.navigate('UsersProfile', {
              user: user.id,
            })
          }>
          <ProgressiveRoundImage
            resizeMode="cover"
            style={styles.profileImageStyle}
            source={{
              uri: user.profilePictures[numberOfPicx - 1].url,
            }}
          />
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            //  console.log("dfg", user.id);
            this.props.navigation.navigate('UsersProfile', {
              user: user.id,
            });
          }}>
          <Image
            resizeMode="cover"
            source={require('../assets/user.png')}
            style={styles.profileImageStyle}
          />
        </TouchableWithoutFeedback>
      );
    }
  };

  renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.itemContainerStyle}>
        <TouchableWithoutFeedback
          onPress={() => {
            //console.log("dfg", this.props.item.owner.id);
            this.props.navigation.navigate('UsersProfile', {
              user: item.id,
            });
          }}>
          <View style={{flexDirection: 'row'}}>
            {this.renderProfileImage(item)}
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon name="person" style={styles.personIconStyle} />
                <Text style={{fontSize: 10, fontWeight: '300'}}>Follower</Text>
              </View>

              <Text style={{color: '#000000', fontWeight: '800'}}>
                {`${item.firstName} ${item.lastName}`}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{flexDirection: 'row'}}>
          {this.renderFollowButton()}
          <TouchableOpacity>
            <Icon name="more" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  render() {
    //console.log("gethjhj", this.props.selectedMedia);
    const {
      titleStyle,
      containerStyle,
      profileImageStyle,
      itemContainerStyle,
      followButtonStyle,
      headerTitleStyle,
    } = styles;

    return (
      <View style={{flex: 1}}>
        <View>
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
                onPress={() => this.props.navigation.goBack()}>
                <Icon style={{color: '#44a4f7'}} name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Text style={headerTitleStyle}>
                {_.size(this.props.usersProfileData.followers) + ' '} Followers
              </Text>
            </Body>
          </Header>

          <View style={containerStyle}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.props.usersProfileData.followers}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={this.renderHeader}
              // onTouchStart={this.props.onTouchStarts}
              // onMomentumScrollEnd={this.props.onMomentumScrollEnds}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  titleStyle: {
    paddingTop: '17rem',
    paddingLeft: '17rem',
    paddingBottom: '9rem',
  },
  containerStyle: {
    paddingLeft: '18rem',
    paddingBottom: '18rem',
    paddingRight: '18rem',
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
    width: '100rem',
    height: '30rem',
    borderRadius: '10rem',
    backgroundColor: '#44a4f7',
    marginRight: '10rem',
  },
  personIconStyle: {
    fontSize: '10rem',
    color: '#707070',
    marginRight: '5rem',
  },
});

const mapStateToProps = ({profileSetup, auth}, ownProps) => {
  const {usersProfileData, is_loading, isFollowBtnClick} = profileSetup;
  const {token, userId} = auth;
  //console.log("profsss", ownProps);
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
  {fetchUsersProfile},
)(ProfileFollowersScreen);
