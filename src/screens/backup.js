import React from 'react';
import { AppRegistry, StyleSheet, ActivityIndicator, ListView, Text, View, Alert, Platform, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { w, h, totalSize } from '../api/Dimensions';

export default class QRcode extends React.Component {
  static navigationOptions = {
    title: 'Departures',
  };

  constructor(props) {

    super(props);

    this.state = {
      isSignedIn: true,
      isLoading: true,
      text: '',
    
    }

    this.arrayholder = [] ;
  }
  

  GetItem(status) {
    Alert.alert(status);
  }


  componentDidMount() {

    return fetch('http://aviation-edge.com/v2/public/timetable?key=38d512-03630e&iataCode=POS&type=departure')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function () {
          // In this block you can do something with new state.
          this.arrayholder = responseJson ;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  SearchFilterFunction(text){
    const newData = this.arrayholder.filter(function(item){
        const itemData = item.flight.icaoNumber.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
    })
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newData),
        text: text
    })
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

  render() {
    if (this.state.isSignedIn) {
      const { hits } = this.state;
      const user = firebase.auth().currentUser || {};
      if (this.state.isLoading) {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <ActivityIndicator />
          </View>
        );
      }
      return <View style={styles.MainContainer}>

<TextInput 
       style={styles.TextInputStyleClass}
       onChangeText={(text) => this.SearchFilterFunction(text)}
       value={this.state.text}
       underlineColorAndroid='transparent'
       placeholder="Search Here"
        />

        <ListView
          dataSource={this.state.dataSource}
          renderSeparator={this.ListViewItemSeparator}
          renderRow={(rowData) =>
            <View style={{ flex: 1, flexDirection: 'column' }} >

              <TouchableOpacity onPress={this.GetItem.bind(this, rowData.status)} >
                <Text style={styles.textViewContainer} >{'Flight Number = ' + rowData.flight.icaoNumber}</Text>
                <Text style={styles.textViewContainer} >{'Airline = ' + rowData.airline.name}</Text>
                <Text>From: {rowData.departure.iataCode} to: {rowData.arrival.iataCode}</Text>
                <Text style={styles.textViewContainer} >{'Scheduled Departure = ' + rowData.departure.scheduledTime}</Text>
                <Text style={styles.textViewContainer} >{'Status = ' + rowData.status}</Text>
              </TouchableOpacity>

            </View>

          }
        />

      </View>;
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  fixedHeader: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
  },
  touchable: {
    alignSelf: 'flex-start',
    marginLeft: w(8),
    marginTop: h(4),
  },
  backArrow: {
    marginLeft: 40,
    marginTop: 18,
  },
  root: {
    backgroundColor: '#fff',
    paddingTop: 0,
    paddingBottom: 40,
    flex: 1,
  },
  large: {
    fontSize: 32,
    marginTop: 20,
  },
  medium: {
    fontSize: 24,
  },
  title: {
    fontSize: 21,
  },
  text: {
    fontSize: 20,
    marginVertical: 20,
  },
  smallText: {
    fontSize: 16,
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 20,
    marginVertical: 20,
  },
  hoverCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    marginVertical: 20,
  },
  hoverCardShadow: {
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderRadius: 5,
    elevation: 1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3399FF',
    borderRadius: 3,
    alignItems: 'center',
  },
  white: {
    color: 'white',
  }
});