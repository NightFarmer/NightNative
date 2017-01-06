import React, { Component } from 'react';
import { Text, View } from 'react-native';

import MainFunctionGrid from './MainFunctionGrid'
export default class MainPage extends Component {

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <View
                    style={{
                        height: 50
                    }}
                    >
                    <Text>123</Text>
                </View>
                <MainFunctionGrid />
                <View
                    style={{
                        height: 50
                    }}>
                    <Text>123</Text>
                </View>
            </View>
        )
    }

}