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

import ProgressiveRoundImage from '../components/ProgressiveRoundImage';
import ParticipantContestDetailSection from '../components/ParticipantContestDetailSection';
import {fetchParticipants, resetParticipants} from '../actions';
import {STATUS_BAR} from '../config';

const SCREEN_WIDTH = Dimensions.get('window').width;
class ContestParticipantsScreen extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    // this.state = {
    //   data: []
    // };
  }

  componentWillMount() {
    // this.setState({ data });
    // this.arrayData = data;
    const {fetchParticipants, token, userId, navigation} = this.props;
    const contestId = navigation.getParam('contestId');
    //  console.log("uid", user, userId);
    fetchParticipants({
      contestId,
      userId,
      token,
      pageParticipant: this.page,
    });
  }
  componentWillUnmount() {
    this.props.resetParticipants();
  }

  handleLoadMore = () => {
    const {
      isFetchingParticipant,
      userId,
      token,
      pageParticipant,
      fetchParticipants,
    } = this.props;

    if (!isFetchingParticipant) {
      this.page = this.page + 1; // increase page by 1
      //this.fetchUser(this.page); // method for API call
      fetchParticipants({
        contestId: this.props.navigation.getParam('contestId'),
        userId,
        token,
        pageParticipant: this.page,
      });
    }
  };

  renderFooter = () => {
    console.log('fechpart', this.props.isFetchingParticipant);
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.props.isFetchingParticipant) return null;
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" style={{color: '#000'}} />
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
    const {participants} = this.props;

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
              <Text style={headerTitleStyle}>Contest Participants</Text>
            </Body>
          </Header>

          <View style={containerStyle}>
            <View style={{marginBottom: 30, marginTop: 10}}>
              <Text style={{fontWeight: '800', fontSize: 17}}>
                {participants.length} Participants
              </Text>
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={participants}
              renderItem={({item, index}) => {
                return (
                  <ParticipantContestDetailSection // showMorePix={() => console.log(item)}
                    item={item}
                    index={index}
                    navigation={this.props.navigation}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={8}
              maxToRenderPerBatch={2}
              onEndReachedThreshold={0.5}
              removeClippedSubviews={true}
              // ListFooterComponent={this.renderFooter.bind(this)}
              // onEndReached={this.handleLoadMore.bind(this)}
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

const mapStateToProps = ({auth, contest}) => {
  const {userId, token} = auth;
  const {isFetchingParticipant, participants} = contest;
  return {userId, token, isFetchingParticipant, participants};
};
export default connect(
  mapStateToProps,
  {fetchParticipants, resetParticipants},
)(ContestParticipantsScreen);
