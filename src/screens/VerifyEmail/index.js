import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, Text, Image, Alert, } from 'react-native';
import { w, h, totalSize } from "../../api/Dimensions";
import InputField from '../../components/InputField';
import firebase from 'firebase';
import {
  RkButton,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { Listitem, Avatar, Badge, Header, Icon, } from 'react-native-elements';

const email = require('../../../assets/email.png');

export default class VerifyEmail extends Component {

  state = {
    isEmailCorrect: false,
  };

  sendEmail = () => {
    const email = this.email.getInputValue();
    this.setState({
      isEmailCorrect: email === '',
    }, () => {
      if (email !== '') {
        this.sendEmailVerification(email);
        Alert.alert('Please check your email for a confirmation link');
        this.props.navigation.navigate('Home');
      } else {
        console.warn('Enter correct e-mail address');
      }
    });
  };

  sendEmailVerification = (email) => {
    firebase.auth().currentUser.sendEmailVerification()
      .then(function () {
        // Verification email sent.
      })
      .catch(function (error) {
        // Error occurred. Inspect error.code.
      });
  };

  onFocusChanged = () => {
    this.setState({ isEmailCorrect: this.email.getInputValue() === '' });
  };

  render() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.buttons}>

            </View>
            <RkButton style={{ height: 120, width: 120, backgroundColor: 'transparent', }}
            >
              >
              <Icon
                name={'email'}
                color='#3399ff'
                size={100}

              />
            </RkButton>
            <View style={styles.buttons}>
              <RkButton style={[styles.imgbutton, styles.marginTop50]}>
              </RkButton>
            </View>
          </View>
          <Text style={styles.forgot}>Verify Email Address</Text>

          <Text style={{ paddingLeft: 30, paddingRight: 30, paddingBottom: 30, fontSize: 21, fontWeight: '200', alignContent: 'center', }}>
            Enter your email address below and click send then check your email for a confirmation link.
      </Text>

          <InputField
            placeholder="Email"
            keyboardType="email-address"
            error={this.state.isEmailCorrect}
            returnKeyType="done"
            blurOnSubmit={true}
            focus={this.changeInputFocus}
            ref={ref => this.email = ref}
            icon={email}
          />
          <TouchableOpacity onPress={this.sendEmail} activeOpacity={0.6} style={styles.button}>
            <Text style={styles.buttonText}>Send Email</Text>
          </TouchableOpacity>


        </View></View>
    )
  }
}

VerifyEmail.propTypes = {
  change: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  headerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 0,
  },
  buttons: {
    flex: 1,
    backgroundColor: '#fff',
  },
  forgot: {
    color: '#000',
    fontSize: totalSize(4),
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
    color: '#646464',
    fontSize: totalSize(2),
    fontWeight: '700',
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
});