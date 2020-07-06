import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
  Animated,
  PanResponder,
  LayoutAnimation,
  UIManager,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {
  Button,
  ListItem,
  Left,
  Right,
  Body,
  Icon,
  Item,
  Picker,
} from 'native-base';
import _ from 'lodash';
import ImagePicker from 'react-native-image-crop-picker';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import {SCHEDULE_PROFILE_TIME} from '../config';
import {
  chooseProfilePic,
  deleteImage,
  saveProfilePicture,
  profileFormField,
  checkImageToDelete,
  clearErrMsg,
} from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const LONG_PRESS_MIN_DURATION = 500;

class ChooseProfilePicScreen extends Component {
  // constructor(props) {
  //   super(props);
  //   const position = new Animated.ValueXY();
  //   //the pan PanResponder is use for handling user gestures or user input
  //   const panResponder = PanResponder.create({
  //     //this are lifecycle method
  //     onStartShouldSetPanResponder: () => true,
  //     onPanResponderGrant: (event, gesture) => {
  //       this.longPressTimeOut = setTimeout(() => {
  //         //alert("Long Press");
  //         this.setState({ showDeleteBtn: true, index: this.state.index + 1 });
  //       }, LONG_PRESS_MIN_DURATION);
  //     }, //this is for activating panResponder when user clicks or drags the screen
  //     onPanResponderMove: (event, gestures) => {
  //       //  position.setValue({ x: gestures.dx, y: gestures.dy });
  //     }, //this is called anytime user drags on the screen
  //     onPanResponderRelease: (event, gestures) => {
  //       clearTimeout(this.longPressTimeOut);
  //     }
  //   });
  //state = { index: null, showDeleteBtn: false, right: false };
  state = {right: false};

