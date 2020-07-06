import React, {PureComponent} from 'react';
import {
  Text,
  View,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Header, Left, Button, Icon} from 'native-base';
import {RNCamera} from 'react-native-camera';

import EStyleSheet from 'react-native-extended-stylesheet';

class Camera extends PureComponent {
  state = {
    toggleMoreButton: false,
    type: RNCamera.Constants.Type.back,
    toggleCameraType: false,
    photo: null,
  };

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      //this.props.choosePostMedia(data.uri);
      this.setState({
        photo: data.uri,
      });

      this.props.callback(this.state.photo);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                toggleCameraType: !this.state.toggleCameraType,
              });
            }}
            style={[styles.capture, {marginTop: 7}]}>
            <Icon name="camera" style={{color: '#ffffff'}} />
          </TouchableOpacity>
        </View>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={
            this.state.toggleCameraType
              ? RNCamera.Constants.Type.front
              : RNCamera.Constants.Type.back
          }
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Icon name="camera" style={{color: '#ffffff', fontSize: 53}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'transparent',
    // borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  titleStyle: {
    paddingTop: '17rem',
    paddingLeft: '17rem',
    paddingBottom: '9rem',
  },
});

export default Camera;
