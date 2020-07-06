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
  List,
  ListItem,
  Left,
  Right,
  Body,
  Icon,
  Item,
  Picker,
} from 'native-base';
import _ from 'lodash';
import EStyleSheet from 'react-native-extended-stylesheet';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  chooseCoverPic,
  deleteCoverImage,
  saveCoverPhoto,
  profileFormField,
  checkCoverImageToDelete,
} from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
//const LONG_PRESS_MIN_DURATION = 500;

class UpdateCoverPhotoScreen extends Component {
  //state = { index: null, showDeleteBtn: false, right: false };
  state = {right: false};

  // state = {
  //   imageCoverSource: [],
  //   galleryImageTitle: "Choose from photos",
  //   index: 0,
  //   right: false
  // };
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    console.log(params);
    return {
      title: 'Add Cover Photo',
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
            onPress={() => navigation.navigate('NewsFeed')}>
            <Text style={{color: '#44a4f7'}}>Skip</Text>
          </Button>
        ),
    };
  };
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      //console.log(prevProps.imageCoverSource.length);
      this.setState({right: true});
      //this.props.checkImageToDelete({ showDeleteBtn: false, index: null });
      if (
        this.props.imageCoverSource.length !==
          prevProps.imageCoverSource.length &&
        this.props.imageCoverSource.length > 0
      ) {
        //alert("kkk");
        this.props.navigation.setParams({right: true});
      }
      if (
        this.props.imageCoverSource.length !==
          prevProps.imageCoverSource.length &&
        this.props.imageCoverSource.length <= 0
      ) {
        //alert("kkk");
        this.props.navigation.setParams({right: false});
      }
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      right: this.state.right,
      onHandleSave: this._onHandleSave,
    });
  }

  _onHandleSave = () => {
    console.log(this.props.imageCoverSource.length);
    //console.log(this.props.imageCoverSource);
    const {imageCoverSource, userData, userId, token} = this.props;
    this.props.saveCoverPhoto(
      {
        imageCoverSource,
        userId,
        token,
      },
      () => {
        this.props.navigation.navigate('HomeScreen');
      },
    );
  };
  onDeleteImage() {
    //  alert(this.props.coverPhotoIndex);
    this.props.deleteCoversImage(this.props.coverPhotoIndex);
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
    this.props.checkCoverImageToDelete({
      showDeleteBtn: true,
      index,
    });
  }

  thumbnailImage(index, image) {
    //alert(image);
    let _style;
    if (index == this.props.coverPhotoIndex) {
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
            style={[styles.uploadImageStyle, _style]}
            source={{uri: image}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderImage() {
    //let images = [];
    //console.log(this.state.imageCoverSource);
    if (this.props.imageCoverSource.length == 0) {
      return (
        <View>
          <TouchableOpacity onPress={this.pickImageGallery.bind(this)}>
            <Image
              key={10001}
              style={[styles.imageStyle, {opacity: 0.5}]}
              source={require('../assets/coverphoto.jpg')}
            />
          </TouchableOpacity>
        </View>
      );
    }

    const deck = this.props.imageCoverSource.map((image, index) => {
      return this.thumbnailImage(index, image);
    });

    return deck;
    //return images;
    // return (
    //   <Image
    //     style={styles.imageStyle}
    //     source={{ uri: this.state.imageCoverSource }}
    //   />
    // );
  }

  renderChooseGalleryBtn() {
    if (this.props.imageCoverSource.length >= 0) {
      return (
        <View>
          <ListItem icon>
            <Left>
              <Icon name="bookmarks" style={{color: '#ababab'}} />
            </Left>
            <Body style={{borderBottomWidth: 0}}>
              <Text>Choose from Galery</Text>
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

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);

    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  async pickImageGallery() {
    try {
      let result = await ImagePicker.openPicker({
        mediaType: 'photo',
      });
      console.log(result);
      //  if (!result.cancelled) {
      // this.setState({
      //   imageCoverSource: this.state.imageCoverSource.concat([result.uri]),
      //   galleryImageTitle: "Choose more image",
      //   index: this.state.index + 1
      // });
      this.props.chooseCoverPic(result.path);
      //}
    } catch (e) {
      console.log(e);
    }
  }
  async launchCamera() {
    try {
      //  await this.askPermissionsAsync();
      let result = await ImagePicker.openCamera({
        // allowsEditing: true,
        // aspect: [5, 3],
      });
      console.log(result);
      //if (!result.cancelled) {
      // this.setState({
      //   imageCoverSource: this.state.imageCoverSource.concat([result.uri]),
      //   galleryImageTitle: "Choose more image",
      //   index: this.state.index + 1
      // });
      this.props.chooseCoverPic(result.path);
      //  }
    } catch (e) {
      console.log(e);
    }
  }

  undoDelete() {
    if (this.props.showDeleteBtn) {
      this.props.checkCoverImageToDelete({
        showDeleteBtn: false,
        index: null,
      });
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
              color="#44a4f7"
              overlayColor="rgba(0, 0, 0, 0)"
            />

            <View style={styles.firstPanelStyle}>
              {this.renderImage()}
              {this.showDeleteBtn()}
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.rectangleStyle}>
          <Text style={styles.rectTextStyle}>Choose your cover photo</Text>
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

    paddingBottom: '34rem',
  },
  btnStyle: {
    backgroundColor: '#44a4f7',
    marginTop: '83rem',
    height: '50rem',
  },
  firstPanelStyle: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    marginBottom: '203rem',
  },
  imageStyle: {
    width: SCREEN_WIDTH,

    alignSelf: 'stretch',
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
  uploadImageStyle: {
    width: '100%',
    height: '200rem',
    alignSelf: 'stretch',
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10rem',
  },
  secondTitleStyle: {
    marginBottom: '15rem',
  },
});
const mapStateToProps = ({auth}) => {
  // const {
  //   imageCoverSource,
  //   is_loading,
  //   schedule_profile_time,
  //   errorMsg,
  //   showDeleteBtn,
  //   coverPhotoIndex
  // } = profileSetup;
  const {
    userData,
    userId,
    token,
    imageCoverSource,
    is_loading,
    schedule_profile_time,
    errorMsg,
    showDeleteBtn,
    coverPhotoIndex,
  } = auth;
  console.log(
    userData,
    imageCoverSource,
    is_loading,
    errorMsg,
    coverPhotoIndex,
  );
  return {
    userData,
    userId,
    token,
    imageCoverSource,
    is_loading,
    schedule_profile_time,
    errorMsg,
    showDeleteBtn,
    coverPhotoIndex,
  };
};
export default connect(
  mapStateToProps,
  {
    chooseCoverPic,
    deleteCoverImage,
    saveCoverPhoto,
    profileFormField,
    checkCoverImageToDelete,
  },
)(UpdateCoverPhotoScreen);
