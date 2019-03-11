import React from 'react';
import { Platform, Easing, Animated } from 'react-native';
import {
  TabNavigator,
  StackNavigator,
  DrawerNavigator,
} from 'react-navigation';
import { FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import WelcomeScreen from './screens/Welcome';
import Home from './screens/Home';
import ProfileScreen from './screens/Profile';
import FavoritesScreen from './screens/Favorites';
import SettingsScreen from './screens/Settings';

import { HamburgerIcon, SettingsIcon, BackIcon } from './components/icons';

import { CustomDrawerContent } from './components';
import { colors } from './utils/constants';
import VerifyEmail from './screens/VerifyEmail';
import VerifyPhone from './screens/VerifyPhone';
import MyFlights from './screens/MyFlights';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import Header from './components/Header';
import HeaderArrive from './components/HeaderArrive';
import Departures from './screens/Departures';

const AppMainTab = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Departures',
      drawerIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="airplane-takeoff" color={tintColor} size={32} />
      ),
      tabBarLabel: 'Depart',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="airplane-takeoff" color={tintColor} size={32} />
      ),
      headerStyle: {
        backgroundColor: '#000', // this will handle the cutOff at the top the screen
      },
      header: props => <Header {...props} />,
    })
  },
  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Arrivals',
      drawerIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="airplane-landing" color={tintColor} size={32} />
      ),
      tabBarLabel: 'Arrivals',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="airplane-landing" color={tintColor} size={32} />
      ),
      headerStyle: {
        backgroundColor: 'white',
        display: 'none',
      },
      header: props => <HeaderArrive />,
      headerTitle: 'Trinidad and Tobago',
      headerTitleStyle: {
        color: colors.TEXT,
      },
      headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')} />,
    })
  },

  DutyFree: {
    screen: MyFlights,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Shopping',
      drawerIcon: ({ tintColor }) => (
        <FontAwesome name="shopping-basket" size={24} color={tintColor} />
      ),
      tabBarLabel: 'Shop',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="shopping-basket" size={24} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: '#2e2e2e',
        borderBottomWidth: 0,
      },
      headerTitle: 'Duty Free Shopping',
      headerTintColor: 'white',
      headerTitleStyle: {
        color: 'white',
      },
      headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')} />,
      headerRight: <SettingsIcon onPress={() => navigation.navigate('SelectCamera')} />,
    })
  },

  MyFlights: {
    screen: MyFlights,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Travel Agents',
      drawerIcon: ({ tintColor }) => (
        <FontAwesome name="ticket" size={28} color={tintColor} />
      ),
      tabBarLabel: 'Travel',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="ticket" size={28} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: '#2e2e2e',
        borderBottomWidth: 0,
      },
      headerTitle: 'Travel Agents',
      headerTintColor: 'white',
      headerTitleStyle: {
        color: 'white',
      },
      headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')} />,
      headerRight: <SettingsIcon onPress={() => navigation.navigate('SelectCamera')} />,
    })
  },

  Rentals: {
    screen: MyFlights,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Rentals',
      drawerIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="car-side" size={36} color={tintColor} />
      ),
      tabBarLabel: 'Rentals',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="car-side" size={36} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: '#2e2e2e',
        borderBottomWidth: 0,
      },
      headerTitle: 'Rentals',
      headerTintColor: colors.BLUE,
      headerTitleStyle: {
        color: colors.TEXT,

      },
      headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')} />,
      headerRight: <SettingsIcon onPress={() => navigation.navigate('Settings')} />,
    })
  },
}, {
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      inactiveBackgroundColor: '#212020',
      activeBackgroundColor: '#212020',
      showIcon: true,
      iconStyle: {
        width: 35,
        height: 24
      },
      indicatorStyle: {
        backgroundColor: '#003fd1',
      },
      tabStyle: {
        flex: 1,
        padding: 3,
      },
      style: {
        backgroundColor: '#212020',
        height: 68,
        paddingBottom: 10,
      },
      upperCaseLabel: false,
    },
    labelStyle: {
      fontSize: 10,
    },
    safeAreaInset: { bottom: 'always', top: 'never' },
    tabBarPosition: 'bottom',
    allowFontScaling: true,
    swipeEnabled: true,
    animationEnabled: true,
  });

const AppMainStack = StackNavigator({
  Home: { screen: AppMainTab },
  Departures: { screen: Departures },
  Settings: { screen: SettingsScreen },
  Email: { screen: VerifyEmail },
  Phone: { screen: VerifyPhone },
  MyFlights: { screen: MyFlights },
  Register: { screen: Register },
  ForgotPassword: { screen: ForgotPassword },
}, {
    cardStyle: {
      backgroundColor: 'white',
    },
    mode: 'modal',
    headerTransitionPreset: 'fade-in-place',
    swipeEnabled: true,
  });

const AppDrawer = DrawerNavigator({
  Home: {
    screen: AppMainStack,
  },
  Agents: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Travel Agents',
      drawerIcon: ({ tintColor }) => (
        <FontAwesome name="ticket" size={24} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitle: 'Travel Agents',
      headerTitleStyle: {
        color: colors.TEXT,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
    }),
  },
  Weather: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Weather',
      drawerIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="weather-cloudy" size={24} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitle: 'Weather',
      headerTitleStyle: {
        color: colors.TEXT,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
    }),
  },
  Parking: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Parking',
      drawerIcon: ({ tintColor }) => (
        <FontAwesome name="automobile" size={24} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitle: 'Parking',
      headerTitleStyle: {
        color: colors.TEXT,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
    }),
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Settings',
      drawerIcon: ({ tintColor }) => (
        <Ionicons name="md-settings" size={28} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitle: 'Settings',
      headerTitleStyle: {
        color: colors.TEXT,
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
    }),
  },
}, {
    contentComponent: props =>
      (<CustomDrawerContent
        {...props}
      />),
    contentOptions: {
      activeBackgroundColor: 'white',
      activeTintColor: colors.BLUE,
      inactiveTintColor: colors.TEXT,
    },
  });

const Navigator = TabNavigator({
  // Welcome: { screen: WelcomeScreen },
  Main: { screen: AppDrawer },
  Register: { screen: Register },
  ForgotPassword: { screen: ForgotPassword }
}, {
    navigationOptions: {
      tabBarVisible: false,
      headerVisible: false,
    },
    swipeEnabled: false,
  });

export default Navigator;
