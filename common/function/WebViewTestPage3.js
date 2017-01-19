import React, { Component } from 'react';
import {
    Text,
    View,
    WebView,
} from 'react-native';

import TopBar from '../wedget/CommonTopBar'

export default class WebViewTestPage extends Component {

    render() {
        let js = "map.centerAndZoom(new BMap.Point(116.404, 39.915), 11)";
        return (
            <View style={{ flex: 1 }}>
                <TopBar {...this.props} title='地图' />
                <View style={{ flex: 1 }}>
                    <WebView style={{ flex: 1 }}
                        injectedJavaScript={js}
                        source={require('./test.html')}
                        onMessage={(evt) => {
                            console.info(evt.nativeEvent.data)
                            let dataObj = JSON.parse(evt.nativeEvent.data)
                            this.refs.centerMarker.setMsg(JSON.stringify(dataObj.address))
                        } }
                        />
                    <CenterMarker
                        ref='centerMarker'
                        />
                </View>
            </View>
        )
    }
}

class CenterMarker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: ''
        }
    }

    setMsg(msg) {
        this.setState({ msg: msg });
    }

    render() {
        return (
            <View style={{ position: 'absolute' }}>
                <Text>
                    {this.state.msg}
                </Text>
            </View>
        )
    }
}