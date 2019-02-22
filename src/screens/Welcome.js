import React, { Component } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Animated, KeyboardAvoidingView,
  ActivityIndicator, Text, Image, Alert, StatusBar, ImageBackground
} from 'react-native';
import InputField from "../components/InputField";
import { w, h, totalSize } from '../api/Dimensions';
import Firebase from '../api/Firebase';

const email = require('../../assets/email.png');
const password = require('../../assets/password.png');

class FlyInView extends React.Component {
  state = {
    dropAnim: new Animated.Value(1500),  // Initial value for opacity: 0
  }

  componentWillMount() {
    Animated.timing(                  // Animate over time
      this.state.dropAnim,            // The animated value to drive
      {
        toValue: 20,                   // Animate to opacity: 1 (opaque)
        duration: 2500,              // Make it take a while
        delay: 300,
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { dropAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          marginTop: dropAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

class FlyInView1 extends React.Component {
  state = {
    dropAnim: new Animated.Value(-400),  // Initial value for opacity: 0
  }

  componentWillMount() {
    Animated.timing(                  // Animate over time
      this.state.dropAnim,            // The animated value to drive
      {
        toValue: 0,                   // Animate to opacity: 1 (opaque)
        duration: 4000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { dropAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          marginTop: dropAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}


class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentWillMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 500,              // Make it take a while
        delay: 3200,
        useNativeDriver: true,
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

class FadeInView1 extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentWillMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 4000,              // Make it take a while
        useNativeDriver: true,
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}




export default class Login extends Component {

  state = {
    isEmailCorrect: false,
    isPasswordCorrect: false,
    isLogin: false,
    logInStatus: 'signed out',
    errorMessage: 'none'
  };



  emailLogin = () => {
    const email = this.email.getInputValue();
    const password = this.password.getInputValue();

    this.setState({
      isEmailCorrect: email === '',
      isPasswordCorrect: password === '',
    }, () => {
      if (email !== '' && password !== '') {
        this.loginToFireBase(email, password);
      } else {
        Alert.alert('Please enter a valid email address');
      }
    });
  };

  changeInputFocus = name => () => {
    if (name === 'Email') {
      this.setState({ isEmailCorrect: this.email.getInputValue() === '' });
      this.password.input.focus();
    } else {
      this.setState({ isPasswordCorrect: this.password.getInputValue() === '' });
    }
  };

  loginToFireBase = (email, password) => {
    this.setState({ isLogin: true });
    Firebase.userLogin(email, password)
      .then(user => {
        if (user) this.props.navigation.navigate('Main');
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlyInView1><FadeInView1><ImageBackground
          style={{
            marginTop: 0,
            flex: 1,
            justifyContent: 'center'
          }}
          source={require('../../assets/images/daniel-olah-1113181-unsplash.jpg')}
        >
          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <StatusBar barStyle="light-content" />
            <FlyInView>
              <Image source={require('../../assets/images/plane.png')}
                style={{ alignSelf: 'center', marginBottom: 20, }} />
            </FlyInView>
            <FadeInView>

              <Text style={styles.h3}>Welcome to</Text>
              <Text style={styles.h2}>FlyBuddy</Text>
              <View style={{ width: '100%', marginTop: '10%' }}>

                <InputField
                  placeholder="Email"
                  keyboardType="email-address"
                  style={styles.email}
                  error={this.state.isEmailCorrect}
                  focus={this.changeInputFocus}
                  ref={ref => this.email = ref}
                  icon={email}
                />
                <InputField
                  placeholder="Password"
                  returnKeyType="done"
                  secureTextEntry={true}
                  blurOnSubmit={true}
                  error={this.state.isPasswordCorrect}
                  ref={ref => this.password = ref}
                  focus={this.changeInputFocus}
                  icon={password}
                />
                <View style={{ flex: 1, }}>
                  <TouchableOpacity
                    onPress={this.emailLogin}
                    style={styles.button}
                    activeOpacity={0.6}
                    isLogin={this.state.isLogin}
                  >
                    {this.props.isLogin
                      ? <ActivityIndicator size="large" style={styles.spinner} color='white' />
                      : <Text style={styles.text}>Login</Text>}
                  </TouchableOpacity>
                </View>
              </View>


            </FadeInView>

          </KeyboardAvoidingView>
          <FadeInView>
            <View style={styles.textContainer}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.touchable} activeOpacity={0.6}>
                <Text style={styles.createAccount}>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')} style={styles.touchable} activeOpacity={0.6}>
                <Text style={styles.forgotPassword}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
          </FadeInView>
        </ImageBackground>
        </FadeInView1>
        </FlyInView1>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  logo: {
    marginVertical: 30,
  },
  textContainer: {
    width: w(100),
    flexDirection: 'row',
    marginTop: 60,
    marginBottom: 60,
  },
  email: {
    marginBottom: 20,
  },
  touchable: {
    flex: 1,
  },
  createAccount: {
    color: '#fff',
    textAlign: 'center',
    fontSize: totalSize(2),
    fontWeight: '600',
  },
  forgotPassword: {
    color: '#fff',
    textAlign: 'center',
    fontSize: totalSize(2),
    fontWeight: '600',
  },
  h3: {
    fontSize: 21,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '200',
  },
  h2: {
    fontSize: 64,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '200',
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
    fontSize: totalSize(2.5),
  },
  spinner: {
    height: h(5),
  },
  icon: {
    color: 'white'
  }
});