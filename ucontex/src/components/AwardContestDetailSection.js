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

const AwardContestDetailSection = ({singleContestData}) => {
  return (
    <Content>
      <View style={styles.categoryContainerStyle}>
        <View
          style={{
            // flexDirection: "row",
            // alignSelf: "center",
            // alignItems: "center",
            marginBottom: 30,
          }}>
          <Text style={{fontWeight: '800', fontSize: 17}}>
            ₦{singleContestData[0].amount} Award
          </Text>
        </View>
        <View style={styles.pannelStyles}>
          <Image
            source={require('../assets/trophy.png')}
            resizeMode="cover"
            style={styles.awardImageStyle}
          />
          <Text style={{color: '#454f63'}}>Ist First Award</Text>
          <View style={styles.innerPannelStyle}>
            <Text style={{color: '#ffffff'}}>
              ₦{singleContestData[0].firstPositionAmount}
            </Text>
          </View>
        </View>
        <View style={styles.pannelStyles}>
          <Image
            source={require('../assets/trophySec.png')}
            resizeMode="cover"
            style={styles.awardImageStyle}
          />
          <Text style={{color: '#454f63'}}>2nd place Award</Text>
          <View style={styles.innerPannelStyle}>
            <Text style={{color: '#ffffff'}}>
              ₦{singleContestData[0].secondPositionAmount}
            </Text>
          </View>
        </View>
        <View style={styles.pannelStyles}>
          <Image
            source={require('../assets/award.png')}
            resizeMode="cover"
            style={styles.awardImageStyle}
          />
          <Text style={{color: '#454f63'}}>3rd place Award</Text>
          <View style={styles.innerPannelStyle}>
            <Text style={{color: '#ffffff'}}>
              ₦{singleContestData[0].thirdPositionAmount}
            </Text>
          </View>
        </View>
      </View>
    </Content>
  );
};

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
});

export default AwardContestDetailSection;
