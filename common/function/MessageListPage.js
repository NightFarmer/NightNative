import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
} from 'react-native';

import TopBar from '../wedget/CommonTopBar'

export default class MessageListPage extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([
                'row 1',
                'row 2',
                'row 1',
                'row 2',
                'row 1',
                'row 2',
                'row 1',
                'row 2',
                'row 1',
                'row 2',
            ]),
            headHeight: 0
        };
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <TopBar {...this.props}
                    rightButtonText='新增'
                    onRighButtonPress={() => { } }
                    />
                <View style={{ height: this.state.headHeight }} />
                <View
                    onStartShouldSetResponder={(evt) => {
                        console.info('onStartShouldSetResponder  w')
                    } }
                    onMoveShouldSetResponder={(evt) => {
                        console.info('onMoveShouldSetResponder  w')
                        return true
                    } }
                    onResponderGrant={(evt) => {
                        console.info('onResponderGrant  w')
                    } }
                    onResponderReject={(evt) => {
                        console.info('onResponderReject  w')
                    } }
                    onResponderMove={(evt) => {
                        console.info('onResponderMove  w')
                    } }
                    onResponderRelease={(evt) => {
                        console.info('onResponderRelease  w')
                    } }
                    onResponderTerminationRequest={(evt) => { 
                        console.info('')
                        return false
                    } }
                    onResponderTerminate={(evt) => {
                        console.info('onResponderTerminate  w')
                    } }
                    onResponderTerminationRequest={(evt) => {
                        console.info('onResponderTerminationRequest  w')
                    } }
                    >
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => <Text
                            style={{ height: 100 }}
                            >{rowData}</Text>}

                        onStartShouldSetResponder={(evt) => {
                            console.info('onStartShouldSetResponder')
                        } }
                        onMoveShouldSetResponder={(evt) => {
                            console.info('onMoveShouldSetResponder')
                        } }
                        onResponderGrant={(evt) => {
                            console.info('onResponderGrant')
                        } }
                        onResponderReject={(evt) => {
                            console.info('onResponderReject')
                        } }
                        onResponderMove={(evt) => {
                            console.info('onResponderMove')
                        } }
                        onResponderRelease={(evt) => {
                            console.info('onResponderRelease')
                        } }
                        // onResponderTerminationRequest={(evt) => { 
                        //     console.info('')
                        // } }
                        onResponderTerminate={(evt) => {
                            console.info('onResponderTerminate')
                        } }
                        onResponderTerminationRequest={(evt) => {
                            console.info('onResponderTerminationRequest')
                        } }

                        />
                </View>
            </View>
        )
    }
}