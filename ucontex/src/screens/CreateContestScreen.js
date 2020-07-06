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
import ImagePicker from 'react-native-image-crop-picker';
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
// import MultiSlider from "@ptomasroos/react-native-multi-slider";
import ProfileGallery from '../components/ProfileGallery';
import ProgressiveImage from '../components/ProgressiveImage';
import ProgressiveRoundImage from '../components/ProgressiveRoundImage';

import {
  chooseContestMedia,
  checkImageToDelete,
  checkContestImageToDelete,
  createContestFormField,
  onEnterContestAmount,
  deleteCoverImage,
  deleteImage,
  createContestNextHander,
} from '../actions';

import {STATUS_BAR} from '../config';

class CreateContest extends Component {
  state = {
    isContestPhotoOptions: false,

    values: [10, 50],
  };

  //  imageBrowserCallback = callback => {
  //   callback
  //     .then(photos => {
  //       console.log('photo', photos);
  //       this.setState(
  //         {
  //           imageBrowserOpen: false,
  //           cameraBrowserOpen: false,
  //           isContestPhotoOptions: false,
  //           //   photos
  //         },
  //         () => {
  //           this.props.chooseContestMedia(photos);
  //         },
  //       );
  //
  //       // this.setState({
  //       //   imageBrowserOpen: false,
  //       // //   photos
  //       // });
  //     })
  //     .catch(e => console.log(e));
  // };
  renderMedia() {
    //let images = [];
    //console.log("postm", this.props.contestMedia);
    if (this.props.contestMedia.length > 0) {
      //const deck = this.props.contestMedia.map((image, index) => {
      return this.thumbnailImage(0, this.props.contestMedia[0]);
      //});

      //return deck;
    }

    return (
      <Image
        source={require('../assets/contest.jpg')}
        resizeMode="cover"
        style={styles.coverImageStyle}
      />
    );
  }

