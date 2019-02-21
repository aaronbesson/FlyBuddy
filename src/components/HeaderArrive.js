import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

import { API_KEY } from '../utils/WeatherAPIKey';

import Weather from './Weather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default class HeaderArrive extends React.Component {

    state = {
        isLoading: true,
        temperature: 0,
        weatherCondition: null,
        error: null
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            error => {
                this.setState({
                    error: 'Error Getting Weather Condtions'
                });
            }
        );
    }

    fetchWeather(lat, lon) {
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
        )
            .then(res => res.json())
            .then(json => {
                // console.log(json);
                this.setState({
                    temperature: json.main.temp,
                    weatherCondition: json.weather[0].main,
                    isLoading: false
                });
            });
    }


    render() {

        const { isLoading, weatherCondition, temperature } = this.state;
        return (
            <View style={styles.container}>
                <View style={{ width: '60%', backgroundColor: 'black', paddingTop: 40, }}>
                    <View style={{ flexDirection: 'row', marginBottom: 40, }}>
                        <View style={styles.circle}>
                            <MaterialCommunityIcons name="airplane-landing" color="black" size={24} />
                        </View>

                        <View>
                            <Text style={styles.heading}>Arrivals</Text>
                            <Text style={{ color: 'white', fontWeight: '200', fontSize: 12 }}>Piarco International Airport</Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: '40%' }}>
                    {isLoading ? (
                        <View style={styles.loadingContainer}>
                            <Text style={styles.loadingText}>Fetching your weather</Text>
                        </View>
                    ) : (
                            <Weather weather={weatherCondition} temperature={temperature} />
                        )}</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'black',
        height: 130,
    },
    loadingText: {
        fontSize: 30
    },
    heading: {
        marginTop: 0,
        fontSize: 32,
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
