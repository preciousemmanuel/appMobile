import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Item, Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';
import ProfilePicture from './ProfilePicture';

import {STATUS_BAR} from '../config';

class NewsFeedNavSection extends Component {
  render() {
    //  console.log(this.props);
    const {
      renderIcon,
      getLabelText,
      activeTintColor,
      inactiveTintColor,
      onTabPress,
      onTabLongPress,
      getAccessibilityLabel,
      navigation,
    } = this.props;

    const {routes, index: activeRouteIndex} = navigation.state;

    const {
      containerStyle,
      headerContainerStyle,
      searchContainerStyle,
      searchItemStyle,
      logoImageStyle,
      tabContainerStyle,
      logoNetImageStyle,
    } = styles;
    return (
      <View style={containerStyle}>
        <View style={headerContainerStyle}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('NewsFeed')}>
            <View style={styles.shadowStyle}>
              <Image
                style={logoNetImageStyle}
                source={require('../assets/icon.png')}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => navigation.navigate('SearchUser')}>
            <View style={searchItemStyle}>
              <Icon
                style={{color: '#44a4f7', fontSize: 15, fontWeight: '600'}}
                name="search"
              />
              {/* <Input placeholderTextColor="#44a4f7" placeholder="Search" /> */}
              <Text style={styles.searchTextStyle}>Search</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.shadowStyle}>
            <ProfilePicture
              onPress={() =>
                this.props.navigation.navigate('UsersProfile', {
                  user: this.props.userId,
                })
              }
              style={styles.logoNetImageStyle}
              profilePictures={
                this.props.userData.data.userData.profilePictures
              }
            />
          </View>
        </View>
        <View style={tabContainerStyle}>
          {routes.map((route, routeIndex) => {
            const isRouteActive = routeIndex === activeRouteIndex;
            const tintColor = isRouteActive
              ? activeTintColor
              : inactiveTintColor;
            return route.key === 'NewsFeed' ? null : (
              <TouchableOpacity
                key={routeIndex}
                // style={S.tabButton}
                onPress={() => {
                  onTabPress({route});
                }}
                onLongPress={() => {
                  onTabLongPress({route});
                }}
                accessibilityLabel={getAccessibilityLabel({route})}>
                {renderIcon({route, focused: isRouteActive, tintColor})}

                {/* <Text>{getLabelText({ route })}</Text> */}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerStyle: {
    //  marginTop: Platform.OS == 'ios' ? 0 : STATUS_BAR,
  },
  headerContainerStyle: {
    width: '100%',
    height: '60rem',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingLeft: '16rem',
    paddingRight: '16rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainerStyle: {
    // padding: "4rem"
  },
  searchItemStyle: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.21,
    shadowRadius: 3,
    elevation: 2,
    width: '220rem',
    height: '30rem',
    // borderWidth: "1rem",
    // borderColor: "#44a4f7",
    flexDirection: 'row',
    borderRadius: '12rem',
    backgroundColor: '#ffffff',
    padding: '7rem',
  },
  searchTextStyle: {
    color: '#44a4f7',
    fontWeight: '500',
    marginLeft: '12rem',
    fontSize: '13rem',
  },
  logoImageStyle: {
    width: '40rem',
    height: '40rem',
    borderRadius: '75rem',
  },
  logoNetImageStyle: {
    width: '40rem',
    height: '40rem',
  },
  tabContainerStyle: {
    width: '100%',
    height: '65rem',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {width: 0, height: -3},
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  shadowStyle: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.23,
    shadowRadius: 5,
    elevation: 4,
    backgroundColor: '#ffffff',
    //  backgroundColor: "#f3f3f3",
    width: '40rem',
    height: '40rem',
    borderRadius: '75rem',
  },
});
const mapStateToProps = ({auth}) => {
  //const { userData } = profileSetup;
  const {userId, userData} = auth;
  // console.log("prof", userData);
  return {userData, userId};
};
export default connect(mapStateToProps)(NewsFeedNavSection);
