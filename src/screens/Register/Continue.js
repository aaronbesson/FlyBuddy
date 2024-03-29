import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { w, h, totalSize } from "../../api/Dimensions";

export default class Continue extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this.props.click}
        style={styles.button}>
        {this.props.isCreating
          ? <ActivityIndicator size="large" style={styles.spinner} color='white' />
          : <Text style={styles.text}>Continue</Text>}
      </TouchableOpacity>
    );
  }
}

Continue.propTypes = {
  click: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  button: {
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: w(2),
    backgroundColor: '#003fd1',
    borderRadius: 45,
    marginTop: h(3),
  },
  spinner: {
    height: h(5),
  },
  text: {
    color: 'white',
    fontWeight: '600',
    paddingVertical: h(1),
    fontSize: 16,
  }
});
