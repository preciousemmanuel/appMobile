import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'native-base';
import Socket from 'sails-socket';
import {BASE_URL} from '../config';
import {connect} from 'react-redux';
class AppNotificationScreen extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: "ddd",
  //     tabBarIcon: ({ tintColor }) => {
  //       return <Icon name="search" size={30} color={tintColor} />;
  //     }
  //   };
  // };
  componentDidMount() {
    const initializeParams = {url: BASE_URL};
    headers = {token: this.props.token};
    Socket.connect(initializeParams);
    Socket.setHeader(headers);
    console.log('Sails Connections');

    Socket.get(
      `/notifications/subscribe?userId=${this.props.userId}`,
      (data, jwr) => {
        console.log('Response => ', data, jwr);
      },
    );
    Socket.on('notification', data => {
      console.log(data);
    });
  }
  render() {
    return (
      <View>
        <Text>Notificatiion screen</Text>
      </View>
    );
  }
}
const mapStateToProps = ({auth}) => {
  //const { userData } = profileSetup;
  const {userId, token} = auth;
  // console.log("media", postMedia);
  return {
    userId,
    token,
  };
};
export default connect(mapStateToProps)(AppNotificationScreen);