  // state = {
  //   imageSource: [],
  //   galleryImageTitle: "Choose from photos",
  //   index: 0,
  //   right: false
  // };
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    // console.log("oo",params);
    return {
      title: 'Add Profile Picture',
      headerRight:
        typeof params.right !== 'undefined' && params.right ? (
          <Button
            transparent
            style={styles.headerRightStyle}
            onPress={params.onHandleSave}>
            <Text style={{color: '#44a4f7'}}>Done</Text>
          </Button>
        ) : (
          <Button
            transparent
            style={styles.headerRightStyle}
            onPress={() => navigation.navigate('UpdateCoverPhoto')}>
            <Text style={{color: '#44a4f7'}}>Skip</Text>
          </Button>
        ),
    };
  };
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      //console.log(prevProps.imageSource.length);
      // this.setState({ right: true });
      //this.props.checkImageToDelete({ showDeleteBtn: false, index: null });
      if (
        this.props.imageSource.length !== prevProps.imageSource.length &&
        this.props.imageSource.length > 0
      ) {
        //alert("kkk");
        this.props.navigation.setParams({right: true});
      }
      if (
        this.props.imageSource.length !== prevProps.imageSource.length &&
        this.props.imageSource.length <= 0
      ) {
        //alert("kkk");
        this.props.navigation.setParams({right: false});
      }
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      right: false,
      onHandleSave: this._onHandleSave,
    });
    //alert("myyy");
    //console.log("reds");
    //this.renderHeaderButton();
    //  this.props.navigation.setParams({ right: this.state.right });
    // const right;
    // this.props.navigation.setParams({
    //   renderHeaderButton: this.renderHeaderButton
    // });
  }

  _onHandleSave = () => {
    console.log(this.props.imageSource.length);
    //console.log(this.props.imageSource);
    const {
      imageSource,
      schedule_profile_time,
      userData,
      userId,
      token,
    } = this.props;
    //alert(userData.token + " " + userData.data.id);
    this.props.saveProfilePicture(
      {
        imageSource,
        schedule_profile_time,
        userId,
        token,
      },
      () => {
        this.props.navigation.navigate('UpdateCoverPhoto');
      },
    );
  };
  onDeleteImage() {
    //  alert(this.props.index);
    this.props.deleteImage(this.props.index);
  }

  showDeleteBtn() {
    if (this.props.showDeleteBtn) {
      return (
        <View style={styles.addButtonContStyle}>
          <Button
            onPress={this.onDeleteImage.bind(this)}
            style={[styles.addButtonStyle, {backgroundColor: 'red'}]}>
            <Icon name="trash" />
          </Button>
        </View>
      );
    }
  }

  //this method initiates delete button
  checkImageToDelete(index) {
    //const { showDeleteBtn, index } = this.props;
    //alert()
    this.props.checkImageToDelete({showDeleteBtn: true, index});
  }

  thumbnailImage(index, image) {
    let _style;
    if (index == this.props.index) {
      _style = {opacity: 0.2};
    } else {
      _style = {opacity: 1};
    }
    //  console.log(index);
    return (
      <TouchableWithoutFeedback
        onLongPress={this.checkImageToDelete.bind(this, index)}
        key={index}>
        <View>
          <Image
            resizeMode={'cover'}
            style={[styles.imageStyle, {margin: 4}, _style]}
            source={{uri: image}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  showAddMoreImageBtn() {
    if (
      this.props.imageSource.length > 0 &&
      this.props.imageSource.length < 4
    ) {
      return (
        <View style={styles.addButtonContStyle}>
          <Button onPress={this.launchGallery} style={styles.addButtonStyle}>
            <Icon name="add" />
          </Button>
        </View>
      );
    }
  }
  renderImage() {
    //let images = [];
    //console.log(this.state.imageSource);
    if (this.props.imageSource.length == 0) {
      let staticImagePath;
      if (this.props.userData.data.userData.gender === 'Female') {
        staticImagePath = require('../assets/female-profile.png');
      } else {
        staticImagePath = require('../assets/user.png');
      }
      return (
        <View>
          <TouchableOpacity onPress={this.launchGallery}>
            <Image
              key={10001}
              style={styles.imageStyle}
              source={staticImagePath}
            />
          </TouchableOpacity>
        </View>
      );
    }

    const deck = this.props.imageSource.map((image, index) => {
      return this.thumbnailImage(index, image);
    });

    return deck;
    //return images;
    // return (
    //   <Image
    //     style={styles.imageStyle}
    //     source={{ uri: this.state.imageSource }}
    //   />
    // );
  }

  // renderHeaderButton() {
  //   //console.log(this.state.imageSource.length);
  //   if (this.props.imageSource.length > 0) {
  //     alert("true");
  //     this.setState({ right: true });
  //   } else {
  //     this.setState({ right: false });
  //     alert("false");
  //   }
  // }
  launchCamera = () => {
    ImagePicker.openCamera({})
      .then(image => {
        console.log(image);
        //let photo = [{file: image.path}];
        this.props.chooseProfilePic(image.path);
      })
      .catch(err => {
        console.log(err);
      });
  };

  launchGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      //multiple: true,
    })
      .then(image => {
        // console.log(images);
        // let photo = images.map(function(image) {
        //   return {file: image.path};
        // });
        console.log('photo', image);
        this.props.chooseProfilePic(image.path);
      })
      .catch(err => {
        console.log(err);
      });
  };
  renderChooseGalleryBtn() {
    if (
      this.props.imageSource.length >= 0 &&
      this.props.imageSource.length < 4
    ) {
      return (
        <View>
          <ListItem icon onPress={() => this.launchGallery()}>
            <Left>
              <Icon name="bookmarks" style={{color: '#ababab'}} />
            </Left>
            <Body style={{borderBottomWidth: 0}}>
              <Text>Choose from Gallery</Text>
            </Body>
          </ListItem>

          <ListItem icon onPress={() => this.launchCamera()}>
            <Left>
              <Icon name="camera" style={{color: '#ababab'}} />
            </Left>
            <Body style={{borderBottomWidth: 0}}>
              <Text>Take new photo</Text>
            </Body>
          </ListItem>
        </View>
      );
    }
    return (
      <View>
        <ListItem icon>
          <Left>
            <Icon name="bookmarks" style={{color: '#ababab'}} />
          </Left>
          <Body style={{borderBottomWidth: 0}}>
            <Text>Choose from Gallery</Text>
          </Body>
        </ListItem>

        <ListItem icon>
          <Left>
            <Icon name="camera" style={{color: '#ababab'}} />
          </Left>
          <Body style={{borderBottomWidth: 0}}>
            <Text>Take new photo</Text>
          </Body>
        </ListItem>
      </View>
    );
  }
  showScheduleSection() {
    if (this.props.imageSource.length > 1) {
      return (
        <View>
          <Text style={styles.secondTitleStyle}>
            How do you want your profile photo to be displaying
          </Text>
          <Item picker style={styles.inputOtherStyle}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              //style={{ width: undefined }}

              placeholderStyle={{color: '#000'}}
              selectedValue={this.props.schedule_profile_time}
              onValueChange={text =>
                this.props.profileFormField({
                  prop: 'schedule_profile_time',
                  value: text,
                })
              }>
              <Picker.Item
                label="Use All"
                value={SCHEDULE_PROFILE_TIME.USE_ALL}
              />
              <Picker.Item
                label="Every  Hour"
                value={SCHEDULE_PROFILE_TIME.EVERY_HOUR}
              />
              <Picker.Item
                label="Every Day"
                value={SCHEDULE_PROFILE_TIME.EVERY_DAY}
              />
              <Picker.Item
                label="Every Week"
                value={SCHEDULE_PROFILE_TIME.EVERY_WEEK}
              />
              <Picker.Item
                label="Static"
                value={SCHEDULE_PROFILE_TIME.STATIC}
              />
            </Picker>
          </Item>
        </View>
      );
    }
  }

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  // async pickImageGallery() {
  //   try {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       // allowsEditing: true,
  //       // aspect: [4, 5],
  //       quality: 0.5,
  //     });
  //     console.log(result);
  //     if (!result.cancelled) {
  //       // this.setState({
  //       //   imageSource: this.state.imageSource.concat([result.uri]),
  //       //   galleryImageTitle: "Choose more image",
  //       //   index: this.state.index + 1
  //       // });
  //       this.props.chooseProfilePic(result.uri);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  // async launchCamera() {
  //   try {
  //     await this.askPermissionsAsync();
  //     let result = await ImagePicker.launchCameraAsync({
  //       // allowsEditing: true,
  //       // aspect: [4, 5],
  //       quality: 0.5,
  //     });
  //     console.log(result);
  //     if (!result.cancelled) {
  //       // this.setState({
  //       //   imageSource: this.state.imageSource.concat([result.uri]),
  //       //   galleryImageTitle: "Choose more image",
  //       //   index: this.state.index + 1
  //       // });
  //       this.props.chooseProfilePic(result.uri);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  undoDelete() {
    if (this.props.showDeleteBtn) {
      this.props.checkImageToDelete({showDeleteBtn: false, index: null});
    }
  }

  // showErrorMsg() {
  //   if (
  //     this.props.errorMsg !== null &&
  //     typeof this.props.errorMsg !== "undefined"
  //   ) {
  //     ToastAndroid.showWithGravityAndOffset(
  //       this.props.errorMsg,
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM,
  //       25,
  //       50
  //     );
  //     //this.props.clearErrMsg();
  //     // return (
  //     //   <Text style={{ color: "red", marginTop: 10, marginBottom: 5 }}>
  //     // );
  //   }
  //   //     {this.props.errorMsg}
  //   //   </Text>
  // }
  render() {
    return (
      <ScrollView>
        <TouchableWithoutFeedback onPress={this.undoDelete.bind(this)}>
          <View style={styles.containerStyle}>
            <Spinner
              visible={this.props.is_loading}
              overlayColor="rgba(0, 0, 0, 0)"
              color="#333"
            />

            <View style={{marginBottom: 44}}>
              <Text style={{fontWeight: 'bold'}}>
                Welcome to Ucontex add profile photo to connect with friends.
              </Text>
            </View>

            <View style={styles.firstPanelStyle}>
              <ScrollView
                indicatorStyle="white"
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  paddingBottom: 10,
                }}>
                {this.renderImage()}
              </ScrollView>
              {this.showDeleteBtn()}
              {this.showAddMoreImageBtn()}
            </View>
            {this.showScheduleSection()}
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.rectangleStyle}>
          <Text style={styles.rectTextStyle}>
            You can choose up to four profile photos
          </Text>
        </View>
        <View style={styles.secondPanel}>
          <View style={styles.curvePanel}>
            <Text>Upload a photo</Text>
          </View>
          <View style={styles.listContainerStyle}>
            {this.renderChooseGalleryBtn()}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#eef0f3',
    paddingLeft: '16rem',
    paddingRight: '14rem',
    paddingTop: '24rem',
    paddingBottom: '34rem',
  },
  btnStyle: {
    backgroundColor: '#44a4f7',
    marginTop: '83rem',
    height: '50rem',
  },
  firstPanelStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '70rem',
  },
  imageStyle: {
    width: '148rem',
    height: '148rem',
    alignSelf: 'stretch',
    borderRadius: 75,
  },
  rectangleStyle: {
    height: '76rem',

    alignItems: 'center',
    paddingTop: '10rem',
    width: SCREEN_WIDTH,
    backgroundColor: '#44a4f7',
  },
  rectTextStyle: {
    color: '#fff',
    fontSize: '15rem',
  },
  headerRightStyle: {
    paddingTop: '13rem',
    paddingRight: '16rem',
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
    marginTop: '-35rem',
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
  gridItem: {
    margin: '2rem',
    //width: "49%", //Device width divided in almost a half
    //height: "128rem"
    // justifyContent: "center",
    // alignItems: "center",
    // borderWidth: "1rem",
    // borderColor: "#ababab",
    // borderRadius: "2rem"
  },
  addButtonStyle: {
    width: '50rem',
    height: '50rem',
    borderRadius: 50,
    backgroundColor: '#44a4f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonContStyle: {
    marginTop: '10rem',
  },
  secondTitleStyle: {
    marginBottom: '15rem',
  },
});
const mapStateToProps = ({auth}) => {
  // const {
  //   ,
  //
  // } = profileSetup;

  const {
    is_loading,
    schedule_profile_time,
    errorMsg,
    showDeleteBtn,
    index,
    imageSource,
    userData,
    userId,
    token,
  } = auth;
  console.log('neew' + userData, token, userId);
  return {
    userData,
    userId,
    token,
    imageSource,
    is_loading,
    schedule_profile_time,
    errorMsg,
    showDeleteBtn,
    index,
  };
};
export default connect(
  mapStateToProps,
  {
    chooseProfilePic,
    deleteImage,
    saveProfilePicture,
    profileFormField,
    checkImageToDelete,
    clearErrMsg,
  },
)(ChooseProfilePicScreen);
