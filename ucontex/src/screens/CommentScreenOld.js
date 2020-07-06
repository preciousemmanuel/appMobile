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
  Animated,
  Keyboard,
  Easing,
  ActivityIndicator,
  FlatList
  // BackHandler
} from "react-native";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Item,
  Input
} from "native-base";
import Moment from "moment";
import { Constants } from "expo";
import { connect } from "react-redux";
import ScaleImage from "react-native-scalable-image";
import EStyleSheet from "react-native-extended-stylesheet";
import Modal from "react-native-modal";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Spinner from "react-native-loading-spinner-overlay";
import KeyboardSpacer from "react-native-keyboard-spacer";
import Hyperlink from "react-native-hyperlink";
import ViewMoreText from "react-native-view-more-text";
import _ from "lodash";

import ProgressiveImage from "../components/ProgressiveImage";
import ProgressiveRoundImage from "../components/ProgressiveRoundImage";
import { FORMAT_NUM_VALUES } from "../config";

import {
  fetchSinglePost,
  commentFormField,
  commentOnPost,
  resetData
} from "../actions";

const SCREEN_WIDTH = Dimensions.get("window").width;
//const {  } = React;
class CommentScreen extends Component {
  constructor(props) {
    super(props);
    this.animatedIconValue = new Animated.Value(0);
    this.animatedContainerLocationValue = new Animated.Value(0);
    this.state = {
      bottomLocation: 0,
      containerLocation: 0,
      activeSlide: 0,
      screenData: {},
      loveExpressionHolder: null,
      componentHeight: 0,
      showMoreOptions: false
    };
    this.showMorePix = this.showMorePix.bind(this);
  }
  componentWillMount() {
    // this._mounted = true;
    // if (this._mounted) {
    //   const data = this.props.navigation.getParam("data");
    //   this.setState({ screenData: data });
    // }
    this.props.resetData();
    const postId = this.props.navigation.getParam("postId");
    this.props.fetchSinglePost({
      postId,
      token: this.props.token,
      authUser: this.props.userId
    });

    //console.log("sdsdd", this.state.screenData);
    Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardCommentWillShow.bind(this)
    );
    Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardCommentWillHide.bind(this)
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
      "keyboardDidShow",
      this.keyboardCommentWillShow.bind(this)
    );
    Keyboard.removeListener(
      "keyboardDidHide",
      this.keyboardCommentWillHide.bind(this)
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
    console.log("b", this.state.containerLocation);
    this.setState({
      bottomLocation: e.endCoordinates.height,
      containerLocation: e.endCoordinates.height
    });
    // this.animateContainerLocation();
  }

  keyboardCommentWillHide(e) {
    // console.log("h", this.state.containerLocation);
    this.setState({ bottomLocation: 0, containerLocation: 0 });
    // this.animateContainerLocation();
  }

  animateIcon() {
    this.animatedIconValue.setValue(0);
    Animated.spring(this.animatedIconValue, {
      toValue: 1,
      tension: 1,
      friction: 1
    }).start(() => this.animateIcon());
  }
  animateContainerLocation() {
    this.animatedContainerLocationValue.setValue(0);
    Animated.timing(this.animatedContainerLocationValue, {
      toValue: this.state.containerLocation,
      duration: 10,
      easing: Easing.linear
    }).start();
  }
  pagination = medaiaArray => {
    //const { entries, activeSlide } = this.props.;
    //check if media item is greater than 5
    if (medaiaArray.length > 5) {
      return (
        <View sty>
          <Pagination
            dotsLength={5}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{ backgroundColor: "#fff" }}
            dotStyle={{
              width: 5,
              height: 5,
              borderRadius: 5,
              marginHorizontal: 1,
              backgroundColor: "#44a4f7"
            }}
            inactiveDotStyle={
              {
                // Define styles for inactive dots here
              }
            }
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
      );
    } else {
      //not greater than five
      return (
        <Pagination
          dotsLength={medaiaArray.length}
          activeDotIndex={this.state.activeSlide}
          containerStyle={{ backgroundColor: "#fff" }}
          dotStyle={{
            width: 5,
            height: 5,
            borderRadius: 5,
            marginHorizontal: 1,
            backgroundColor: "#44a4f7"
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      );
    }
  };
  showMorePix = () => {
    // console.log("ffsaa", _singlePostData.posts[0].message);
    //  _this.props.navigation.navigate("Contest");
    this.props.navigation.navigate("ShowMorePicx", {
      data: this.props.singlePostData.posts[0]
    });
    console.log("ff");

    // this.props.selectMediaView(data, images => {
    //   this.props.navigation.navigate("ShowMorePicx");
    // });
  };
  _renderMedia = ({ item, index }) => {
    // console.log("kopkkkkkk", index);
    if (index === 4) {
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.showMorePix()}
          >
            <ProgressiveImage
              resizeMode="cover"
              style={styles.carouselImageStyle}
              source={{ uri: item.url }}
              thumbnail={require("../assets/placeholder.png")}
            />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.showMorePix()}
        >
          <ProgressiveImage
            resizeMode="cover"
            style={styles.carouselImageStyle}
            source={{ uri: item.url }}
            thumbnail={require("../assets/placeholder.png")}
          />
        </TouchableOpacity>
      </View>
    );
  };
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

  renderPostMedia = medaiaArray => {
    //console.log(medaiaArray);
    const originalMediaSize = medaiaArray;
    if (medaiaArray.length > 0) {
      if (medaiaArray.length === 1) {
        return medaiaArray.map((item, index) => {
          return (
            <View style={styles.singleMediaContainerStyle} key={index}>
              <ScaleImage width={SCREEN_WIDTH} source={{ uri: item.url }} />
            </View>
          );
        });
      }
      //console.log("job", ...medaiaArray);
      const medaiaArrayC =
        medaiaArray.length > 5 ? medaiaArray.slice(0).slice(-5) : medaiaArray;
      return (
        <View style={{ flex: 1 }}>
          {/* <View style={styles.numMediaContainerStyle}>
            <Button iconLeft transparent style={styles.numMediaBtnStyle}>
              <Icon
                name="camera"
                style={{
                  color: "#7e7b7b",
                  fontSize: 9,
                  marginRight: 2
                }}
              />
              <Text style={{ color: "#7e7b7b", fontSize: 9 }}>
                {medaiaArray.length}
              </Text>
            </Button>
          </View> */}
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={medaiaArrayC}
            renderItem={this._renderMedia}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH}
            containerCustomStyle={{ flex: 1 }}
            slideStyle={{ flex: 1 }}
            onSnapToItem={index => this.setState({ activeSlide: index })}
          />
          {originalMediaSize.length > 5 && (
            <TouchableOpacity
              transparent
              onPress={() => this.showMorePix()}
              style={styles.moreMediaButonStyles}
            >
              <Text style={{ color: "#686767" }}>
                +{originalMediaSize.length - 5}
              </Text>
            </TouchableOpacity>
          )}
          {this.pagination(originalMediaSize)}

          {/* <PhotoGrid
            source={medaiaArray.map(({ postImagePath }) => postImagePath)}
          /> */}
        </View>
        /* <View>
          <AutoResponsiveGrid {...this.getAutoResponsiveProps()}>
            {this.renderMultipleMedia(medaiaArray)}
          </AutoResponsiveGrid>
        </View> */
      );
    }
    return;
  };

  renderProfileImage = (profilePicture, userId) => {
    //singlePostData.posts[0].owner.profilePictures
    // console.log("edss", this.props.userData);
    if (profilePicture.length > 0) {
      let numberOfPicx = profilePicture.length;
      return (
        <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.navigate("UsersProfile", {
              user: userId
            })
          }
        >
          <ProgressiveRoundImage
            resizeMode="cover"
            style={styles.profileImageStyle}
            source={{
              uri: profilePicture[numberOfPicx - 1].url
            }}
          />
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.navigate("UsersProfile", {
              user: userId
            })
          }
        >
          <Image
            resizeMode="cover"
            source={require("../assets/user.png")}
            style={styles.profileImageStyle}
          />
        </TouchableWithoutFeedback>
      );
    }
  };

  renderLoginUserImage = () => {
    console.log("edss", this.props.userData);
    if (this.props.userData.data.userData.profilePictures.length > 0) {
      // console.log(
      // //   "num",
      // //   this.props.userData.data.userData.profilePictures.length
      // // );
      let numberOfPicx = this.props.userData.data.userData.profilePictures
        .length;
      return (
        <ProgressiveRoundImage
          resizeMode="cover"
          style={styles.commentImageStyle}
          source={{
            uri: this.props.userData.data.userData.profilePictures[
              numberOfPicx - 1
            ].url
          }}
        />
      );
    } else {
      return (
        <Image
          style={styles.commentImageStyle}
          source={require("../assets/user.png")}
        />
      );
    }
  };

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
    const { x, y, width, height } = layout;
    // console.log(x);
    // console.log(y);
    // console.log(width);
    this.setState({ componentHeight: height });
  }
  onSubmitComment = postId => {
    const { userId, token, commentMsg } = this.props;
    this.props.commentOnPost({ commentMsg, postId, userId, token });
  };

  onHandleEditPost = () => {
    this.setState({ showMoreOptions: false });
    this.props.navigation.navigate("EditPost", {
      postId: this.props.singlePostData.posts[0].id
    });
  };

  showMoreDropdownContent = (ownerId, indexOfPost, postId) => {
    if (ownerId === this.props.userId) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => this.onHandleEditPost()}
            style={styles.eachDropdwonButtonStyle}
          >
            <Icon style={styles.showMoreDropdownIconStyle} name="create" />
            <Text>Edit Post</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                showMoreOptions: false,
                dialogVisible: true,
                indexOfPost,
                postId
              })
            }
            style={styles.eachDropdwonButtonStyle}
          >
            <Icon style={styles.showMoreDropdownIconStyle} name="close" />
            <Text>Delete Post</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return;
  };

  renderViewMore(onPress) {
    return (
      <Text style={{ color: "#44a4f7" }} onPress={onPress}>
        View more
      </Text>
    );
  }
  renderViewLess(onPress) {
    return (
      <Text style={{ color: "#44a4f7" }} onPress={onPress}>
        View less
      </Text>
    );
  }

  renderPostData = () => {
    const { singlePostData } = this.props;
    let addedLoveExpressionStyle = {};
    if (singlePostData.posts[0].images.length < 1) {
      addedLoveExpressionStyle = styles.addedNoImageLoveExpressionStyle;
    } else if (singlePostData.posts[0].images.length === 1) {
      addedLoveExpressionStyle = styles.addedLoveExpressionStyle;
    } else {
      addedLoveExpressionStyle = styles.addedLoveExpressionMoreImagesStyle;
    }
    return (
      <View>
        <View style={styles.containerImageContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* {this.renderProfilePhoto(profileImageStyle)} */}
            {this.renderProfileImage(
              singlePostData.posts[0].owner.profilePictures,
              singlePostData.posts[0].owner.id
            )}
            <View style={{ marginLeft: 18 }}>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.props.navigation.navigate("UsersProfile", {
                    user: singlePostData.posts[0].owner.id
                  })
                }
              >
                <Text style={styles.profileTitleNameStyle}>
                  {singlePostData.posts[0].owner.firstName +
                    " " +
                    singlePostData.posts[0].owner.lastName}
                </Text>
              </TouchableWithoutFeedback>
              <Text style={styles.timeAgoStyle}>
                {Moment(singlePostData.posts[0].createdAt).fromNow()}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.setState({ showMoreOptions: true })}
              style={{ marginLeft: "auto", paddingLeft: 10 }}
            >
              <Icon name="more" />
            </TouchableOpacity>
          </View>
          <Hyperlink
            linkDefault={true}
            linkStyle={{ color: "#2980b9", fontStyle: "italic" }}
            onPress={(url, text) => alert(url + ", " + text)}
          >
            <ViewMoreText
              numberOfLines={3}
              renderViewMore={this.renderViewMore}
              renderViewLess={this.renderViewLess}
              // textStyle={{ textAlign: "center" }}
            >
              <Text style={styles.titleStyle}>
                {singlePostData.posts[0].message}
              </Text>
            </ViewMoreText>
          </Hyperlink>
        </View>
        {this.renderPostMedia(singlePostData.posts[0].images)}
        <View style={[styles.utexSectionStyle, addedLoveExpressionStyle]}>
          <Image
            resizeMode="cover"
            style={styles.utextImageStyle}
            source={require("../assets/utex-icon.png")}
          />
          <Text>2</Text>
        </View>
        <View style={styles.commentExpressionShareContainerStyle}>
          <View style={styles.iconTextContainerStyle}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Contest")}
              style={styles.commentExpressionShareBtnStyle}
            >
              <Icon
                name="star"
                style={[styles.commentExpressionShareIconStyle]}
              />
            </TouchableOpacity>
            <Text style={{ color: "#44a4f7" }}>20k</Text>
          </View>
          <View style={styles.iconTextContainerStyle}>
            <TouchableOpacity style={styles.commentExpressionShareBtnStyle}>
              <Image
                source={require("../assets/comment.png")}
                style={styles.commentImageIconStyle}
              />
            </TouchableOpacity>
            {_.size(this.props.commentData) > 0 && (
              <Text style={{ color: "#44a4f7" }}>
                {" "}
                {FORMAT_NUM_VALUES(_.size(this.props.commentData))}
              </Text>
            )}
          </View>
          <View style={styles.iconTextContainerStyle}>
            <TouchableOpacity
              transparent
              style={styles.commentExpressionShareBtnStyle}
            >
              <Icon
                name="share"
                style={[styles.commentExpressionShareIconStyle]}
              />
            </TouchableOpacity>
            <Text style={{ color: "#44a4f7" }}>20k</Text>
          </View>
        </View>
        {/* {this.renderMedia(data.images)} */}
      </View>
    );
  };

  renderCommentSection = (data, index) => {
    // console.log("ddd", data);
    return (
      <View style={styles.commentContainerStyle}>
        <View style={{ flexDirection: "row" }}>
          {this.renderProfileImage(data.user.profilePictures, data.user.id)}
          <View style={styles.commentBoxContStyle}>
            <Text style={{ fontWeight: "500" }}>{`${data.user.firstName} ${
              data.user.lastName
            }`}</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.commentBoxStyle}>
                <Hyperlink
                  linkDefault={true}
                  linkStyle={{ color: "#2980b9", fontStyle: "italic" }}
                  onPress={(url, text) => alert(url + ", " + text)}
                >
                  <ViewMoreText
                    numberOfLines={3}
                    renderViewMore={this.renderViewMore}
                    renderViewLess={this.renderViewLess}
                    // textStyle={{ textAlign: "center" }}
                  >
                    <Text>{data.message}</Text>
                  </ViewMoreText>
                </Hyperlink>
              </View>
              <TouchableOpacity>
                <Icon name="more" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 10 }}>
            {Moment(data.createdAt).fromNow()}
          </Text>
          <TouchableOpacity style={{ marginLeft: 6 }}>
            <Icon name="undo" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  render() {
    // const containerLocationValue = this.animatedContainerLocationValue.interpolate(
    //   {
    //     inputRange: [0, this.state.containerLocation],
    //     outputRange: [0, -300]
    //   }
    // );
    //console.log("act", containerLocationValue);
    const spinValue = this.animatedIconValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1]
    });
    const rotateValue1 = this.animatedIconValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "20deg"]
    });
    const rotateValue2 = this.animatedIconValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ["0deg", "-45deg", "20deg"]
    });
    const rotateValue3 = this.animatedIconValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ["0deg", "30deg", "-30deg"]
    });
    const rotateValue4 = this.animatedIconValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ["0deg", "-20deg", "20deg"]
    });

    const { singlePostData, loadingPost, commentData } = this.props;
    // let addedLoveExpressionStyle = {};
    // if (singlePostData.posts[0].images.length < 1) {
    //   addedLoveExpressionStyle = styles.addedNoImageLoveExpressionStyle;
    // } else if (singlePostData.posts[0].images.length === 1) {
    //   addedLoveExpressionStyle = styles.addedLoveExpressionStyle;
    // } else {
    //   addedLoveExpressionStyle = styles.addedLoveExpressionMoreImagesStyle;
    // }
    if (loadingPost) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#44a4f7" />
        </View>
      );
    } else {
      if (Array.isArray(singlePostData.post)) {
        //console.log("post", Array.isArray(this.props.singlePostData.post));
        let addedLoveExpressionStyle = {};
        if (singlePostData.posts[0].images.length < 1) {
          addedLoveExpressionStyle =
            styles.addedNoImageLoveExpressionEmptyStyle;
        } else if (singlePostData.posts[0].images.length === 1) {
          addedLoveExpressionStyle = styles.addedLoveExpressionStyle;
        } else {
          addedLoveExpressionStyle = styles.addedLoveExpressionMoreImagesStyle;
        }
        if (this.props.commentData.length > 0) {
          return (
            <View style={{ flex: 1 }}>
              <Header
                style={{
                  marginTop:
                    Platform.OS == "ios" ? 0 : Constants.statusBarHeight,
                  backgroundColor: "#ffffff",
                  zIndex: 1000
                }}
              >
                <Left>
                  <Button
                    transparent
                    onPress={() => this.props.navigation.goBack(null)}
                  >
                    <Icon style={{ color: "#44a4f7" }} name="arrow-back" />
                  </Button>
                </Left>
                <Body>
                  <Text style={styles.headerTitleStyle}>
                    {singlePostData.posts[0].owner.firstName + " Post"}
                  </Text>
                </Body>
              </Header>
              <Spinner
                visible={this.props.is_commenting}
                color="#44a4f7"
                overlayColor="rgba(0, 0, 0, 0.1)"
              />

              <Modal
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
                    <Icon
                      style={styles.showMoreDropdownIconStyle}
                      name="bookmark"
                    />
                    <Text>Save Post</Text>
                  </TouchableOpacity>
                </View>
              </Modal>

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
                  renderItem={({ item, index }) => {
                    // console.log("basds", item, index);
                    return (
                      <Fragment>
                        {(!index || item == null) && this.renderPostData()}
                        {this.renderCommentSection(item, index)}
                      </Fragment>
                    );
                  }}
                  // onRefresh={this._onRefresh}
                  // ListEmptyComponent={
                  //   <View
                  //     style={{
                  //       flex: 1,
                  //       justifyContent: "center",
                  //       alignItems: "center",
                  //       paddingTop: 10
                  //     }}
                  //   >
                  //     <Text>Loading...</Text>
                  //   </View>
                  // }
                  // initialNumToRender={8}
                  // maxToRenderPerBatch={2}
                  // onEndReachedThreshold={0.5}
                  // removeClippedSubviews={true}
                  // refreshing={this.props.refresh}
                  extraData={this.props.singlePostData}
                  data={this.props.commentData}
                  keyExtractor={(item, index) => index.toString()}
                  // getItemLayout={this.getItemLayout}
                />
              </View>
              <View
                style={[
                  styles.loveExpressionPanel,
                  { bottom: this.state.bottomLocation }
                ]}
              >
                <View style={{ flexDirection: "row" }}>
                  {this.renderLoginUserImage()}
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
                      placeholderStyle={{ color: "#707070", fontSize: 12 }}
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
                    onPress={() =>
                      this.onSubmitComment(singlePostData.posts[0].id)
                    }
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Icon name="send" style={{ color: "#44a4f7" }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }
        return (
          <View style={{ flex: 1 }}>
            <Header
              style={{
                marginTop: Platform.OS == "ios" ? 0 : Constants.statusBarHeight,
                backgroundColor: "#ffffff",
                zIndex: 1000
              }}
            >
              <Left>
                <Button
                  transparent
                  onPress={() => this.props.navigation.goBack(null)}
                >
                  <Icon style={{ color: "#44a4f7" }} name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Text style={styles.headerTitleStyle}>
                  {singlePostData.posts[0].owner.firstName + " Post"}
                </Text>
              </Body>
            </Header>
            <Spinner
              visible={this.props.is_commenting}
              color="#44a4f7"
              overlayColor="rgba(0, 0, 0, 0.1)"
            />

            <Modal
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
                  <Icon
                    style={styles.showMoreDropdownIconStyle}
                    name="bookmark"
                  />
                  <Text>Save Post</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <ScrollView>
              <View>
                <View style={styles.containerImageContainer}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* {this.renderProfilePhoto(profileImageStyle)} */}
                    {this.renderProfileImage(
                      singlePostData.posts[0].owner.profilePictures,
                      singlePostData.posts[0].owner.id
                    )}
                    <View style={{ marginLeft: 18 }}>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          this.props.navigation.navigate("UsersProfile", {
                            user: singlePostData.posts[0].owner.id
                          })
                        }
                      >
                        <Text style={styles.profileTitleNameStyle}>
                          {singlePostData.posts[0].owner.firstName +
                            " " +
                            singlePostData.posts[0].owner.lastName}
                        </Text>
                      </TouchableWithoutFeedback>
                      <Text style={styles.timeAgoStyle}>
                        {Moment(singlePostData.posts[0].createdAt).fromNow()}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => this.setState({ showMoreOptions: true })}
                      style={{ marginLeft: "auto", paddingLeft: 10 }}
                    >
                      <Icon name="more" />
                    </TouchableOpacity>
                  </View>
                  <Hyperlink
                    linkDefault={true}
                    linkStyle={{ color: "#2980b9", fontStyle: "italic" }}
                    onPress={(url, text) => alert(url + ", " + text)}
                  >
                    <ViewMoreText
                      numberOfLines={3}
                      renderViewMore={this.renderViewMore}
                      renderViewLess={this.renderViewLess}
                      // textStyle={{ textAlign: "center" }}
                    >
                      <Text style={styles.titleStyle}>
                        {singlePostData.posts[0].message}
                      </Text>
                    </ViewMoreText>
                  </Hyperlink>
                </View>
                {this.renderPostMedia(singlePostData.posts[0].images)}
                <View
                  style={[styles.utexSectionStyle, addedLoveExpressionStyle]}
                >
                  <Image
                    resizeMode="cover"
                    style={styles.utextImageStyle}
                    source={require("../assets/utex-icon.png")}
                  />
                  <Text>2</Text>
                </View>
                <View style={styles.commentExpressionShareContainerStyle}>
                  <View style={styles.iconTextContainerStyle}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate("Contest")}
                      style={styles.commentExpressionShareBtnStyle}
                    >
                      <Icon
                        name="star"
                        style={[styles.commentExpressionShareIconStyle]}
                      />
                    </TouchableOpacity>
                    <Text style={{ color: "#44a4f7" }}>20k</Text>
                  </View>
                  <View style={styles.iconTextContainerStyle}>
                    <TouchableOpacity
                      style={styles.commentExpressionShareBtnStyle}
                    >
                      <Image
                        source={require("../assets/comment.png")}
                        style={styles.commentImageIconStyle}
                      />
                    </TouchableOpacity>
                    {_.size(this.props.commentData) > 0 && (
                      <Text style={{ color: "#44a4f7" }}>
                        {" "}
                        {FORMAT_NUM_VALUES(_.size(this.props.commentData))}
                      </Text>
                    )}
                  </View>
                  <View style={styles.iconTextContainerStyle}>
                    <TouchableOpacity
                      transparent
                      style={styles.commentExpressionShareBtnStyle}
                    >
                      <Icon
                        name="share"
                        style={[styles.commentExpressionShareIconStyle]}
                      />
                    </TouchableOpacity>
                    <Text style={{ color: "#44a4f7" }}>20k</Text>
                  </View>
                </View>
                {/* {this.renderMedia(data.images)} */}
              </View>
            </ScrollView>
            <View
              style={[
                styles.loveExpressionPanel,
                { bottom: this.state.bottomLocation }
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                {this.renderLoginUserImage()}
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
                    placeholderStyle={{ color: "#707070", fontSize: 12 }}
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
                  onPress={() =>
                    this.onSubmitComment(singlePostData.posts[0].id)
                  }
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Icon name="send" style={{ color: "#44a4f7" }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      } else {
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#44a4f7" />
          </View>
        );
      }
    }
  }
}

