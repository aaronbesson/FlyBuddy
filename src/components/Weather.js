import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions';
import Feather from '@expo/vector-icons/Feather';

const Weather = ({ weather, temperature }) => {
  return (
    <View style={styles.weatherContainer}>
      <View style={styles.headerContainer}>

        <View style={styles.bodyContainer}>

          <View style={{ position: 'absolute', right: 10, top: 0, alignItems: 'center', height: 48 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ padding: 6 }}>
                <Feather
                  size={24}
                  name={weatherConditions[weather].icon}
                  color={'#fff'}
                /></View>
              <View>
                <Text style={styles.tempText}>{temperature}˚</Text>
              </View>
            </View>
            <Text style={styles.title}>{weatherConditions[weather].title}</Text>
          </View>

        </View>

      </View>
    </View>
  );
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '300',
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '200',
    color: '#fff'
  },
  heading: {
    marginTop: 0,
    fontSize: 28,
    color: 'white',
    fontWeight: '400',
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
  }
});

export default Weather;
