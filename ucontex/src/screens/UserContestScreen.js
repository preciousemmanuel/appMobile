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
  Item,
  Container,
  Content,
  Input,
} from 'native-base';

import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import Modal from 'react-native-modal';
import ScaleImage from 'react-native-scalable-image';
import Moment from 'moment';

import ContestItem from '../components/ContestItem';

import {fetchUsersContest} from '../actions';
import {STATUS_BAR} from '../config';

const SCREEN_WIDTH = Dimensions.get('window').width;
class UserContestScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {bottomLocation: 0};
  }

  componentWillMount() {
    const {navigation, userId, token, authUser, fetchUsersContest} = this.props;
    //  console.log("uid", user, this.props.userId);

    fetchUsersContest({
      userId: navigation.getParam('user'),
      token,
      authUser: userId,
      page: this.page,
    });
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.user !== prevProps.userId) {
  //     this.props.fetchUsersContest({
  //       userId: this.props.user,
  //       token: this.props.token,
  //       authUser: this.props.userId,
  //       page: this.page
  //     });
  //   }
  // }

  onSubmitComment = postId => {
    const {userId, token, commentMsg} = this.props;
    this.props.commentOnPost({commentMsg, postId, userId, token});
  };

  // _onRefresh = () => {
  //   this.props.refreshPost({
  //     token: this.props.token,
  //     userId: this.props.userId
  //   });
  // };

  handleLoadMore = () => {
    // alert(this.props.isFetchingAllContest);
    const {
      navigation,
      userId,
      token,
      authUser,
      fetchUsersContest,
      isFetchingAllContest,
    } = this.props;
    if (!isFetchingAllContest) {
      // alert(this.props.isFetchingAllContest + " " + this.page);
      this.page = this.page + 1; // increase page by 1
      //this.fetchUser(this.page); // method for API call
      fetchUsersContest({
        userId: navigation.getParam('user'),
        token,
        authUser: userId,
        page: this.page,
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
          paddingTop: 20,
        }}>
        <ActivityIndicator size="large" style={{color: '#000'}} />
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
    const {
      contestUserData,
      isFetchingAllContest,
      navigation,
      handleScroll,
    } = this.props;

    // if (isFetchingAllContest) {
    //   return (
    //     <View
    //       style={{
    //         flex: 1,
    //         justifyContent: "center",
    //         alignItems: "center",
    //         backgroundColor: "#ffffff"
    //       }}
    //     >
    //       <ActivityIndicator size="large" color="#44a4f7" />
    //     </View>
    //   );
    // }

    return (
      <View style={{flex: 1}}>
        <Header
          style={{
            //  marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
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
          <Body>
            <Text style={styles.headerTitleStyle}>
              {this.props.navigation.getParam('name') + ' Contest'}
            </Text>
          </Body>
        </Header>

        <FlatList
          initialNumToRender={8}
          maxToRenderPerBatch={2}
          onEndReachedThreshold={0.05}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
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
          extraData={this.props}
          data={contestUserData}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReached={this.handleLoadMore.bind(this)}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '20rem',
    paddingRight: '20rem',
    alignItems: 'center',
    paddingBottom: '10rem',
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
  commentSectionStyle: {
    position: 'absolute',
    bottom: '0rem',
    minHeight: '40rem',
    backgroundColor: '#f3f3f3',
    width: '100%',
    borderTopWidth: '1rem',
    borderTopColor: '#dddddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentPanel: {
    width: '86%',
    height: '35rem',
    // borderRadius: 5,
    borderBottomColor: '#f3f3f3',
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    marginLeft: '9rem',
    flexDirection: 'row',
    paddingLeft: '7rem',
  },
  headerTitleStyle: {
    color: '#44a4f7',
    fontSize: '18rem',
    fontWeight: '500',
    lineHeight: '20rem',
  },
});

const mapStateToProps = ({auth, contest}) => {
  const {token, userId} = auth;
  const {contestUserData, isFetchingAllContest} = contest;

  return {
    contestUserData,
    isFetchingAllContest,
    token,
    userId,
  };
};
export default connect(
  mapStateToProps,
  {fetchUsersContest},
)(UserContestScreen);
