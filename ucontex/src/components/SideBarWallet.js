import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Platform} from 'react-native';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {STATUS_BAR} from '../config';

import {colour} from '../config';

class SideBarWallet extends Component {
  navLink(nav, text) {
    return (
      <TouchableOpacity
        style={{height: 30, marginBottom: 40}}
        onPress={() => this.props.navigation.navigate(nav)}>
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colour.MAIN_COLOR,
          marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
        }}>
        <ScrollView>
          <View style={{padding: 15, paddingTop: 18}}>
            <View style={styles.firstPanelStyle}>
              <Text style={{color: '#ffffff', fontWeight: '800'}}>
                Wallet ID:
              </Text>
              <Text style={styles.emailTextStyle}>
                {this.props.userData.data.userData.email}
              </Text>
            </View>
            <View>
              {this.navLink('WalletHome', 'Home')}
              {this.navLink('FundTransferBank', 'Transfer')}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  emailTextStyle: {
    color: '#ffffff',
    fontSize: '15rem',
    fontWeight: '800',
  },
  firstPanelStyle: {
    borderBottomWidth: '1rem',
    borderBottomColor: '#ffffff',
    paddingBottom: '10rem',
    marginBottom: '45rem',
  },
  link: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: '20rem',
  },
});
const mapStateToProps = ({profileSetup}) => {
  const {userData} = profileSetup;
  return {userData};
};

export default connect(mapStateToProps)(SideBarWallet);
