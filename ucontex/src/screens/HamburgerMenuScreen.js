import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage
} from "react-native";
import {
  Content,
  List,
  ListItem,
  Icon,
  Left,
  Body,
  Right,
  Badge,
  Button
} from "native-base";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";

import { logout } from "../actions";

//console.log(data);
class HamburgerMenuScreen extends Component {
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

  handleSignOut = async () => {
    // let data = AsyncStorage.removeItem("user");
    this.props.logout();
    this.props.navigation.navigate("Login");
  };

  render() {
    const { containerStyle } = styles;
    const { userId, userData } = this.props;
    return (
      <View style={containerStyle}>
        <Content style={{ paddingBottom: 20 }}>
          <ListItem
            onPress={() =>
              this.props.navigation.navigate("UserContest", {
                user: userId,
                name: userData.data.userData.firstName
              })
            }
            style={styles.listItemStyle}
            icon
          >
            <Left>
              <Icon active name="ribbon" />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text>Contest</Text>
            </Body>
          </ListItem>
          <ListItem style={styles.listItemStyle} icon>
            <Left>
              <Icon active name="ribbon" />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text>Utex</Text>
            </Body>
            <Right style={{ borderBottomWidth: 0 }}>
              <Text>{userData.data.userData.utex}</Text>
            </Right>
          </ListItem>
          <ListItem
            onPress={() => this.props.navigation.navigate("WalletLogin")}
            style={styles.listItemStyle}
            icon
          >
            <Left>
              <Icon active name="cash" />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text>Wallet</Text>
            </Body>
          </ListItem>

          <ListItem
            onPress={() => this.props.navigation.navigate("Connections")}
            style={styles.listItemStyle}
            icon
          >
            <Left>
              <Icon active name="people" />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text>Connections</Text>
            </Body>
          </ListItem>
          <ListItem style={styles.listItemStyle} icon>
            <Left>
              <Icon active name="settings" />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text>Setings</Text>
            </Body>
          </ListItem>
          <ListItem style={styles.listItemStyle} icon>
            <Left>
              <Icon active name="contacts" />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text>Invite Friends</Text>
            </Body>
          </ListItem>
          <ListItem style={styles.listItemStyle} icon>
            <Left>
              <Icon active name="help-circle" />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text>Help Center</Text>
            </Body>
          </ListItem>
          <ListItem style={styles.listItemStyle} icon>
            <Left>
              <Icon active name="paper" />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text>Feedback</Text>
            </Body>
          </ListItem>
          <ListItem
            style={styles.listItemStyle}
            onPress={() => this.handleSignOut()}
            icon
          >
            <Left>
              <Icon active name="power" />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text>Signout</Text>
            </Body>
          </ListItem>
        </Content>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1
  },
  listItemStyle: {
    borderBottomColor: "#ffffff",
    marginBottom: "20rem"
  }
});
const mapStateToProps = ({ auth }) => {
  const { userId, userData } = auth;
  //const { userData } = profileSetup;
  return { userId, userData };
};

export default connect(
  mapStateToProps,
  { logout }
)(HamburgerMenuScreen);
