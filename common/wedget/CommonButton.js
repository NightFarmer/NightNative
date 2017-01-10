import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export default class CommonButton extends Component {

    render() {
        return (
            <TouchableOpacity
                {...this.props}
                style={styles.loginButton}
                >
                <Text style={styles.loginButtonText}>
                    登录
                        </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    loginButton: {
        borderRadius: 5,
        backgroundColor: '#ff9999',
        alignItems: 'center',
        height: 50,
        margin: 10,
        justifyContent: 'center',
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
    }
})