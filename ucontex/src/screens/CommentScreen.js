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
  Animated,
  Keyboard,
  Easing,
  ActivityIndicator,
  FlatList,
  // BackHandler
} from 'react-native';
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Item,
  Input,
} from 'native-base';
import Moment from 'moment';

import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Hyperlink from 'react-native-hyperlink';
import ViewMoreText from 'react-native-view-more-text';
import _ from 'lodash';

import ProfilePicture from '../components/ProfilePicture';
import PostDescription from '../components/PostDescription';
import {FORMAT_NUM_VALUES, STATUS_BAR} from '../config';

import {
  fetchComment,
  commentFormField,
  commentOnPost,
  resetData,
} from '../actions';

//const {  } = React;
class CommentScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bottomLocation: 0,
      containerLocation: 0,
      activeSlide: 0,
      screenData: {},
      loveExpressionHolder: null,
      componentHeight: 0,
      showMoreOptions: false,
    };
    this.page = 1;
  }
  componentDidMount() {
    // this._mounted = true;
    // if (this._mounted) {
    //   const data = this.props.navigation.getParam("data");
    //   this.setState({ screenData: data });
    // }
    // this.props.resetData();
    const postId = this.props.navigation.getParam('postId');
    this.props.fetchComment({
      postId,
      token: this.props.token,
      authUser: this.props.userId,
      page: this.page,
    });

    //console.log("sdsdd", this.state.screenData);
    Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardCommentWillShow.bind(this),
    );
    Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardCommentWillHide.bind(this),
    );
    //this.animateIcon();

    // BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   this.handleBackButtonClick
    // );
  }
  componentWillUnmount() {
    // this._mounted = false;
    this.props.resetData();
    Keyboard.removeListener(
      'keyboardDidShow',
      this.keyboardCommentWillShow.bind(this),
    );
    Keyboard.removeListener(
      'keyboardDidHide',
      this.keyboardCommentWillHide.bind(this),
    );
    // BackHandler.removeEventListener(
    //   "hardwareBackPress",
    //   this.handleBackButtonClick
    // );
  }

  // handleBackButtonClick() {
  //   // Registered function to handle the Back Press
  //   // To popup the default screen while going back you can use goBack
  //   this.props.navigation.goBack(null);
  //   // To exit from your App you can use BackHandler.exitApp();.
  //   // Just comment the above line and uncomment the below to use it
  //   //BackHandler.exitApp();
  //   // Returning true means we have handled the backpress
  //   // Returning false means we haven't handled the backpress
  //   // Try to make it false also
  //   return true;
  // }

  keyboardCommentWillShow(e) {
    console.log('b', this.state.containerLocation);
    this.setState({
      bottomLocation: e.endCoordinates.height,
      containerLocation: e.endCoordinates.height,
    });
    // this.animateContainerLocation();
  }

  keyboardCommentWillHide(e) {
    // console.log("h", this.state.containerLocation);
    this.setState({bottomLocation: 0, containerLocation: 0});
    // this.animateContainerLocation();
  }

  // renderMedia(data) {
  //   //const { data } = this.props.selectedMedia;
  //   return data.map((media, index) => {
  //     return (
  //       <View key={index}>
  //         <View
  //           style={{
  //             justifyContent: "flex-end",
  //             flexDirection: "row",
  //             marginBottom: 6,
  //             paddingRight: 8
  //           }}
  //         >
  //           <Button transparent>
  //             <Icon style={{ color: "#686767" }} name="download" />
  //           </Button>
  //         </View>
  //         <ScaleImage width={SCREEN_WIDTH} source={{ uri: media.url }} />
  //       </View>
  //     );
  //   });
  // }

  getContainersize(layout) {
    const {x, y, width, height} = layout;
    // console.log(x);
    // console.log(y);
    // console.log(width);
    this.setState({componentHeight: height});
  }
  onSubmitComment = postId => {
    const {userId, token, commentMsg} = this.props;
    this.props.commentOnPost({commentMsg, postId, userId, token});
  };

  onHandleEditPost = () => {
    this.setState({showMoreOptions: false});
    this.props.navigation.navigate('EditPost', {
      postId: this.props.singlePostData.posts[0].id,
    });
  };

  showMoreDropdownContent = (ownerId, indexOfPost, postId) => {
    if (ownerId === this.props.userId) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => this.onHandleEditPost()}
            style={styles.eachDropdwonButtonStyle}>
            <Icon style={styles.showMoreDropdownIconStyle} name="create" />
            <Text>Edit Post</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                showMoreOptions: false,
                dialogVisible: true,
                indexOfPost,
                postId,
              })
            }
            style={styles.eachDropdwonButtonStyle}>
            <Icon style={styles.showMoreDropdownIconStyle} name="close" />
            <Text>Delete Post</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return;
  };

  handleLoadMore = () => {
    const postId = this.props.navigation.getParam('postId');

    if (!this.props.isFetchingComments) {
      this.page = this.page + 1; // increase page by 1
      //this.fetchUser(this.page); // method for API call
      this.props.fetchComment({
        postId,
        token: this.props.token,
        authUser: this.props.userId,
        page: this.page,
      });
    }
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.props.isFetchingComments) return null;
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" style={{color: '#000'}} />
      </View>
    );
  };

  renderCommentSection = ({item, index}) => {
    // console.log("ddd", item);
    return (
      <View style={styles.commentContainerStyle}>
        <View style={{flexDirection: 'row'}}>
          <ProfilePicture
            onPress={() =>
              this.props.navigation.navigate('UsersProfile', {
                user: item.user.id,
              })
            }
            style={styles.profileImageStyle}
            profilePictures={item.user.profilePictures}
          />

          <View style={styles.commentBoxContStyle}>
            <Text style={{fontWeight: '500'}}>{`${item.user.firstName} ${
              item.user.lastName
            }`}</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.commentBoxStyle}>
                <PostDescription>{item.message}</PostDescription>
              </View>
              <TouchableOpacity
                style={{
                  paddingLeft: 9,
                  paddingTop: 3,
                  paddingBottom: 3,
                  paddingRight: 5,
                }}>
                <Icon name="more" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 10}}>{Moment(item.createdAt).fromNow()}</Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Reply', {commentId: item.id})
            }
            style={{marginLeft: 6}}>
            <Icon name="undo" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  render() {
    const {commentData, navigation} = this.props;

    //console.log("post", Array.isArray(this.props.singlePostData.post));

    return (
      <View style={{flex: 1}}>
        <Header
          style={{
            //marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
            backgroundColor: '#ffffff',
            zIndex: 1000,
          }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack(null)}>
              <Icon style={{color: '#44a4f7'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={styles.headerTitleStyle}>Comments</Text>
          </Body>
        </Header>

        {/* <Modal
          isVisible={this.state.showMoreOptions}
          onBackdropPress={() =>
            this.setState({
              showMoreOptions: false,
              moreOptionDetail: null
            })
          }
        >
          <View style={styles.moreOptionContainerStyle}>
            {this.showMoreDropdownContent(
              singlePostData.posts[0].owner.id,
              1,
              singlePostData.posts[0].id
            )}
            <TouchableOpacity
              // onPress={() => alert(this.state.moreOptionDetail.contest.id)}
              style={styles.eachDropdwonButtonStyle}
            >
              <Icon style={styles.showMoreDropdownIconStyle} name="bookmark" />
              <Text>Save Post</Text>
            </TouchableOpacity>
          </View>
        </Modal> */}

        {/* <Animated.View
                onLayout={event => {
                  this.getContainersize(event.nativeEvent.layout);
                }}
                style={[
                  styles.contentStyle,
                  { transform: [{ translateY: containerLocationValue }] }
                ]}
              > */}

        {/* </Animated.View> */}
        {/* The view that will animate to match the keyboards height */}
        <View style={styles.commentPanelStyle}>
          <FlatList
            bounces={false}
            renderItem={this.renderCommentSection}
            initialNumToRender={8}
            maxToRenderPerBatch={2}
            onEndReachedThreshold={0.01}
            removeClippedSubviews={true}
            // refreshing={this.props.refresh}
            //extraData={this.props}
            data={this.props.commentData}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={this.renderFooter.bind(this)}
            onEndReached={this.handleLoadMore}
          />
        </View>
        <View
          style={[
            styles.loveExpressionPanel,
            {bottom: this.state.bottomLocation},
          ]}>
          <View style={{flexDirection: 'row'}}>
            <ProfilePicture
              onPress={() =>
                this.props.navigation.navigate('UsersProfile', {
                  user: this.props.userId,
                })
              }
              style={styles.commentImageStyle}
              profilePictures={
                this.props.userData.data.userData.profilePictures
              }
            />

            {/* <View style={styles.commentPanel}>
                  <Icon name="heart" style={styles.commentIcon} />
                  <Text style={{ color: "#707070" }}>
                    {`Love Expression to John`}
                  </Text>
                </View> */}
            <Item style={styles.commentPanel}>
              {/* <Icon active name="heart" style={styles.commentIcon} /> */}

              <Input
                placeholder="Write Comment "
                autoFocus={true}
                placeholderStyle={{color: '#707070', fontSize: 12}}
                multiline={true}
                style={{maxHeight: 80}}
                onChangeText={text =>
                  this.props.commentFormField({
                    prop: 'commentMsg',
                    value: text,
                  })
                }
                value={this.props.commentMsg}
              />
            </Item>
            <TouchableOpacity
              onPress={() =>
                this.onSubmitComment(navigation.getParam('postId'))
              }
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="send" style={{color: '#44a4f7'}} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerImageContainer: {
    paddingLeft: '17rem',
    paddingRight: '17rem',
    paddingBottom: '9rem',
    paddingTop: '10rem',
  },
  titleStyle: {
    marginTop: '8rem',
  },
  contentStyle: {
    // paddingTop: "10rem",
    minHeight: '50rem',
    // flex: 1
    paddingBottom: '100rem',
  },
  headerTitleStyle: {
    color: '#44a4f7',
    fontSize: '18rem',
    fontWeight: '500',
    lineHeight: '20rem',
  },
  profileImageStyle: {
    width: '46rem',
    height: '46rem',
  },
  commentImageStyle: {
    width: '31rem',
    height: '31rem',
  },
  loveExpressionPanel: {
    width: '100%',
    marginTop: '128rem',
    // marginBottom: "10rem",
    position: 'absolute',
    padding: '10rem',

    // marginLeft: "7rem",
    // marginRight: "7rem",
    backgroundColor: '#ffffff',
    alignItems: 'center',
    minHeight: '39rem',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 0,
    borderRadius: 5,
    borderColor: '#dddddd',
    borderStyle: 'solid',
    borderWidth: 1,
    elevation: 2,
  },
  commentPanel: {
    width: '77%',
    marginRight: '13rem',
    //minHeight: "35rem",
    borderRadius: 5,
    backgroundColor: '#f3f3f3',
    borderWidth: 0,
    marginLeft: '9rem',

    paddingLeft: '7rem',
  },
  commentIcon: {
    color: '#ababab',
    marginRight: '12rem',
  },
  loveExpressionIconStyles: {
    width: '22rem',
    height: '22rem',
  },
  chooseExpressionPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '15rem',
  },
  expressionButtonStyle: {
    marginRight: '31rem',
  },
  commentExpressionShareContainerStyle: {
    height: '45rem',
    borderRadius: 5,
    borderColor: '#dddddd',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    marginLeft: '7rem',
    marginRight: '7rem',
    marginTop: '25rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5rem',
    marginBottom: '10rem',
  },
  iconTextContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentExpressionShareBtnStyle: {
    // height: "33rem",
    // width: "33rem",
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 75,
    // backgroundColor: "#e4e4e4",
    marginRight: '5rem',
  },
  commentExpressionShareIconStyle: {
    color: '#686767',
    fontSize: '30rem',
  },
  commentImageIconStyle: {
    width: '30rem',
    height: '30rem',
  },
  carouselImageStyle: {
    width: '100%',
    minHeight: '300rem',
  },
  profileTitleNameStyle: {
    fontSize: '15rem',
    color: '#000',
    fontWeight: '700',
  },
  timeAgoStyle: {
    fontSize: '10rem',
    color: '#7e7b7b',
    fontWeight: '300',
  },
  moreMediaButonStyles: {
    position: 'absolute',
    right: '95rem',
    bottom: '25rem',
    zIndex: 1000,
    shadowOpacity: 0,
    shadowRadius: 0,
    backgroundColor: '#fff',
  },
  addedNoImageLoveExpressionEmptyStyle: {
    top: '90rem',
    marginBottom: '5rem',
  },
  addedNoImageLoveExpressionStyle: {
    top: '130rem',
    marginBottom: '5rem',
  },
  addedLoveExpressionStyle: {
    bottom: '40rem',
    marginBottom: '15rem',
  },
  addedLoveExpressionMoreImagesStyle: {
    bottom: '70rem',
  },
  utextImageStyle: {
    width: '9rem',
    height: '10rem',
    marginRight: '3rem',
  },
  utexSectionStyle: {
    position: 'absolute',
    right: '16rem',
    // bottom: "139rem",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentBoxStyle: {
    width: '252rem',
    minHeight: '48rem',
    borderRadius: '15rem',
    backgroundColor: '#eef0f3',
    padding: '7rem',
    marginTop: '3rem',
    marginRight: '19rem',
  },
  commentBoxContStyle: {
    marginLeft: '10rem',
    justifyContent: 'center',
  },
  commentContainerStyle: {
    paddingLeft: '17rem',
    paddingRight: '17rem',
    marginBottom: '22rem',
  },
  commentPanelStyle: {marginBottom: '140rem', marginTop: '10rem'},
  moreOptionContainerStyle: {
    // width: "125rem",
    minHeight: '76rem',
    // shadowColor: "rgba(0, 0, 0, 0.16)",
    // shadowOffset: { width: "3rem", height: 0 },
    // shadowRadius: "6rem",
    borderRadius: '2rem',
    borderColor: '#f7f8f9',
    borderStyle: 'solid',
    borderWidth: '1rem',
    backgroundColor: '#ffffff',
    paddingTop: '30rem',
    paddingBottom: '30rem',
    paddingLeft: '10rem',
  },
  showMoreDropdownIconStyle: {
    color: '#707070',
    marginRight: '15rem',
    fontSize: '18rem',
  },
  eachDropdwonButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '22rem',
    width: '100%',
  },
});

const mapStateToProps = ({auth, comments}) => {
  //const { userData } = profileSetup;
  const {commentData, is_commenting, commentMsg, isFetchingComments} = comments;
  const {userData, token, userId} = auth;

  console.log('com', commentData);

  return {
    userData,
    token,
    userId,
    commentMsg,
    is_commenting,
    commentData,
    isFetchingComments,
  };
};
export default connect(
  mapStateToProps,
  {fetchComment, commentFormField, commentOnPost, resetData},
)(CommentScreen);
