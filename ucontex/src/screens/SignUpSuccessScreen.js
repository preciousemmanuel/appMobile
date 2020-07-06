import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, List, ListItem, Left, Right, Icon } from "native-base";
import EStyleSheet from "react-native-extended-stylesheet";

class signUpSuccessScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Ucontex",
      headerRight: (
        <Button
          transparent
          style={styles.headerRightStyle}
          onPress={() => navigation.navigate("ChooseProfilePic")}
        >
          <Text style={{ color: "#44a4f7" }}>Skip</Text>
        </Button>
      )
    };
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.containerStyle}>
          <View style={styles.titleStyle}>
            <Text>
              Your account has been created successfully, you have received 20
              Utex.
            </Text>
          </View>
          <List>
            <ListItem style={styles.itemStyle}>
              <Left>
                <Text>Quick Guide</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem style={styles.itemStyle}>
              <Left>
                <Text>What is Ucontex</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem style={styles.itemStyle}>
              <Left>
                <Text>What is Utex</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem style={styles.itemStyle}>
              <Left>
                <Text>How to join a Contest</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem style={styles.itemStyle}>
              <Left>
                <Text>How to win a contest</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem style={styles.itemStyle}>
              <Left>
                <Text>How to withdraw money</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
          <Button
            block
            style={styles.btnStyle}
            onPress={() => this.props.navigation.navigate("ChooseProfilePic")}
          >
            <Text style={{ color: "#ffffff" }}>Continue</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: "16rem",
    paddingRight: "16rem",
    paddingTop: "24rem",
    paddingBottom: "30rem"
  },
  btnStyle: {
    backgroundColor: "#44a4f7",
    marginTop: "83rem",
    height: "50rem"
  },
  itemStyle: {
    marginLeft: 0
  },
  titleStyle: {
    marginBottom: "44rem"
  },
  headerRightStyle: {
    paddingTop: "13rem",
    paddingRight: "16rem"
  }
});
export default signUpSuccessScreen;
