import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';
import { Provider, connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components/native';
import { FormattedWrapper } from 'react-native-globalize';

import store from './store';
import Navigator from './Navigator';
import { colors } from './utils/constants';

import firebase from 'firebase';

// Initialize Firebase...
const firebaseConfig = {
  apiKey: "AIzaSyCS_nHFkuxBGFpAOf32HjqsSn8FisGbw6A",
  authDomain: "verufied-7d9d1.firebaseapp.com",
  databaseURL: "https://verufied-7d9d1.firebaseio.com",
  projectId: "verufied-7d9d1",
  storageBucket: "verufied-7d9d1.appspot.com",
};

firebase.initializeApp(firebaseConfig);
console.disableYellowBox = true;

const Root = styled.View`
flex: 1;
background-color: ${props => props.theme.BLACK};
`;

const StatusBarAndroid = styled.View`
height: 24;
background-color: ${props => props.theme.BLACK};
`;

class RootContainer extends Component {
  render() {
    return (
      <ThemeProvider theme={colors}>
        <FormattedWrapper>

          <Root>

            <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
            {Platform.OS === 'android' && Platform.Version >= 20 ? <StatusBarAndroid /> : null}
            <Navigator />

          </Root>

        </FormattedWrapper>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const ConnectedRootContainer = connect(mapStateToProps, null)(RootContainer);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRootContainer />
      </Provider>
    );
  }
}

export default App;
