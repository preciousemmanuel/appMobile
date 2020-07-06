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
  Input,
} from 'native-base';
import _ from 'lodash';

import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import ContestItem from '../components/ContestItem';
import {fetchContest, resetContest} from '../actions';
import {CONTEST_STATUS, STATUS_BAR} from '../config';

//const SCREEN_WIDTH = Dimensions.get("window").width;
class ClosedContestScreen extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
  }
  componentWillMount() {
    //console.log("hjjhj", this.props.token);
    const {token, userId, page, fetchContest} = this.props;

    fetchContest({
      token,
      userId,
      page: this.page,
      status: CONTEST_STATUS.CLOSED,
    });
    // BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    // Keyboard.addListener("keyboardDidShow", this.keyboardWillShow.bind(this));
    // Keyboard.addListener("keyboardDidHide", this.keyboardWillHide.bind(this));
  }

  componentWillUnmount() {
    //  this.props.resetContest();
  }

  handleLoadMore = () => {
    //alert("iiii");
    //const status = this.props.navigation.getParam("status");
    const {
      userId,
      token,
      page,
      isFetchingAllContest,
      fetchContest,
    } = this.props;

    if (!isFetchingAllContest) {
      //alert(isFetchingAllContest);
      this.page = this.page + 1; // increase page by 1
      //this.fetchUser(this.page); // method for API call
      fetchContest({
        token,
        userId,
        page: this.page,
        status: CONTEST_STATUS.CLOSED,
      });
    }
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.props.isFetchingAllContest) return null;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <ActivityIndicator size="large" color="#44a4f7" />
      </View>
    );
  };

  renderHeaderText = () => {
    return <Text style={styles.headerTitleStyle}>Closed Contest</Text>;
  };

  render() {
    const {containerStyle, fabStyle} = styles;
    const {contestClosedData, navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <View>
          <Header
            style={{
              marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
              backgroundColor: '#fff',
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowOffset: {width: 0, height: 1},
              shadowRadius: 3,
              elevation: 3,
              borderBottomWidth: 1,
              borderBottomColor: '#fafafb',
            }}>
            <Left>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon style={{color: '#44a4f7'}} name="arrow-back" />
              </Button>
            </Left>
            <Body>{this.renderHeaderText()}</Body>
          </Header>

          <View>
            <FlatList
              extraData={this.props}
              renderItem={({item, index}) => {
                return (
                  <ContestItem
                    navigation={navigation}
                    // showMorePix={() => console.log(item)}
                    item={item}
                    index={index}
                  />
                );
              }}
              data={contestClosedData}
              onEndReachedThreshold={0.4}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={this.renderFooter.bind(this)}
              onEndReached={this.handleLoadMore.bind(this)}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateContest')}
          activeOpacity={0.8}
          style={fabStyle}>
          <Icon name="ribbon" style={{color: '#fff'}} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  fabStyle: {
    position: 'absolute',
    right: '20rem',
    bottom: '20rem',
    backgroundColor: '#44a4f7',
    width: '45rem',
    height: '45rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '75rem',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  headerTitleStyle: {
    color: '#44a4f7',
    fontSize: '18rem',
    fontWeight: '500',
    lineHeight: '20rem',
  },
});

const mapStateToProps = ({contest, auth}) => {
  const {contestClosedData, isFetchingAllContest, page} = contest;

  const {token, userId} = auth;

  return {contestClosedData, isFetchingAllContest, token, userId};
};
export default connect(
  mapStateToProps,
  {fetchContest, resetContest},
)(ClosedContestScreen);
