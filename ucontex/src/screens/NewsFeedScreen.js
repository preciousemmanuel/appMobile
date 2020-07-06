import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {Icon, Fab, Button, Item, Input} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import KeyboardSpacer from 'react-native-keyboard-spacer';
const SCREEN_WIDTH = Dimensions.get('window').width;
import {
  selectMediaView,
  fetchPost,
  refreshPost,
  handleShowPostCommentBox,
  commentOnPost,
  commentFormField,
  handleLoadMore,
} from '../actions';
import NewsFeedItems from '../components/NewsFeedItems';
import PeopleMayFollowSection from '../components/PeopleMayFollowSection';
import FloatButton from '../components/FloatButton';

const {width} = Dimensions.get('window');
class NewsFeedScreen extends React.PureComponent {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: "ddd",
  //     tabBarIcon: ({ tintColor }) => {
  //       return <Icon name="search" size={30} color={tintColor} />;
  //     }
  //   };
  // };
  //this function handles showmorpix navigation
  // showMorePix = (item, index) => {
  //   console.log(item);
  //   this.props.selectMediaView(item);
  //   //this.props.navigation.navigate("ShowMorePicx", { data: item, index });
  // };
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {bottomLocation: 0};
  }

  componentDidMount() {
    //  console.log("hjjhj", this.props.token);
    this.props.fetchPost({
      token: this.props.token,
      userId: this.props.userId,
      page: this.page,
    });
    //Keyboard.addListener('keyboardDidShow', this.keyboardWillShow.bind(this));
    //Keyboard.addListener('keyboardDidHide', this.keyboardWillHide.bind(this));
  }

  componentWillUnmount() {
    // this._mounted = false;
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    Keyboard.removeListener(
      'keyboardDidShow',
      this.keyboardWillShow.bind(this),
    );
    Keyboard.removeListener(
      'keyboardDidHide',
      this.keyboardWillHide.bind(this),
    );
  }

  keyboardWillShow(e) {
    this.setState({
      bottomLocation: e.endCoordinates.height,
      containerLocation: e.endCoordinates.height,
    });
    // this.animateContainerLocation();
  }

  keyboardWillHide(e) {
    // console.log("h", this.state.containerLocation);
    this.setState({bottomLocation: 0});
    // this.animateContainerLocation();
  }

  handleBackPress = () => {
    this.props.handleShowPostCommentBox(null);
    return true;
    // if (this.state.showMistakeBtn) {
    //   this.setState({ isPostUnfinish: true });
    //
    //   return true;
    // } else {
    //   this.props.navigation.goBack(null);
    //   return true;
    // }
  };

  onSubmitComment = postId => {
    const {userId, token, commentMsg} = this.props;
    this.props.commentOnPost({commentMsg, postId, userId, token});
  };

  _onRefresh = () => {
    this.props.refreshPost({
      token: this.props.token,
      userId: this.props.userId,
    });
  };

  handleLoadMore = () => {
    // if (!this.props.loadingAllPost) {
    //   this.page = this.page + 1; // increase page by 1
    //   //this.fetchUser(this.page); // method for API call
    //   this.props.fetchPost({
    //     token: this.props.token,
    //     userId: this.props.userId,
    //     page: this.page
    //   });
    // }
  };

  getItemLayout = (data, index) => {
    let length = width / 3;
    console.log('length', length);
    return {length, offset: length * index, index};
  };

  showCommentBox = () => {
    if (this.props.postCommentId !== null) {
      return (
        <View
          style={[
            styles.commentSectionStyle,
            {bottom: this.state.bottomLocation},
          ]}>
          <View>
            <Button
              transparent
              style={styles.closeCommentStyle}
              onPress={() => this.props.handleShowPostCommentBox(null)}>
              <Icon name="close" style={{color: 'red'}} />
            </Button>
            <View style={styles.commentPanelStyle}>
              <Item style={styles.commentPanel}>
                <Input
                  autoFocus={true}
                  // onFocus={() => this.handleEpressionFocus(this.props.item.id)}
                  // onBlur={() => this.handleEpressionBlur(this.props.item.id)}
                  style={{color: '#707070', maxHeight: 80, padding: 0}}
                  placeholder={`Write comment`}
                  placeholderStyle={{color: '#707070', fontSize: 10}}
                  multiline={true}
                  onChangeText={text =>
                    this.props.commentFormField({
                      prop: 'commentMsg',
                      value: text,
                    })
                  }
                  value={this.props.commentMsg}
                />
              </Item>
              <TouchableOpacity
                onPress={() => this.onSubmitComment(this.props.postCommentId)}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 13,
                }}>
                <Icon name="send" style={{color: '#44a4f7'}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    return (
      <FloatButton onPress={() => this.props.navigation.navigate('CreatePost')}>
        <Icon name="add" style={{color: '#fff'}} />
      </FloatButton>
    );
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.props.loadingAllPost) return null;
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" style={{color: '#000'}} />
      </View>
    );
  };

  render() {
    const {containerStyle, fabStyle} = styles;
    console.log('rerender');
    return (
      <View style={containerStyle}>
        <Spinner
          visible={this.props.is_commenting}
          color="#44a4f7"
          overlayColor="rgba(0, 0, 0, 0.6)"
        />
        {/* <Spinner
          visible={this.props.loading}
          color="#44a4f7"
          overlayColor="rgba(0, 0, 0, 0)"
        /> */}
        <FlatList
          extraData={this.props}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <Fragment>
                {!index && <PeopleMayFollowSection />}
                <NewsFeedItems
                  navigation={this.props.navigation}
                  // showMorePix={() => console.log(item)}
                  item={item}
                  index={index}
                />
              </Fragment>
            );
          }}
          onRefresh={this._onRefresh}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              {/* <Text>Fetching feed...</Text> */}
            </View>
          }
          initialNumToRender={8}
          maxToRenderPerBatch={2}
          onEndReachedThreshold={0.5}
          removeClippedSubviews={true}
          refreshing={this.props.refresh}
          data={this.props.postData}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReached={this.handleLoadMore.bind(this)}
          // getItemLayout={this.getItemLayout}
        />
        {/* The view that will animate to match the keyboards height */}
        {this.showCommentBox()}
        {/* <KeyboardSpacer /> */}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  closeCommentStyle: {
    alignSelf: 'flex-end',
  },
  commentPanelStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: '40rem',
    borderTopColor: '#dddddd',
    backgroundColor: '#f3f3f3',
    borderTopWidth: '1rem',
    width: SCREEN_WIDTH,
  },

  commentSectionStyle: {
    position: 'absolute',
    bottom: '0rem',
    width: SCREEN_WIDTH,
    flexDirection: 'row',
  },
  commentPanel: {
    width: '86%',
    height: '35rem',
    // borderRadius: 5,
    borderBottomColor: '#f3f3f3',
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    marginLeft: '9rem',
    flexDirection: 'row',
    paddingLeft: '7rem',
  },
});

const mapStateToProps = ({post, auth, comments}) => {
  //const {selectedMedia} = feed;
  const {postData, loadingAllPost, refresh, postCommentId, page} = post;
  const {commentMsg, is_commenting} = comments;
  const {token, userId} = auth;
  //console.log('post', postData);
  return {
    token,
    userId,
    postData,
    loadingAllPost,
    refresh,
    postCommentId,
    commentMsg,
    is_commenting,
    page,
  };
};
export default connect(
  mapStateToProps,
  {
    selectMediaView,
    fetchPost,
    refreshPost,
    handleShowPostCommentBox,
    commentOnPost,
    commentFormField,
    handleLoadMore,
  },
)(NewsFeedScreen);
