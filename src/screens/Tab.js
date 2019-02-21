import * as React from 'react';
import { View, StyleSheet, StatusBar, Dimensions, ScrollView, Text } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import SettingsScreen from './Settings';
import Departures from './Departures';



const FirstRoute = () => (
    <Departures />
);
const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: 'plum' }]} />
);
const ThirdRoute = () => (
    <View style={[styles.scene, { backgroundColor: 'grey' }]} />
);
const FourthRoute = () => (
    <View style={[styles.scene, { backgroundColor: 'silver' }]} />
);

export default class TabViewExample extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Flights' },
            { key: 'second', title: 'Gates' },
            { key: 'third', title: 'Customs' },
            { key: 'fourth', title: 'Duty Free' },
        ],
    };

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderTabBar={props =>
                    <TabBar
                        {...props}
                        style={{
                            backgroundColor: '#000',
                            borderRadius: 10,
                            borderBottomStartRadius: 0,
                            borderBottomEndRadius: 0,
                        }}
                        indicatorStyle={{
                            backgroundColor: '#2e2e2e', height: 48, borderRadius: 10,
                            borderBottomStartRadius: 0,
                            borderBottomEndRadius: 0,
                        }}
                        renderLabel={({ route, focused, color }) => (
                            <Text style={{ color: 'white', padding: 7 }}>
                                {route.title}
                            </Text>
                        )}
                    />
                }
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                    third: ThirdRoute,
                    fourth: FourthRoute
                })}
                onIndexChange={index =>
                    this.setState({ index, out: this.state.routes[index].out })
                }
                initialLayout={{ width: Dimensions.get('window').width }}
                style={styles.container}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        marginTop: StatusBar.currentHeight
    },
    scene: {
        height: 1000,
        width: 400,
    },
    news: {
        backgroundColor: '#2e2e2e',
        borderRadius: 10,
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
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
});
