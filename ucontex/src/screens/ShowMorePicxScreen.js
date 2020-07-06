import React, {Component} from 'react';
import {
  Text,
  View,
  Platform,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import {Header, Left, Button, Icon, Body, Title} from 'native-base';

import ScaleImage from 'react-native-scalable-image';
import EStyleSheet from 'react-native-extended-stylesheet';

import ProgressiveRoundImage from '../components/ProgressiveRoundImage';

import {STATUS_BAR} from '../config';

const SCREEN_WIDTH = Dimensions.get('window').width;
class ShowMorePicxScreen extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   header: () => {
  //     return (
  //       <View>
  //         <Text>sds</Text>
  //       </View>
  //     );
  //   };
  // };

  renderProfileImage = profilePicture => {
    //console.log("edss", this.props.userData);
    if (profilePicture.length > 0) {
      let numberOfPicx = profilePicture.length;
      return (
        <ProgressiveRoundImage
          resizeMode="cover"
          style={styles.profileImageStyle}
          source={{
            uri: profilePicture[numberOfPicx - 1].url,
          }}
        />
      );
    } else {
      return (
        <Image
          resizeMode="cover"
          source={require('../assets/user.png')}
          style={styles.profileImageStyle}
        />
      );
    }
  };

  renderMedia(data) {
    //const { data } = this.props.selectedMedia;
    return data.map((media, index) => {
      return (
        <View key={index}>
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              marginBottom: 6,
              paddingRight: 8,
            }}>
            <Button transparent>
              <Icon style={{color: '#686767'}} name="download" />
            </Button>
          </View>
          <ScaleImage width={SCREEN_WIDTH} source={{uri: media.url}} />
        </View>
      );
    });
  }
  render() {
    console.log('gethjhj', this.props.navigation.getParam('data'));
    const data = this.props.navigation.getParam('data');
    return (
      <View>
        <Header
          style={{
            //marginTop: Platform.OS == 'ios' ? 0 : STATUS_BARt,
            backgroundColor: '#fff',
          }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack(null)}>
              <Icon style={{color: '#44a4f7'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={{color: '#44a4f7'}}>
              {data.owner.firstName + ' Post'}
            </Text>
          </Body>
        </Header>
        <ScrollView>
          <View style={{marginTop: 10}}>
            <View style={styles.containerImageContainer}>
              {this.renderProfileImage(data.owner.profilePictures)}
              <Text style={styles.titleStyle}>{data.message}</Text>
            </View>

            {this.renderMedia(data.images)}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerImageContainer: {
    paddingLeft: '17rem',
    paddingBottom: '9rem',
  },
  titleStyle: {
    marginTop: '8rem',
  },
  profileImageStyle: {
    width: '46rem',
    height: '46rem',
  },
});

// const mapStateToProps = ({ feed }) => {
//   const { selectedMedia } = feed;
//   return { selectedMedia };
// };
export default ShowMorePicxScreen;
