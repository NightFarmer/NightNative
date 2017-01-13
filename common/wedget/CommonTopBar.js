import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';

let windowWidth = Dimensions.get('window').width

export default class CommonTopBar extends Component {

    render() {
        let Height = 50
        if (this.props.height) {
            Height = this.props.height
        }
        let BackgroundColor = '#37ACFE'
        if (this.props.backgroundColor) {
            BackgroundColor = this.props.backgroundColor
        }
        let rightButton
        if (this.props.rightButtonText) {
            rightButton = (
                <TouchableOpacity
                    style={{
                        width: Height,
                        height: Height,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        if (this.props.onRighButtonPress) {
                            this.props.onRighButtonPress()
                        }
                    } }
                    >
                    <Text style={styles.rightButton}>
                        {this.props.rightButtonText}
                    </Text>
                </TouchableOpacity>
            )
        }
        let backButton
        if (!this.props.noBack) {
            backButton = (
                <TouchableOpacity
                    style={{
                        width: Height,
                        height: Height,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        this.props.navigator.pop()
                    } }
                    >
                    <Image source={require('../resource/img/topbar_icon_back_normal.png')} style={styles.backIcon} />
                </TouchableOpacity>
            )
        }

        return (
            <View style={{
                height: Height,
                backgroundColor: BackgroundColor,
                flexDirection: 'row',
                zIndex: 100
            }}>
                <View
                    style={[{ height: Height, position: 'absolute', width: windowWidth, justifyContent: 'center' }]}
                    >
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                </View>
                {backButton}
                <View style={{ flex: 1 }} />
                {rightButton}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        fontSize: 20,
        color: "#FFFFFF"
    },
    rightButton: {
        alignSelf: 'center',
        fontSize: 14,
        color: "#FFFFFF"
    },
    backIcon: {
        width: 11,
        height: 19.8,
    }
})