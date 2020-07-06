import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Provider} from 'react-redux';
import RNPaystack from 'react-native-paystack';
import EStyleSheet from 'react-native-extended-stylesheet';
import {PersistGate} from 'redux-persist/integration/react';
import {enableScreens} from 'react-native-screens';
import MainNavigation from './src/navigation/MainNavigation';

import {store, persistor} from './src/stores';

const entireScreenWidth = Dimensions.get('window').width;
RNPaystack.init({
  publicKey: 'pk_test_b0372f521e9e5c336e3d20e7878ed47930b59854',
});
EStyleSheet.build({$rem: entireScreenWidth / 380});

EStyleSheet.build({
  $mainColor: '#44a4f7',
});
enableScreens();
export default class App extends React.Component {
  renderLoading = () => {
    return (
      <View style={{flex: 1}}>
        <ActivityIndicator size="large" />
      </View>
    );
  };
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={this.renderLoading()}>
          <MainNavigation />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
