import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions';
import Feather from '@expo/vector-icons/Feather';

const Weather = ({ weather, temperature }) => {
  return (
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: 'black' }
      ]}
    >
      <View style={styles.headerContainer}>
        <View style={{ margin: 20 }}>

        </View>

        <View style={styles.bodyContainer}>

          <View style={{ position: 'absolute', right: 10, top: -10, }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ margin: 10 }}><Feather
                size={24}
                name={weatherConditions[weather].icon}
                color={'#fff'}
              /></View>
              <View>
                <Text style={styles.tempText}>{temperature}˚</Text>
                <Text style={styles.title}>{weatherConditions[weather].title}</Text></View>
            </View>
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
    paddingTop: 20,
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: '200',
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff'
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
