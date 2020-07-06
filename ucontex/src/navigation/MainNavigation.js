import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import React, {Component} from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {Root, Icon} from 'native-base';

// import {useScreens} from 'react-native-screens';

import {SCREEN_WIDTH} from '../config';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CompleteSignUpScreen from '../screens/CompleteSignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SignUpSuccessScreen from '../screens/SignUpSuccessScreen';
import ChooseProfilePicScreen from '../screens/ChooseProfilePicScreen';
import UpdateCoverPhotoScreen from '../screens/UpdateCoverPhotoScreen';

import ProfileScreen from '../screens/ProfileScreen';
import UsersProfileScreen from '../screens/UsersProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ProfileFollowersScreen from '../screens/ProfileFollowersScreen';
import ProfileFollowingScreen from '../screens/ProfileFollowingScreen';
import UsersNewsFeedScreen from '../screens/UsersNewsFeedScreen';
import UserContestScreen from '../screens/UserContestScreen';

import NewsFeedScreen from '../screens/NewsFeedScreen';
import ShowMorePicxScreen from '../screens/ShowMorePicxScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import PreviewCreatePostScreen from '../screens/PreviewCreatePostScreen';
import PinPeopleScreen from '../screens/PinPeopleScreen';
import CommentScreen from '../screens/CommentScreen';
import ReplyScreen from '../screens/ReplyScreen';
import LoveExpressionScreen from '../screens/LoveExpressionScreen';
import EditPostScreen from '../screens/EditPostScreen';

import ContestScreen from '../screens/ContestScreen';
import DetailContestScreen from '../screens/DetailContestScreen';
import CreateContestScreen from '../screens/CreateContestScreen';
import ContestPaymentScreen from '../screens/ContestPaymentScreen';
import PaystackPaymentScreen from '../screens/PaystackPaymentScreen';
import PreviewCreateContestScreen from '../screens/PreviewCreateContestScreen';
import CreateContestPaymentSuccessScreen from '../screens/CreateContestPaymentSuccessScreen';
import ProcessingCreateContestScreen from '../screens/ProcessingCreateContestScreen';
import JoinContestScreen from '../screens/JoinContestScreen';
import ContestAwardDetailScreen from '../screens/ContestAwardDetailScreen';
import ContestParticipantsScreen from '../screens/ContestParticipantsScreen';
import OngoingContestScreen from '../screens/OngoingContestScreen';
import TrendingContestScreen from '../screens/TrendingContestScreen';
import ClosedContestScreen from '../screens/ClosedContestScreen';

import ConnectionScreen from '../screens/ConnectionScreen';
import AppNotificationScreen from '../screens/AppNotificationScreen';
import TestScreen from '../screens/TestScreen2';

import HamburgerMenuScreen from '../screens/HamburgerMenuScreen';
import SearchUserScreen from '../screens/SearchUserScreen';

import NewsFeedNavSection from '../components/NewsFeedNavSection';

import WalletLoginScreen from '../screens/WalletLoginScreen';
import WalletHomeScreen from '../screens/WalletHomeScreen';
import FundTransferBankScreen from '../screens/FundTransferBankScreen';

import SideBarWallet from '../components/SideBarWallet';

// useScreens();

const AuthStack = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    ForgotPassword: {screen: ForgotPasswordScreen},
    SignUp: {screen: SignUpScreen},
    CompleteSignUp: {screen: CompleteSignUpScreen},
    ConfirmEmail: {screen: ConfirmEmailScreen},
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
        color: '#44a4f7',
        // marginTop: Constants.statusBarHeight
      },
      headerTintColor: '#44a4f7',
    },
  },
);

const InitialSetupStack = createStackNavigator(
  {
    SignUpSuccess: {screen: SignUpSuccessScreen},
    ChooseProfilePic: {screen: ChooseProfilePicScreen},
    UpdateCoverPhoto: {screen: UpdateCoverPhotoScreen},
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
        color: '#44a4f7',
        fontWeight: 'normal',
        // marginTop: Constants.statusBarHeight
      },

      headerTintColor: '#44a4f7',
    },
  },
);

const drawerConfig = {
  drawerWidth: SCREEN_WIDTH * 0.83,
  contentComponent: ({navigation}) => {
    return <SideBarWallet navigation={navigation} />;
  },
};

const WalletStack = createDrawerNavigator(
  {
    WalletHome: {screen: WalletHomeScreen},
    FundTransferBank: {screen: FundTransferBankScreen},
  },
  drawerConfig,
);

