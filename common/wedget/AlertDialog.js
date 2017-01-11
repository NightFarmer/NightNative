import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Animated,
} from 'react-native';

import BaseDialog from './BaseDialog'

export default class AlertDialog extends BaseDialog {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            msg: ''
        }
    }

    // componentWillMount() {
    //     // if (this.props.show) {
    //     //     this.show(this.props.msg)
    //     // }
    //     console.info('willmount')
    // }

    renderDialog() {
        console.info('renderDialog', this.state.msg)
        return (
            <View
                style={[styles.content, {

                }]}
                onStartShouldSetResponder={() => true}
                >
                <Text>
                    {this.state.msg}
                </Text>
            </View>
        )
    }

    show(msg) {
        console.info('show', msg)
        this.setState({ msg: msg });
        super.show()
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