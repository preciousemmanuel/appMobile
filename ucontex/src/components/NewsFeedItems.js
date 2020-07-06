import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Moment from 'moment';
import Modal from 'react-native-modal';
import {
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import {Icon, Button, ListItem, Textarea, Left, Body} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import Share from 'react-native-share';

import _ from 'lodash';
//import AutoResponsiveGrid from "autoresponsive-react-native";

// import PhotoGrid from "react-native-thumbnail-grid";
import {ConfirmDialog} from 'react-native-simple-dialogs';
import Spinner from 'react-native-loading-spinner-overlay';

import AvailableContestSection from './AvailableContestSection';

import PostDescription from './PostDescription';
import ProfilePicture from './ProfilePicture';
import Carousel from './Carousel';
import {FORMAT_NUM_VALUES, HITSLOP} from '../config';

import {
  selectMediaView,
  deletePost,
  showLoveExpressionIcon,
  reactOnPost,
  handleShowPostCommentBox,
  unDoLoveExpressionIcons,
  deleteReactionPost,
  share,
  updatePostData,
} from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
class NewsFeedItems extends React.PureComponent {
  constructor(props) {
    super(props);
    this.animatedStarValue = new Animated.Value(0);
    this.animatedIconValue = new Animated.Value(0);
    this.state = {
      showMoreOptions: false,
      showSharePanel: false,
      dialogVisible: false,
      indexOfPost: null,
      showLoveExpressionPostIndex: null,
      showCommentPostIndex: null,
      showPinPeople: false,
      showShare: false,
    };
  }

  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: "ddd",
  //     tabBarIcon: ({ tintColor }) => {
  //       return <Icon name="search" size={30} color={tintColor} />;
  //     }
  //   };
  // };
  // componentDidMount(){
  //   this.showMorePix=this.showMorePix.bind(this);
  // }
  // getGridMediaStyle() {
  //   return {
  //     width: (SCREEN_WIDTH - 2.1) / 2,
  //     height: parseInt(Math.random() * 20 + 12) * 10,
  //     backgroundColor: "#e1e4e8",
  //     paddingTop: 20
  //   };
  // }
  //
  // getAutoResponsiveProps() {
  //   return {
  //     itemMargin: 2
  //   };
  // }

  // calculatedMediaSize() {
  //   let size = SCREEN_WIDTH / 3;
  //   return { width: size, height: parseInt(Math.random() * 20 + 12) * 10 };
  // }

  componentDidMount() {
    this.animateIcon();
    this.animateExpression();
  }

  // componentDidUpdate(prevProps){
  //   if (true) {
  //
  //   }
  // }

  animateExpression() {
    this.animatedIconValue.setValue(0);
    Animated.spring(this.animatedIconValue, {
      toValue: 1,
      tension: 1,
      friction: 1,
    }).start(() => this.animateExpression());
  }
  animateIcon() {
    this.animatedStarValue.setValue(0);
    Animated.spring(this.animatedStarValue, {
      toValue: 1,
      friction: 2,
      tension: 2,
      easing: Easing.linear,
    }).start(() => this.animateIcon());
  }

  // renderMultipleMedia(medias) {
  //   return medias.map((uri, i) => {
  //     return (
  //       <Image
  //         resizeMode="cover"
  //         key={i}
  //         style={this.getGridMediaStyle()}
  //         source={{ uri: uri.postImagePath }}
  //       />
  //     );
  //   });
  // }

  onHandleEditPost = () => {
    this.setState({showMoreOptions: false});
    this.props.navigation.navigate('EditPost', {
      postId: this.props.item.id,
    });
  };

  showMoreDropdownContent = (isContest, ownerId, indexOfPost, postId) => {
    if (isContest) {
      return (
        <View>
          <TouchableOpacity style={styles.eachDropdwonButtonStyle}>
            <Icon style={styles.showMoreDropdownIconStyle} name="analytics" />
            <Text>Live board</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      if (ownerId === this.props.userData.data.userData.id) {
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
    }
  };

  onHandlePostDelete = () => {
    const {userId, token} = this.props;
    //this.setState({dialogVisible: false});
    this.props.deletePost({
      postId: this.props.item.id,
      indexOfPost: this.props.index,
      userId,
      token,
    });
  };

  handleEpressionFocus = postId => {
    // this.setState({ showLoveExpressionPostIndex: null });
    // if (this.state.showLoveExpressionPostIndex === null) {
    //   console.log("dead");
    //
    //   this.setState({ showLoveExpressionPostIndex: "xpression" + postId });
    // } else {
    //   console.log("sick");
    //
    //   this.setState({ showLoveExpressionPostIndex: "xpression" + postId });
    // }

    this.props.showLoveExpressionIcon(postId);
  };
  handleReactions = (reactionType, postId) => {
    // this.setState({ showLoveExpressionPostIndex: null });
    // if (this.state.showLoveExpressionPostIndex === null) {
    //   console.log("dead");
    //
    //   this.setState({ showLoveExpressionPostIndex: "xpression" + postId });
    // } else {
    //   console.log("sick");
    //
    //   this.setState({ showLoveExpressionPostIndex: "xpression" + postId });
    // }
    const {userId, token, item, postData, index} = this.props;
    let targetPost = postData[index];
    console.log('target post b4', targetPost);
    targetPost.loggedInUserReaction = {id: userId};
    postData[index] = targetPost;
    console.log('target post aft', postData[index]);
    this.props.updatePostData(postData);

    //  this.props.reactOnPost({reactionType, postId, userId, token});
  };
  handleDeleteReactions = (reactionType, reactionId) => {
    // this.setState({ showLoveExpressionPostIndex: null });
    // if (this.state.showLoveExpressionPostIndex === null) {
    //   console.log("dead");
    //
    //   this.setState({ showLoveExpressionPostIndex: "xpression" + postId });
    // } else {
    //   console.log("sick");
    //
    //   this.setState({ showLoveExpressionPostIndex: "xpression" + postId });
    // }
    const {userId, token} = this.props;
    this.props.deleteReactionPost({reactionType, reactionId, userId, token});
  };
  // showLoveExpressionsSection = () => {
  //   if (this.state.showLoveExpressionPostIndex === null) {
  //     alert("null");
  //   } else {
  //     alert("val");
  //   }
  // };
  showCommentBox = postId => {
    if (this.state.showCommentPostIndex !== null) {
      this.setState({showCommentPostIndex: null}, () =>
        this.setState({showCommentPostIndex: postId}),
      );
    } else {
      this.setState({showCommentPostIndex: postId});
    }
  };

  // handleEpressionBlur = postId => {
  //   this.setState({ showLoveExpressionPostIndex: null });
  //   // this.props.showLoveExpressionIcon(postId);
  // };
  onPressLoveExpression = type => {
    this.setState({loveExpressionHolder: type});
  };
  handleLoveExpressionPlacemant = () => {
    // console.log("stype", this.state.loveExpressionHolder);
    if (this.state.loveExpressionHolder === 'love') {
      return (
        <Image
          resizeMode="cover"
          source={require('../assets/like.png')}
          style={styles.loveExpressionIconStyles}
        />
      );
    } else if (this.state.loveExpressionHolder === 'sad') {
      return (
        <Image
          resizeMode="cover"
          source={require('../assets/sad.png')}
          style={styles.loveExpressionIconStyles}
        />
      );
    } else if (this.state.loveExpressionHolder === 'happy') {
      return (
        <Image
          resizeMode="cover"
          source={require('../assets/happy.png')}
          style={styles.loveExpressionIconStyles}
        />
      );
      commentImageIconStyle;
    } else if (this.state.loveExpressionHolder === 'heartBroken') {
      return (
        <Image
          resizeMode="cover"
          source={require('../assets/broken-heart.png')}
          style={styles.loveExpressionIconStyles}
        />
      );
    } else {
      return (
        <Image
          resizeMode="cover"
          source={require('../assets/comment.png')}
          style={styles.loveExpressionIconStyles}
        />
      );
    }
  };

  checkIfLoginUserIsPin = pinPeople => {
    // console.log("sdsdsd", user);
    return pinPeople.some(user => {
      //  console.log("dfffr", user);
      return user.id === this.props.userId;
    });
  };

  renderPinPeopleText = pinPeople => {
    if (this.checkIfLoginUserIsPin(pinPeople)) {
      //login user is pin
      return (
        <Text style={styles.PinPeopleTextStle}>
          {'You and '}
          {parseInt(pinPeople.length) - 1 + ' others'}
        </Text>
      );
    }
    return (
      <Text style={styles.PinPeopleTextStle}>
        {pinPeople.length + ' people'}
      </Text>
    );
  };
  renderPinPeople = pinPeople => {
    if (pinPeople.length > 0) {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../assets/push-pin.png')}
            style={styles.pinPushSmallStyle}
          />
          <TouchableOpacity
            onPress={() =>
              this.setState({
                showPinPeople: true,
              })
            }>
            {this.renderPinPeopleText(pinPeople)}
          </TouchableOpacity>
        </View>
      );
    }
    return;
  };

  renderListPinPeople = pinPeople => {
    return pinPeople.map((user, index) => {
      //console.log("pinuser", user);
      return (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => {
            this.setState({showPinPeople: false}, () =>
              this.props.navigation.navigate('UsersProfile', {
                user: user.id,
              }),
            );
          }}>
          <View style={styles.eachPinContainerStyle}>
            <ProfilePicture
              onPress={() =>
                this.props.navigation.navigate('UsersProfile', {
                  user: user.id,
                })
              }
              profilePictures={user.profilePictures}
            />
            <Text style={{fontWeight: '800'}}>
              {' '}
              {user.firstName + ' ' + user.lastName}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  checkIfUserAlreadyReacted = () => {
    // console.log("tp", typeof this.props.usersProfileData.followers);
    if (this.props.item.loggedInUserReaction === null) {
      return false;
    }
    return true;
    // return this.props.item.reactions.some(obj => {
    //   //  console.log("reeescttt", obj);
    //   return obj.user.id === this.props.userId;
    // });
  };

  renderUserAlreadyReacted = () => {
    const spinValue = this.animatedStarValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.7, 1.2],
    });
    if (this.checkIfUserAlreadyReacted()) {
      return (
        <TouchableOpacity
          onPress={() => this.handleDeleteReactions(1, reaction.id)}>
          <Image
            resizeMode="cover"
            source={require('../assets/like.png')}
            style={styles.commentExpressionShareImageStyle}
          />
        </TouchableOpacity>
      );
      // return this.props.item.reactions.map((reaction, index) => {
      //   switch (reaction.reactionType) {
      //     case 1:
      //       return (
      //         <TouchableOpacity
      //           key={index}
      //           onPress={() => this.handleDeleteReactions(1, reaction.id)}>
      //           <Image
      //             resizeMode="cover"
      //             source={require('../assets/like.png')}
      //             style={styles.commentExpressionShareImageStyle}
      //           />
      //         </TouchableOpacity>
      //       );
      //       break;
      //     case 2:
      //       return (
      //         <TouchableOpacity
      //           key={index}
      //           onLongPress={() =>
      //             this.handleEpressionFocus(this.props.item.id)
      //           }
      //           onPress={() => this.handleDeleteReactions(2, reaction.id)}>
      //           <Image
      //             resizeMode="cover"
      //             source={require('../assets/sad.png')}
      //             style={styles.commentExpressionShareImageStyle}
      //           />
      //         </TouchableOpacity>
      //       );
      //       break;
      //     case 3:
      //       return (
      //         <TouchableOpacity
      //           key={index}
      //           onLongPress={() =>
      //             this.handleEpressionFocus(this.props.item.id)
      //           }
      //           onPress={() => this.handleDeleteReactions(3, reaction.id)}>
      //           <Image
      //             resizeMode="cover"
      //             source={require('../assets/happy.png')}
      //             style={styles.commentExpressionShareImageStyle}
      //           />
      //         </TouchableOpacity>
      //       );
      //       break;
      //     case 4:
      //       return (
      //         <TouchableOpacity
      //           key={index}
      //           onLongPress={() =>
      //             this.handleEpressionFocus(this.props.item.id)
      //           }
      //           onPress={() => this.handleDeleteReactions(4, reaction.id)}>
      //           <Image
      //             resizeMode="cover"
      //             source={require('../assets/broken-heart.png')}
      //             style={styles.commentExpressionShareImageStyle}
      //           />
      //         </TouchableOpacity>
      //       );
      //       break;
      //     case 5:
      //       return (
      //         <TouchableOpacity
      //           key={index}
      //           onLongPress={() =>
      //             this.handleEpressionFocus(this.props.item.id)
      //           }
      //           onPress={() => this.handleDeleteReactions(5, reaction.id)}>
      //           <Icon
      //             name="star"
      //             style={[
      //               styles.commentExpressionShareIconStyle,
      //               {color: '#ff9900'},
      //             ]}
      //           />
      //         </TouchableOpacity>
      //       );
      //       break;
      //     default:
      //       break;
      //   }
      // });
    }
    return (
      <Animated.View
        style={[
          styles.commentExpressionShareBtnStyle,
          {
            transform: [{scale: spinValue}],
          },
        ]}>
        <TouchableOpacity
          onPress={() => this.handleReactions(1, this.props.item.id)}>
          <Image
            resizeMode="cover"
            source={require('../assets/like_un.png')}
            style={styles.commentExpressionShareImageStyle}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // renderChosenReactions = reactions => {
  //   let arrayReactions = [];
  //   reactions.map(reaction => {
  //     switch (reaction.reactionType) {
  //       case 1:
  //         arrayReactions.push(
  //           <Image
  //             resizeMode="cover"
  //             source={require("../assets/like.png")}
  //             style={styles.fetchLoveExpressionIconStyles}
  //           />
  //         );
  //         break;
  //       case 2:
  //         arrayReactions.push(
  //           <Image
  //             resizeMode="cover"
  //             source={require("../assets/sad.png")}
  //             style={styles.fetchLoveExpressionIconStyles}
  //           />
  //         );
  //         break;
  //       case 3:
  //         arrayReactions.push(
  //           <Image
  //             resizeMode="cover"
  //             source={require("../assets/happy.png")}
  //             style={styles.fetchLoveExpressionIconStyles}
  //           />
  //         );
  //         break;
  //       case 4:
  //         arrayReactions.push(
  //           <Image
  //             resizeMode="cover"
  //             source={require("../assets/broken-heart.png")}
  //             style={styles.fetchLoveExpressionIconStyles}
  //           />
  //         );
  //         break;
  //       case 5:
  //         arrayReactions.push(
  //           <Icon name="star" style={styles.chosenStarStyle} />
  //         );
  //         break;
  //       default:
  //         break;
  //     }
  //   });
  //
  //   if (arrayReactions.length > 0) {
  //     return arrayReactions.map((reactionImage, index) => {
  //       return <View key={index}>{reactionImage}</View>;
  //     });
  //   } else {
  //     return;
  //   }
  // };

  showNumberOfReactions = () => {
    //check if meida/image is one or not
    let addedLoveExpressionStyle = {};
    let spaceCommentSection = {};
    if (this.props.item.images.length < 1) {
      addedLoveExpressionStyle = styles.addedNoImageLoveExpressionStyle;
      spaceCommentSection = {};
    } else if (this.props.item.images.length === 1) {
      addedLoveExpressionStyle = styles.addedLoveExpressionStyle;
      spaceCommentSection = {};
    } else {
      addedLoveExpressionStyle = {};
      spaceCommentSection = {};
    }

    if (this.props.item.numberOfReactions > 0) {
      if (this.checkIfUserAlreadyReacted()) {
        //login user reacted
        if (this.props.item.numberOfReactions === 1) {
          return (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('LoveExpression', {
                  postId: this.props.item.id,
                })
              }>
              <View
                style={[
                  styles.fetchLoveExpressionStyles,
                  addedLoveExpressionStyle,
                ]}>
                <Image
                  resizeMode="cover"
                  source={require('../assets/like.png')}
                  style={styles.fetchLoveExpressionIconStyles}
                />
                <Text style={{color: '#44a4f7', marginLeft: 5, fontSize: 12}}>
                  You reacted
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        } else {
          return (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('LoveExpression', {
                  postId: this.props.item.id,
                })
              }>
              <View
                style={[
                  styles.fetchLoveExpressionStyles,
                  addedLoveExpressionStyle,
                ]}>
                <Image
                  resizeMode="cover"
                  source={require('../assets/like.png')}
                  style={styles.fetchLoveExpressionIconStyles}
                />
                <Text style={{color: '#44a4f7', marginLeft: 5, fontSize: 12}}>
                  You and{' '}
                  {FORMAT_NUM_VALUES(this.props.item.numberOfReactions) - 1}{' '}
                  reacted
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        }
      }
      return (
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('LoveExpression', {
              postId: this.props.item.id,
            })
          }>
          <View
            style={[
              styles.fetchLoveExpressionStyles,
              addedLoveExpressionStyle,
            ]}>
            <Image
              resizeMode="cover"
              source={require('../assets/like.png')}
              style={styles.fetchLoveExpressionIconStyles}
            />
            <Text style={{color: '#44a4f7', marginLeft: 5, fontSize: 12}}>
              {FORMAT_NUM_VALUES(this.props.item.numberOfReactions)}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return;
  };

  handleShowCommentBox = () => {
    this.props.handleShowPostCommentBox(this.props.item.id);
  };

  checkParentPostType = parentPost => {
    if (parentPost.isContest) {
      //parent post is as contest
      return (
        <View>
          <View style={styles.headerStyle}>
            {/* {this.renderProfilePhoto(profileImageStyle)} */}
            <ProfilePicture
              onPress={() =>
                this.props.navigation.navigate('UsersProfile', {
                  user: parentPost.owner.id,
                })
              }
              profilePictures={parentPost.owner.profilePictures}
            />

            <View>
              <View style={{flexDirection: 'row'}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    //console.log("dfg", item.owner.id);
                    navigation.navigate('UsersProfile', {
                      user: parentPost.owner.id,
                    });
                  }}>
                  <Text style={styles.profileTitleNameStyle}>
                    {parentPost.owner.firstName +
                      ' ' +
                      parentPost.owner.lastName}
                  </Text>
                </TouchableWithoutFeedback>
              </View>

              <Text style={styles.timeAgoStyle}>
                {`Joined ${parentPost.contest.category} ${Moment(
                  parentPost.createdAt,
                ).fromNow()}`}
              </Text>
            </View>
          </View>

          <View style={[styles.headerStyle, {marginBottom: 10}]}>
            {/* {this.renderProfilePhoto(profileImageStyle)} */}

            <View>
              <View style={{}}>
                <Text style={styles.profileTitleNameStyle}>
                  {parentPost.contest.name}
                </Text>
              </View>
            </View>

            <View style={{marginLeft: 'auto'}}>
              <Text style={styles.timeAgoStyle}>
                {Moment(parentPost.contest.endDate).format('MMM D')}
              </Text>
            </View>
          </View>

          <View style={styles.postTextContainerStyle}>
            <Text
              style={[
                styles.timeAgoStyle,
                {fontWeight: '500', paddingBottom: 10},
              ]}>
              {parentPost.contest.category + ' promotional contest'}
            </Text>
            <PostDescription>{parentPost.contest.description}</PostDescription>
          </View>

          <Carousel
            navigation={this.props.navigation}
            images={parentPost.contest.images}
            data={parentPost.contest}
          />
        </View>
      );
    }
    return (
      <View>
        <View style={styles.headerStyle}>
          {/* {this.renderProfilePhoto(profileImageStyle)} */}
          <ProfilePicture
            onPress={() =>
              this.props.navigation.navigate('UsersProfile', {
                user: parentPost.owner.id,
              })
            }
            profilePictures={parentPost.owner.profilePictures}
          />

          <View>
            <View style={{flexDirection: 'row'}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  //console.log("dfg", item.owner.id);
                  navigation.navigate('UsersProfile', {
                    user: parentPost.owner.id,
                  });
                }}>
                <Text style={styles.profileTitleNameStyle}>
                  {parentPost.owner.firstName + ' ' + parentPost.owner.lastName}
                </Text>
              </TouchableWithoutFeedback>
            </View>

            <Text style={styles.timeAgoStyle}>
              {Moment(parentPost.createdAt).fromNow()}
            </Text>
          </View>
          {/* <View style={{ marginLeft: "auto" }}>
            <TouchableOpacity
              style={{ padding: 7 }}
              onPress={() => this.setState({ showMoreOptions: true })}
            >
              <Icon name="more" />
            </TouchableOpacity>
            <Text style={timeAgoStyle}>
              {Moment(item.contest.endDate).format("MMM D")}
            </Text>
          </View> */}
        </View>

        <View style={styles.postTextContainerStyle}>
          <PostDescription>{parentPost.message}</PostDescription>
        </View>

        <Carousel
          navigation={this.props.navigation}
          images={parentPost.images}
          data={parentPost}
        />
      </View>
    );
  };

  showContent = () => {
    const {item, navigation} = this.props;
    const {
      containerStyle,
      headerStyle,
      profileImageStyle,
      profileTitleNameStyle,
      timeAgoStyle,
      postTextContainerStyle,
      commentExpressionShareContainerStyle,
      iconTextContainerStyle,
      commentExpressionShareBtnStyle,
      commentExpressionShareIconStyle,
      commentSectionStyle,
      commentImageStyle,
      commentPanel,
      commentIcon,
      fetchLoveExpressionStyles,
      fetchLoveExpressionIconStyles,
      utexSectionStyle,
      utextImageStyle,
      commentImageIconStyle,
    } = styles;
    if (item.isSharedPost) {
      return (
        <View>
          <View
            style={[
              headerStyle,
              {borderBottomWidth: 1, borderBottomColor: '#f3f3f3'},
            ]}>
            <ProfilePicture
              onPress={() =>
                this.props.navigation.navigate('UsersProfile', {
                  user: item.owner.id,
                })
              }
              profilePictures={item.owner.profilePictures}
            />

            <View>
              <View style={{flexDirection: 'row'}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    //console.log("dfg", item.owner.id);
                    navigation.navigate('UsersProfile', {
                      user: item.owner.id,
                    });
                  }}>
                  <Text style={profileTitleNameStyle}>
                    {item.owner.firstName + ' ' + item.owner.lastName}
                  </Text>
                </TouchableWithoutFeedback>
              </View>

              <Text style={timeAgoStyle}>
                {'Shared this ' + Moment(item.createdAt).fromNow()}
              </Text>
            </View>
            <View style={{marginLeft: 'auto'}}>
              <TouchableOpacity
                style={{padding: 7}}
                //  hitslop={HITSLOP}
                onPress={() => this.setState({showMoreOptions: true})}>
                <Icon name="more" />
              </TouchableOpacity>
            </View>
          </View>
          {this.checkParentPostType(item.parentPost)}
        </View>
      );
    } else if (item.isContest) {
      //post is a contest
      return (
        <View>
          <View
            style={[
              headerStyle,
              {borderBottomWidth: 1, borderBottomColor: '#f3f3f3'},
            ]}>
            <ProfilePicture
              onPress={() =>
                this.props.navigation.navigate('UsersProfile', {
                  user: item.owner.id,
                })
              }
              profilePictures={item.owner.profilePictures}
            />

            <View>
              <View style={{flexDirection: 'row'}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    //console.log("dfg", item.owner.id);
                    navigation.navigate('UsersProfile', {
                      user: item.owner.id,
                    });
                  }}>
                  <Text style={profileTitleNameStyle}>
                    {item.owner.firstName + ' ' + item.owner.lastName}
                  </Text>
                </TouchableWithoutFeedback>
              </View>

              <Text style={timeAgoStyle}>
                {'Joined ' +
                  item.contest.name +
                  ' contest ' +
                  Moment(item.createdAt).fromNow()}
              </Text>
            </View>
            <View style={{marginLeft: 'auto'}}>
              <TouchableOpacity
                //hitslop={HITSLOP}
                style={{padding: 7}}
                onPress={() => this.setState({showMoreOptions: true})}>
                <Icon name="more" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[headerStyle, {marginBottom: 10}]}>
            {/* {this.renderProfilePhoto(profileImageStyle)} */}

            <View>
              <View style={{}}>
                <Text style={profileTitleNameStyle}>{item.contest.name}</Text>
              </View>
            </View>

            <View style={{marginLeft: 'auto'}}>
              <Text style={timeAgoStyle}>
                {Moment(item.contest.endDate).format('MMM D')}
              </Text>
            </View>
          </View>

          <View style={postTextContainerStyle}>
            <Text
              style={[
                styles.timeAgoStyle,
                {fontWeight: '500', paddingBottom: 10},
              ]}>
              {item.contest.category + ' promotional contest'}
            </Text>
            <PostDescription>{item.contest.description}</PostDescription>
          </View>

          <Carousel
            navigation={this.props.navigation}
            images={item.contest.images}
            data={item.contest}
          />
        </View>
      );
    } else {
      return (
        <View>
          <View style={headerStyle}>
            {/* {this.renderProfilePhoto(profileImageStyle)} */}
            <ProfilePicture
              onPress={() =>
                this.props.navigation.navigate('UsersProfile', {
                  user: item.owner.id,
                })
              }
              profilePictures={item.owner.profilePictures}
            />

            <View>
              <View style={{flexDirection: 'row'}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    //console.log("dfg", item.owner.id);
                    navigation.navigate('UsersProfile', {
                      user: item.owner.id,
                    });
                  }}>
                  <Text style={profileTitleNameStyle}>
                    {item.owner.firstName + ' ' + item.owner.lastName}
                  </Text>
                </TouchableWithoutFeedback>
                {this.renderPinPeople(item.taggedPeople)}
              </View>

              <Text style={timeAgoStyle}>
                {Moment(item.createdAt).fromNow()}
              </Text>
            </View>

            <TouchableOpacity
              style={{marginLeft: 'auto', padding: 7}}
              //hitslop={HITSLOP}
              onPress={() => this.setState({showMoreOptions: true})}>
              <Icon name="more" />
            </TouchableOpacity>
          </View>
          <View style={postTextContainerStyle}>
            <PostDescription>{item.message}</PostDescription>
          </View>
          <Carousel
            navigation={this.props.navigation}
            images={item.images}
            data={item}
          />
        </View>
      );
    }
  };

  renderShowUtex = () => {
    if (this.props.item.isContest) {
      return;
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="cover"
          style={styles.utextImageStyle}
          source={require('../assets/utex-icon.png')}
        />
        <Text style={{fontSize: 12}}>
          {FORMAT_NUM_VALUES(this.props.item.utex)}
        </Text>
      </View>
    );
  };

  share = postId => {
    const {userId, token, share} = this.props;
    share({postId, message: 'message', userId, token}, () => {
      this.setState({showShare: false});
    });
  };

  shareToSocial = () => {
    const {userId, token, share} = this.props;
    let shareOption;
    if (this.props.item.images.length > 0) {
      shareOption = {
        title: 'Share this feed', //string
        message: this.props.item.message, //string
        url: this.props.item.images[0].url, // eg.'http://img.gemejo.com/product/8c/099/cf53b3a6008136ef0882197d5f5.jpg',
      };
    } else {
      shareOption = {
        title: 'Share this feed', //string
        message: this.props.item.message, //string
        // eg.'http://img.gemejo.com/product/8c/099/cf53b3a6008136ef0882197d5f5.jpg',
      };
    }

    Share.open(shareOption)
      .then(response => {
        console.log(response);
        // share(
        //   {postId: this.props.item.id, message: 'message', userId, token},
        //   () => {
        //     this.setState({showShare: false, showSharePanel: false});
        //   },
        // );
        //this.setState({showSharePanel: false});
      })
      .catch(err => console.log(err));
  };
  render() {
    // console.log("dsdsdsddd", this.state.showLoveExpressionPostIndex);
    // _this = this;
    const {index, item, navigation, showLoveExpressionPostIndex} = this.props;
    const {
      containerStyle,
      headerStyle,
      profileImageStyle,
      profileTitleNameStyle,
      timeAgoStyle,
      postTextContainerStyle,
      commentExpressionShareContainerStyle,
      iconTextContainerStyle,
      commentExpressionShareBtnStyle,
      commentExpressionShareIconStyle,
      commentSectionStyle,
      commentImageStyle,
      commentPanel,
      commentIcon,
      fetchLoveExpressionStyles,
      fetchLoveExpressionIconStyles,
      utexSectionStyle,
      utextImageStyle,
      commentImageIconStyle,
    } = styles;
    //console.log(this.props);

    const spinExValue = this.animatedIconValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    });

    //
    const spinValue = this.animatedIconValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    });
    const rotateValue1 = this.animatedIconValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '20deg'],
    });
    const rotateValue2 = this.animatedIconValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '-45deg', '20deg'],
    });
    const rotateValue3 = this.animatedIconValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '30deg', '-30deg'],
    });
    const rotateValue4 = this.animatedIconValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '-20deg', '20deg'],
    });

    //check if meida/image is one or not
    let addedLoveExpressionStyle = {};
    let spaceCommentSection = {};
    if (item.images.length < 1) {
      addedLoveExpressionStyle = styles.addedNoImageLoveExpressionStyle;
      spaceCommentSection = {};
    } else if (item.images.length === 1) {
      addedLoveExpressionStyle = styles.addedLoveExpressionStyle;
      spaceCommentSection = {};
    } else {
      addedLoveExpressionStyle = {};
      spaceCommentSection = {};
    }

    // if (this.props.index === 2) {
    //   return <AvailableContestSection />;
    // }
    return (
      // <TouchableWithoutFeedback
      //   onPress={() => this.props.unDoLoveExpressionIcons()}
      // >
      <View style={containerStyle}>
        <Spinner
          visible={this.props.isPostDeleting}
          color="#ffffff"
          textContent="Deleting Post..."
          textStyle={{color: '#ffffff'}}
          overlayColor="rgba(0, 0, 0, 0.3)"
        />

        <Modal
          isVisible={this.state.showSharePanel}
          style={{margin: 0}}
          onBackdropPress={() =>
            this.setState({
              showSharePanel: false,
            })
          }>
          <View style={styles.modalUnfinishStyle}>
            <Text style={styles.modalTitleStyle}>Share Options</Text>

            <View style={styles.selectImageOptionContainerStyle}>
              <ListItem
                icon
                onPress={() =>
                  this.setState({showShare: true, showSharePanel: false})
                }>
                <Left>
                  <Icon
                    name="apps"
                    style={{color: '#ababab', fontWeight: '400'}}
                  />
                </Left>
                <Body style={{borderBottomWidth: 0}}>
                  <Text style={{color: '#686767', fontWeight: '400'}}>
                    Share on your timeline only
                  </Text>
                </Body>
              </ListItem>

              <ListItem
                icon
                style={{marginTop: 30}}
                onPress={() => this.shareToSocial()}>
                <Left>
                  <Icon
                    name="thunderstorm"
                    style={{color: '#ababab', fontWeight: '400'}}
                  />
                </Left>
                <Body style={{borderBottomWidth: 0}}>
                  <Text style={{color: '#686767', fontWeight: '400'}}>
                    Share on other social media and timeline
                  </Text>
                </Body>
              </ListItem>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.showMoreOptions}
          onBackdropPress={() =>
            this.setState({
              showMoreOptions: false,
              moreOptionDetail: null,
            })
          }>
          <View style={styles.moreOptionContainerStyle}>
            {this.showMoreDropdownContent(
              this.props.item.isContest,
              this.props.item.owner.id,
              this.props.index,
            )}
            <TouchableOpacity
              onPress={() =>
                this.setState({showMoreOptions: false, showSharePanel: true})
              }
              style={styles.eachDropdwonButtonStyle}>
              <Icon style={styles.showMoreDropdownIconStyle} name="share" />
              <Text>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => alert(this.state.moreOptionDetail.contest.id)}
              style={styles.eachDropdwonButtonStyle}>
              <Icon style={styles.showMoreDropdownIconStyle} name="bookmark" />
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.showPinPeople}
          onBackdropPress={() =>
            this.setState({
              showPinPeople: false,
            })
          }>
          <View style={styles.pinPeopleModalContainerStyle}>
            <View style={styles.modalHeadingStyle}>
              <Image
                source={require('../assets/push-pin.png')}
                style={[
                  styles.pinPushSmallStyle,
                  {width: 14, height: 14, marginRight: 10},
                ]}
              />
              <Text style={{fontWeight: '800'}}>
                {item.owner.firstName + ' ' + item.owner.lastName + ' pined'}
              </Text>

              <TouchableOpacity
                style={{
                  marginLeft: 'auto',
                  width: 15,
                  height: 15,
                  paddingLeft: 7,
                }}
                onPress={() => this.setState({showPinPeople: false})}>
                <Icon name="close" style={{fontWeight: '300', fontSize: 15}} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {this.renderListPinPeople(item.taggedPeople)}
            </ScrollView>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.showShare}
          onBackdropPress={() =>
            this.setState({
              showShare: false,
            })
          }>
          <View style={styles.pinPeopleModalContainerStyle}>
            <View style={styles.modalHeadingStyle}>
              <Text>Share this</Text>

              <TouchableOpacity
                style={{
                  marginLeft: 'auto',
                  width: 15,
                  height: 15,
                  paddingLeft: 7,
                }}
                onPress={() => this.setState({showShare: false})}>
                <Icon name="close" style={{fontWeight: '200', fontSize: 15}} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Textarea
                style={styles.textAreaStyle}
                rowSpan={2}
                placeholder="Say something about this"
                placeholderTextColor="#686767"
              />
              <TouchableOpacity
                onPress={() => this.share(item.id)}
                style={styles.sharePressButtonStyle}>
                <Text style={{color: '#ffffff'}}>Share</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>

        <ConfirmDialog
          title="Delete Post"
          message="Are you sure about that?"
          visible={this.state.dialogVisible}
          onTouchOutside={() => this.setState({dialogVisible: false})}
          positiveButton={{
            title: 'YES',
            onPress: () => this.onHandlePostDelete(),
          }}
          negativeButton={{
            title: 'NO',
            onPress: () => this.setState({dialogVisible: false}),
          }}
        />

        {this.showContent()}

        {this.showNumberOfReactions()}

        <View style={[utexSectionStyle, addedLoveExpressionStyle]}>
          {this.renderShowUtex()}
        </View>
        <View
          style={[commentExpressionShareContainerStyle, spaceCommentSection]}>
          <View style={iconTextContainerStyle}>
            {this.renderUserAlreadyReacted()}
            {/* <Text style={{ color: "#44a4f7" }}>20k</Text> */}
          </View>
          <View style={iconTextContainerStyle}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Comment', {
                  postId: item.id,
                })
              }
              style={commentExpressionShareBtnStyle}>
              <Image
                source={require('../assets/comment.png')}
                style={commentImageIconStyle}
              />
              {/* <Icon
                name="chatboxes"
                style={[commentExpressionShareIconStyle]}
              /> */}
            </TouchableOpacity>
            {_.size(item.numberOfComments) > 0 && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Comment', {
                    postId: item.id,
                  })
                }
                style={[commentExpressionShareBtnStyle, {padding: 0}]}>
                <Text style={{color: '#44a4f7'}}>
                  {' '}
                  {FORMAT_NUM_VALUES(item.numberOfComments)}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={iconTextContainerStyle}>
            <TouchableOpacity
              transparent
              style={commentExpressionShareBtnStyle}
              onPress={() => this.setState({showSharePanel: true})}>
              <Icon name="share" style={[commentExpressionShareIconStyle]} />
            </TouchableOpacity>
            <Text style={{color: '#44a4f7'}}>
              {FORMAT_NUM_VALUES(item.numberOfShares)}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => this.handleShowCommentBox()}>
          <View style={commentSectionStyle}>
            <ProfilePicture
              onPress={() =>
                this.props.navigation.navigate('UsersProfile', {
                  user: this.props.userId,
                })
              }
              profilePictures={
                this.props.userData.data.userData.profilePictures
              }
              style={styles.commentImageStyle}
            />

            {/* <Item style={styles.commentPanel}>
            {this.handleLoveExpressionPlacemant()}
            <Input
              // onFocus={() => this.handleEpressionFocus(this.props.item.id)}
              // onBlur={() => this.handleEpressionBlur(this.props.item.id)}
              style={{ color: "#707070" }}
              placeholder={`Write comment`}
              placeholderStyle={{ color: "#707070", fontSize: 10 }}
              multiline={true}
            />
          </Item>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 13
            }}
          >
            <Icon name="send" style={{ color: "#44a4f7" }} />
          </TouchableOpacity> */}

            <View style={commentPanel}>
              {this.handleLoveExpressionPlacemant()}
              <Text
                style={{
                  color: '#707070',
                  paddingLeft: 10,
                }}>{`Write comment`}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    shadowColor: 'rgba(162, 157, 157, 0.2)',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: '#fff',
    paddingBottom: '14rem',
    marginBottom: '10rem',
  },
  headerStyle: {
    padding: '16rem',
    flexDirection: 'row',
  },
  profileImageStyle: {
    width: '46rem',
    height: '46rem',
    marginRight: '18rem',
  },
  profileTitleNameStyle: {
    fontSize: '15rem',
    color: '#000',
    fontWeight: '700',
  },
  timeAgoStyle: {
    fontSize: '11rem',
    color: '#7e7b7b',
    fontWeight: '300',
  },
  postTextContainerStyle: {
    paddingLeft: '16rem',
    paddingRight: '16rem',
    paddingBottom: '35rem',
  },
  numMediaContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: '16rem',
  },
  numMediaBtnStyle: {
    height: '11rem',
  },
  commentExpressionShareContainerStyle: {
    height: '45rem',
    borderRadius: 5,
    borderColor: '#dddddd',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    marginLeft: '7rem',
    marginRight: '7rem',
    marginTop: '4rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5rem',
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
    marginRight: '7rem',
    padding: '7rem',
  },
  commentExpressionShareIconStyle: {
    color: '#686767',
    fontSize: '24rem',
  },
  commentExpressionShareImageStyle: {
    // color: "#686767",
    width: '20rem',
    height: '20rem',
  },
  commentImageIconStyle: {
    width: '18rem',
    height: '18rem',
  },

  utexSectionStyle: {
    position: 'absolute',
    right: '16rem',
    bottom: '139rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentSectionStyle: {
    minHeight: '45rem',
    borderRadius: 5,
    borderColor: '#dddddd',
    borderStyle: 'solid',
    // borderBottomWidth: 1,
    marginLeft: '7rem',
    marginRight: '7rem',
    marginTop: '4rem',
    flexDirection: 'row',
    alignItems: 'center',

    padding: '5rem',
  },
  commentImageStyle: {
    width: '31rem',
    height: '31rem',
    marginRight: 0,
  },
  commentPanel: {
    width: '88%',
    height: '35rem',
    borderRadius: 5,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    marginLeft: '9rem',
    flexDirection: 'row',
    paddingLeft: '7rem',
  },
  commentIcon: {
    color: '#ababab',
    marginRight: '12rem',
  },
  fetchLoveExpressionStyles: {
    position: 'absolute',
    left: '16rem',
    bottom: '145rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addedNoImageLoveExpressionStyle: {
    bottom: '100rem',
    marginBottom: '20rem',
  },
  fetchLoveExpressionIconStyles: {
    width: '12rem',
    height: '12rem',
  },
  utextImageStyle: {
    width: '9rem',
    height: '10rem',
    marginRight: '3rem',
  },
  singleMediaContainerStyle: {
    flex: 1,
    backgroundColor: '#e1e4e8',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: '70rem',
  },
  addedLoveExpressionStyle: {
    bottom: '142rem',
    marginBottom: '10rem',
  },
  selectedStylesMisc: {
    marginBottom: '65rem',
  },
  unSelectedStylesMisc: {
    marginBottom: '10rem',
  },
  moreOptionContainerStyle: {
    // width: "125rem",
    minHeight: '76rem',
    // shadowColor: "rgba(0, 0, 0, 0.16)",
    // shadowOffset: { width: "3rem", height: 0 },
    // shadowRadius: "6rem",
    borderRadius: '5rem',
    borderColor: '#f7f8f9',
    borderStyle: 'solid',
    borderWidth: '1rem',
    backgroundColor: '#ffffff',
    paddingTop: '30rem',
    paddingBottom: '30rem',
    paddingLeft: '10rem',
  },
  pinPeopleModalContainerStyle: {
    // width: "125rem",
    minHeight: '76rem',
    // shadowColor: "rgba(0, 0, 0, 0.16)",
    // shadowOffset: { width: "3rem", height: 0 },
    // shadowRadius: "6rem",
    borderRadius: '5rem',
    borderColor: '#f7f8f9',
    borderStyle: 'solid',
    borderWidth: '1rem',
    backgroundColor: '#ffffff',
    paddingTop: '10rem',
    paddingBottom: '30rem',
    paddingLeft: '10rem',
    paddingRight: '10rem',
  },
  showMoreDropdownStyle: {
    position: 'absolute',
    width: '141rem',
    height: '180rem',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 6,
    borderRadius: 2,
    elevation: 2,
    backgroundColor: '#ffffff',
    right: '21rem',
    top: '50rem',
    paddingLeft: '8rem',
    paddingTop: '13rem',
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
  chooseExpressionPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '15rem',
  },
  loveExpressionIconStyles: {
    width: '22rem',
    height: '22rem',
  },
  expressionButtonStyle: {
    marginRight: '31rem',
    padding: '10rem',
  },
  pinPushStyle: {
    width: '20rem',
    height: '20rem',
  },
  pinPushSmallStyle: {
    width: '10rem',
    height: '10rem',
  },
  PinPeopleTextStle: {
    fontSize: '13rem',
    fontWeight: '300',
    color: '#44a4f7',
    marginLeft: '8rem',
  },
  modalHeadingStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: '10rem',
    marginBottom: '21rem',
  },
  eachPinContainerStyle: {
    marginBottom: '20rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  chosenStarStyle: {
    fontSize: '16rem',
    color: '#f7a500',
  },
  brandTitleStyle: {
    fontSize: '15rem',
    fontWeight: '800',
    lineHeight: '20rem',
    paddingBottom: '13rem',
  },
  textAreaStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
  },
  sharePressButtonStyle: {
    marginTop: '5rem',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#44a4f7',
    width: '100rem',
    height: '30rem',
    borderRadius: '7rem',
  },
  modalUnfinishStyle: {
    width: '100%',
    height: '300rem',
    backgroundColor: '#ffffff',

    margin: 0,
    position: 'absolute',
    bottom: 0,
  },
  modalTitleStyle: {
    color: '#000',
    fontSize: '20rem',
    fontWeight: '500',
    lineHeight: '20rem',
    paddingTop: '20rem',
    paddingLeft: '20rem',
  },
  selectImageOptionContainerStyle: {
    marginTop: '30rem',
  },
});
const mapStateToProps = ({feed, auth, post, reactions}) => {
  const {selectedMedia} = feed;
  // const { userData } = profileSetup;
  const {userData, token, userId} = auth;
  const {isPostDeleting, postData} = post;
  const {isReacting, showLoveExpressionPostIndex, reaction} = reactions;
  // console.log("reve", showLoveExpressionPostIndex);
  return {
    selectedMedia,
    userData,
    userId,
    token,
    isPostDeleting,
    showLoveExpressionPostIndex,
    isReacting,
    reaction,
    postData,
  };
};
export default connect(
  mapStateToProps,
  {
    selectMediaView,
    deletePost,
    showLoveExpressionIcon,
    reactOnPost,
    handleShowPostCommentBox,
    unDoLoveExpressionIcons,
    deleteReactionPost,
    share,
    updatePostData,
  },
)(NewsFeedItems);
