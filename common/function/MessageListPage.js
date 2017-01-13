import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    ScrollView,
    PanResponder,
    Animated,
} from 'react-native';

import TopBar from '../wedget/CommonTopBar'

export default class MessageListPage extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([
                'row 1',
                'row 2',
                'row 1',
                'row 2',
                'row 1',
                'row 2',
                'row 1',
                'row 2',
                'row 1',
                'row 2',
            ]),
            headHeight: 0,
            marginTop: new Animated.Value(-this.topHeight),
            scrollEnabled: false,
        };
    }
    offset = 0
    topHeight = 30
    render() {
        let items = new Array()
        for (let i = 0; i < 20; i++) {
            items.push(this.renderItem(i))
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <TopBar {...this.props}
                    rightButtonText='新增'
                    onRighButtonPress={() => { } }
                    />

                <Animated.View style={{ height: this.topHeight, marginTop: this.state.marginTop, backgroundColor: '#ff9999' }}>
                    <Text>
                        head
                        </Text>
                </Animated.View>
                <ScrollView
                    scrollEnabled={this.state.scrollEnabled}
                    ref='sv'
                    onScroll={(evt) => {
                        // console.info(this.refs.length)
                        // this.refs.mainGrid.resetGridViewTouchState("bb")
                        this.offset = evt.nativeEvent.contentOffset.y;
                    } }
                    >
                    <View>
                        <View style={{
                            height: 20 * 100,
                            // marginTop: this.state.marginTop
                            backgroundColor: '#99ff99'
                        }}
                            {...this.contentPanResponder.panHandlers}
                            >
                            {items}
                        </View>
                    </View>
                </ScrollView>
            </View >
        )
    }

    renderItem(i) {
        return (
            <Text key={i} style={{ height: 100, backgroundColor: '#ff99ff' }}>
                {i}
            </Text>
        )
    }

    contentPanResponder = PanResponder.create({
        // 要求成为响应者：
        onStartShouldSetPanResponder: (evt, gestureState) => {
            // console.info('onStartShouldSetPanResponder')
            // if (gestureState.numberActiveTouches <= 1) {
            //     this._setNodeDragTimer(node)
            // }
            return true
        },
        onStartShouldSetPanResponderCapture: (evt, gestureState) => {
            // console.info('onStartShouldSetPanResponderCapture')
            // if (gestureState.numberActiveTouches <= 1) {
            //     this._setNodeDragTimer(node)
            // }
            return true
        },
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            console.info('onMoveShouldSetPanResponder')
            // this._clearNodeDragTimer(node)
            // return node.moveable
            // return this.judgeMoveItem(node, gestureState)
            if (gestureState.dy > 0) {
                if (this.state.scrollEnabled) {
                    this.setState({ scrollEnabled: false });
                }
                return true
            }
            // return false
            if (gestureState.dy < 0) {
                if (!this.state.scrollEnabled) {
                    this.setState({ scrollEnabled: true });
                }
                return false
            }
            return true
        },
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
            console.info('onMoveShouldSetPanResponderCapture', " #")

            if (gestureState.dy > 0 && this.offset == 0) {
                if (this.state.scrollEnabled) {
                    this.setState({ scrollEnabled: false });
                }
                return true
            }
            if (gestureState.dy < 0) {
                if (!this.state.scrollEnabled) {
                    this.setState({ scrollEnabled: true });
                }
                return false
            }
            return true
        },

        onPanResponderGrant: (evt, gestureState) => {
            // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
            // gestureState.{x,y}0 现在会被设置为0
        },
        onPanResponderMove: (evt, gestureState) => {
            // if (this.offset == 0) {
            // console.info(gestureState.dy, gestureState.dy - this.topHeight)
            if (gestureState.dy >= 0) {
                if (this.state.scrollEnabled) {
                    // this.setState({ scrollEnabled: false });
                    this.refs.sv.scrollEnabled = false
                }
                this.state.marginTop.setValue(gestureState.dy - this.topHeight)
            }

        },
        onPanResponderTerminationRequest: (evt, gestureState) => false,//放权
        onPanResponderRelease: (evt, gestureState) => {
            this.onRelease(2)
        },
        onPanResponderTerminate: (evt, gestureState) => {
            this.onRelease(1)
        },
        // onShouldBlockNativeResponder: (evt, gestureState) => {
        //     // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        //     // 默认返回true。目前暂时只支持android。
        //     return true;
        // },

    })

    onRelease(msg) {
        console.info('release', msg)
        Animated.timing(
            this.state.marginTop,
            {
                toValue: -this.topHeight,
                duration: 300
            }
        ).start(() => {
            // this.setState({ scrollEnabled: true });
            this.refs.sv.scrollEnabled = true
        })
    }
}
