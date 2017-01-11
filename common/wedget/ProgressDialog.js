import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Animated,
} from 'react-native';

import BaseDialog from './BaseDialog'

export default class ProgressDialog extends BaseDialog {

    renderDialog() {
        return (
            <View
                style={[styles.content, {

                }]}
                onStartShouldSetResponder={() => true}
                >
                <Text>
                    1123
                </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    content: {
        width: 150,
        height: 150,
        backgroundColor: '#ffffff',
        borderRadius: 5,
    }
})