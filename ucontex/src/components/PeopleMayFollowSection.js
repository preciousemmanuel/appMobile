import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Icon, Button } from "native-base";
import ProgressiveRoundImage from "./ProgressiveRoundImage";

const PeopleMayFollowSection = () => {
  const {
    containerStyle,
    titleContainerStyle,
    showAllTextStyle,
    contentContainerStyle,
    imageStyle,
    imageContainerStyle,
    bottomImagePanel,
    bottomTextStyle,
    nameStyle,
    followButtonStyle,
    followTypeStyle,
    removeButtonStyle,
    closeIconStyle
  } = styles;
  return (
    <View style={containerStyle}>
      <View style={titleContainerStyle}>
        <Text>Who You May Follow</Text>

        <TouchableWithoutFeedback>
          <Text style={showAllTextStyle}>See All</Text>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ marginLeft: 10 }}>
          <View style={contentContainerStyle}>
            <View style={styles.containerPanelStyle}>
              <ProgressiveRoundImage
                thumbnail={require("../assets/placeholder.png")}
                resizeMode="cover"
                source={require("../assets/brand.png")}
                style={imageStyle}
              />
              <Text style={nameStyle}>Mary</Text>
              <Text style={followTypeStyle}>Follows You</Text>
              <Button style={followButtonStyle}>
                <Text style={{ color: "#fff" }}>Follow Back</Text>
              </Button>
            </View>
            <TouchableOpacity style={removeButtonStyle}>
              <Icon name="close" style={closeIconStyle} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={contentContainerStyle}>
          <View style={styles.containerPanelStyle}>
            <ProgressiveRoundImage
              thumbnail={require("../assets/placeholder.png")}
              resizeMode="cover"
              source={require("../assets/brand.png")}
              style={imageStyle}
            />
            <Text style={nameStyle}>Mary</Text>
            <Text style={followTypeStyle}>Follows You</Text>
            <Button style={followButtonStyle}>
              <Text style={{ color: "#fff" }}>Follow Back</Text>
            </Button>
          </View>
          <TouchableOpacity style={removeButtonStyle}>
            <Icon name="close" style={closeIconStyle} />
          </TouchableOpacity>
        </View>

        <View style={contentContainerStyle}>
          <View style={styles.containerPanelStyle}>
            <ProgressiveRoundImage
              thumbnail={require("../assets/placeholder.png")}
              resizeMode="cover"
              source={require("../assets/brand.png")}
              style={imageStyle}
            />
            <Text style={nameStyle}>Mary</Text>
            <Text style={followTypeStyle}>Follows You</Text>
            <Button style={followButtonStyle}>
              <Text style={{ color: "#fff" }}>Follow Back</Text>
            </Button>
          </View>
          <TouchableOpacity style={removeButtonStyle}>
            <Icon name="close" style={closeIconStyle} />
          </TouchableOpacity>
        </View>

        <View style={contentContainerStyle}>
          <View style={styles.containerPanelStyle}>
            <ProgressiveRoundImage
              thumbnail={require("../assets/placeholder.png")}
              resizeMode="cover"
              source={require("../assets/brand.png")}
              style={imageStyle}
            />
            <Text style={nameStyle}>Mary</Text>
            <Text style={followTypeStyle}>Follows You</Text>
            <Button style={followButtonStyle}>
              <Text style={{ color: "#fff" }}>Follow Back</Text>
            </Button>
          </View>
          <TouchableOpacity style={removeButtonStyle}>
            <Icon name="close" style={closeIconStyle} />
          </TouchableOpacity>
        </View>

        <View style={contentContainerStyle}>
          <View style={styles.containerPanelStyle}>
            <ProgressiveRoundImage
              thumbnail={require("../assets/placeholder.png")}
              resizeMode="cover"
              source={require("../assets/brand.png")}
              style={imageStyle}
            />
            <Text style={nameStyle}>Mary</Text>
            <Text style={followTypeStyle}>Follows You</Text>
            <Button style={followButtonStyle}>
              <Text style={{ color: "#fff" }}>Follow Back</Text>
            </Button>
          </View>
          <TouchableOpacity style={removeButtonStyle}>
            <Icon name="close" style={closeIconStyle} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  containerStyle: {
    height: "259rem",
    width: "100%",
    alignItems: "center",
    padding: "7rem"
  },
  titleContainerStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "12rem",
    paddingRight: "12rem",
    paddingTop: "14rem"
  },
  showAllTextStyle: {
    paddingLeft: "140rem",
    color: "#959ca7"
  },
  contentContainerStyle: {
    height: "185rem",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.23,
    shadowRadius: 5,
    elevation: 4,
    backgroundColor: "#ffffff",
    width: "136rem",
    marginRight: "5rem",
    padding: "16rem",
    marginTop: "15rem"
  },
  imageStyle: {
    width: "70rem",
    height: "70rem"
    // paddingTop: "7rem",
    //borderRadius: "75rem"
  },
  containerPanelStyle: {
    alignItems: "center",
    paddingTop: "7rem"
  },
  nameStyle: {
    paddingTop: "10rem",
    color: "#000",
    fontSize: "15rem",
    fontWeight: "800",
    lineHeight: "20rem"
  },
  followTypeStyle: {
    fontSize: "12rem",
    fontWeight: "500",
    lineHeight: "20rem",
    marginTop: "4rem"
  },
  followButtonStyle: {
    width: "110rem",
    height: "30rem",
    borderRadius: "5rem",
    backgroundColor: "#44a4f7",
    marginTop: "4rem",
    justifyContent: "center",
    alignItems: "center"
  },
  removeButtonStyle: {
    position: "absolute",
    top: "7rem",
    right: "7rem",
    width: "13rem",
    height: "13rem"
  },
  closeIconStyle: {
    color: "#707070",
    fontSize: "15rem"
  }
});

export default PeopleMayFollowSection;
