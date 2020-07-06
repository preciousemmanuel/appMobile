import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
import {Icon, Button, ListItem, Body, List, Left} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import _ from 'lodash';
import Modal from 'react-native-modal';
//import AutoResponsiveGrid from "autoresponsive-react-native";

import Moment from 'moment';

import AvailableContestSection from './AvailableContestSection';
import PostDescription from './PostDescription';
import ProfilePicture from './ProfilePicture';
import Carousel from './Carousel';
import {
  selectMediaView,
  selectContestMore,
  clearDropdownProps,
} from '../actions';
import {FORMAT_NUM_VALUES} from '../config';

const SCREEN_WIDTH = Dimensions.get('window').width;
class ContestItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: null,
      activeSlide: 0,
      moreOptionDetail: null,
      showMoreOptions: false,
    };
  }

  showCashoutType() {
    // if (this.props.item.typeCashout === "utex") {
    //   return <Text style={{ color: "#686767", fontWeight: "300" }}>U</Text>;
    // } else {
    return <Text style={{color: '#686767', fontWeight: '300'}}>₦</Text>;
    //}
  }
  renderContestStatus = () => {
    if (this.props.item.ongoing) {
      return (
        <View style={[styles.statusIconStyle, {backgroundColor: '#55f976'}]} />
      );
    }
    return (
      <View style={[styles.statusIconStyle, {backgroundColor: '#e20f0f'}]} />
    );
  };

  renderCommentSection = () => {
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
      joinContainerSection,
      addedLoveExpressionStyle,
      joinButtonStyle,
      viewsStyle,
    } = styles;
    const {item} = this.props;
    let joinText;
    if (item.joined) {
      joinText = <Text style={{color: '#ffffff'}}>View</Text>;
    } else {
      joinText = <Text style={{color: '#ffffff'}}>Read More</Text>;
    }
    if (item.status !== 'available') {
      return (
        <View>
          <View style={joinContainerSection}>
            <View style={{alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                {this.showCashoutType()}
                <Text style={{color: '#686767', fontWeight: '300'}}>
                  {item.amount}
                </Text>
              </View>

              <Text style={{fontWeight: '300', color: '#000'}}>
                Prize Award
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: '#686767', fontWeight: '300'}}>
                {FORMAT_NUM_VALUES(item.numberOfComments)}
              </Text>
              <Text style={{fontWeight: '300', color: '#000'}}>
                Participants
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: '#686767', fontWeight: '300'}}>
                {FORMAT_NUM_VALUES(100)}
              </Text>
              <Text style={{fontWeight: '300', color: '#000'}}>Views</Text>
            </View>
            <Button
              onPress={() =>
                this.props.navigation.navigate('DetailContest', {
                  contestId: item.id,
                })
              }
              style={joinButtonStyle}>
              {joinText}
            </Button>
          </View>
        </View>
      );
    } else {
      //contest is ongoing or trending or closed
      return (
        <View>
          <View style={[fetchLoveExpressionStyles, addedLoveExpressionStyle]}>
            <TouchableOpacity style={{marginLeft: 5}}>
              <Text style={{color: '#000', fontWeight: '500'}}>
                ₦{item.amount}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[viewsStyle, addedLoveExpressionStyle]}>
            <TouchableOpacity style={{marginLeft: 5}}>
              <Text style={{color: '#000', fontWeight: '500'}}>
                {FORMAT_NUM_VALUES(100)} Views
              </Text>
            </TouchableOpacity>
          </View>
          {/*
          <View style={[fetchLoveExpressionStyles, addedLoveExpressionStyle]}>
            <TouchableOpacity style={{ marginRight: 5 }}>
              <Text style={{ color: "#000", fontWeight: "500" }}>
                {item.contest.views}
              </Text>
            </TouchableOpacity>
          </View> */}

          <View style={commentExpressionShareContainerStyle}>
            <View style={iconTextContainerStyle}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Contest')}
                style={commentExpressionShareBtnStyle}>
                <Icon name="star" style={[commentExpressionShareIconStyle]} />
              </TouchableOpacity>
              <Text style={{color: '#44a4f7'}}>20k</Text>
            </View>
            <View style={iconTextContainerStyle}>
              <TouchableOpacity style={commentExpressionShareBtnStyle}>
                <Icon
                  name="chatboxes"
                  style={[commentExpressionShareIconStyle]}
                />
              </TouchableOpacity>
              <Text style={{color: '#44a4f7'}}>20k</Text>
            </View>
            <View style={iconTextContainerStyle}>
              <TouchableOpacity
                transparent
                style={commentExpressionShareBtnStyle}>
                <Icon name="share" style={[commentExpressionShareIconStyle]} />
              </TouchableOpacity>
              <Text style={{color: '#44a4f7'}}>20k</Text>
            </View>
          </View>

          <View style={commentSectionStyle}>
            {/* <Image
              resizeMode="cover"
              source={require("../assets/user.png")}
              style={commentImageStyle}
            />
             */}
            {this.renderLoginUserImage()}
            <View style={commentPanel}>
              <Icon name="chatboxes" style={commentIcon} />
              <Text style={{color: '#707070'}}>
                Love Expression to John Doe
              </Text>
            </View>
          </View>
        </View>
      );
    }
  };

  showDropdown = () => {
    if (this.props.item.status === 'available') {
      return (
        <TouchableOpacity
          onPress={() => {
            this.setState({
              showMoreOptions: false,
              moreOptionDetail: null,
            });
            this.props.navigation.navigate('DetailContest', {
              detail: this.state.moreOptionDetail,
            });
          }}
          style={styles.eachDropdwonButtonStyle}>
          <Icon style={styles.showMoreDropdownIconStyle} name="eye" />
          <Text>View</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => alert()}
          style={styles.eachDropdwonButtonStyle}>
          <Icon style={styles.showMoreDropdownIconStyle} name="easel" />
          <Text>Live board</Text>
        </TouchableOpacity>
      );
    }
  };

  renderProfileImage = style => {
    //console.log("edss", this.props.userData);
    if (this.props.item.owner.profilePictures.length > 0) {
      let numberOfPicx = this.props.item.owner.profilePictures.length;
      return (
        <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.navigate('UsersProfile', {
              user: this.props.item.owner.id,
            })
          }>
          <ProgressiveRoundImage
            resizeMode="cover"
            style={style}
            source={{
              uri: this.props.item.owner.profilePictures[numberOfPicx - 1].url,
            }}
          />
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            //  console.log("dfg", this.props.item.owner.id);
            this.props.navigation.navigate('UsersProfile', {
              user: this.props.item.owner.id,
            });
          }}>
          <Image
            resizeMode="cover"
            source={require('../assets/user.png')}
            style={style}
          />
        </TouchableWithoutFeedback>
      );
    }
  };

  renderLoginUserImage = () => {
    // console.log("edss", this.props.userData);
    if (this.props.userData.data.userData.profilePictures.length > 0) {
      // console.log(
      //   "num",
      //   this.props.userData.data.userData.profilePictures.length
      // );
      let numberOfPicx = this.props.userData.data.userData.profilePictures
        .length;
      return (
        <ProgressiveRoundImage
          resizeMode="cover"
          style={styles.commentImageStyle}
          source={{
            uri: this.props.userData.data.userData.profilePictures[
              numberOfPicx - 1
            ].url,
          }}
        />
      );
    } else {
      return (
        <Image
          style={styles.commentImageStyle}
          source={require('../assets/user.png')}
        />
      );
    }
  };

  renderViewMore(onPress) {
    return (
      <Text style={{color: '#44a4f7'}} onPress={onPress}>
        View more
      </Text>
    );
  }
  renderViewLess(onPress) {
    return (
      <Text style={{color: '#44a4f7'}} onPress={onPress}>
        View less
      </Text>
    );
  }
  renderContestDescription = () => {
    return (
      <ViewMoreText
        numberOfLines={3}
        renderViewMore={this.renderViewMore}
        renderViewLess={this.renderViewLess}
        // textStyle={{ textAlign: "center" }}
      >
        <Text style={{fontWeight: '300'}}>{this.props.item.description}</Text>
      </ViewMoreText>
    );
  };
  showMoreOptions = item => {
    this.setState({moreOptionDetail: item, showMoreOptions: true});
  };

  render() {
    //console.log("dsdsdsddd", this.props);
    // _this = this;
    const {item} = this.props;

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
      moreOptionContainerStyle,
    } = styles;
    //console.log(this.props);

    //check if meida/image is one or not
    let addedLoveExpressionStyle = {};
    if (item.images.length === 1) {
      addedLoveExpressionStyle = styles.addedLoveExpressionStyle;
    } else {
      addedLoveExpressionStyle = {};
    }

    // if (this.props.index === 2) {
    //   return <AvailableContestSection />;
    // }
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (typeof this.props.showDropdownItem !== 'null') {
            this.props.clearDropdownProps();
          }
        }}>
        <View style={containerStyle}>
          <Modal
            isVisible={this.state.showMoreOptions}
            onBackdropPress={() =>
              this.setState({
                showMoreOptions: false,
                moreOptionDetail: null,
              })
            }>
            <View style={moreOptionContainerStyle}>
              {/* // {this.showDropdown()} */}
              <TouchableOpacity
                onPress={() => alert(this.state.moreOptionDetail.contest.id)}
                style={styles.eachDropdwonButtonStyle}>
                <Icon style={styles.showMoreDropdownIconStyle} name="redo" />
                <Text>Follow</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => alert()}
                style={styles.eachDropdwonButtonStyle}>
                <Icon style={styles.showMoreDropdownIconStyle} name="share" />
                <Text>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => alert()}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Icon style={styles.showMoreDropdownIconStyle} name="copy" />
                <Text>Copy</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <View style={headerStyle}>
            {/* <Image
              resizeMode="cover"
              source={require("../assets/icon.png")}
              style={profileImageStyle}
            /> */}

            <ProfilePicture
              onPress={() =>
                this.props.navigation.navigate('UsersProfile', {
                  user: item.owner.id,
                })
              }
              profilePictures={item.owner.profilePictures}
            />

            <View>
              <Text style={profileTitleNameStyle}>
                {item.owner.firstName + ' ' + item.owner.lastName}
              </Text>
              <View style={{flexDirection: 'row'}}>
                {this.renderContestStatus()}
                <Text style={timeAgoStyle}>{`${item.category} Promotion`}</Text>
              </View>
            </View>
            <View style={{marginLeft: 'auto'}}>
              <TouchableOpacity
                //  onPress={() => this.props.selectContestMore(item.contest.id)}
                onPress={() => this.showMoreOptions(item)}>
                <Icon style={{alignSelf: 'flex-end'}} name="more" />
              </TouchableOpacity>

              <Text style={timeAgoStyle}>
                {Moment(item.endDate).format('MMM D')}
              </Text>
            </View>
            {/* {this.props.showDropdownItem === `drop${item.contest.id}` && (
              <View style={styles.showMoreDropdownStyle}>
                {this.showDropdown()}
                <TouchableOpacity
                  onPress={() => alert()}
                  style={styles.eachDropdwonButtonStyle}
                >
                  <Icon style={styles.showMoreDropdownIconStyle} name="redo" />
                  <Text>Follow</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => alert()}
                  style={styles.eachDropdwonButtonStyle}
                >
                  <Icon style={styles.showMoreDropdownIconStyle} name="share" />
                  <Text>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => alert()}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%"
                  }}
                >
                  <Icon style={styles.showMoreDropdownIconStyle} name="copy" />
                  <Text>Copy</Text>
                </TouchableOpacity>
              </View>
            )} */}
          </View>

          <View style={postTextContainerStyle}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.brandTitleStyle}>{item.name}</Text>
              {item.joined && (
                <View style={{marginLeft: 'auto'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="checkmark-circle"
                      style={{color: 'green', fontSize: 15, marginRight: 5}}
                    />
                    <Text style={{color: 'green'}}>Joined</Text>
                  </View>
                </View>
              )}
            </View>
            <PostDescription>{item.description}</PostDescription>
          </View>
          <Carousel
            navigation={this.props.navigation}
            images={item.images}
            data={item}
          />

          {this.renderCommentSection()}
        </View>
      </TouchableWithoutFeedback>
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
    paddingTop: '25rem',
    paddingLeft: '16rem',
    paddingRight: '16rem',
    paddingBottom: '16rem',
    flexDirection: 'row',
  },
  profileImageStyle: {
    alignSelf: 'stretch',
    borderRadius: '75rem',
    width: '46rem',
    height: '46rem',
    marginRight: '18rem',
  },
  profileTitleNameStyle: {
    fontSize: '15rem',
    color: '#000',
    fontWeight: '700',
    marginBottom: '5rem',
  },
  timeAgoStyle: {
    fontSize: '10rem',
    color: '#7e7b7b',
    fontWeight: '300',
  },
  postTextContainerStyle: {
    paddingLeft: '16rem',
    paddingRight: '16rem',
    paddingBottom: '16rem',
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
    borderRadius: '5rem',
    borderColor: '#dddddd',
    borderStyle: 'solid',
    borderWidth: '1rem',
    marginLeft: '7rem',
    marginRight: '7rem',
    marginTop: '4rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5rem',
  },
  joinContainerSection: {
    borderRadius: '5rem',
    borderColor: '#dddddd',
    borderStyle: 'solid',
    borderWidth: '1rem',
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
    height: '33rem',
    width: '33rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '75rem',
    backgroundColor: '#e4e4e4',
    marginRight: '5rem',
  },
  commentExpressionShareIconStyle: {
    color: '#686767',
    fontSize: '20rem',
  },
  carouselImageStyle: {
    width: '100%',
    minHeight: '300rem',
  },
  moreMediaButonStyles: {
    position: 'absolute',
    right: '50rem',
    bottom: '25rem',
    zIndex: 1000,
    shadowOpacity: 0,
    shadowRadius: 0,
    backgroundColor: '#fff',
  },
  commentSectionStyle: {
    minHeight: '45rem',
    borderRadius: '5rem',
    borderColor: '#dddddd',
    borderStyle: 'solid',
    borderWidth: '1rem',
    marginLeft: '7rem',
    marginRight: '7rem',
    marginTop: '4rem',
    flexDirection: 'row',
    alignItems: 'center',

    padding: '5rem',
  },
  commentImageStyle: {
    alignSelf: 'stretch',
    borderRadius: '75rem',
    width: '31rem',
    height: '31rem',
    marginRight: '9rem',
  },
  commentPanel: {
    width: '88%',
    height: '35rem',
    borderRadius: '5rem',
    backgroundColor: '#f3f3f3',
    alignItems: 'center',

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
    bottom: '140rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewsStyle: {
    position: 'absolute',
    right: '16rem',
    bottom: '140rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fetchLoveExpressionIconStyles: {
    width: '13rem',
    height: '13rem',
  },
  singleMediaContainerStyle: {
    flex: 1,
    backgroundColor: '#e1e4e8',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: '70rem',
  },
  addedLoveExpressionStyle: {
    bottom: '140rem',
  },
  statusIconStyle: {
    width: '8rem',
    height: '8rem',
    borderRadius: '75rem',
    marginRight: '4rem',
    marginTop: '3rem',
  },
  brandTitleStyle: {
    fontSize: '15rem',
    fontWeight: '800',
    lineHeight: '20rem',
    paddingBottom: '13rem',
  },
  joinButtonStyle: {
    minWidth: '60rem',
    height: '25rem',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#44a4f7',
    alignSelf: 'center',
    padding: '5rem',
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
});
const mapStateToProps = ({contest, auth}) => {
  const {showDropdownItem} = contest;
  //const { userData } = profileSetup;
  const {token, userId, userData} = auth;
  return {showDropdownItem, userData, userId, token};
};
export default connect(
  mapStateToProps,
  {selectMediaView, selectContestMore, clearDropdownProps},
)(ContestItem);
