import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, Text, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { w, h, totalSize } from "../../api/Dimensions";
import InputField from '../../components/InputField';
import Firebase from '../../api/Firebase';

const email = require('../../../assets/email.png');

export default class ForgotPassword extends Component {

  state = {
    isEmailCorrect: false,
  };

  sendEmail = () => {
    const email = this.email.getInputValue();
    this.setState({
      isEmailCorrect: email === '',
    }, () => {
      if (email !== '') {
        this.sendEmailWithPassword(email);
      } else {
        console.warn('Enter correct e-mail address');
      }
    });
  };

  sendEmailWithPassword = (email) => {
    Firebase.sendEmailWithPassword(email)
      .then(result => {
        if (result) this.props.change('login')();
      });
  };

  onFocusChanged = () => {
    this.setState({ isEmailCorrect: this.email.getInputValue() === '' });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}
          source={require('../../../assets/images/daniel-olah-1113181-unsplash.jpg')}
        >
          <KeyboardAvoidingView style={styles.headerContainer}>
            <View style={{ width: '100%', paddingTop: 140, }}>
              <Text style={styles.forgot}>Forgot Your Password?</Text>
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
              <View>
                <TouchableOpacity onPress={this.sendEmail} activeOpacity={0.6} style={styles.button}>
                  <Text style={styles.text}>Send Email</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Welcome')} style={styles.touchable}>
                <Text style={styles.login}>{'<'} Back To Login</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    )
  }
}

ForgotPassword.propTypes = {
  change: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  forgot: {
    color: 'white',
    fontSize: 21,
    marginBottom: h(5),
    fontWeight: '700',
  },
  button: {
    width: '100%',
    height: 56,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: w(1),
    backgroundColor: '#003fd1',
    borderRadius: 45,
    marginTop: h(3),
  },
  buttonfb: {
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: w(3),
    backgroundColor: '#3B5998',
    borderRadius: w(10),
    marginTop: h(3),
  },
  text: {
    color: 'white',
    fontWeight: '700',
    paddingVertical: 1,
    fontSize: 21,
  },
  login: {
    color: '#ffffffEE',
    fontSize: 18,
    fontWeight: '700',
  },
  touchable: {
    alignSelf: 'flex-start',
    marginLeft: w(8),
    marginTop: h(4),
  },
});