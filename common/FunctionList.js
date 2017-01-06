import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

export default class FunctionList extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View
                style={[this.props.style, styles.container]}
                >

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#A25F2588",
    }
})