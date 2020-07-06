import React, { Component } from "react";
import { View, Text } from "react-native";
import { Form, Content, Label, Input, Item, Button } from "native-base";

class ForgotPasswordScreen extends Component {
  static navigationOptions = {
    title: "Forgot Password"
  };
  render() {
    return (
      <View style={styles.containerStyles}>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>
            Enter the email associated with your account
          </Text>
        </View>
        <Content>
          <Form>
            <Item rounded style={{ marginBottom: 15, borderColor: "#000" }}>
              <Input placeholder="Email" placeholderStyle={{ color: "#fff" }} />
            </Item>

            <Button block style={styles.btnStyle}>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                Submit
              </Text>
            </Button>
          </Form>
          <Button
            transparent
            style={{ alignSelf: "center" }}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={{ color: "#000", fontSize: 15 }}>Login</Text>
          </Button>
        </Content>
      </View>
    );
  }
}

const styles = {
  containerStyles: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "15%",
    paddingLeft: 5,
    paddingRight: 5
  },
  textStyle: {
    color: "#000",
    fontSize: 15,

    alignSelf: "center"
  },
  btnStyle: {
    height: 50,
    borderRadius: 2,
    backgroundColor: "#44a4f7",
    marginTop: 30,
    marginBottom: 15
  },
  textContainer: {
    marginBottom: 30
  }
};

export default ForgotPasswordScreen;
