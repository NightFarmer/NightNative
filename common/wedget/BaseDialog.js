import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
} from 'react-native';


let windowWith = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height
let maskColor = '#00000066'

export default class BaseDialog extends Component {

    render() {
        let dialogView
        if (this.renderDialog) {
            dialogView = this.renderDialog()
        }
        return (
            <View style={styles.mask}>
                {dialogView}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    mask: {
        position: 'absolute',
        backgroundColor: maskColor,
        width: windowWith,
        height: windowHeight,
        alignItems: 'center',
        justifyContent: 'center',
    }
})