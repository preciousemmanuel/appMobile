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

import {
  choosePostMedia,
  checkMediaToDelete,
  deleteMedia,
  createPostFormField,
  createPostError,
  resetCreatePostFields,
} from '../actions';

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
    id: '1',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '1',
    name: 'Precious',
    follow: 1,
    following: 1,
  },
  {
    id: '1',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '1',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '1',
    name: 'Precious Emmanuel',
    follow: 1,
    following: 1,
  },
  {
    id: '1',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '1',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '1',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '1',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '1',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '1',
    name: 'Dickson John',
    follow: 1,
    following: 0,
  },
  {
    id: '1',
    name: 'Ola Jobs',
    follow: 1,
    following: 1,
  },
  {
    id: '1',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
  {
    id: '1',
    name: 'Precious',
    follow: 1,
    following: 0,
  },
];

import {STATUS_BAR} from '../config';

const SCREEN_WIDTH = Dimensions.get('window').width;
class ProfileFollowingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.arrayData = [];
  }

  componentDidMount() {
    this.setState({data});
    this.arrayData = data;
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
            placeholder="Search Following"
            onChangeText={text => this.searchFilterFunction(text)}
          />
          <Icon name="ios-people" style={{color: '#e4e4e4'}} />
        </Item>
      </View>
    );
  };

  renderFollowButton = type => {
    if (type == 1) {
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

  renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.itemContainerStyle}>
        <View style={{flexDirection: 'row'}}>
          <Image
            resizeMode="cover"
            style={styles.profileImageStyle}
            source={require('../assets/user.png')}
          />
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 10, fontWeight: '300'}}>Follows you</Text>
            </View>

            <Text style={{color: '#000000', fontWeight: '800'}}>
              {item.name}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          {this.renderFollowButton(item.following)}
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
              <Text style={headerTitleStyle}>5,000 Following</Text>
            </Body>
          </Header>

          <View style={containerStyle}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.data}
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
    borderRadius: '75rem',
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

// const mapStateToProps = ({ feed }) => {
//   const { postMedia, index } = feed;
//   console.log("media", postMedia);
//   return { postMedia, index };
// };
export default ProfileFollowingScreen;
