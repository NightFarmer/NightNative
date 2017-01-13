import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    ScrollView,
    PanResponder,
    Animated,
} from 'react-native';

import TopBar from '../wedget/CommonTopBar'
import PullSV from './PullSV'

export default class MessageListPage extends Component {

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <TopBar {...this.props}
                    rightButtonText='新增'
                    onRighButtonPress={() => { } }
                    />

                <PullSV />
            </View >
        )
    }

}
