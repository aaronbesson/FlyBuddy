import React from 'react';
import {
    ScrollView,
    View,
    Image, Text,
    StyleSheet, TouchableOpacity
} from 'react-native';
import firebase from 'firebase';


export default class Profile extends React.Component {
    state = { isSignedIn: true };

    render() {
        if (this.state.isSignedIn) {
            const user = firebase.auth().currentUser || {};
            return <View style={styles.headerContainer}>
                <ScrollView style={styles.root}>

                    <View style={[styles.header, styles.bordered]}>

                        <View style={styles.section}>
                        <Text style={styles.h2}>{user.displayName}</Text>
                        </View>
                        <Text>{user.uid}</Text>
                        <Text>{user.emailVerified}</Text>
                        <Text style={{ paddingLeft: 10, marginLeft: 0, }}>{user.metadata.creationTime}</Text>
                        <Text>{user.metadata.lastSignInTime}</Text>
                    </View>
                </ScrollView></View>;
        }
    }
}


const styles = StyleSheet.create(theme => ({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        backgroundColor: theme.colors.screen.base,
        paddingTop: 0,
        paddingBottom: 40,
        flex: 1,
    },
    avatar: {
        width: 120,
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    heading: {
        fontSize: 24,
        marginTop: 30,
    },
}));