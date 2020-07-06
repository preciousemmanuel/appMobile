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
  CheckBox,
} from 'native-base';
import {STATUS_BAR} from '../config';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import {
  selectPoepleToPin,
  fetchUsersProfile,
  removePeopleToPin,
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

//const SCREEN_WIDTH = Dimensions.get("window").width;
class PinPeopleScreen extends Component {
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
    // const user = this.props.navigation.getParam("user");
    //  console.log("uid", user, this.props.userId);
    this.props.fetchUsersProfile({
      user: this.props.userId,
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

  removePeopleToPin = index => {
    this.props.removePeopleToPin(index);
  };

  renderUserPinPeople = () => {
    // console.log("sddaq", this.props.usersToPin);
    return this.props.usersToPin.map((user, index) => {
      // console.log("cattt", user);
      return (
        <View key={index} style={styles.selectedContainerStyle}>
          <Text style={{marginRight: 5}}>
            {user.firstName + ' ' + user.lastName}
          </Text>
          <TouchableOpacity onPress={() => this.removePeopleToPin(index)}>
            <Icon name="close" style={styles.closeIconStyle} />
          </TouchableOpacity>
        </View>
      );
    });
  };

  renderFlatListHeader = () => {
    // console.log("sddaq44", this.props.usersToPin);
    return (
      <View searchBar rounded style={{marginBottom: 10, marginTop: 30}}>
        {/* <Item>
          <Icon name="ios-search" style={{ color: "#e4e4e4" }} />
          <Input
            placeholderTextColor="#e4e4e4"
            placeholder="Search Followers"
            onChangeText={text => this.searchFilterFunction(text)}
          />
          <Icon name="ios-people" style={{ color: "#e4e4e4" }} />
        </Item> */}
        <View
          style={{
            borderColor: '#707070',
            borderBottomWidth: 1,
            flexDirection: 'row',
          }}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {this.renderUserPinPeople()}
          </ScrollView>
        </View>
        <Text style={{color: '#44a4f7', fontWeight: '500', marginTop: 10}}>
          Followers
        </Text>
      </View>
    );
  };

  checkUserAlreadyPin = user => {
    console.log('sdsdsd', user);
    return this.props.usersToPin.some(elem => {
      console.log('dfffr', elem);
      return elem.id === user.id;
    });
  };
  renderUserHasPin = (user, index) => {
    if (this.checkUserAlreadyPin(user)) {
      //user is alredy pin
      return (
        // <TouchableOpacity onPress={() => this.removePeopleToPin(index)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox color="#44a4f7" checked={true} />

          <Image
            resizeMode="cover"
            style={styles.profileImageStyle}
            source={require('../assets/user.png')}
          />
          <Text style={{color: '#000000', fontWeight: '800'}}>
            {`${user.firstName} ${user.lastName}`}
          </Text>
        </View>
        // </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={() => this.props.selectPoepleToPin(user)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            color="#44a4f7"
            onPress={() => this.props.selectPoepleToPin(user)}
          />

          <Image
            resizeMode="cover"
            style={styles.profileImageStyle}
            source={require('../assets/user.png')}
          />
          <Text style={{color: '#000000', fontWeight: '800'}}>
            {`${user.firstName} ${user.lastName}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
    // if (this.props.usersToPin.length > 0) {
    //   return this.props.usersToPin.map(checkUser => {
    //     console.log("check", checkUser);
    //
    //     return <CheckBox color="#44a4f7" checked={checkUser.id === user.id} />;
    //   });
    // }
    // return <CheckBox color="#44a4f7" />;
  };

  renderItem = (item, index) => {
    return (
      <View key={index} style={styles.itemContainerStyle}>
        {this.renderUserHasPin(item, index)}
      </View>
    );
  };
  render() {
    // console.log("fdfdf", this.props.usersToPin.length);
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
              //marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
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
              <Text style={headerTitleStyle}>Pin People</Text>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate('CreatePost')}>
                <Text style={{color: '#44a4f7'}}>Done</Text>
              </Button>
            </Right>
          </Header>

          <View style={containerStyle}>
            <FlatList
              extraData={this.props}
              renderItem={({item, index}) => {
                // console.log("basds", item, index);
                return (
                  <Fragment>
                    {!index && this.renderFlatListHeader()}
                    {this.renderItem(item, index)}
                  </Fragment>
                );
              }}
              showsVerticalScrollIndicator={false}
              data={this.props.usersProfileData.following}
              keyExtractor={(item, index) => index.toString()}
              // ListHeaderComponent={this.renderFlatListHeader}
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
    marginLeft: '24rem',
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
  selectedContainerStyle: {
    padding: '7rem',
    marginRight: '5rem',
    marginBottom: '5rem',
    backgroundColor: '#f7f8f9',
    borderColor: '#e4e4e4',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: '10rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  closeIconStyle: {
    fontSize: '19rem',
    color: '#707070',
  },
});

const mapStateToProps = ({post, profileSetup, auth}) => {
  const {usersToPin} = post;
  const {usersProfileData} = profileSetup;
  const {token, userId} = auth;

  // console.log("ss", usersToPin);
  return {usersToPin, usersProfileData, token, userId};
};
export default connect(
  mapStateToProps,
  {selectPoepleToPin, removePeopleToPin, fetchUsersProfile},
)(PinPeopleScreen);
