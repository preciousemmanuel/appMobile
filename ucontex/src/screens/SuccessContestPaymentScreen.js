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
  CheckBox,
} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Constants} from 'expo';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

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
class ContestPayment extends Component {
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

  render() {
    //console.log("gethjhj", this.props.selectedMedia);
    const {
      titleContainerStyle,
      editProfileButton,
      userNameStyle,
      detailSectionStyle,
      detailIconStyle,
      detailIconTextStyle,
      changeProfileButtonContainerStyle,
      totalAmountInfoStyle,
    } = styles;
    //const { userData } = this.props.userData.data;

    return (
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
            shadowColor: 'rgba(0, 0, 0, 0.16)',
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
            <Text style={{color: '#44a4f7'}}>Payment</Text>
          </Body>
          <Right>
            <Button transparent>
              <Text style={{color: '#44a4f7'}}>Preview</Text>
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
          <View style={detailSectionStyle}>
            <Image
              source={require('../assets/checked.png')}
              resizeMode="cover"
              style={styles.successIconStyle}
            />
            <Text style={totalAmountInfoStyle}>Your payment is successful</Text>
            <Text>
              Your brand promotional contest has been created successfully.
            </Text>
            <Button
              style={styles.nextBtnStyle}
              onPress={() =>
                this.props.navigation.navigate('FlutterWavePayment')
              }>
              <Text style={{color: '#ffffff'}}>Continue</Text>
            </Button>
          </View>
        </KeyboardAwareScrollView>
        {/* </ScrollView> */}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  titleContainerStyle: {
    paddingLeft: '16rem',
    paddingRight: '16rem',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '80rem',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    backgroundColor: '#ffffff',
    elevation: 2,
    marginTop: '10rem',
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

  inputStyle: {
    marginBottom: '35rem',
    marginLeft: 0,
    borderColor: '#000',
  },
  inputOtherStyle: {
    marginBottom: '20rem',
    marginLeft: 0,
    borderColor: '#000',
    marginTop: '20rem',
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

  totalAmountInfoStyle: {
    color: '#000000',
    fontSize: '20rem',
    fontWeight: '800',
    marginBottom: '20rem',
    alignSelf: 'center',
  },
  nextBtnStyle: {
    width: '100%',
    backgroundColor: '#44a4f7',
    height: '45rem',
    justifyContent: 'center',
  },
  termsStyle: {
    marginTop: '20rem',
    marginBottom: '20rem',
  },
  successIconStyle: {
    alignSelf: 'center',
    width: '60rem',
    height: '60rem',
    marginBottom: '10rem',
  },
});

const mapStateToProps = ({profileSetup, auth}) => {
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
  } = profileSetup;
  const {userId, token} = auth;
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
)(ContestPayment);
