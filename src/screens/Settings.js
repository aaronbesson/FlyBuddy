import React from 'react';
import {
  ScrollView,
  View,
  Image, Text,
  StyleSheet, hairlineWidth, TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';

export default class SettingsScreen extends React.Component {
  state = { isSignedIn: true };

  render() {
    if (this.state.isSignedIn) {
      const user = firebase.auth().currentUser || {};
      return <View style={styles.headerContainer}>
      <ScrollView style={styles.root}>
          <Text>Settings</Text>
        </ScrollView></View>;
    }
  }
}


const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  headerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 0,
  },
  fixedHeader: {
    position: 'fixed',
    top: 0,
  },
  backArrow: {
    marginLeft: 40,
    marginTop: 18,
  },
  root: {
    backgroundColor: theme.colors.screen.base,
    paddingTop: 0,
    paddingBottom: 40,
    flex: 1,
  },
}));