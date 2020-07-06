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
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
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
  DatePicker,
  Right,
  ListItem,
  Label,
  Form,
  Input,
  Container,
  Content,
} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modal';
import Moment from 'moment';

import ProfileGallery from '../components/ProfileGallery';
import ProgressiveImage from '../components/ProgressiveImage';
import ProgressiveRoundImage from '../components/ProgressiveRoundImage';

import {
  chooseCoverPic,
  chooseProfilePic,
  checkImageToDelete,
  checkCoverImageToDelete,
  profileFormField,
  deleteCoverImage,
  deleteImage,
  editProfile,
  clearMsg,
} from '../actions';

import {STATUS_BAR} from '../config';
const SCREEN_WIDTH = Dimensions.get('window').width;
class ProfileScreen extends Component {
  state = {isCoverPhotoOptions: false, isProfilePixOptions: false};

  hanldleSaveButton = () => {
    const {
      firstName,
      lastName,
      aboutMe,
      website,
      dateOfBirth,
      imageSource,
      imageCoverSource,
      userData,
      userId,
      token,
    } = this.props;
    console.log('fds', userData);
    let firstNameD, lastNameD, aboutMeD, dateOfBirthD, websiteD;
    if (firstName === null) {
      firstNameD = userData.data.userData.firstName;
    } else {
      firstNameD = firstName;
    }
    if (lastName === null) {
      lastNameD = userData.data.userData.lastName;
    } else {
      lastNameD = lastName;
    }
    if (aboutMe === null) {
      aboutMeD = userData.data.userData.description;
    } else {
      aboutMeD = aboutMe;
    }
    if (website === null) {
      websiteD = userData.data.userData.website;
    } else {
      websiteD = website;
    }
    if (dateOfBirth === null) {
      dateOfBirthD = userData.data.userData.dateOfBirth;
    } else {
      dateOfBirthD = dateOfBirth;
    }

    this.props.editProfile({
      firstName: firstNameD,
      lastName: lastNameD,
      aboutMe: aboutMeD,
      website: websiteD,
      dateOfBirth: dateOfBirthD,
      imageSource,
      imageCoverSource,
      userId,
      token,
    });
  };
  pickCoverImageGallery = async () => {
    this.setState({isCoverPhotoOptions: false});
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        // allowsEditing: true,
        // aspect: [5, 3],
        quality: 0.5,
      });
      console.log(result);
      if (!result.cancelled) {
        // this.setState({
        //   imageCoverSource: this.state.imageCoverSource.concat([result.uri]),
        //   galleryImageTitle: "Choose more image",
        //   index: this.state.index + 1
        // });
        this.props.chooseCoverPic(result.uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  pickProfileImageGallery = async () => {
    this.setState({isProfilePixOptions: false});
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        // allowsEditing: true,
        // aspect: [4, 5],
        quality: 0.5,
      });
      console.log(result);
      if (!result.cancelled) {
        // this.setState({
        //   imageCoverSource: this.state.imageCoverSource.concat([result.uri]),
        //   galleryImageTitle: "Choose more image",
        //   index: this.state.index + 1
        // });
        this.props.chooseProfilePic(result.uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  launchCoverPhotoCamera = async () => {
    this.setState({isCoverPhotoOptions: false});
    try {
      let {status} = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL,
      );
      if (status !== 'granted') {
        alert('not granted');
      }
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [5, 3],
        quality: 0.5,
      });
      console.log(result);
      if (!result.cancelled) {
        // this.setState({
        //   imageCoverSource: this.state.imageCoverSource.concat([result.uri]),
        //   galleryImageTitle: "Choose more image",
        //   index: this.state.index + 1
        // });
        this.props.chooseCoverPic(result.uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  launchProfilePhotoCamera = async () => {
    this.setState({isProfilePixOptions: false});
    try {
      let {status} = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL,
      );
      if (status !== 'granted') {
        alert('not granted');
      }
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 5],
        quality: 0.5,
      });
      console.log(result);
      if (!result.cancelled) {
        // this.setState({
        //   imageCoverSource: this.state.imageCoverSource.concat([result.uri]),
        //   galleryImageTitle: "Choose more image",
        //   index: this.state.index + 1
        // });
        this.props.chooseProfilePic(result.uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  onDeleteImage() {
    //  alert(this.props.coverPhotoIndex);
    if (this.props.coverPhotoIndex !== null) {
      this.props.deleteCoverImage(this.props.coverPhotoIndex);
    } else if (this.props.index !== null) {
      this.props.deleteImage(this.props.index);
    }
  }

  showDeleteBtn() {
    if (this.props.showDeleteBtn) {
      return (
        <View style={styles.addButtonContStyle}>
          <TouchableOpacity
            onPress={this.onDeleteImage.bind(this)}
            style={[styles.addButtonStyle, {backgroundColor: 'red'}]}>
            <Icon name="trash" style={{color: '#ffffff', fontSize: 17}} />
          </TouchableOpacity>
        </View>
      );
    }
  }

  checkCoverImageToDelete(index) {
    //const { showDeleteBtn, index } = this.props;
    this.props.checkCoverImageToDelete({
      showDeleteBtn: true,
      index,
    });
  }
  checkImageToDelete(index) {
    //const { showDeleteBtn, index } = this.props;
    this.props.checkImageToDelete({
      showDeleteBtn: true,
      index,
    });
  }

  undoDelete() {
    if (this.props.showDeleteBtn) {
      if (this.props.coverPhotoIndex !== null) {
        this.props.checkCoverImageToDelete({
          showDeleteBtn: false,
          index: null,
        });
      } else {
        this.props.checkMediaToDelete({
          showDeleteBtn: false,
          index: null,
        });
      }
    }
  }

  thumbnailCoverImage(index, image) {
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
        onLongPress={this.checkCoverImageToDelete.bind(this, index)}
        key={index}>
        <View>
          <Image
            resizeMode={'cover'}
            style={[styles.coverImageStyle, _style]}
            source={{uri: image}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
  thumbnailProfileImage(index, image) {
    //alert(image);
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
            style={[styles.profilePicxStyle, _style]}
            source={{uri: image}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderCoverPhotoImage = () => {
    if (this.props.imageCoverSource.length == 0) {
      if (
        typeof this.props.userData.data !== 'undefined' &&
        this.props.userData.data.userData.coverPhoto !== null
      ) {
        return (
          <ProgressiveImage
            source={{
              uri: this.props.userData.data.userData.coverPhoto.url,
            }}
            thumbnail={require('../assets/placeholder.png')}
            resizeMode="cover"
            style={styles.coverImageStyle}
          />
        );
      }
      return (
        <Image
          source={require('../assets/coverphoto1.png')}
          resizeMode="cover"
          style={styles.coverImageStyle}
        />
      );
    }

    const deck = this.props.imageCoverSource.map((image, index) => {
      return this.thumbnailCoverImage(index, image);
    });

    return deck;
    //return images;
    // return (
    //   <Image
    //     style={styles.imageStyle}
    //     source={{ uri: this.state.imageCoverSource }}
    //   />
    // );
  };

  renderProfilePhotoImage = () => {
    if (this.props.imageSource.length == 0) {
      if (
        typeof this.props.userData.data !== 'undefined' &&
        this.props.userData.data.userData.profilePictures.length > 0
      ) {
        let numberOfPicx = this.props.userData.data.userData.profilePictures
          .length;
        return (
          <ProgressiveRoundImage
            source={{
              uri: this.props.userData.data.userData.profilePictures[
                numberOfPicx - 1
              ].url,
            }}
            thumbnail={require('../assets/placeholder.png')}
            resizeMode="cover"
            style={styles.profilePicxStyle}
          />
        );
      }
      return (
        <Image
          source={require('../assets/user.png')}
          resizeMode="cover"
          style={styles.profilePicxStyle}
        />
      );
    }

    const deck = this.props.imageSource.map((image, index) => {
      return this.thumbnailProfileImage(index, image);
    });

    return deck;
    //return images;
    // return (
    //   <Image
    //     style={styles.imageStyle}
    //     source={{ uri: this.state.imageCoverSource }}
    //   />
    // );
  };
  // showMsg() {
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
  //
  //   //     {this.props.errorMsg}
  //   //   </Text>
  // }
  render() {
    //console.log("gethjhj", this.props.selectedMedia);
    const {
      coverImageStyle,
      changeCoverButtonContainerStyle,
      profilePicxStyle,
      profilePixContainerStyle,
      editProfileButton,
      userNameStyle,
      detailSectionStyle,
      detailIconStyle,
      detailIconTextStyle,
      changeProfileButtonContainerStyle,
      headerTitleStyle,
    } = styles;
    const {userData} = this.props.userData.data;

    return (
      <TouchableWithoutFeedback onPress={this.undoDelete.bind(this)}>
        <View style={{flex: 1}}>
          <Spinner
            visible={this.props.is_loading}
            color="#44a4f7"
            overlayColor="rgba(0, 0, 0, 0)"
          />
          <Header
            style={{
              marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
              backgroundColor: '#fff',
              shadowColor: 'rgba(0, 0, 0, 0.7)',
              shadowOffset: {width: 0, height: 0},
              shadowRadius: 5,
              elevation: 2,
            }}>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack(null)}>
                <Icon style={{color: '#44a4f7'}} name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Text style={headerTitleStyle}>Edit Profile</Text>
            </Body>
            <Right>
              <Button transparent onPress={this.hanldleSaveButton}>
                <Text style={{color: '#44a4f7'}}>Save</Text>
              </Button>
            </Right>
          </Header>

          {/* <ScrollView
          onScroll={this.handleScroll}
          scrollEnabled={this.state.enableScrollViewScroll}
        > */}
          <KeyboardAwareScrollView
            resetScrollToCoords={{x: 0, y: 0}}
            scrollEnabled={true}
            enableOnAndroid>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                this.setState({
                  isCoverPhotoOptions: true,
                  isProfilePixOptions: false,
                })
              }>
              <View style={{backgroundColor: '#707070', opacity: 0.5}}>
                {this.renderCoverPhotoImage()}
                <TouchableOpacity
                  onPress={() => this.setState({isCoverPhotoOptions: true})}
                  style={changeCoverButtonContainerStyle}
                  activeOpacity={1}>
                  <Icon name="camera" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                this.setState({
                  isProfilePixOptions: true,
                  isCoverPhotoOptions: false,
                })
              }>
              <View style={profilePixContainerStyle}>
                {this.renderProfilePhotoImage()}
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      isProfilePixOptions: true,
                      isCoverPhotoOptions: false,
                    })
                  }
                  style={changeProfileButtonContainerStyle}
                  activeOpacity={1}>
                  <Icon
                    name="add"
                    style={styles.changeProfileButtonIconStyle}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            {this.showDeleteBtn()}
            <View style={detailSectionStyle}>
              <Modal
                isVisible={this.state.isCoverPhotoOptions}
                style={{margin: 0}}
                onBackdropPress={() =>
                  this.setState({
                    isCoverPhotoOptions: false,
                  })
                }>
                <View style={styles.modalUnfinishStyle}>
                  <Text style={styles.modalTitleStyle}>Change cover photo</Text>

                  <View style={styles.selectImageOptionContainerStyle}>
                    <ListItem icon>
                      <Left>
                        <Icon name="images" style={{color: '#ababab'}} />
                      </Left>
                      <Body style={{borderBottomWidth: 0}}>
                        <Text style={{color: '#686767'}}>
                          Choose from gallery
                        </Text>
                      </Body>
                    </ListItem>

                    <ListItem icon>
                      <Left>
                        <Icon name="camera" style={{color: '#ababab'}} />
                      </Left>
                      <Body style={{borderBottomWidth: 0}}>
                        <Text style={{color: '#686767'}}>Take photo</Text>
                      </Body>
                    </ListItem>
                  </View>
                </View>
              </Modal>

              <Modal
                isVisible={this.state.isProfilePixOptions}
                style={{margin: 0}}
                onBackdropPress={() =>
                  this.setState({
                    isProfilePixOptions: false,
                  })
                }>
                <View style={styles.modalUnfinishStyle}>
                  <Text style={styles.modalTitleStyle}>
                    Change profile photo
                  </Text>

                  <View style={styles.selectImageOptionContainerStyle}>
                    <ListItem icon onPress={this.pickProfileImageGallery}>
                      <Left>
                        <Icon name="images" style={{color: '#ababab'}} />
                      </Left>
                      <Body style={{borderBottomWidth: 0}}>
                        <Text style={{color: '#686767'}}>
                          Choose from gallery
                        </Text>
                      </Body>
                    </ListItem>

                    <ListItem icon onPress={this.launchProfilePhotoCamera}>
                      <Left>
                        <Icon name="camera" style={{color: '#ababab'}} />
                      </Left>
                      <Body style={{borderBottomWidth: 0}}>
                        <Text style={{color: '#686767'}}>Take photo</Text>
                      </Body>
                    </ListItem>
                  </View>
                </View>
              </Modal>

              <Form style={{marginBottom: 20}}>
                <Item floatingLabel style={styles.inputStyle} error>
                  <Label>First Name</Label>
                  <Input
                    onChangeText={text =>
                      this.props.profileFormField({
                        prop: 'firstName',
                        value: text,
                      })
                    }
                    value={this.props.firstName}
                  />
                </Item>
                <Item floatingLabel style={styles.inputOtherStyle}>
                  <Label>Last Name</Label>
                  <Input
                    onChangeText={text =>
                      this.props.profileFormField({
                        prop: 'lastName',
                        value: text,
                      })
                    }
                    value={this.props.lastName}
                  />
                  {/* {showErrorLnameIcon} */}
                </Item>
                <Item floatingLabel style={styles.inputOtherStyle}>
                  <Label>About Me</Label>
                  <Input
                    multiline={true}
                    maxLength={160}
                    onChangeText={text =>
                      this.props.profileFormField({
                        prop: 'aboutMe',
                        value: text,
                      })
                    }
                    value={this.props.aboutMe}
                  />
                  {/* {showErrorLnameIcon} */}
                </Item>
                <Text style={styles.aboutMeOption}>160 words</Text>
                <Item floatingLabel style={styles.inputOtherStyle}>
                  <Label>Website</Label>
                  <Input
                    onChangeText={text =>
                      this.props.profileFormField({
                        prop: 'website',
                        value: text,
                      })
                    }
                    value={this.props.website}
                  />
                  {/* {showErrorLnameIcon} */}
                </Item>
                <Item style={styles.inputDobStyle}>
                  <DatePicker
                    //defaultDate={new Date(2018, 4, 4)}
                    minimumDate={new Date(1800, 1, 1)}
                    maximumDate={new Date(2006, 12, 31)}
                    locale={'en'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeHolderText={Moment(userData.dateOfBirth).format(
                      'MMM D YYYY',
                    )}
                    textStyle={{color: '#000', marginLeft: 0}}
                    placeHolderTextStyle={{color: '#000', marginLeft: 0}}
                    onDateChange={newDate =>
                      this.props.profileFormField({
                        prop: 'dateOfBirth',
                        value: newDate,
                      })
                    }
                    disabled={false}
                  />
                </Item>
                <Text
                  style={[
                    styles.aboutMeOption,
                    {alignSelf: 'flex-start', color: '#000', marginTop: 7},
                  ]}>
                  Date of birth
                </Text>
                {/* {this.showMsg()} */}
              </Form>
            </View>
          </KeyboardAwareScrollView>
          {/* </ScrollView> */}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = EStyleSheet.create({
  coverImageStyle: {
    width: '100%',
    height: '190rem',
  },
  headerTitleStyle: {
    color: '#44a4f7',
    fontSize: '18rem',
    fontWeight: '500',
    lineHeight: '20rem',
  },
  changeCoverButtonContainerStyle: {
    width: '31rem',
    height: '31rem',
    borderRadius: '75rem',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '80rem',
    left: '168rem',
  },
  profilePicxStyle: {
    width: '80rem',
    height: '80rem',
    borderRadius: '75rem',
    borderColor: '#ffffff',
    borderWidth: '3rem',
    marginTop: '-30rem',
    backgroundColor: '#ffffff',
    opacity: 0.5,
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

  detailSectionStyle: {
    padding: '17rem',
  },
  detailIconStyle: {
    color: '#707070',
    marginRight: '2rem',
    fontSize: '19rem',
  },
  detailIconTextStyle: {
    fontSize: '12rem',
  },

  addButtonStyle: {
    width: '40rem',
    height: '40rem',
    borderRadius: '50rem',
    backgroundColor: '#44a4f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeProfileButtonContainerStyle: {
    width: '13rem',
    height: '13rem',
    borderRadius: '75rem',
    backgroundColor: '#44a4f7',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '55rem',
  },
  changeProfileButtonIconStyle: {
    fontSize: '9rem',
    color: '#ffffff',
  },
  addButtonContStyle: {
    marginTop: '5rem',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
  inputStyle: {
    marginBottom: '25rem',
    marginLeft: 0,
    borderColor: '#000',
  },
  inputOtherStyle: {
    marginBottom: '25rem',
    marginLeft: 0,
    borderColor: '#000',
  },
  inputDobStyle: {
    marginTop: '25rem',
    marginLeft: 0,
    borderColor: '#000',
  },
  modalUnfinishStyle: {
    width: '100%',
    height: '200rem',
    backgroundColor: '#ffffff',

    margin: 0,
    position: 'absolute',
    bottom: 0,
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
  aboutMeOption: {
    color: '#e80140',
    alignSelf: 'flex-end',
    fontSize: '10rem',
    fontWeight: '300',
    marginTop: '-15rem',
  },
});

const mapStateToProps = ({auth}) => {
  const {
    userData,
    firstName,
    lastName,
    aboutMe,
    website,
    dateOfBirth,
    imageCoverSource,
    coverPhotoIndex,
    showDeleteBtn,
    index,
    imageSource,
    is_loading,
    userId,
    token,
  } = auth;
  // const { userId, token } = auth;
  console.log('fn', firstName);
  return {
    userData,
    firstName,
    lastName,
    aboutMe,
    website,
    dateOfBirth,
    imageCoverSource,
    coverPhotoIndex,
    showDeleteBtn,
    index,
    imageSource,
    is_loading,
    userId,
    token,
  };
};
export default connect(
  mapStateToProps,
  {
    chooseCoverPic,
    chooseProfilePic,
    checkImageToDelete,
    checkCoverImageToDelete,
    deleteImage,
    deleteCoverImage,
    profileFormField,
    editProfile,
    clearMsg,
  },
)(ProfileScreen);
