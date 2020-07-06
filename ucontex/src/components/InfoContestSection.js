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

const InfoContestSection = ({singleContestData}) => {
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
          <View
            style={[styles.statusIconStyle, {backgroundColor: '#55f976'}]}
          />
          <Text style={{fontWeight: '800'}}>
            {singleContestData[0].category} Promotion
          </Text>
        </View>
        <Text style={{fontWeight: '500'}}>Description</Text>
        <Text style={styles.textStyle}>{singleContestData[0].description}</Text>
      </View>
      <View style={styles.categoryContainerStyle}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <View style={styles.sectionStyle}>
              <Text style={{fontWeight: '500'}}>Number of Winners</Text>
              <Text>3</Text>
            </View>

            <View style={styles.sectionStyle}>
              <Text style={{fontWeight: '500'}}>Status</Text>
              <Text>Available</Text>
            </View>
            <View style={styles.sectionStyle}>
              <Text style={{fontWeight: '500'}}>Restriction</Text>
              {/* <Text>
                <Text style={{ fontWeight: "300" }}>Age:</Text>{" "}
                <Text>15 - 17</Text>
              </Text> */}
              <Text>
                <Text style={{fontWeight: '300'}}>Gender:</Text>{' '}
                <Text>{singleContestData[0].gender}</Text>
              </Text>
            </View>
          </View>

          <View>
            <View style={styles.sectionStyle}>
              <Text style={{fontWeight: '500'}}>Category</Text>
              <Text>{singleContestData[0].category} Promotion</Text>
            </View>

            <View style={styles.sectionStyle}>
              <Text style={{fontWeight: '500'}}>Contest Ends</Text>
              <Text>
                {Moment(singleContestData[0].endDate).format(
                  'Do MMM, YYYY by hha',
                )}
              </Text>
            </View>
            <View style={styles.sectionStyle}>
              <Text style={{fontWeight: '500'}}>Start Date</Text>

              <Text style={{fontWeight: '300'}}>
                {Moment(singleContestData[0].createdAt).format(
                  'Do MMM, YYYY by hha',
                )}
              </Text>
            </View>
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
});

export default InfoContestSection;
