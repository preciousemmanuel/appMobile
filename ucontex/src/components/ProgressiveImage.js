import React, { Component } from "react";
import { View, Text, Image, Animated } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

class ProgressiveImage extends Component {
  thumbnailAnimated = new Animated.Value(0);

  imageAnimated = new Animated.Value(0);

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1
    }).start();
  };

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1
    }).start();
  };

  render() {
    //console.log("pppp", this.props);
    return (
      <View style={styles.containerStyle}>
        <Animated.Image
          {...this.props}
          source={this.props.thumbnail}
          style={[this.props.style, { opacity: this.thumbnailAnimated }]}
          blurRadius={2}
          onLoad={this.handleThumbnailLoad}
        />
        <Animated.Image
          {...this.props}
          source={this.props.source}
          style={[
            styles.imageOverlay,
            { opacity: this.imageAnimated },
            this.props.style
          ]}
          onLoad={this.onImageLoad}
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyle: {
    backgroundColor: "#e1e4e8"
  },
  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
});
export default ProgressiveImage;
