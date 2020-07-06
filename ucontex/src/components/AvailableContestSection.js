import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Image
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Icon } from "native-base";

const AvailableContestSection = () => {
  const {
    containerStyle,
    titleContainerStyle,
    showAllTextStyle,
    contentContainerStyle,
    imageStyle,
    bottomImagePanel,
    bottomTextStyle
  } = styles;
  return (
    <View style={containerStyle}>
      <View style={titleContainerStyle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="disc"
            style={{ marginRight: 4, color: "#55f976", fontSize: 10 }}
          />
          <Text>Available Contest</Text>
        </View>

        <TouchableWithoutFeedback>
          <Text style={showAllTextStyle}>See All</Text>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={contentContainerStyle}>
          <Image
            resizeMode="cover"
            source={require("../assets/brand.png")}
            style={imageStyle}
          />
          <View style={bottomImagePanel}>
            <Text style={bottomTextStyle}>$1k</Text>
            <TouchableWithoutFeedback>
              <Text style={[bottomTextStyle,{color:"#44a4f7"}]}>Join</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={contentContainerStyle}>
          <Image
            resizeMode="cover"
            source={require("../assets/brand.png")}
            style={imageStyle}
          />
          <View style={bottomImagePanel}>
            <Text style={bottomTextStyle}>$1k</Text>
            <TouchableWithoutFeedback>
              <Text style={[bottomTextStyle,{color:"#44a4f7"}]}>Join</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={contentContainerStyle}>
          <Image
            resizeMode="cover"
            source={require("../assets/brand.png")}
            style={imageStyle}
          />
          <View style={bottomImagePanel}>
            <Text style={bottomTextStyle}>$1k</Text>
            <TouchableWithoutFeedback>
              <Text style={[bottomTextStyle,{color:"#44a4f7"}]}>Join</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={contentContainerStyle}>
          <Image
            resizeMode="cover"
            source={require("../assets/brand.png")}
            style={imageStyle}
          />
          <View style={bottomImagePanel}>
            <Text style={bottomTextStyle}>$1k</Text>
            <TouchableWithoutFeedback>
              <Text style={[bottomTextStyle,{color:"#44a4f7"}]}>Join</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={contentContainerStyle}>
          <Image
            resizeMode="cover"
            source={require("../assets/brand.png")}
            style={imageStyle}
          />
          <View style={bottomImagePanel}>
            <Text style={bottomTextStyle}>$1k</Text>
            <TouchableWithoutFeedback>
              <Text style={[bottomTextStyle,{color:"#44a4f7"}]}>Join</Text>
            </TouchableWithoutFeedback>
          </View>
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
    paddingTop: "14rem",
    marginBottom: "10rem"
  },
  showAllTextStyle: {
    paddingLeft: "140rem",
    color: "#959ca7"
  },
  contentContainerStyle: {
    height: "185rem",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.22,
    elevation: 4,
    backgroundColor: "#ffffff",
    width: "136rem",
    marginRight: "10rem"
  },
  imageStyle: {
    width: "100%",
    height: "155rem"
  },
  bottomImagePanel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10rem"
  },
  bottomTextStyle: {
    fontSize: "10rem",
    fontWeight: "300",
    color: "#686767",
    fontWeight:"800"
  }
});

export default AvailableContestSection;
