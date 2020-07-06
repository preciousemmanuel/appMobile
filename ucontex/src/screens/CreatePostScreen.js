import React, {PureComponent} from 'react';
import {
  Text,
  View,
  Platform,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
  AppState,
  BackHandler,
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
} from 'native-base';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import EStyleSheet from 'react-native-extended-stylesheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
//import CameraRollPicker from 'react-native-camera-roll-picker';
import ProfilePicture from '../components/ProfilePicture';
//import Camera from '../components/Camera';

import {
  choosePostMedia,
  checkMediaToDelete,
  deleteMedia,
  createPostFormField,
  createPostError,
  resetCreatePostFields,
  publishPost,
  imageBrowserOpen,
} from '../actions';

import {STATUS_BAR} from '../config';

const SCREEN_WIDTH = Dimensions.get('window').width;
class CreatePostScreen extends PureComponent {
  state = {
    showMistakeBtn: false,
    isPostUnfinish: false,
    imageBrowserOpen: false,
    cameraBrowserOpen: false,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  handleBackPress = () => {
    console.log('dc', this.state.isPostUnfinish);
    if (this.props.message !== '' || this.props.postMedia.length > 0) {
      this.setState({showMistakeBtn: true, isPostUnfinish: true});

      return true;
    } else {
      this.setState({showMistakeBtn: false, isPostUnfinish: false}, () => {
        this.props.navigation.goBack(null);
      });
      return true;
    }
    // if (this.state.showMistakeBtn) {
    //   this.setState({ isPostUnfinish: true });
    //
    //   return true;
    // } else {
    //   this.props.navigation.goBack(null);
    //   return true;
    // }
  };
  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      if (this.props.message !== '' || this.props.postMedia.length > 0) {
        this.setState({showMistakeBtn: true});
      } else {
        this.setState({showMistakeBtn: false});
      }
    }
  }

  renderBackButton() {
    if (this.state.showMistakeBtn) {
      return (
        <Button
          transparent
          onPress={() => this.setState({isPostUnfinish: true})}>
          <Icon style={{color: '#44a4f7'}} name="arrow-back" />
        </Button>
      );
    }
    return (
      <Button transparent onPress={() => this.props.navigation.goBack(null)}>
        <Icon style={{color: '#44a4f7'}} name="arrow-back" />
      </Button>
    );
  }
  onDiscardPost() {
    this.props.resetCreatePostFields();
    this.setState({isPostUnfinish: false, showMistakeBtn: false});
  }
  toggleMoreButton() {
    this.setState({toggleMoreButton: !this.state.toggleMoreButton});
  }
  undoDelete() {
    if (this.props.showDeleteBtn) {
      this.props.checkMediaToDelete({showDeleteBtn: false, index: null});
    }
    if (this.state.toggleMoreButton) {
      this.setState({toggleMoreButton: false});
    }
  }
  onDeleteMedia() {
    //  alert(this.props.index);
    this.props.deleteMedia(this.props.index);
  }

  showDeleteBtn() {
    if (this.props.showDeleteBtn) {
      return (
        <View style={styles.addButtonContStyle}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.onDeleteMedia.bind(this)}
            style={[styles.addButtonStyle, {backgroundColor: 'red'}]}>
            <Icon name="trash" style={{color: '#ffffff'}} />
          </TouchableOpacity>
        </View>
      );
    }
  }

  checkMediaToDelete(index) {
    //const { showDeleteBtn, index } = this.props;
    //alert()
    this.props.checkMediaToDelete({showDeleteBtn: true, index});
  }

  thumbnailImage(index, image) {
    let _style;
    if (index == this.props.index) {
      _style = {opacity: 0.2};
    } else {
      _style = {opacity: 1};
    }
    console.log('index', image);
    return (
      <TouchableWithoutFeedback
        onLongPress={this.checkMediaToDelete.bind(this, index)}
        key={index}>
        <View>
          <Image
            resizeMode={'cover'}
            style={[styles.imageStyle, {margin: 4}, _style]}
            source={{uri: image.file}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  showAddMoreImageBtn() {
    if (this.props.postMedia.length > 0) {
      return (
        <View style={styles.addButtonContStyle}>
          <Button transparent>
            <Text>{'+ ' + this.props.postMedia.length}</Text>
          </Button>
          {/* <TouchableOpacity
            onPress={this.pickImageGallery.bind(this)}
            style={styles.addButtonStyle}
          >
            <Icon name="add" style={{ color: "#ffffff" }} />
          </TouchableOpacity> */}
        </View>
      );
    }
  }
  renderMedia() {
    //let images = [];
    console.log('postm', this.props.postMedia);
    if (this.props.postMedia.length > 0) {
      const deck = this.props.postMedia.map((image, index) => {
        return this.thumbnailImage(index, image);
      });

      return deck;
    }
    return null;

    //return images;
    // return (
    //   <Image
    //     style={styles.imageStyle}
    //     source={{ uri: this.state.postMedia }}
    //   />
    // );
  }
  // askPermissionsAsync = async () => {
  //   await Permissions.askAsync(Permissions.CAMERA);
  //   await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //
  //   // you would probably do something to verify that permissions
  //   // are actually granted, but I'm skipping that for brevity
  // };

  // pickImageGallery = async () => {
  //   try {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       quality: 0.5
  //     });
  //     //console.log(result);
  //     if (!result.cancelled) {
  //       // this.setState({
  //       //   postMedia: this.state.postMedia.concat([result.uri]),
  //       //   galleryImageTitle: "Choose more image",
  //       //   index: this.state.index + 1
  //       // });
  //       this.props.choosePostMedia(result.uri);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };,,,,,
  // async launchCamera() {
  //   try {
  //     let { status } = await Permissions.askAsync(
  //       Permissions.CAMERA,
  //       Permissions.CAMERA_ROLL
  //     );
  //     if (status !== "granted") {
  //       alert("not granted");
  //     }
  //     let result = await ImagePicker.launchCameraAsync({
  //       quality: 0.5
  //     });
  //     console.log(result);
  //     if (!result.cancelled) {
  //       // this.setState({
  //       //   postMedia: this.state.postMedia.concat([result.uri]),
  //       //   galleryImageTitle: "Choose more image",
  //       //   index: this.state.index + 1
  //       // });
  //       this.props.choosePostMedia(result.uri);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  // getSelectedImages = images => {
  //   images.forEach((image, index) => {
  //     this.props.choosePostMedia(image.uri);
  //   });
  //   this.setState({imageBrowserOpen: false});
  //   //console.log('imgsx', images);
  // };
  onHandlePreviewPost = () => {
    this.setState({toggleMoreButton: false});
    this.props.navigation.navigate('PreviewCreatePost');
  };
  onPublishPost = () => {
    const {
      category,
      message,
      postMedia,
      userData,
      token,
      userId,
      usersToPin,
    } = this.props;

    this.props.publishPost(
      {
        category,
        message,
        postMedia,
        userId,
        token,
        usersToPin,
      },
      () => {
        this.props.navigation.navigate('NewsFeed');
      },
    );
  };

  renderPinPeople = () => {
    if (this.props.usersToPin.length > 0) {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../assets/push-pin.png')}
            style={styles.pinPushSmallStyle}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('PinPeople')}>
            <Text style={styles.PinPeopleTextStle}>
              {this.props.usersToPin.length + ' people'}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return;
  };

  // photoFunx = image => {
  //   this.setState({cameraBrowserOpen: false}, () => {
  //     this.props.choosePostMedia(image);
  //   });
  //   //console.log('postimg', image);
  // };

  launchCamera = () => {
    ImagePicker.openCamera({
      multiple: true,
    })
      .then(image => {
        console.log(image);
        let photo = [{file: image.path}];
        this.props.choosePostMedia(photo);
      })
      .catch(err => {
        console.log(err);
      });
  };

  launchGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
    })
      .then(images => {
        console.log(images);
        let photo = images.map(function(image) {
          return {file: image.path};
        });
        console.log('photo', photo);
        this.props.choosePostMedia(photo);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    //console.log("gethjhj", this.props.selectSCREEN_WIDTHedMedia);
    const {
      titleStyle,
      postContainerStyle,
      profileTitleNameStyle,
      headerStyle,
      profileImageStyle,
      headerTitleStyle,
      textAreaStyle,
      postSettingStyle,
      publishButtonStyle,
      pickerStyle,
      mediaContainerStyle,
      moreOptionContainerStyle,
      modalUnfinishStyle,
      removeButtonStyle,
      closeIconStyle,
      moreOptionBtnStyle,
      moreOptionBtn2Style,
    } = styles;

    // let _mediaContainerStyle;
    // if (this.props.postMedia.length > 0) {
    //   _mediaContainerStyle=mediaContainerStyle
    // } else {
    //   _mediaContainerStyle={}
    // }
    if (this.state.imageBrowserOpen) {
      return (
        <CameraRollPicker
          callback={this.getSelectedImages}
          close={() => this.setState({imageBrowserOpen: false})}
        />
      );
    } else if (this.state.cameraBrowserOpen) {
      return <Camera callback={this.photoFunx} />;
    }
    return (
      <TouchableWithoutFeedback onPress={this.undoDelete.bind(this)}>
        <View style={{flex: 1}}>
          {/* <TouchableWithoutFeedback
            onPress={() => {
              if (this.state.toggleMoreButton) {
                this.setState({ toggleMoreButton: false });
              }
            }}
          > */}
          <Spinner
            visible={this.props.isPosting}
            color="#ffffff"
            overlayColor="rgba(0, 0, 0, 0.7)"
            textContent="Creating Post..."
            textStyle={{color: '#ffffff'}}
          />
          <Header
            style={{
              //marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
              backgroundColor: '#ffffff',
            }}>
            <Left>{this.renderBackButton()}</Left>
            <Body>
              <Text style={headerTitleStyle}>Create Post</Text>
            </Body>
            <Right>
              <Button transparent onPress={this.toggleMoreButton.bind(this)}>
                <Icon name="more" style={{color: '#44a4f7'}} />
              </Button>
            </Right>
            {/* {this.renderMoreOptionContainer()} */}
          </Header>

          {/* </TouchableWithoutFeedback> */}
          <ScrollView>
            {/* <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
                enableOnAndroid
                contentContainerStyle={{ flexGrow: 1 }}
              > */}
            <View style={postContainerStyle}>
              {/* <Modal isVisible={this.state.isLocationModalVisible}>
                <View style={modalStyle}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        isLocationModalVisible: false,
                        isGettingLocation: false
                      });
                    }}
                    style={removeButtonStyle}
                  >
                    <Icon name="close" style={closeIconStyle} />
                  </TouchableOpacity>

        <View style={postContainerStyle}>
          <View style={headerStyle}>
            <Image
              resizeMode="cover"
              source={require("../assets/user.png")}
              style={profileImageStyle}
            />

                      padding: 15
                    }}
                    onPress={this.openLocationSetting.bind(this)}
                  >
                    <Text style={{ color: "#fff" }}>Enable Location</Text>
                  </TouchableOpacity>
                </View>
              </Modal> */}
              <Modal
                isVisible={this.state.toggleMoreButton}
                onBackdropPress={() =>
                  this.setState({
                    toggleMoreButton: false,
                  })
                }>
                <View style={moreOptionContainerStyle}>
                  <TouchableOpacity style={moreOptionBtnStyle}>
                    <Text>Schedule Post</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={this.onHandlePreviewPost}
                    style={moreOptionBtn2Style}>
                    <Text>Preview Post</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
              <Modal
                isVisible={this.state.isPostUnfinish}
                style={{margin: 0}}
                onBackdropPress={() =>
                  this.setState({
                    isPostUnfinish: false,
                    showMistakeBtn: false,
                  })
                }>
                <View style={modalUnfinishStyle}>
                  <Text style={styles.modalTitleStyle}>
                    Want to finish your post later?
                  </Text>
                  <Text style={[styles.modalTitleStyle, {fontSize: 15}]}>
                    Save it as draft or you can continue editing it
                  </Text>
                  <View style={styles.selectImageOptionContainerStyle}>
                    <ListItem icon>
                      <Left>
                        <Icon name="bookmark" style={{color: '#ababab'}} />
                      </Left>
                      <Body style={{borderBottomWidth: 0}}>
                        <Text style={{color: '#686767'}}>Save as draft</Text>
                      </Body>
                    </ListItem>

                    <ListItem icon onPress={this.onDiscardPost.bind(this)}>
                      <Left>
                        <Icon name="trash" style={{color: '#ababab'}} />
                      </Left>
                      <Body style={{borderBottomWidth: 0}}>
                        <Text style={{color: '#686767'}}>Discard post</Text>
                      </Body>
                    </ListItem>
                    <ListItem
                      icon
                      onPress={() =>
                        this.setState({
                          isPostUnfinish: false,
                          showMistakeBtn: false,
                        })
                      }>
                      <Left>
                        <Icon name="create" style={{color: '#ababab'}} />
                      </Left>
                      <Body style={{borderBottomWidth: 0}}>
                        <Text style={{color: '#686767'}}>Continue editing</Text>
                      </Body>
                    </ListItem>
                  </View>
                </View>
              </Modal>
              <View style={headerStyle}>
                <ProfilePicture
                  onPress={() =>
                    this.props.navigation.navigate('UsersProfile', {
                      user: this.props.userId,
                    })
                  }
                  style={styles.profileImageStyle}
                  profilePictures={
                    this.props.userData.data.userData.profilePictures
                  }
                />
                <Text style={profileTitleNameStyle}>
                  {this.props.userData.data.userData.firstName +
                    ' ' +
                    this.props.userData.data.userData.lastName}
                </Text>

                {this.renderPinPeople()}
              </View>
            </View>
            <Textarea
              style={textAreaStyle}
              rowSpan={4}
              onChangeText={text =>
                this.props.createPostFormField({
                  prop: 'message',
                  value: text,
                })
              }
              value={this.props.message}
              placeholder="What do you feel"
              placeholderTextColor="#686767"
            />
            <ScrollView
              indicatorStyle="white"
              horizontal
              showsHorizontalScrollIndicator={false}
              style={mediaContainerStyle}>
              {this.renderMedia()}
            </ScrollView>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {this.showAddMoreImageBtn()}
              {this.showDeleteBtn()}
            </View>
            <View style={postSettingStyle}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',

                  width: 60,
                }}>
                <TouchableOpacity
                  activeOpacity={0.75}
                  style={{marginRight: 20}}
                  // onPress={this.onGetLocation.bind(this)}
                >
                  <Icon name="pin" style={{color: '#686767'}} />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => this.launchGallery()}
                  // onPress={() => this.pickImageGallery()}
                >
                  <Icon name="images" style={{color: '#686767'}} />
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
                <Item picker style={pickerStyle}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholderStyle={{color: '#000'}}
                    style={{width: 70}}
                    selectedValue={this.props.category}
                    onValueChange={text =>
                      this.props.createPostFormField({
                        prop: 'category',
                        value: text,
                      })
                    }>
                    <Picker.Item label="🌎 Pubilc" value="3" />
                    <Picker.Item label="👥 Connections" value="2" />
                    <Picker.Item label="🔒 Only Me" value="1" />
                  </Picker>
                </Item>
                <Button onPress={this.onPublishPost} style={publishButtonStyle}>
                  <Text style={{color: '#ffffff'}}>Publish</Text>
                </Button>
              </View>
            </View>

            <View style={styles.selectImageOptionContainerStyle}>
              <ListItem
                icon
                onPress={() => this.props.navigation.navigate('PinPeople')}>
                <Left>
                  <Image
                    source={require('../assets/push-pin.png')}
                    style={styles.pinPushStyle}
                  />
                </Left>
                <Body style={{borderBottomWidth: 0}}>
                  <Text style={{color: '#686767'}}>Pin People</Text>
                </Body>
              </ListItem>
              {/* <ListItem icon onPress={this.pickImageGallery.bind(this)}> */}
              <ListItem icon onPress={() => this.launchGallery()}>
                <Left>
                  <Icon name="images" style={{color: '#ababab'}} />
                </Left>
                <Body style={{borderBottomWidth: 0}}>
                  <Text style={{color: '#686767'}}>Choose from Gallery</Text>
                </Body>
              </ListItem>

              {/* <ListItem icon onPress={this.launchCamera.bind(this)}> */}
              <ListItem icon onPress={() => this.launchCamera()}>
                <Left>
                  <Icon name="camera" style={{color: '#ababab'}} />
                </Left>
                <Body style={{borderBottomWidth: 0}}>
                  <Text style={{color: '#686767'}}>Take photo</Text>
                </Body>
              </ListItem>
            </View>
            {/* <ScrollView
              indicatorStyle="white"
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{marginBottom: 150}}
            >
              {this.renderMedia()}
            </ScrollView>
            {/* {this.showAddMoreImageBtn()} */}
            {/* <Button style={publishButtonStyle}>
              <Text style={{ color: "#ffffff" }}>Publish</Text>
            </Button> */}
            {/* </KeyboardAwareScrollView> */}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'transparent',
    // borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  titleStyle: {
    paddingTop: '17rem',
    paddingLeft: '17rem',
    paddingBottom: '9rem',
  },
  postContainerStyle: {
    padding: '18rem',
    marginTop: '10rem',
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginRight: '8rem',
  },
  headerTitleStyle: {
    color: '#44a4f7',
    fontSize: '18rem',
    fontWeight: '500',
    lineHeight: '20rem',
  },
  textAreaStyle: {
    marginTop: '7rem',
    paddingLeft: '18rem',
    backgroundColor: '#F2F0F0',
    paddingTop: '5rem',
  },
  postSettingStyle: {
    flexDirection: 'row',
    marginTop: '10rem',
    paddingTop: '15rem',
    paddingLeft: '20rem',
    paddingRight: '20rem',
    borderTopWidth: '1rem',
    borderTopColor: '#ababab',
  },
  publishButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70rem',
    height: '35rem',

    backgroundColor: '#44a4f7',
  },
  pickerStyle: {
    backgroundColor: '#cac7c7',
    width: '105rem',
    height: '35rem',
    paddingRight: '5rem',
    borderRadius: '3rem',
    marginRight: '7rem',
  },
  imageStyle: {
    width: '148rem',
    height: '148rem',
    alignSelf: 'stretch',
    borderRadius: '5rem',
  },
  mediaContainerStyle: {
    marginBottom: '5rem',
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
  moreOptionBtnStyle: {
    paddingTop: '12rem',
    justifyContent: 'center',
    height: '30rem',
    marginBottom: '18rem',
    paddingLeft: '12rem',
  },
  moreOptionBtn2Style: {
    paddingBottom: '12rem',
    justifyContent: 'center',
    height: '30rem',
    paddingLeft: '12rem',
  },
});

const mapStateToProps = ({post, auth}) => {
  const {
    postMedia,
    index,
    showDeleteBtn,
    message,
    category,
    isPosting,
    imageBrowserOpen,
    usersToPin,
  } = post;
  //const { userData } = profileSetup;
  const {userId, token, userData} = auth;
  // console.log("media", postMedia);
  return {
    postMedia,
    index,
    showDeleteBtn,
    message,
    category,
    userData,
    isPosting,
    userId,
    token,
    imageBrowserOpen,
    usersToPin,
  };
};
export default connect(
  mapStateToProps,
  {
    choosePostMedia,
    checkMediaToDelete,
    deleteMedia,
    createPostFormField,
    createPostError,
    resetCreatePostFields,
    publishPost,
    imageBrowserOpen,
  },
)(CreatePostScreen);
