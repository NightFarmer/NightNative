import React, { Component } from 'react';
import {
    Text,
    View,
    WebView,
} from 'react-native';


export default class WebViewTestPage extends Component {


    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView style={{ flex: 1 }}
                    source={{ uri: 'http://lbs.amap.com/fn/iframe/?id=2262&guide=1' }}
                    />
            </View>
        )
    }
}