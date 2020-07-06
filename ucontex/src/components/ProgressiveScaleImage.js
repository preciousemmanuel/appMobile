import React, { Component } from "react";
import { View, Text, Image, Animated } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import ScaleImage from "react-native-scalable-image";

class ProgressiveScaleImage extends Component {
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
      <View style={[this.props.containerStyle, styles.containerStyle]}>
        <ScaleImage
          {...this.props}
          source={this.props.thumbnail}
          // style={[this.props.style, { opacity: this.thumbnailAnimated }]}
          blurRadius={2}
          // onLoad={this.handleThumbnailLoad}
        />
        <ScaleImage
          {...this.props}
          width={this.props.width}
          source={this.props.source}
          style={[styles.imageOverlay]}
          // onLoadStart={this.onImageLoad}
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
export default ProgressiveScaleImage;
