import React, { Component } from 'react';

import { AppRegistry, StyleSheet, Text, View, ListView } from 'react-native';

import { StackNavigator } from 'react-navigation';

class FirstActivity extends Component {

    constructor(props) {

        super(props);

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {

            dataSource: ds.cloneWithRows([

                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
                'Item 5',
                'Item 6',
                'Item 7',
                'Item 8',
                'Item 9',
                'Item 10',
                'Item 11',
                'Item 12',
                'Item 13',
                'Item 14',
                'Item 15',
                'Item 16',
                'Item 17',
                'Item 18',
                'Item 19',
                'Item 20',
            ]),

        };


    }

    ListViewItemSeparatorLine = () => {
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

    OpenSecondActivity(rowData) {
        this.props.navigation.navigate('Second', { ListViewClickItemHolder: rowData });
    }

    static navigationOptions =
        {
            title: 'FirstActivity',
        };


    render() {
        return (
            <View style={styles.MainContainer}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderSeparator={this.ListViewItemSeparatorLine}
                    renderRow={
                        (rowData) => <Text style={styles.rowViewContainer}
                            onPress={this.OpenSecondActivity.bind(this, rowData)}>{rowData}</Text>
                    }
                />
            </View>
        );
    }
}

class SecondActivity extends Component {
    static navigationOptions =
        {
            title: 'SecondActivity',
        };

    render() {
        return (
            <View style={styles.MainContainer}>
                <Text style={styles.TextStyle}>
                    {this.props.navigation.state.params.ListViewClickItemHolder} </Text>
            </View>
        );
    }
}

export default Project = StackNavigator(
    {
        First: { screen: FirstActivity },

        Second: { screen: SecondActivity }
    });

const styles = StyleSheet.create(
    {
        MainContainer:
        {
            justifyContent: 'center',
            flex: 1,
            margin: 10

        },

        TextStyle:
        {
            fontSize: 23,
            textAlign: 'center',
            color: '#000',
        },

        rowViewContainer:
        {

            fontSize: 18,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,

        }

    });