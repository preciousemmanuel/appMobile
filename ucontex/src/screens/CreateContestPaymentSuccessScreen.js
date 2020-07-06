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
  Easing,
  Animated,
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
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScaleImage from 'react-native-scalable-image';
import Moment from 'moment';
// import { publishPost } from "../actions";
//import ProgressiveRoundImage from "../components/ProgressiveRoundImage";
import {STATUS_BAR} from '../config';

const SCREEN_WIDTH = Dimensions.get('window').width;
class CreateContestPaymentSuccessScreen extends Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.animateIcon();
  }

  animateIcon() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 1,
      tension: 1,
    }).start();
  }

  render() {
    //console.log("gethjhj", this.props.selectedMedia);
    const {
      containerStyle,
      titleStyle,
      postContainerStyle,
      profileTitleNameStyle,
      headerStyle,
      profileImageStyle,
      headerTitleStyle,
      publishButtonStyle,
      firstPanelStyle,
    } = styles;

    // const scaleImage = this.animatedValue.interpolate([
    //   {
    //     inputRange: [0, 1],
    //     outputRange: [5, 1]
    //   }
    // ]);

    return (
      <View style={containerStyle}>
        <Header
          style={{
            //marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
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
            <Text style={headerTitleStyle}>Payment</Text>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Contest')}>
              <Text style={{color: '#44a4f7'}}>Finish</Text>
            </Button>
          </Right>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainerStyle}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Animated.Image
                source={require('../assets/checked.png')}
                resizeMode="cover"
                style={[
                  styles.successIconStyle,
                  {transform: [{scale: this.animatedValue}]},
                ]}
              />
              <Text style={titleStyle}>Payment is successful</Text>
            </View>

            <View style={styles.contentStyle}>
              <Text>
                Your brand promotional contest has been created successfully.
              </Text>
              <Text style={{marginTop: 10}}>
                Contest will end one month from now.
              </Text>
            </View>

            <Button
              onPress={() => this.props.navigation.navigate('Contest')}
              style={styles.publishButtonStyle}>
              <Text style={{color: '#ffffff'}}>Finish</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  contentContainerStyle: {
    marginTop: '35rem',
    paddingLeft: '15rem',
    paddingRight: '15rem',
    paddingBottom: '90rem',
  },
  titleStyle: {
    color: '#000000',
    fontSize: '20rem',
    fontWeight: '800',
  },

  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageStyle: {
    alignSelf: 'stretch',
    borderRadius: '75rem',
    width: '46rem',
    height: '46rem',
    marginRight: '15rem',
  },
  profileImageNetStyle: {
    width: '46rem',
    height: '46rem',
    marginRight: '15rem',
  },
  profileTitleNameStyle: {
    fontSize: '15rem',
    color: '#000',
    fontWeight: '800',
  },
  categoryTitleStyle: {
    color: '#ababab',
    // fontFamily: "Avenir",
    fontSize: '12rem',
    fontWeight: '500',
  },
  headerTitleStyle: {
    color: '#44a4f7',
    fontSize: '18rem',
    fontWeight: '500',
    lineHeight: '20rem',
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
  firstPanelStyle: {
    paddingLeft: '18rem',
    paddingRight: '18rem',
    marginBottom: '10rem',
  },
  statusIconStyle: {
    width: '8rem',
    height: '8rem',
    borderRadius: '75rem',
    marginRight: '4rem',
    marginTop: '3rem',
  },
  titleBrandStyles: {
    marginTop: '35rem',
    marginBottom: '15rem',
    color: '#000000',
    fontSize: '15rem',
    fontWeight: '800',
  },
  joinButtonStyle: {
    width: '60rem',
    height: '25rem',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#44a4f7',
    alignSelf: 'center',
  },
  otherContainerStyle: {
    padding: '14rem',
  },
  successIconStyle: {
    // alignSelf: "center",
    width: '60rem',
    height: '60rem',
    marginBottom: '10rem',
  },
  contentStyle: {
    marginTop: '72rem',
  },
});

const mapStateToProps = ({contest}) => {
  const {
    contestMedia,
    title,
    description,
    contestAmount,
    category,
    contestEndDate,
  } = contest;
  // const { userData } = profileSetup;
  // const { userId, token } = auth;
  console.log('date', contestEndDate);
  return {
    // contestMedia,
    // title,
    // description,
    // contestAmount,
    // category,
    //  userData,
    contestEndDate,
  };
};
export default connect(mapStateToProps)(CreateContestPaymentSuccessScreen);
