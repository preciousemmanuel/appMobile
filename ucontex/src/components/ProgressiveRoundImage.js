import React, {Component} from 'react';
import {View, Image, Animated, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import FastImage from 'react-native-fast-image';

// const isIos = Platform.ios == "ios";
// const isAndroidLollipop = Platform.Version >= 21 && Platform.Version < 23;

class ProgressiveRoundImage extends Component {
  render() {
    return (
      <View style={[this.props.style, styles.imageContainerStyle]}>
        <FastImage
          {...this.props}
          resizeMode={FastImage.resizeMode.cover}
          source={this.props.source}
          style={[
            styles.imageOverlay,
            this.props.style,
            styles.overideMarginTop,
          ]}
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyle: {
    backgroundColor: '#e1e4e8',
    // borderRadius: "75rem"
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  imageContainerStyle: {
    backgroundColor: '#e1e4e8',
    borderRadius: '75rem',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overideMarginTop: {
    marginTop: '0rem',
    marginRight: '0rem',
    borderWidth: '0rem',
  },
  iosImageStyle: {
    borderRadius: '75rem',
    marginTop: '0rem',
    marginRight: '0rem',
  },
  iosImageContainerStyle: {
    borderRadius: '75rem',
    backgroundColor: '#e1e4e8',
    borderWidth: '0rem',
  },
});
export default ProgressiveRoundImage;
