import React from 'react';

import EStyleSheet from 'react-native-extended-stylesheet';
import {Image, TouchableWithoutFeedback} from 'react-native';

import ProgressiveRoundImage from './ProgressiveRoundImage';
import FastImage from 'react-native-fast-image';

const ProfilePicture = props => {
  const {profilePictures, onPress, style} = props;
  if (profilePictures.length > 0) {
    let numberOfPicx = profilePictures.length;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <ProgressiveRoundImage
          resizeMode="cover"
          style={[styles.profileImageStyle, style]}
          thumbnail={require('../assets/placeholder.png')}
          source={{
            uri: profilePictures[numberOfPicx - 1].url,
          }}
        />
      </TouchableWithoutFeedback>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        source={require('../assets/user.png')}
        style={[styles.profileImageStyle, style]}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = EStyleSheet.create({
  profileImageStyle: {
    width: '46rem',
    height: '46rem',
    marginRight: '18rem',
  },
});

export default ProfilePicture;
