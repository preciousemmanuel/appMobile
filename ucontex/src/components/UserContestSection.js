import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";

import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";

import { fetchUsersContest } from "../actions";
import ContestItem from "../components/ContestItem";

//console.log(data);
class UserContestSection extends Component {
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
    const { user, userId, token, authUser, fetchUsersContest } = this.props;
    //  console.log("uid", user, this.props.userId);

    fetchUsersContest({
      userId: user,
      token,
      authUser: userId,
      page: 1
    });
    // BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    // Keyboard.addListener("keyboardDidShow", this.keyboardWillShow.bind(this));
    // Keyboard.addListener("keyboardDidHide", this.keyboardWillHide.bind(this));
  }

  componentWillUnmount() {
    //this.prop();
  }
  handleLoadMore = () => {
    alert("iiii");
    const {
      userId,
      token,
      page,
      isFetchingAllContest,
      fetchUsersContest
    } = this.props;

    if (!isFetchingAllContest) {
      //alert(isFetchingAllContest);
      this.page = this.page + 1; // increase page by 1
      //this.fetchUser(this.page); // method for API call
      this.props.fetchUsersContest({
        userId: this.props.user,
        token: this.props.token,
        authUser: this.props.userId,
        page: this.page
      });
    }
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.props.isFetchingAllContest) return null;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" style={{ color: "#000" }} />
      </View>
    );
  };

  render() {
    const { containerStyle, fabStyle } = styles;
    const { navigation, contestUserData } = this.props;
    return (
      <View style={containerStyle}>
        <FlatList
          extraData={this.props}
          renderItem={({ item, index }) => {
            return (
              <ContestItem
                navigation={navigation}
                // showMorePix={() => console.log(item)}
                item={item}
                index={index}
              />
            );
          }}
          data={contestUserData}
          // onEndReachedThreshold={0.4}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this.renderFooter.bind(this)}
          onEndReached={this.handleLoadMore.bind(this)}
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "red"
  },
  fabStyle: {
    position: "absolute",
    right: "20rem",
    bottom: "20rem",
    backgroundColor: "#44a4f7",
    width: "45rem",
    height: "45rem",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "75rem",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4
  }
});

const mapStateToProps = ({ contest, auth }) => {
  const { contestUserData, isFetchingAllContest } = contest;

  const { token, userId } = auth;

  return {
    contestUserData,
    isFetchingAllContest,
    token,
    userId
  };
};
export default connect(
  mapStateToProps,
  { fetchUsersContest }
)(UserContestSection);
