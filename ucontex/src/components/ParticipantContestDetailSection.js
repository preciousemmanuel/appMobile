import React, {Component} from 'react';
import {
  Text,
  View,
  Platform,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Textarea,
  Item,
  Picker,
  Right,
  ListItem,
  Tab,
  Tabs,
  TabHeading,
  Container,
  Content,
  ScrollableTab,
} from 'native-base';
import Modal from 'react-native-modal';

import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Moment from 'moment';

import ProgressiveRoundImage from './ProgressiveRoundImage';
import {fetchParticipants} from '../actions';

class ParticipantContestDetailSection extends Component {
  renderProfileImage = user => {
    // console.log("edss", user);
    if (user.profilePictures.length > 0) {
      let numberOfPicx = user.profilePictures.length;
      return (
        <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.navigate('UsersProfile', {
              user: user.id,
            })
          }>
          <ProgressiveRoundImage
            resizeMode="cover"
            style={styles.profileImageStyle}
            source={{
              uri: user.profilePictures[numberOfPicx - 1].url,
            }}
          />
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            //  console.log("dfg", user.id);
            this.props.navigation.navigate('UsersProfile', {
              user: user.id,
            });
          }}>
          <Image
            resizeMode="cover"
            source={require('../assets/user.png')}
            style={styles.profileImageStyle}
          />
        </TouchableWithoutFeedback>
      );
    }
  };

  render() {
    const {item} = this.props;
    return (
      <View style={styles.itemContainerStyle}>
        <TouchableWithoutFeedback
          onPress={() => {
            //console.log("dfg", this.props.item.id);
            this.props.navigation.navigate('UsersProfile', {
              user: item.id,
            });
          }}>
          <View style={{flexDirection: 'row'}}>
            {this.renderProfileImage(item)}
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: '#000000', fontWeight: '800'}}>
                {`${item.firstName} ${item.lastName}`}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  textStyle: {
    lineHeight: '20rem',
  },
  sectionStyle: {
    marginBottom: '30rem',
  },

  participantsContainerStyle: {
    padding: '17rem',
  },
  categoryContainerStyle: {
    padding: '13rem',
    minHeight: '200rem',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    backgroundColor: '#ffffff',
    elevation: 2,
    marginTop: '5rem',
  },
  statusIconStyle: {
    width: '8rem',
    height: '8rem',
    borderRadius: '75rem',
    marginRight: '4rem',
    marginTop: '3rem',
  },
  textStyle: {
    lineHeight: '20rem',
  },
  pannelStyles: {
    width: '100%',
    height: '60rem',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: '#ffffff',
    marginBottom: '30rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerPannelStyle: {
    width: '67rem',
    height: '61rem',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 3, height: 0},
    shadowRadius: 6,
    borderRadius: 5,
    backgroundColor: '#44a4f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  awardImageStyle: {
    height: '60rem',
  },
  profileImageStyle: {
    width: '50rem',
    height: '50rem',
    marginRight: '12rem',
  },
  itemContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '22rem',
  },
});

const mapStateToProps = ({auth, contest}) => {
  const {userId, token} = auth;
  return {userId, token};
};
export default connect(mapStateToProps)(ParticipantContestDetailSection);
