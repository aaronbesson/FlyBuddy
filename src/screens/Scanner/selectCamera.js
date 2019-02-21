import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView, } from 'react-native';
import { w, h, totalSize } from "../../api/Dimensions";
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default class SelectCamera extends Component {
  render(){
    return (
      <View style={styles.headerContainer}>
        <ScrollView style={styles.root}>
      <View style={styles.container}>

        <ScrollView
          onLayout={this.onContainerLayout}
          contentContainerStyle={styles.rootContainer}
        >

        <TouchableOpacity style={styles.gridcard}>
        <FontAwesome name="qrcode" size={48} color='#cecece' style={ styles.icon } />
        <Text style={styles.center}>QR Code</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridcard}>
        <FontAwesome name="id-card" size={48} color='#cecece' style={ styles.icon } />
        <Text style={styles.center}>Identification</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridcard}>
        <FontAwesome name="file" size={48} color='#cecece' style={ styles.icon } />
        <Text style={styles.center}>Document</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridcard}>
        <FontAwesome name="user" size={48} color='#cecece' style={ styles.icon } />
        <Text style={styles.center}>Face ID</Text>
        </TouchableOpacity>

        </ScrollView>

      </View>
      </ScrollView>
      </View>
    )
  }
}

SelectCamera.propTypes = {
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
    paddingTop: 10,
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
    paddingVertical: '10%',
    paddingHorizontal: 10,
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
    justifyContent: 'center',
    alignItems: 'center'
},
});