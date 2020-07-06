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

const JoinContestSection = props => {
  return (
    <Content>
      <View style={styles.categoryContainerStyle}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <Text style={styles.textStyle}>
            By participating in this contest you agree to our
            <Text style={{color: '#44a4f7'}}>
              {' '}
              Terms and Conditions and Contest Rules.{' '}
            </Text>
            Here are <Text style={{color: '#44a4f7'}}> tips </Text>
            to enable you win the award.
          </Text>
        </View>
        <Button
          onPress={() => props.handleJoinContest()}
          style={styles.publishButtonStyle}>
          <Text style={{color: '#ffffff'}}>Continue</Text>
        </Button>
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

  publishButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '45rem',
    marginTop: '29rem',
    backgroundColor: '#44a4f7',
    alignSelf: 'center',
    marginBottom: '30rem',
  },
});

export default JoinContestSection;
