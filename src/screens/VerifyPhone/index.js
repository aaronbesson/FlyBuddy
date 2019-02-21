import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet, TouchableOpacity, } from 'react-native';
import { w, h, totalSize } from "../../api/Dimensions";
import {
    RkButton,
    RkStyleSheet,
} from 'react-native-ui-kitten';
import InputField from '../../components/InputField';
import firebase from 'firebase';
import { Listitem, Avatar, Badge, Header, Icon, } from 'react-native-elements';

export default class VerifyPhone extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            user: null,
            message: '',
            codeInput: '',
            phoneNumber: '+1',
            confirmResult: null,
        };
    }

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            // User has been signed out, reset the state
            this.setState({
                user: null,
                message: '',
                codeInput: '',
                phoneNumber: '+1',
                confirmResult: null,
            });
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    signIn = () => {
        const { phoneNumber } = this.state;
        this.setState({ message: 'Sending code ...' });

        firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
            .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
    };

    confirmCode = () => {
        const { codeInput, confirmResult } = this.state;

        if (confirmResult && codeInput.length) {
            confirmResult.confirm(codeInput)
                .then((user) => {
                    this.setState({ message: 'Code Confirmed!' });
                })
                .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
        }
    };

    signOut = () => {
        firebase.auth().signOut();
    }

    renderPhoneNumberInput() {
        const { phoneNumber } = this.state;

        return (
            <View style={styles.headerContainer}>
            <View style={styles.container}>
                    <View style={styles.row}>
                        <View style={styles.buttons}>
                        </View>
                        <RkButton style={{ height: 120, width: 120, backgroundColor: 'transparent', }}
                            onPress={() => this.props.change('profile')()}
                        >
                            <Icon
                                name={'phone-iphone'}
                                color='#3399ff'
                                size={100}

                            />
                        </RkButton>
                        <View style={styles.buttons}>
                            <RkButton style={[styles.imgbutton, styles.marginTop50]}>
                            </RkButton>
                        </View>
                    </View>
                    <Text style={styles.forgot}>Verify Mobile Number</Text>

                    <Text style={{ paddingLeft: 30, paddingRight: 30, paddingBottom: 30, fontSize: 21, fontWeight: '200', alignContent: 'center', }}>
                        Enter your mobile number below and verify to receive a confirmation code via SMS.
      </Text>
                    <InputField
                        autoFocus
                        returnKeyType="done"
                        blurOnSubmit={true}
                        keyboardType="number"
                        onChangeText={value => this.setState({ phoneNumber: value })}
                        placeholder={'Phone number ... '}
                        value={phoneNumber}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.signIn} >
                        <Text style={styles.buttonText}>Send Verification Code</Text>
                    </TouchableOpacity>
                </View></View>
        );
    }

    renderMessage() {
        const { message } = this.state;

        if (!message.length) return null;

        return (
            <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
        );
    }

    renderVerificationCodeInput() {
        const { codeInput } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.buttons}>
                        <RkButton style={[styles.imgbutton, styles.marginTop50]}
                            onPress={this.props.change('dash')}
                        >
                        </RkButton>
                    </View>
                    <RkButton style={{ height: 120, width: 120, backgroundColor: 'transparent', }}
                        onPress={() => this.props.change('profile')()}
                    >
                        <Icon
                            name={'phone-iphone'}
                            color='#3399ff'
                            size={100}

                        />
                        <Badge containerStyle={{
                            backgroundColor: 'red', height: 40, width: 40,
                            position: 'absolute', zIndex: 9999, right: 0, bottom: 30,
                        }}>
                            <Text style={{ color: 'white', fontWeight: '900', fontSize: 21, }}>3</Text>
                        </Badge>

                    </RkButton>
                    <View style={styles.buttons}>
                        <RkButton style={[styles.imgbutton, styles.marginTop50]}>
                        </RkButton>
                    </View>
                </View>
                <Text>Enter verification code below:</Text>
                <TextInput
                    autoFocus
                    style={{ height: 40, marginTop: 15, marginBottom: 15 }}
                    onChangeText={value => this.setState({ codeInput: value })}
                    placeholder={'Code ... '}
                    value={codeInput}
                />
                <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
            </View>
        );
    }

    render() {
        const { user, confirmResult } = this.state;
        return (
            <View style={{ flex: 1 }}>

                {!user && !confirmResult && this.renderPhoneNumberInput()}

                {this.renderMessage()}

                {!user && confirmResult && this.renderVerificationCodeInput()}

                {user && (
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <View style={styles.buttons}>
                            </View>
                            <RkButton style={{ height: 120, width: 120, backgroundColor: 'transparent', }}
                                onPress={() => this.props.change('profile')()}
                            >
                                <Icon
                                    name={'phone-iphone'}
                                    color='#3399ff'
                                    size={100}

                                />
                                <Badge containerStyle={{
                                    backgroundColor: 'red', height: 40, width: 40,
                                    position: 'absolute', zIndex: 9999, right: 0, bottom: 30,
                                }}>
                                    <Text style={{ color: 'white', fontWeight: '900', fontSize: 21, }}>3</Text>
                                </Badge>

                            </RkButton>
                            <View style={styles.buttons}>
                                <RkButton style={[styles.imgbutton, styles.marginTop50]}>
                                </RkButton>
                            </View>
                        </View>
                        <Text style={{ fontSize: 25 }}>Signed In!</Text>
                        <Button title="Sign Out" color="red" onPress={this.signOut} />
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
    },
    headerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 0,
    },
    buttons: {
        flex: 1,
        backgroundColor: '#fff',
    },
    forgot: {
        color: '#000',
        fontSize: totalSize(4),
        marginTop: h(2),
        marginBottom: h(2),
        fontWeight: '700',
    },
    imgbutton: {
        backgroundColor: 'transparent',
    },
    button: {
        width: w(85),
        marginTop: h(6),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3399ff',
        paddingVertical: w(1.4),
        borderRadius: w(25),
        borderColor: '#3399ff',
        borderWidth: 1,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        paddingVertical: h(2),
        fontSize: totalSize(2),
    },
    login: {
        color: '#646464',
        fontSize: totalSize(2),
        fontWeight: '700',
    },
    touchable: {
        alignSelf: 'flex-start',
        marginLeft: w(8),
        marginTop: h(4),
    },
    row: {
        flexDirection: 'row',
    },
    marginTop50: {
        marginTop: 100,
    },
});