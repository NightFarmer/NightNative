import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

export default class ContactsList extends Component {

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
<Text>
    1
</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#A22F5588",
    }
})