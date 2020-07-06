import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {Icon, Fab, Button} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';

import {fetchContest, resetContest} from '../actions';
import ContestItem from '../components/ContestItem';
import ContestGroupSection from '../components/ContestGroupSection';
import FloatButton from '../components/FloatButton';

//console.log(data);
class ContestScreen extends Component {
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
  }
  componentWillMount() {
    //console.log("hjjhj", this.props.token);
    this.props.fetchContest({
      token: this.props.token,
      userId: this.props.userId,
      page: this.props.page,
      status: 10,
    });
    // BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    // Keyboard.addListener("keyboardDidShow", this.keyboardWillShow.bind(this));
    // Keyboard.addListener("keyboardDidHide", this.keyboardWillHide.bind(this));
  }

  componentWillUnmount() {
    //this.props.resetContest();
  }
  handleLoadMore = () => {
    //alert("iiii");
    const {
      userId,
      token,
      page,
      isFetchingAllContest,
      fetchContest,
    } = this.props;

    if (!isFetchingAllContest) {
      //alert(isFetchingAllContest);
      this.page = this.page + 1; // increase page by 1
      //this.fetchUser(this.page); // method for API call
      fetchContest({token, userId, page: this.page, status: 10});
    }
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.props.isFetchingAllContest) return null;
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" style={{color: '#000'}} />
      </View>
    );
  };

  render() {
    const {containerStyle, fabStyle} = styles;
    const {
      totalOngoingContests,
      totalClosedContests,
      totalContests,
      navigation,
      contestData,
    } = this.props;
    return (
      <View style={containerStyle}>
        <FlatList
          extraData={this.props}
          renderItem={({item, index}) => {
            return (
              <Fragment>
                {!index && (
                  <ContestGroupSection
                    totalOngoingContests={totalOngoingContests}
                    totalClosedContests={totalClosedContests}
                    totalContests={totalContests}
                    navigation={navigation}
                  />
                )}
                <ContestItem
                  navigation={navigation}
                  // showMorePix={() => console.log(item)}
                  item={item}
                  index={index}
                />
              </Fragment>
            );
          }}
          data={contestData}
          onEndReachedThreshold={0.4}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReached={this.handleLoadMore.bind(this)}
        />
        <FloatButton
          onPress={() => this.props.navigation.navigate('CreateContest')}>
          <Icon name="ribbon" style={{color: '#fff'}} />
        </FloatButton>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  fabStyle: {
    position: 'absolute',
    right: '20rem',
    bottom: '20rem',
    backgroundColor: '#44a4f7',
    width: '45rem',
    height: '45rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '75rem',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
});

const mapStateToProps = ({contest, auth}) => {
  const {
    contestData,
    isFetchingAllContest,
    page,
    totalClosedContests,
    totalOngoingContests,
    totalContests,
  } = contest;

  const {token, userId} = auth;

  return {
    contestData,
    isFetchingAllContest,
    page,
    token,
    userId,
    totalClosedContests,
    totalOngoingContests,
    totalContests,
  };
};
export default connect(
  mapStateToProps,
  {fetchContest, resetContest},
)(ContestScreen);
