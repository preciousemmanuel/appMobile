import React, { Component } from "react";
import { View, Image, FlatList, Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

import ProgressiveImage from "./ProgressiveImage";

const images = [
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c9004ef972a0.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5cad4e3bdda3390017208b641.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f57fb9a6e520004101a370.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f57fb9a6e520004101a371.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  },
  {
    profileImages:
      "https://s3.amazonaws.com/ucontex-profile-bucket/profilePictures/5c9f4d3c94e8c90004ef972a1.jpg"
  }
];

class ProfileGallery extends Component {
  renderImages = ({ item, index }) => {
    // console.log("pp", item);
    return (
      <View key={index} style={styles.itemStyle}>
        <ProgressiveImage
          resizeMode="cover"
          style={styles.imageStyle}
          source={{ uri: item.profileImages }}
          thumbnail={require("../assets/placeholder.png")}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.containerStyle}>
        <FlatList
          contentContainerStyle={{ flex: 1 }}
          nestedScrollEnabled={true}
          data={images}
          renderItem={this.renderImages}
          horizontal={false}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          // onTouchStart={this.props.onTouchStarts}
          // onMomentumScrollEnd={this.props.onMomentumScrollEnds}
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,

    marginTop: "5rem"
  },
  itemStyle: {
    // width: Dimensions.get("window").width / 3,
    // height: "128rem",
    // marginRight: "1rem"
  },
  imageStyle: {
    width: Dimensions.get("window").width / 3,
    height: "128rem",
    marginRight: "1rem"
  }
});

export default ProfileGallery;