  thumbnailImage(index, image) {
    // let _style;
    // if (index == this.props.index) {
    //   _style = { opacity: 0.2 };
    // } else {
    //   _style = { opacity: 1 };
    // }
    console.log('index', image);
    return (
      <TouchableWithoutFeedback
        onLongPress={this.checkContestImageToDelete.bind(this, index)}
        key={index}>
        <View>
          <Image
            resizeMode={'cover'}
            style={styles.coverImageStyle}
            source={{uri: image.file}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  onDeleteImage() {
    //  alert(this.props.coverPhotoIndex);
    if (this.props.coverPhotoIndex !== null) {
      this.props.deleteCoverImage(this.props.coverPhotoIndex);
    } else if (this.props.index !== null) {
      this.props.deleteImage(this.props.index);
    }
  }
  launchCamera = () => {
    ImagePicker.openCamera({
      multiple: true,
    })
      .then(image => {
        console.log(image);
        let photo = [{file: image.path}];
        this.props.chooseContestMedia(photo);
        this.setState({isContestPhotoOptions: false});
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
        this.props.chooseContestMedia(photo);
        this.setState({isContestPhotoOptions: false});
      })
      .catch(err => {
        console.log(err);
      });
  };
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

  checkContestImageToDelete(index) {
    //const { showDeleteBtn, index } = this.props;
    this.props.checkContestImageToDelete({
      showDeleteBtn: true,
      index,
    });
  }

  undoDelete() {
    if (this.props.showDeleteBtn) {
      if (this.props.coverPhotoIndex !== null) {
        this.props.checkContestImageToDelete({
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

  multiSliderValuesChange = values => {
    this.setState({
      values,
    });
  };

  renderSharingPercentage = () => {
    let picker = [];
    for (var i = 1; i < 100; i++) {
      picker.push(<Picker.Item label={i} value={i} />);
    }
    return {picker};
  };

  onCreateContest = () => {
    this.props.createContestNextHander(this.props, () => {
      this.props.navigation.navigate('PreviewCreateContest');
    });
  };

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
    } = styles;
    //const { userData } = this.props.userData.data;
    if (this.state.imageBrowserOpen) {
      return <View />;
    } else if (this.state.cameraBrowserOpen) {
      return <View />;
    }
    return (
      <TouchableWithoutFeedback onPress={this.undoDelete.bind(this)}>
        <View style={{flex: 1}}>
          {/* <Spinner
            visible={this.props.is_loading}
            color="#44a4f7"
            overlayColor="rgba(0, 0, 0, 0)"
          /> */}
          <Header
            style={{
              //  marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
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
              <Text style={{color: '#44a4f7', fontWeight: '700'}}>
                Create Contest
              </Text>
            </Body>
            <Right>
              <Button transparent onPress={() => this.onCreateContest()}>
                <Text style={{color: '#44a4f7'}}>Next</Text>
              </Button>
            </Right>
          </Header>

          <Modal
            isVisible={this.state.isContestPhotoOptions}
            style={{margin: 0}}
            onBackdropPress={() =>
              this.setState({
                isContestPhotoOptions: false,
              })
            }>
            <View style={styles.modalUnfinishStyle}>
              <Text style={styles.modalTitleStyle}>Change contest photo</Text>

              <View style={styles.selectImageOptionContainerStyle}>
                <ListItem icon onPress={() => this.launchGallery()}>
                  <Left>
                    <Icon name="images" style={{color: '#ababab'}} />
                  </Left>
                  <Body style={{borderBottomWidth: 0}}>
                    <Text style={{color: '#686767'}}>Choose from gallery</Text>
                  </Body>
                </ListItem>

                <ListItem icon onPress={() => this.launchCamera()}>
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
          {/* <ScrollView
          onScroll={this.handleScroll}
          scrollEnabled={this.state.enableScrollViewScroll}
        > */}
          <KeyboardAwareScrollView
            resetScrollToCoords={{x: 0, y: 0}}
            scrollEnabled={true}
            enableOnAndroid
            showsVerticalScrollIndicator={false}>
            <View style={{backgroundColor: '#707070', opacity: 0.5}}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.setState({isContestPhotoOptions: true})}>
                {this.renderMedia()}
                <TouchableOpacity
                  onPress={() => this.setState({isContestPhotoOptions: true})}
                  style={changeCoverButtonContainerStyle}
                  activeOpacity={1}>
                  <View>
                    <Icon name="camera" style={{alignSelf: 'center'}} />
                    <Text style={{fontWeight: '800'}}>
                      Choose contest photo
                    </Text>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            <View style={detailSectionStyle}>
              <Text style={styles.textInfoStyle}>Contest Info</Text>

              <Form style={{paddingBottom: 20}}>
                <Item floatingLabel style={styles.inputStyle}>
                  <Label>Contest Name</Label>
                  <Input
                    onChangeText={text =>
                      this.props.createContestFormField({
                        prop: 'title',
                        value: text,
                      })
                    }
                    value={this.props.title}
                  />
                </Item>
                <Text style={styles.aboutMeOption}>
                  Choose a title that best describes your contest
                </Text>
                <Item picker style={styles.inputOtherStyle}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    //style={{ width: undefined }}
                    placeholder="Category"
                    placeholderStyle={{color: '#000'}}
                    selectedValue={this.props.category}
                    onValueChange={text =>
                      this.props.createContestFormField({
                        prop: 'category',
                        value: text,
                      })
                    }>
                    <Picker.Item label="Category" value="" />
                    <Picker.Item label="Brand" value="Brand" />
                    {/* <Picker.Item label="Female" value="Female" /> */}
                  </Picker>
                  {/* {showErrorLnameIcon} */}
                </Item>
                <Item floatingLabel style={styles.inputStyle}>
                  <Label>Description</Label>
                  <Input
                    multiline={true}
                    maxLength={160}
                    onChangeText={text =>
                      this.props.createContestFormField({
                        prop: 'description',
                        value: text,
                      })
                    }
                    value={this.props.description}
                  />
                  {/* {showErrorLnameIcon} */}
                </Item>
                <Text style={styles.aboutMeOption}>
                  Description of the brand you are promoting
                </Text>

                {/* <MultiSlider
                  values={[this.state.values[0], this.state.values[1]]}
                  sliderLength={280}
                  onValuesChange={this.multiSliderValuesChange}
                  // min={0}
                  // max={10}
                  step={1}
                /> */}

                <Item floatingLabel style={styles.inputStyle}>
                  <Label>Website</Label>
                  <Input
                    onChangeText={text =>
                      this.props.createContestFormField({
                        prop: 'website',
                        value: text,
                      })
                    }
                    value={this.props.website}
                  />
                  {/* {showErrorLnameIcon} */}
                </Item>

                <Text style={styles.textInfoStyle}>Award</Text>
                <Item
                  // error={this.props.genderSignupError}
                  picker
                  style={styles.inputOtherStyle}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    //style={{ width: undefined }}
                    placeholder="Award type"
                    placeholderStyle={{color: '#000'}}
                    selectedValue={this.props.awardType}
                    onValueChange={text =>
                      this.props.createContestFormField({
                        prop: 'awardType',
                        value: text,
                      })
                    }>
                    <Picker.Item label="Award type" value="" />
                    <Picker.Item label="Cash" value="cash" />
                    <Picker.Item label="Utex" value="utex" />
                  </Picker>
                  {/* {showErrorGenderIcon} */}
                </Item>
                <Text style={[styles.aboutMeOption, {marginTop: 1}]}>
                  How do you want to reward your winners
                </Text>

                <Item style={styles.inputOtherStyle}>
                  {/* <Label>Amount</Label> */}

                  <Input
                    keyboardType="numeric"
                    onChangeText={text =>
                      this.props.onEnterContestAmount(
                        text,
                        this.props.firstPositionPercent,
                        this.props.secondPositionPercent,
                        this.props.thirdPositionPercent,
                      )
                    }
                    value={this.props.totalAmount}
                    placeholder="Amount"
                  />
                  {/* {showErrorLnameIcon} */}
                  <Text>₦</Text>
                </Item>
                <Text style={[styles.aboutMeOption, {marginTop: -20}]}>
                  Amount(30% of the total amount is the cost of transaction)
                </Text>
                <Item floatingLabel style={styles.inputStyle}>
                  <Label>Other awards</Label>
                  <Input
                    onChangeText={text =>
                      this.props.createContestFormField({
                        prop: 'otherAwards',
                        value: text,
                      })
                    }
                    value={this.props.otherAwards}
                  />
                  {/* {showErrorLnameIcon} */}
                </Item>
                <Text style={styles.aboutMeOption}>
                  Enter other awards for winners(optional)
                </Text>
                {/* <Item floatingLabel style={styles.inputOtherStyle}>
                  <Label>Winner's count</Label>
                  <Input
                    keyboardType="numeric"
                    onChangeText={text =>
                      this.props.createContestFormField({
                        prop: "website",
                        value: text
                      })
                    }
                    value={
                      this.props.website === null
                        ? userData.website
                        : this.props.website
                    }
                  />
                 {showErrorLnameIcon}
                </Item>
                <Text style={[styles.aboutMeOption, { marginTop: 1 }]}>
                  How many winners do you want for your contest
                </Text>*/}

                <Text style={styles.textInfoStyle}>Schedule Winners</Text>
                <View style={styles.scheduleWinnersContainerStyle}>
                  <View style={{width: '70%'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text>₦</Text>
                      <Text>{this.props.firstPositionAmount}</Text>
                    </View>
                    <Text
                      style={[
                        styles.aboutMeOption,
                        {alignSelf: 'flex-start', marginTop: 0},
                      ]}>
                      Amount for 1st position winner
                    </Text>
                  </View>
                  <View style={styles.percentageContainerStyle}>
                    <Text>40%</Text>
                  </View>
                </View>
                <View style={styles.scheduleWinnersContainerStyle}>
                  <View style={{width: '70%'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text>₦</Text>
                      <Text>{this.props.secondPositionAmount}</Text>
                    </View>
                    <Text
                      style={[
                        styles.aboutMeOption,
                        {alignSelf: 'flex-start', marginTop: 0},
                      ]}>
                      Amount for 2nd position winner
                    </Text>
                  </View>
                  <View style={styles.percentageContainerStyle}>
                    <Text>20%</Text>
                  </View>
                </View>
                <View style={styles.scheduleWinnersContainerStyle}>
                  <View style={{width: '70%'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text>₦</Text>
                      <Text>{this.props.thirdPositionAmount}</Text>
                    </View>
                    <Text
                      style={[
                        styles.aboutMeOption,
                        {alignSelf: 'flex-start', marginTop: 0},
                      ]}>
                      Amount for 3rd position winner
                    </Text>
                  </View>
                  <View style={styles.percentageContainerStyle}>
                    <Text>10%</Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.inputOtherStyle,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    },
                  ]}>
                  {/* <Label>Amount</Label> */}
                  <Text>{'₦ ' + this.props.contestAmount}</Text>
                  {/* {showErrorLnameIcon} */}

                  <Text>70%</Text>
                </View>
                <Button
                  style={styles.nextBtnStyle}
                  onPress={() => this.onCreateContest()}>
                  <Text style={{color: '#ffffff'}}>Next</Text>
                </Button>
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
  changeCoverButtonContainerStyle: {
    position: 'absolute',
    top: '80rem',
    left: '120rem',
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
    marginBottom: '35rem',
    marginLeft: 0,
    borderColor: '#000',
  },
  inputOtherStyle: {
    marginBottom: '20rem',
    marginLeft: 0,
    borderColor: '#000',
    marginTop: '17rem',
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
    marginTop: '-24rem',
  },
  textInfoStyle: {
    color: '#000000',
    fontSize: '20rem',
    fontWeight: '800',
    marginBottom: '20rem',
    marginTop: '40rem',
  },
  nextBtnStyle: {
    width: '100%',
    backgroundColor: '#44a4f7',
    height: '45rem',
    justifyContent: 'center',
  },
  scheduleWinnersContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '7rem',
  },
  percentageContainerStyle: {
    alignItems: 'flex-end',
    width: '30%',
  },
});

const mapStateToProps = ({auth, contest}) => {
  const {
    category,
    title,
    description,
    website,
    gender,
    awardType,
    contestAmount,
    otherAwards,
    firstPositionAmount,
    firstPositionPercent,
    secondPositionAmount,
    secondPositionPercent,
    thirdPositionAmount,
    thirdPositionPercent,
    totalAmount,
    contestMedia,
    coverPhotoIndex,
    showDeleteBtn,
    index,
    imageSource,
    is_loading,
  } = contest;
  const {userId, token} = auth;
  console.log('fn', category);
  return {
    category,
    title,
    description,
    website,
    gender,
    awardType,
    contestAmount,
    otherAwards,
    firstPositionAmount,
    firstPositionPercent,
    secondPositionAmount,
    secondPositionPercent,
    thirdPositionAmount,
    thirdPositionPercent,
    totalAmount,
    contestMedia,
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
    chooseContestMedia,
    checkImageToDelete,
    checkContestImageToDelete,
    deleteImage,
    deleteCoverImage,
    createContestFormField,
    onEnterContestAmount,
    createContestNextHander,
  },
)(CreateContest);
