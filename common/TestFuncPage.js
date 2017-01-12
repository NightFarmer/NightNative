import React, { Component } from 'react';
import { Text, View } from 'react-native';

import CommonTopBar from './wedget/CommonTopBar'
export default class TestFuncPage extends Component {

    render() {
        return (
            <View style={{ backgroundColor: '#ff9999', flex: 1 }}>
                <CommonTopBar
                    {...this.props}
                    />
            </View>
        )
    }
}