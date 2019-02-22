import React from 'react';
import {
    ScrollView,
    View,
    Image, Text,
    StyleSheet, hairlineWidth, TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';

export default class Gates extends React.Component {
    state = { isSignedIn: true };

    render() {
        if (this.state.isSignedIn) {
            const user = firebase.auth().currentUser || {};
            return <View style={{
                flex: 1,
                backgroundColor: '#2e2e2e',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                marginHorizontal: 5,
            }}>
                <ScrollView style={styles.container} >
                    <Image source={require('../../assets/images/gates.png')}
                        style={{ alignSelf: 'center', marginBottom: 20, width: '100%' }} />
                </ScrollView></View>;
        }
    }
}


const styles = StyleSheet.create(theme => ({
    container: {
        width: '100%',
        backgroundColor: '#2e2e2e',
        paddingHorizontal: 15,
    },
    headerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 0,
    },
    fixedHeader: {
        position: 'fixed',
        top: 0,
    },
    backArrow: {
        marginLeft: 40,
        marginTop: 18,
    },
    root: {
        paddingTop: 0,
        paddingBottom: 40,
        flex: 1,
    },
}));