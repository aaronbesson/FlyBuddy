import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity,
  Text, Image, ScrollView, } from 'react-native';
import { w, h, totalSize } from "../../api/Dimensions";
import firebase from 'firebase';
import {
    RkButton,
  } from 'react-native-ui-kitten';
  import { Icon, } from 'react-native-elements';

const email = require('../../../assets/email.png');

export default class Identity extends Component {

  state = {
    isEmailCorrect: false,
  };

  sendEmail = () => {
    const email = this.email.getInputValue();
    this.setState({
      isEmailCorrect: email === '',
    }, () => {
      if(email !== ''){
        this.sendEmailVerification(email);
      } else {
        console.warn('Enter correct e-mail address');
      }
    });
  };

  sendEmailVerification = (email) => {
    firebase.auth().currentUser.sendEmailVerification()
  .then(function() {
    // Verification email sent.
  })
  .catch(function(error) {
    // Error occurred. Inspect error.code.
  });
  };

  onFocusChanged = () => {
    this.setState({ isEmailCorrect: this.email.getInputValue() === '' });
  };

  render(){
    return (
      <View style={styles.headerContainer}>
        <ScrollView style={styles.root}>
      <View style={styles.container}>
      <View style={styles.row}>
            <View style={styles.buttons}>
             
            </View>
            <RkButton style={{ height: 120, width: 120, backgroundColor: 'transparent', }}
            >
              <Icon
            name={'fingerprint'}
            color='#3399ff'
            size={100}
            
          />
            </RkButton>
            <View style={styles.buttons}>
              <RkButton style={[styles.imgbutton]}>
              </RkButton>
            </View>
          </View>
        <Text style={styles.forgot}>Verify Your Identity</Text>

        <Text style={{ paddingLeft: 30, paddingRight: 30, paddingBottom: 20, fontSize: 21, fontWeight: '200', alignContent: 'center', }}>
        Select a verification method below to get started.
      </Text>

      <ScrollView
          onLayout={this.onContainerLayout}
          contentContainerStyle={styles.rootContainer}
        >

        <TouchableOpacity style={styles.gridcard}
        onPress={() => this.props.navigation.navigate('ScanId')}
        >
        <Image style={styles.center} source={require('../../../assets/icons/id-card.png')} />
          <Text style={[ styles.login, styles.center ]}>Drivers Permit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridcard}
        onPress={() => this.props.navigation.navigate('ScanId')}
        >
        <Image style={styles.center} source={require('../../../assets/icons/id-card.png')} />
          <Text style={[ styles.login, styles.center ]}>National Identity</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridcard}>
        <Image style={styles.center} source={require('../../../assets/icons/passport.png')} />
          <Text style={[ styles.login, styles.center ]}>Passport</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridcard}>
        <Image style={styles.center} source={require('../../../assets/icons/birth.png')} />
          <Text style={[ styles.login, styles.center ]}>Birth Cirtificate</Text>

        </TouchableOpacity>

        </ScrollView>

      </View>
      </ScrollView>
      </View>
    )
  }
}

Identity.propTypes = {
  change: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  rootContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: '2%',
  },
  headerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 0,
},
center: {
    alignSelf: 'center',
},
  buttons: {
    flex: 1,
    backgroundColor: '#fff',
},
  forgot: {
    color:'#000',
    fontSize: totalSize(4),
    marginTop: h(1),
    marginBottom: h(2),
    fontWeight: '700',
  },
  imgbutton: {
    backgroundColor: 'transparent',
  },
  button: {
    width: w(85),
    marginTop: h(6),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399ff',
    paddingVertical: w(1.8),
    borderRadius: w(25),
    borderColor: '#3399ff',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    paddingVertical: h(2),
    fontSize: totalSize(2),
  },
  login: {
    color:'#646464',
    fontSize: totalSize(2),
    fontWeight: '700',
    marginTop: 10,
  },
  touchable: {
    alignSelf: 'flex-start',
    marginLeft: w(8),
    marginTop: h(4),
  },
  row: {
    flexDirection: 'row',
},
marginTop50: {
    marginTop: 100,
},
gridcard: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: '#f5f5f5',
    borderWidth: 1,
    borderRadius: 20,
    margin: '4%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
    width: '42%',
    height: 120,
},
});