const styles = EStyleSheet.create({
  containerImageContainer: {
    paddingLeft: "17rem",
    paddingRight: "17rem",
    paddingBottom: "9rem",
    paddingTop: "10rem"
  },
  titleStyle: {
    marginTop: "8rem"
  },
  contentStyle: {
    // paddingTop: "10rem",
    minHeight: "50rem",
    // flex: 1
    paddingBottom: "100rem"
  },
  headerTitleStyle: {
    color: "#44a4f7",
    fontSize: "18rem",
    fontWeight: "500",
    lineHeight: "20rem"
  },
  profileImageStyle: {
    width: "46rem",
    height: "46rem"
  },
  commentImageStyle: {
    width: "31rem",
    height: "31rem"
  },
  loveExpressionPanel: {
    width: "100%",
    marginTop: "128rem",
    // marginBottom: "10rem",
    position: "absolute",
    padding: "10rem",

    // marginLeft: "7rem",
    // marginRight: "7rem",
    backgroundColor: "#ffffff",
    alignItems: "center",
    minHeight: "39rem",
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
    borderRadius: 5,
    borderColor: "#dddddd",
    borderStyle: "solid",
    borderWidth: 1,
    elevation: 2
  },
  commentPanel: {
    width: "77%",
    marginRight: "13rem",
    //minHeight: "35rem",
    borderRadius: 5,
    backgroundColor: "#f3f3f3",
    borderWidth: 0,
    marginLeft: "9rem",

    paddingLeft: "7rem"
  },
  commentIcon: {
    color: "#ababab",
    marginRight: "12rem"
  },
  loveExpressionIconStyles: {
    width: "22rem",
    height: "22rem"
  },
  chooseExpressionPanel: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "15rem"
  },
  expressionButtonStyle: {
    marginRight: "31rem"
  },
  commentExpressionShareContainerStyle: {
    height: "45rem",
    borderRadius: 5,
    borderColor: "#dddddd",
    borderStyle: "solid",
    borderBottomWidth: 1,
    marginLeft: "7rem",
    marginRight: "7rem",
    marginTop: "25rem",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5rem",
    marginBottom: "10rem"
  },
  iconTextContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  commentExpressionShareBtnStyle: {
    // height: "33rem",
    // width: "33rem",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 75,
    // backgroundColor: "#e4e4e4",
    marginRight: "5rem"
  },
  commentExpressionShareIconStyle: {
    color: "#686767",
    fontSize: "30rem"
  },
  commentImageIconStyle: {
    width: "30rem",
    height: "30rem"
  },
  carouselImageStyle: {
    width: "100%",
    minHeight: "300rem"
  },
  profileTitleNameStyle: {
    fontSize: "15rem",
    color: "#000",
    fontWeight: "700"
  },
  timeAgoStyle: {
    fontSize: "10rem",
    color: "#7e7b7b",
    fontWeight: "300"
  },
  moreMediaButonStyles: {
    position: "absolute",
    right: "95rem",
    bottom: "25rem",
    zIndex: 1000,
    shadowOpacity: 0,
    shadowRadius: 0,
    backgroundColor: "#fff"
  },
  addedNoImageLoveExpressionEmptyStyle: {
    top: "90rem",
    marginBottom: "5rem"
  },
  addedNoImageLoveExpressionStyle: {
    top: "130rem",
    marginBottom: "5rem"
  },
  addedLoveExpressionStyle: {
    bottom: "40rem",
    marginBottom: "15rem"
  },
  addedLoveExpressionMoreImagesStyle: {
    bottom: "70rem"
  },
  utextImageStyle: {
    width: "9rem",
    height: "10rem",
    marginRight: "3rem"
  },
  utexSectionStyle: {
    position: "absolute",
    right: "16rem",
    // bottom: "139rem",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  commentBoxStyle: {
    width: "252rem",
    minHeight: "48rem",
    borderRadius: "15rem",
    backgroundColor: "#eef0f3",
    padding: "7rem",
    marginTop: "3rem",
    marginRight: "25rem"
  },
  commentBoxContStyle: {
    marginLeft: "10rem",
    justifyContent: "center"
  },
  commentContainerStyle: {
    paddingLeft: "17rem",
    paddingRight: "17rem",
    marginBottom: "22rem"
  },
  commentPanelStyle: { marginBottom: "150rem" },
  moreOptionContainerStyle: {
    // width: "125rem",
    minHeight: "76rem",
    // shadowColor: "rgba(0, 0, 0, 0.16)",
    // shadowOffset: { width: "3rem", height: 0 },
    // shadowRadius: "6rem",
    borderRadius: "2rem",
    borderColor: "#f7f8f9",
    borderStyle: "solid",
    borderWidth: "1rem",
    backgroundColor: "#ffffff",
    paddingTop: "30rem",
    paddingBottom: "30rem",
    paddingLeft: "10rem"
  },
  showMoreDropdownIconStyle: {
    color: "#707070",
    marginRight: "15rem",
    fontSize: "18rem"
  },
  eachDropdwonButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "22rem",
    width: "100%"
  }
});

const mapStateToProps = ({ profileSetup, auth, post }) => {
  const { userData } = profileSetup;
  const {
    singlePostData,
    loadingPost,
    commentMsg,
    is_commenting,
    commentData
  } = post;
  const { token, userId } = auth;

  // console.log("com", commentData);

  return {
    userData,
    token,
    userId,
    singlePostData,
    loadingPost,
    commentMsg,
    is_commenting,
    commentData
  };
};
export default connect(
  mapStateToProps,
  { fetchSinglePost, commentFormField, commentOnPost, resetData }
)(CommentScreen);
