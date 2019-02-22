import * as React from 'react';
import { View, StyleSheet, StatusBar, Dimensions, ScrollView, Text } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import Gates from './Gates';
import Customs from './Customs';
import DutyFree from './DutyFree';
import Arrivals from './Arrivals';



const FirstRoute = () => (
    <Arrivals />
);
const SecondRoute = () => (
    <Gates />
);
const ThirdRoute = () => (
    <Customs />
);
const FourthRoute = () => (
    <DutyFree />
);

export default class TabArrivals extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Flights' },
            { key: 'second', title: 'Gates' },
            { key: 'third', title: 'Immigration' },
            { key: 'fourth', title: 'Duty Free' },
        ],
    };

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#000',
            }}>
                <TabView
                    navigationState={this.state}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    // swipeEnabled={false}
                    renderTabBar={props =>
                        <TabBar
                            {...props}
                            style={{
                                backgroundColor: '#000',
                                borderBottomStartRadius: 0,
                                borderBottomEndRadius: 0,
                            }}
                            indicatorStyle={{
                                backgroundColor: '#2e2e2e', height: 48, borderRadius: 10,
                                borderBottomStartRadius: 0,
                                borderBottomEndRadius: 0,
                                shadowOpacity: 0
                            }}
                            renderLabel={({ route, focused, color }) => (
                                <Text style={{ color: 'white', paddingVertical: 7 }}>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
    },
});