const NewsFeedStack = createStackNavigator(
  {
    NewsFeed: {screen: NewsFeedScreen},
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);
const ContestStack = createStackNavigator(
  {
    ContestHome: {screen: ContestScreen},
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);
const ConnectionStack = createStackNavigator(
  {
    Connections: {screen: ConnectionScreen},
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);
const HamburgerMenuStack = createStackNavigator(
  {
    HamburgerMenu: {screen: HamburgerMenuScreen},
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

// const TabDrawerStack = createDrawerNavigator({
//   TabDrawer: { screen: NewsFeedScreen }
// });

NewsFeedStack.navigationOptions = {
  tabBarIcon: ({tintColor}) => <Icon name="home" style={{color: tintColor}} />,
};
ContestStack.navigationOptions = {
  tabBarIcon: ({tintColor}) => (
    <Icon name="ribbon" style={{color: tintColor}} />
  ),
};
ConnectionStack.navigationOptions = {
  tabBarIcon: ({tintColor}) => (
    <Icon name="people" style={{color: tintColor}} />
  ),
};
HamburgerMenuStack.navigationOptions = {
  tabBarIcon: ({tintColor}) => <Icon name="menu" style={{color: tintColor}} />,
};

TabNavigator = createMaterialTopTabNavigator(
  {
    NewsFeed: {
      screen: NewsFeedStack,
      // navigationOptions: {
      //   tabBarIcon: ({ tintColor }) => <Icon name="home" color={tintColor} />
      // }
    },
    Contest: {screen: ContestStack},
    Connections: {screen: ConnectionStack},
    AppNotification: {
      screen: AppNotificationScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="notifications" style={{color: tintColor}} />
        ),
      },
    },
    HamburgerMenu: {screen: HamburgerMenuStack},
  },
  {
    tabBarComponent: NewsFeedNavSection,
    tabBarOptions: {
      activeTintColor: '#44a4f7',
      inactiveTintColor: '#707070',

      showIcon: true,
    },
  },
);
const HomeScreensStack = createStackNavigator(
  {
    Tabs: TabNavigator,
    ShowMorePicx: {
      screen: ShowMorePicxScreen,
    },
    CreatePost: {screen: CreatePostScreen},
    PreviewCreatePost: {screen: PreviewCreatePostScreen},
    Profile: {screen: ProfileScreen},
    UsersProfile: {screen: UsersProfileScreen},
    EditProfile: {screen: EditProfileScreen},
    ProfileFollow: {screen: ProfileFollowersScreen},
    ProfileFollowing: {screen: ProfileFollowingScreen},
    PinPeople: {screen: PinPeopleScreen},
    CreateContest: {screen: CreateContestScreen},
    DetailContest: {screen: DetailContestScreen},
    Comment: {screen: CommentScreen},
    Reply: {screen: ReplyScreen},
    EditPost: {screen: EditPostScreen},
    LoveExpression: {screen: LoveExpressionScreen},
    PreviewCreateContest: {screen: PreviewCreateContestScreen},
    PaystackPayment: {screen: PaystackPaymentScreen},
    CreateContestPaymentSuccess: {screen: CreateContestPaymentSuccessScreen},
    ProcessingCreateContest: {screen: ProcessingCreateContestScreen},
    JoinContest: {screen: JoinContestScreen},
    ContestAwardDetail: {screen: ContestAwardDetailScreen},
    ContestParticipants: {screen: ContestParticipantsScreen},
    OngoingContest: {screen: OngoingContestScreen},
    ClosedContest: {screen: ClosedContestScreen},
    TrendingContest: {screen: TrendingContestScreen},
    SearchUser: {screen: SearchUserScreen},
    UsersNewsFeed: {screen: UsersNewsFeedScreen},
    UserContest: {screen: UserContestScreen},
    WalletLogin: {screen: WalletLoginScreen},
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const MainNavigator = createSwitchNavigator(
  {
    //EditProfile: { screen: EditProfileScreen },
    AuthLoading: {screen: AuthLoadingScreen},
    Auth: AuthStack,
    InitialSetup: InitialSetupStack,
    HomeScreen: HomeScreensStack,
    Wallet: WalletStack,
    //DetailContest: { screen: DetailContestScreen }
    // CreateContestPaymentSuccess: { screen: CreateContestPaymentSuccessScreen }
    //Test: { screen: TestScreen }
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

//const Root=( <Root>MainNavigator</Root>)
export default createAppContainer(MainNavigator);
