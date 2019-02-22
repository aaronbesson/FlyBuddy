import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ListView, Image, Modal, Linking } from 'react-native';

var Dimensions = require('Dimensions')
var { width, height } = Dimensions.get('window')

export default class MyListView extends React.Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      modalVisible: false,
      myFlight: ''
    }
  }

  setModalVisible(visible, img) {
    this.setState({ modalVisible: visible, myFlight: iataNumber }); // set current image path to show it in modal
  }

  renderRow(rowData) {
    const img = rowData.image
    return (
      <TouchableHighlight style={styles.containerCell}
        // onPress={() => Linking.openURL(img)}
        onPress={() => { this.setModalVisible(true, img) }} // pass image scr to function
      >
        <View>
          <Image
            //  resizeMode={Image.resizeMode.contain}
            //  resizeMethod={"scale"}
            style={{ width: width, height: 180, }}
            source={{ uri: img }}
          />
          <View style={styles.footerContainer}>
            <View
              style={styles.imageUser}
            >
              <Image
                style={styles.imageAvatar}
                //   source={{ uri: rowData.user }}
                source={require('../assets/icons/footer-avatar.png')}

              />
            </View>
            <View style={styles.footerTextContainer}>
              <Text style={{ color: 'blue' }}           //I can see my photos in webview
                onPress={() => Linking.openURL(img)}>
                Google
                            </Text>
              <Text style={styles.text}>{rowData.food}</Text>
              <Text style={[styles.text, styles.textTitle]}>{rowData.title}</Text>
              <Text style={[styles.text, styles.textBy]}>By {rowData.by}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  render() {
    // const img = rowData.image
    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert("Modal has been closed."), this.setModalVisible(!this.state.modalVisible) }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Image
                //  resizeMode={Image.resizeMode.contain}
                //  resizeMethod={"scale"}
                style={{ width: width, height: 180, }}
                source={{ uri: this.state.myFlight }}               // use myFlight scr to show on clicking list item
              />

              <TouchableHighlight onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>

            </View>
          </View>
        </Modal>
        <ListView
          style={styles.listContainer}
          renderRow={this.renderRow.bind(this)}
          dataSource={this.state.dataSource}
        />
      </View>
    );
  }
}