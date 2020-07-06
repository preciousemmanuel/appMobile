import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { Icon } from "native-base";
import EStyleSheet from "react-native-extended-stylesheet";
//this is a component that handles people you may know section
//visible in NewsFeed screen and others
const PeopleMayKnowSection = () => {
  const {
    containerStyle,
    titleContainerStyle,
    imageContainerStyle,
    imageStyle,
    imageTitleStyle,
    imageChildStyle,
    showAllTextStyle
  } = styles;
  return (
    <View style={containerStyle}>
      <View style={titleContainerStyle}>
        <Text>Peole You May Know</Text>
        <TouchableWithoutFeedback>
          <Text style={showAllTextStyle}>Show All</Text>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={imageContainerStyle}>
          <View
            style={[
              imageChildStyle,
              { justifyContent: "center", alignItems: "center" }
            ]}
          >
            <Image
              resizeMode="cover"
              source={require("../assets/user.png")}
              style={imageStyle}
            />
            <Text style={imageTitleStyle}>Edward</Text>
          </View>
          <View
            style={[
              imageChildStyle,
              { justifyContent: "center", alignItems: "center" }
            ]}
          >
            <Image
              resizeMode="cover"
              source={require("../assets/user.png")}
              style={imageStyle}
            />
            <Text style={imageTitleStyle}>Edward</Text>
          </View>
          <View
            style={[
              imageChildStyle,
              { justifyContent: "center", alignItems: "center" }
            ]}
          >
            <Image
              resizeMode="cover"
              source={require("../assets/user.png")}
              style={imageStyle}
            />
            <Text style={imageTitleStyle}>Edward</Text>
          </View>
          <View
            style={[
              imageChildStyle,
              { justifyContent: "center", alignItems: "center" }
            ]}
          >
            <Image
              resizeMode="cover"
              source={require("../assets/user.png")}
              style={imageStyle}
            />
            <Text style={imageTitleStyle}>Edward</Text>
          </View>
          <View
            style={[
              imageChildStyle,
              { justifyContent: "center", alignItems: "center" }
            ]}
          >
            <Image
              resizeMode="cover"
              source={require("../assets/user.png")}
              style={imageStyle}
            />
            <Text style={imageTitleStyle}>Edward</Text>
          </View>
          <View
            style={[
              imageChildStyle,
              { justifyContent: "center", alignItems: "center" }
            ]}
          >
            <Image
              resizeMode="cover"
              source={require("../assets/user.png")}
              style={imageStyle}
            />
            <Text style={imageTitleStyle}>Edward</Text>
          </View>
          <View
            style={[
              imageChildStyle,
              { justifyContent: "center", alignItems: "center" }
            ]}
          >
            <Image
              resizeMode="cover"
              source={require("../assets/user.png")}
              style={imageStyle}
            />
            <Text style={imageTitleStyle}>Edward</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  containerStyle: {
    width: "100%",
    height: "135rem",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#959ca7"
  },
  titleContainerStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "12rem",
    paddingRight: "12rem",
    paddingTop: "14rem"
  },
  imageContainerStyle: {
    width: "100%",
    marginTop: "10rem",
    flexDirection: "row"
  },
  imageStyle: {
    alignSelf: "stretch",
    borderRadius: 75,
    width: "70rem",
    height: "70rem",
    paddingBottom: "20rem"
  },
  imageTitleStyle: {
    fontSize: "12rem"
  },
  imageChildStyle: {
    marginRight: "35rem"
  },
  showAllTextStyle: {
    paddingLeft: "140rem",
    color: "#959ca7"
  }
});

export default PeopleMayKnowSection;
