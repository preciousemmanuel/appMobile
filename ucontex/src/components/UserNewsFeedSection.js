import React, { Component, Fragment } from "react";
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
  FlatList
} from "react-native";
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
  Tab,
  Tabs,
  TabHeading,
  Container,
  Content,
  Input
} from "native-base";

import { connect } from "react-redux";
import EStyleSheet from "react-native-extended-stylesheet";
import _ from "lodash";
import Modal from "react-native-modal";
import ScaleImage from "react-native-scalable-image";

import NewsFeedItems from "../components/NewsFeedItems";

import Moment from "moment";
import {
  fetchUsersPost,
  handleShowPostCommentBox,
  commentOnPost,
  commentFormField
} from "../actions";

const SCREEN_WIDTH = Dimensions.get("window").width;
class UserNewsFeedSection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = { bottomLocation: 0 };
  }

  componentWillMount() {
    const { user, userId, token, authUser, fetchUsersPost } = this.props;
    //  console.log("uid", user, this.props.userId);

    fetchUsersPost({
      userId: user,
      token,
      authUser: userId,
      page: 1
    });
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.user !== prevProps.userId) {
  //     this.props.fetchUsersPost({
  //       userId: this.props.user,
  //       token: this.props.token,
  //       authUser: this.props.userId,
  //       page: this.page
  //     });
  //   }
  // }

  onSubmitComment = postId => {
    const { userId, token, commentMsg } = this.props;
    this.props.commentOnPost({ commentMsg, postId, userId, token });
  };

  // _onRefresh = () => {
  //   this.props.refreshPost({
  //     token: this.props.token,
  //     userId: this.props.userId
  //   });
  // };

  handleLoadMore = () => {
    // alert(this.props.loadingPost);

    if (!this.props.loadingPost) {
      alert(this.props.loadingPost + " " + this.page);
      this.page = this.page + 1; // increase page by 1
      //this.fetchUser(this.page); // method for API call
      this.props.fetchUsersPost({
        userId: this.props.user,
        token: this.props.token,
        authUser: this.props.userId,
        page: 1
      });
    }
  };

  showCommentBox = () => {
    if (this.props.postCommentId !== null) {
      return (
        <View
          style={[
            styles.commentSectionStyle,
            { bottom: this.state.bottomLocation }
          ]}
        >
          <Item style={styles.commentPanel}>
            <Input
              autoFocus={true}
              // onFocus={() => this.handleEpressionFocus(this.props.item.id)}
              // onBlur={() => this.handleEpressionBlur(this.props.item.id)}
              style={{ color: "#707070" }}
              placeholder={`Write comment`}
              placeholderStyle={{ color: "#707070", fontSize: 10 }}
              multiline={true}
              style={{ maxHeight: 80 }}
              onChangeText={text =>
                this.props.commentFormField({
                  prop: "commentMsg",
                  value: text
                })
              }
              value={this.props.commentMsg}
            />
          </Item>
          <TouchableOpacity
            onPress={() => this.onSubmitComment(this.props.postCommentId)}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 13
            }}
          >
            <Icon name="send" style={{ color: "#44a4f7" }} />
          </TouchableOpacity>
        </View>
      );
    }
    return;
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.props.loadingPost) return null;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20
        }}
      >
        <ActivityIndicator size="large" style={{ color: "#000" }} />
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
      tabMenuConatinerStyle
    } = styles;

    //const { userData } = this.props.userData.data;
    const { usersPostData, loadingPost, navigation, handleScroll } = this.props;

    // if (loadingPost) {
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
      <View>
        <FlatList
          initialNumToRender={8}
          maxToRenderPerBatch={2}
          onEndReachedThreshold={0}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <NewsFeedItems
                navigation={navigation}
                // showMorePix={() => console.log(item)}
                item={item}
                index={index}
              />
            );
          }}
          extraData={this.props}
          data={usersPostData}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReached={this.handleLoadMore.bind(this)}
        />
        {this.showCommentBox()}
      </View>
    );
  }
}
const styles = EStyleSheet.create({
  coverImageStyle: {
    width: "100%",
    height: "190rem"
  },
  backButtonContainerStyle: {
    width: "31rem",
    height: "31rem",
    borderRadius: "75rem",
    backgroundColor: "#e4e4e4",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "9rem",
    left: "17rem"
  },

  profilePicxStyle: {
    width: "80rem",
    height: "80rem",
    borderColor: "#ffffff",
    borderWidth: "3rem",
    marginTop: "-30rem"
  },
  profilePixContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "17rem",
    paddingRight: "17rem"
  },
  editProfileButton: {
    width: "87rem",
    height: "27rem",
    borderRadius: "10rem",
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    marginTop: "11rem",
    justifyContent: "center",
    alignItems: "center"
  },
  userNameStyle: {
    color: "#000000",
    marginLeft: "15rem",
    marginTop: "8rem",
    fontSize: "15rem",
    fontWeight: "800",
    lineHeight: "20rem"
  },
  detailSectionStyle: {
    padding: "7rem",
    width: "95%",
    minHeight: "90rem",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    elevation: 2,
    borderColor: "#e4e4e4",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    marginRight: "9rem",
    marginLeft: "9rem",
    marginTop: "16rem"
  },
  detailIconStyle: {
    color: "#707070",
    marginRight: "2rem",
    fontSize: "19rem"
  },
  detailIconTextStyle: {
    fontSize: "12rem"
  },
  followPanelStyle: {
    width: "100%",
    height: "55rem",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    backgroundColor: "#ffffff",
    elevation: 2,
    marginTop: "8rem",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row"
  },
  tabMenuConatinerStyle: {
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    backgroundColor: "#ffffff",
    marginTop: "9rem",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "20rem",
    paddingRight: "20rem",
    alignItems: "center",
    paddingBottom: "10rem"
  },
  addButtonStyle: {
    width: "40rem",
    height: "40rem",
    borderRadius: "50rem",
    backgroundColor: "#44a4f7",
    justifyContent: "center",
    alignItems: "center"
  },
  addButtonContStyle: {
    marginTop: "10rem",
    alignItems: "center",
    justifyContent: "center"
  },
  moreOptionContainerStyle: {
    width: "125rem",
    minHeight: "76rem",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: "3rem", height: 0 },
    shadowRadius: "6rem",
    borderRadius: "2rem",
    borderColor: "#f7f8f9",
    borderStyle: "solid",
    borderWidth: "1rem",
    backgroundColor: "#ffffff",
    elevation: "3rem",

    position: "absolute",
    top: "36rem",
    right: "18rem",
    justifyContent: "space-between",
    paddingTop: "12rem",
    paddingBottom: "12rem"
  },
  modalUnfinishStyle: {
    width: "100%",
    height: "300rem",
    backgroundColor: "#ffffff",

    margin: 0,
    position: "absolute",
    bottom: 0
  },
  removeButtonStyle: {
    position: "absolute",
    top: "7rem",
    right: "7rem",
    width: "13rem",
    height: "13rem"
  },
  closeIconStyle: {
    color: "#707070",
    fontSize: "15rem"
  },
  secondPanel: {
    width: SCREEN_WIDTH,

    height: "190rem",

    shadowColor: "rgba(0, 0, 0, 0.87)",

    shadowOffset: { width: "-2rem", height: 0 },

    shadowRadius: "8rem",

    borderTopLeftRadius: "12rem",

    borderTopRightRadius: "12rem",

    borderBottomLeftRadius: 0,

    borderBottomRightRadius: 0,

    backgroundColor: "#eff0f2",
    // backgroundColor: "red",
    position: "absolute",
    bottom: 0
  },
  curvePanel: {
    justifyContent: "center",
    paddingLeft: "24rem",
    width: SCREEN_WIDTH,
    height: "48rem",

    shadowColor: "rgba(0, 0, 0, 0.16)",

    shadowOffset: { width: "1rem", height: 0 },

    shadowRadius: "2rem",

    borderTopLeftRadius: "12rem",

    borderTopRightRadius: "12rem",

    borderBottomLeftRadius: 0,

    borderBottomRightRadius: 0,

    backgroundColor: "#ffffff"
  },
  listContainerStyle: {
    paddingTop: "19rem"
  },
  selectImageOptionContainerStyle: {
    marginTop: "30rem"
  },
  modalTitleStyle: {
    color: "#000",
    fontSize: "20rem",
    fontWeight: "500",
    lineHeight: "20rem",
    paddingTop: "20rem",
    paddingLeft: "20rem"
  },
  commentSectionStyle: {
    position: "absolute",
    bottom: "0rem",
    minHeight: "40rem",
    backgroundColor: "#f3f3f3",
    width: "100%",
    borderTopWidth: "1rem",
    borderTopColor: "#dddddd",
    flexDirection: "row",
    alignItems: "center"
  },
  commentPanel: {
    width: "86%",
    height: "35rem",
    // borderRadius: 5,
    borderBottomColor: "#f3f3f3",
    backgroundColor: "#f3f3f3",
    alignItems: "center",
    marginLeft: "9rem",
    flexDirection: "row",
    paddingLeft: "7rem"
  }
});

const mapStateToProps = ({ profileSetup, auth, post }) => {
  const { token, userId } = auth;
  const {
    usersPostData,
    loadingPost,
    postCommentId,
    commentMsg,
    is_commenting
  } = post;

  return {
    token,
    userId,
    usersPostData,
    loadingPost,
    postCommentId,
    commentMsg,
    is_commenting
  };
};
export default connect(
  mapStateToProps,
  { fetchUsersPost, handleShowPostCommentBox, commentOnPost, commentFormField }
)(UserNewsFeedSection);
