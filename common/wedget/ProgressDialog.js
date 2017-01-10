import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

import BaseDialog from './BaseDialog'

export default class ProgressDialog extends BaseDialog {

    renderDialog() {
        return (
            <View style={styles.content}>
                <Text>
                    1123
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        width: 100,
        height: 100,
        backgroundColor: '#ffffff'
    }
})