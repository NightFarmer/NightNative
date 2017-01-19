import React, { Component } from 'react';
import {
    Text,
    View,
    Platform,
    ScrollView,
    TouchableOpacity,
    ListView,
    Image,
    Navigator,
} from 'react-native';

import TopBar from '../wedget/CommonTopBar'
import FileChooseComponent from './FileChooseComponent'

export default class FileChoosePage extends Component {

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <TopBar {...this.props} title='文件选择'
                    // rightButtonText='新增'
                    // onRighButtonPress={() => { } }
                    />
                <FileChooseComponent />
            </View>
        )
    }


}




