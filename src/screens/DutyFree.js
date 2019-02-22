import React, { Component } from 'react';
import {
    Image, Dimensions, View, ActivityIndicator, TouchableOpacity,
    WebView, ScrollView, StyleSheet, ImageBackground, Text
} from 'react-native';
import Moment from 'moment';
import HTML from 'react-native-render-html';

export default class DutyFree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            posts: [],
            modalVisible: false,
        };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    };
    componentDidMount() {
        fetch(`http://mytrini.com/wp-json/wp/v2/posts/?_embed&categories=116`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    posts: responseJson,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading == true) {
            return (
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                    <ActivityIndicator size="large" color="#1C97F7" />
                </View>
            )
        }
        else {
            Moment.locale('en');
            return (
                <View style={{
                    flex: 1, backgroundColor: '#2c2c2c',
                    borderTopLeftRadius: 20,
                }}>
                    <ScrollView
                        decelerationRate={0}
                        snapToInterval={200} //your element width
                        style={{ marginTop: 10, paddingBottom: 10, }}>
                        {this.state.posts.map((item, index) => (
                            <View>
                                <View style={{ flex: 1 }} key={item.id}>
                                    <View style={{ width: 330, marginHorizontal: 20, }}>
                                        <HTML
                                            tagsStyles={{
                                                body: { fontSize: 19, color: 'white' },
                                                p: { fontSize: 19, fontWeight: "normal", color: 'white', marginVertical: 20, },
                                                ul: { marginVertical: 20, },
                                                li: { color: 'white', fontSize: 19, },
                                                strong: { fontSize: 16, },
                                                blockquote: { fontSize: 16 },
                                                a: { fontSize: 16, color: "#0044e2" },
                                                em: { fontSize: 16, },
                                                img: { height: 250, width: 350 },
                                                h2: { fontSize: 21, fontWeight: "normal", color: 'white', marginVertical: 20, fontWeight: '700' },
                                            }}
                                            key={item.id}
                                            styleName="paper md-gutter multiline"
                                            html={item.content.rendered}
                                            imagesMaxWidth={Dimensions.get('window').width * .9}
                                            ignoredStyles={['width', 'height', 'video']}
                                            onLinkPress={(evt, href) => this.onLinkPress(href)}
                                        />


                                    </View>
                                </View>

                            </View>
                        ))}
                    </ScrollView>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 0,
    },
    h1: {
        color: 'black',
        fontSize: 24,
        paddingTop: 20,
        fontWeight: 'bold',
    },
    h2: {
        color: 'black',
        fontSize: 24,
        paddingTop: 20,
        fontWeight: 'bold',
    },
    h3: {
        fontSize: 13,
    },
    button: {
        width: '45%',
        margin: 5,
        backgroundColor: '#492661',
        padding: 8,
        height: 36,
        borderRadius: 18,
    },
    buttonGrey: {
        width: '45%',
        margin: 5,
        backgroundColor: '#353535',
        padding: 8,
        height: 36,
        borderRadius: 18,
    },
    buttonText: {
        color: 'black',
        alignSelf: 'center',
    },
    highlight: {
        backgroundColor: '#f5f5f5',
        borderRadius: 50,
        width: 100,
        height: 100,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gold',
        borderWidth: 0,
    },
    news: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        width: '90%',
        height: 200,
        marginHorizontal: 20,
        overflow: 'hidden',
    },
    hero: {
        backgroundColor: '#492661',
        width: '110%',
        height: 260,
        alignSelf: 'center',
        marginTop: 0,
        overflow: 'hidden'
    },
    itemTitle: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '100%',
        paddingHorizontal: 10,
    },
});