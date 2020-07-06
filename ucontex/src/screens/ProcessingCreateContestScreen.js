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
import {Button} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import {createContest} from '../actions';

class ProcessingCreateContestScreen extends Component {
  componentDidMount() {
    console.log(
      'ProcessingCreateContest',
      this.props.title,
      this.props.description,
      this.props.category,
    );
    this.props.createContest(this.props, () => {
      this.props.navigation.navigate('CreateContestPaymentSuccess');
    });
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
        <Spinner
          visible={this.props.isCreateContest}
          overlayColor="rgba(0, 0, 0, 0.8)"
          color="#ffffff"
          textContent="Preparing Contest..."
          textStyle={{color: '#ffffff'}}
        />
        <Button
          onPress={() => this.props.navigation.navigate('PaystackPayment')}
          style={styles.publishButtonStyle}>
          <Text style={{color: '#ffffff'}}>Go Back</Text>
        </Button>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '200rem',
    height: '45rem',

    backgroundColor: '#44a4f7',
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

const mapStateToProps = ({auth, contest}) => {
  const {
    contestMedia,
    title,
    description,
    contestAmount,
    category,
    website,
    awardType,
    otherAwards,
    firstPositionAmount,
    secondPositionAmount,
    thirdPositionAmount,
    totalAmount,
    contestEndDate,
    transId,
    isCreateContest,
  } = contest;
  //const {userData} = profileSetup;
  const {userId, token} = auth;

  return {
    contestEndDate,
    contestMedia,
    title,
    description,
    contestAmount,
    category,
    website,
    awardType,
    otherAwards,
    firstPositionAmount,
    secondPositionAmount,
    thirdPositionAmount,
    totalAmount,
    userId,
    token,
    transId,
    isCreateContest,
  };
};
export default connect(
  mapStateToProps,
  {createContest},
)(ProcessingCreateContestScreen);
