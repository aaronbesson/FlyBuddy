import React from 'react';
import {
  ScrollView, View, Image, Text,
  StyleSheet, TouchableOpacity,
} from 'react-native';
import {
  RkButton,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import firebase from 'firebase';
import { ListItem, Rating, Icon, } from 'react-native-elements';


export default class Header extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  state = { isSignedIn: true };
  render() {
    if (this.state.isSignedIn) {
      const user = firebase.auth().currentUser || {};
      return <ScrollView style={styles.root}>
        <View style={[styles.header]}>
          <View style={styles.row}>
            <View style={styles.buttons}>
              <RkButton style={[styles.button]}
              onPress={() => this.props.navigation.navigate('Favorites')}
              >
                <Image
                  source={require('../../assets/icons/qrCode.png')}
                />
              </RkButton>
            </View>
            <RkButton style={{ height: 100, width: 100, backgroundColor: 'transparent', }}
              onPress={() => this.props.change('profile')()}
            >
              <Image style={styles.avatar}
                style={{ flex: 1, borderRadius: 33, height: '100%', width: '100%', backgroundColor: 'transparent', }}
                source={require('../../assets/images/avatar.png')} />
            </RkButton>
            <View style={styles.buttons}>
              <RkButton style={[styles.button]}>
                <Image
                  source={require('../../assets/icons/scanCam.png')}
                />
              </RkButton>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.h2}>{user.displayName}</Text>
          </View>
        </View>
      </ScrollView>;
    }
  }
}


const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  small: {
    fontSize: 12,
  },
  root: {
    backgroundColor: theme.colors.screen.base,
    paddingTop: 0,
    flex: 1,
  },
  avatar: {
    width: 120,
  },
  h2: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  icon: {
    marginTop: 0,
    marginBottom: 10,
    alignSelf: 'center',
    padding: 5,
  },
  marginTop: {
    marginTop: 20,
  },
  marginTop50: {
    marginTop: 100,
  },
  empty: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
  },
  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    height: 110,
    width: '33.3%',
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base,
  },
  section: {
    flex: 1,
    alignItems: 'center',
  },
  space: {
    marginBottom: 3,
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: 42,
  },
  buttons: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 27.5,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  center: {
    alignSelf: 'center',
  },
  usercard: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    borderColor: '#f5f5f5',
    borderWidth: 1,
    borderRadius: 30,
    margin: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  titleh2: {
    fontSize: 24,
    paddingLeft: 10,
  },
  itemBorder: {
        borderBottomColor: '#ececec',
    },
}));