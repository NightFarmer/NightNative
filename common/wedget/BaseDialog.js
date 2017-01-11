import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    Animated,
    ToastAndroid,
} from 'react-native';


let windowWith = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height
let maskColor = '#00000066'

export default class BaseDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            fadeAnim: new Animated.Value(0), // init opacity 0
            dialogFadeAnim: new Animated.Value(1.3), // init opacity 0
        };
    }

    render() {
        console.info('base render', this.state.show)
        let dialogView
        if (this.renderDialog) {
            dialogView = this.renderDialog()
        }
        return (
            this.state.show ?
                <Animated.View
                    style={[styles.mask, {
                        opacity: this.state.fadeAnim
                    }]}

                    onStartShouldSetResponder={() => true}
                    onResponderRelease={() => this.dismiss()}
                    >
                    <Animated.View
                        style={{
                            transform: [
                                { scale: this.state.dialogFadeAnim }
                            ]
                        }}
                        >
                        {dialogView}
                    </Animated.View>
                </Animated.View>
                : null
        )
    }

    show() {
        if (!this.state.show) {
            this.setState({ show: true });
        }
        this.state.fadeAnim.setValue(0)
        this.state.dialogFadeAnim.setValue(1.3)

        Animated.parallel([
            Animated.timing(          // Uses easing functions
                this.state.fadeAnim,    // The value to drive
                {
                    toValue: 1,
                    duration: 300
                },           // Configuration
            ),
            Animated.timing(          // Uses easing functions
                this.state.dialogFadeAnim,    // The value to drive
                {
                    toValue: 1,
                    duration: 300
                },           // Configuration
            )
        ]).start()
    }

    dismiss() {
        Animated.parallel([
            Animated.timing(          // Uses easing functions
                this.state.fadeAnim,    // The value to drive
                {
                    toValue: 0,
                    duration: 300
                },           // Configuration
            ),
            Animated.timing(          // Uses easing functions
                this.state.dialogFadeAnim,    // The value to drive
                {
                    toValue: 0.7,
                    duration: 300
                },           // Configuration
            )
        ]).start((result) => {
            this.setState({ show: false });
        })
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