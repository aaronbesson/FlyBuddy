import React from 'react';
import {
  AppRegistry, StyleSheet, ActivityIndicator, Image,
  ListView, Text, View, Alert, Platform, TextInput, Button,
  TouchableOpacity, AsyncStorage, ScrollView, ListItem
} from 'react-native';
import firebase from 'firebase';
import { w, h, totalSize } from '../api/Dimensions';
import Moment from 'react-moment';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Modal from 'react-native-modal';

export default class Departures extends React.Component {

  static navigationOptions = {
    title: 'Departures',
    header: props => <Header {...props} />,
  };

  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: true,
      isLoading: true,
      myKey: null,
      text: '',
      isModalVisible: false,
      rowData: '',
    }

    this.arrayholder = [];
  }


  componentDidMount() {
    return fetch('http://aviation-edge.com/v2/public/timetable?key=f42d0e-44642c&iataCode=POS&type=departure')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function () {
          // In this block you can do something with new state.
          this.arrayholder = responseJson;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Search by Flight Number & Save to My Trip
  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      const itemData = item.flight.iataNumber.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      text: text
    })
    this.saveKey(text)
  }



  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",

        }}
      />
    );
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  async getKey() {
    try {
      const text = await AsyncStorage.getItem('@MyFlightNumber:key');
      this.setState({ myKey: text });
      this.props.navigation.navigate('MyFlights', { ListViewClickItemHolder: rowData });
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  async saveKey(text) {
    try {
      await AsyncStorage.setItem('@MyFlightNumber:key', text);
      this.props.navigation.navigate('MyFlights', { ListViewClickItemHolder: rowData });
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  async resetKey() {
    try {
      await AsyncStorage.removeItem('@MyFlightNumber:key');
      const text = await AsyncStorage.getItem('@MyFlightNumber:key');
      this.setState({ myKey: text });
    } catch (error) {
      console.log("Error resetting data" + error);
    }
  }

  renderFlightItem = () => {
    return (
      <View style={{ marginBottom: 20, }}>
        <TouchableOpacity style={styles.flightCard} onPress={this._toggleModal}>
          <View style={{ alignItems: 'center', justifyContent: 'center', width: '25%', padding: 10 }}>
            <View style={styles.iconsBk}><MaterialCommunityIcons name="airplane-takeoff" size={32} color='white' /></View>
            <Text style={{ textAlign: 'center', fontSize: 24, color: 'white', fontWeight: 'bold' }}>{rowData.departure.iataCode}</Text>
            <Moment element={Text} fromNow style={{ textAlign: 'center', fontSize: 11, color: 'white' }}>{rowData.departure.scheduledTime}</Moment>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', width: '50%', padding: 10 }}>
            <Text style={{ textAlign: 'center', fontSize: 14, color: 'white' }}>{rowData.airline.name}</Text>
            <TouchableOpacity style={styles.numberBk} onPress={this.getKey.bind(this)}>
              <Text style={{ textAlign: 'center', fontSize: 21, color: 'white', fontWeight: 'bold' }}>{rowData.flight.iataNumber}</Text>
            </TouchableOpacity>
            <Image source={require('../../assets/images/arrowLine.png')} style={{ marginTop: 10, }} />

            <Text style={{ textAlign: 'center', fontSize: 21, marginTop: 10, color: 'white', fontWeight: 'bold' }}>Gate: {rowData.departure.gate}</Text>
            <Moment format="D MMM YYYY HH:MM" element={Text} style={{ textAlign: 'center', color: 'white' }}>{rowData.departure.scheduledTime}</Moment>
            <View style={styles.statusBk}>
              <Text style={{ fontSize: 12, color: 'white' }}>Status: {rowData.status}</Text>
            </View>
          </View>
          <View style={{
            alignItems: 'center', justifyContent: 'center',
            width: '25%', padding: 10,
          }}>
            <View style={styles.iconsBk}>
              <MaterialCommunityIcons name="airplane-landing" size={32} color='white' /></View>
            <Text style={{ textAlign: 'center', fontSize: 24, color: 'white', fontWeight: 'bold' }}>{rowData.arrival.iataCode}</Text>
            <Moment element={Text} fromNow style={{ textAlign: 'center', fontSize: 11, color: 'white' }}>{rowData.arrival.scheduledTime}</Moment>

          </View>
        </TouchableOpacity>

      </View>
    );
  }

  render() {
    if (this.state.isSignedIn) {
      const user = firebase.auth().currentUser || {};
      if (this.state.isLoading) {
        return (
          <View style={{ flex: 1, paddingTop: 60, backgroundColor: 'black' }}>
            <ActivityIndicator size='large' />
          </View>
        );
      }
      return <View style={styles.MainContainer}>

        <View style={{
          flexDirection: 'row',
          padding: 15,
          paddingTop: 20
        }}>
          <View style={styles.TextInputStyleClass}>
            <Ionicons style={styles.searchIcon} name="ios-search" size={28} color="#000" />
            <TextInput
              style={styles.TextInput}
              onChangeText={(text) => this.SearchFilterFunction(text)}
              value={this.state.text}
              underlineColorAndroid='transparent'
              placeholder="Flight Number"
              returnKeyType='search'
              clearButtonMode='always'
            />

          </View>



        </View>

        <View style={{ flexDirection: 'row' }} >
          <Text style={styles.instructions}>
            My saved flight details:
        </Text>
          <TextInput
            style={{ color: 'white', paddingBottom: 12, marginLeft: 8, }}
            onChangeText={(text) => this.SearchFilterFunction(text)}
            value={this.state.myKey}
            underlineColorAndroid='transparent'
            placeholder={this.state.myKey}
            placeholderTextColor={'#666'}
            returnKeyType='search'
          />
          <TouchableOpacity
            style={{ position: 'absolute', right: 30, top: -10, zIndex: 999 }}
            onPress={this.resetKey.bind(this)}
          >
            <Ionicons name='ios-close' size='36' color='#666' />
          </TouchableOpacity>

        </View>
        <ListView style={{ height: '78%', }}
          dataSource={this.state.dataSource}
          value={this.state.myKey}
          renderRow={this.renderFlightItem.bind(this)}
        />
        <Modal style={styles.flightCardBig} isVisible={this.state.isModalVisible} visible={!!this.state.selectedRow}>
          <ListItem
            style={{ height: '78%', }}
            dataSource={this.state.dataSource}
            value={this.state.myKey}
            renderRow={this.renderFlightItem(this)}
          />
        </Modal>
      </View>;
    }
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2e2e2e',
  },
  MainContainer: {
    borderTopRightRadius: 20,
    backgroundColor: '#2e2e2e',
    paddingTop: 0,
  },
  h1: { fontSize: 20, color: 'white', fontWeight: '600' },
  TextInputStyleClass: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    marginRight: '2%',
  },
  TextInput: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    fontSize: 19,
    flex: 1,
  },
  news: {
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    width: 160,
    height: 65,
    marginRight: 10,
    overflow: 'hidden',
    paddingTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 1,
  },
  news1: {
    backgroundColor: '#212020',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 160,
    height: 50,
    marginRight: 10,
    overflow: 'hidden',
    paddingTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 1,
  },
  searchContainer: {
    backgroundColor: 'black',
    padding: 10,
    paddingBottom: 60,
  },
  heading: {
    marginTop: 0,
    fontSize: 28,
    color: 'white',
    fontWeight: '400',
  },
  flightCard: {
    backgroundColor: '#444444',
    padding: 0,
    paddingBottom: 20,
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 0,
    borderRadius: 10,
    margin: '4%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 1,
    flexDirection: 'row',
  },
  flightCardBig: {
    backgroundColor: '#444444',
    padding: 0,
    paddingBottom: 20,
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 0,
    borderRadius: 10,
    margin: '8%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 1,
    flexDirection: 'row',
  },
  button: {
    width: '25%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: w(4),
    backgroundColor: '#003fd1',
    borderRadius: 9,
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: totalSize(2.1),
  },
  instructions: {
    marginLeft: 20,
    paddingBottom: 12,
    color: 'white',
  },
  circle: {
    backgroundColor: '#F5A623',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginHorizontal: 10,
  },
  iconsBk: {
    backgroundColor: '#212020',
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#4c4c4c',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  numberBk: {
    backgroundColor: '#003fd1',
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 27,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 1,
  },
  statusBk: {
    backgroundColor: '#343434',
    paddingHorizontal: 15,
    height: 24,
    borderRadius: 27,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});