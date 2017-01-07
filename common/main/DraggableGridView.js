import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
    StyleSheet,
    TouchableHighlight,
    Animated,
    PanResponder,
    TouchableOpacity,
} from 'react-native';

let boxSize = Dimensions.get('window').width / 3

export default class MainFunctionGrid extends Component {
    maxzIndex = 1;

    constructor(props) {
        super(props);
        let eleList = this.props.dataList.map((v, i) => {
            console.info(v, i)
            return {
                data: v,
                marginLeft: new Animated.Value(i % 3 * boxSize),
                marginTop: new Animated.Value(Math.floor(i / 3) * boxSize),
                marginLeftStatic: i % 3 * boxSize,
                marginTopStatic: Math.floor(i / 3) * boxSize,
                moveX: 0,
                moveY: 0,
                zIndex: 0,
                index: i
            }
        })
        this.state = {
            dataList: eleList,
            scrollEnabled: true,
        }
    }

    render() {
        return (
            <ScrollView
                scrollEnabled={this.state.scrollEnabled}
                style={this.props.style}
                onScroll={() => { this._touchTime = -1 } }
                >
                <View
                    style={{
                        height: this.calcListHeight()
                    }}
                    >
                    {this.renderCells()}
                </View>
            </ScrollView>
        );
    }

    calcListHeight() {
        let listHeight = Math.ceil(this.state.dataList.length / 3) * boxSize
        return listHeight
    }

    renderCells() {
        return this.state.dataList.map((d) => {
            return (
                <Animated.View
                    style={[myStyles.box, {
                        zIndex: d.zIndex,
                        marginLeft: d.marginLeft,
                        marginTop: d.marginTop
                    }]}
                    key={d.data}
                    {...this.newPanResponder(d).panHandlers}
                    >
                    {this.props.renderItem(d.data, d.index)}
                </Animated.View>
            )
        })
    }

    findNodeByIndex(index) {
        let dataList = this.state.dataList
        for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].index == index) {
                return dataList[i]
            }
        }
    }

    _setMarginWithAnim(node, duration) {
        node.marginLeftStatic = node.index % 3 * boxSize;
        node.marginTopStatic = Math.floor(node.index / 3) * boxSize;
        Animated.parallel([
            Animated.timing(// 可选的基本动画类型: spring, decay, timing
                node.marginLeft,
                {
                    toValue: node.marginLeftStatic,
                    duration: duration
                }
            ),
            Animated.timing(
                node.marginTop,
                {
                    toValue: node.marginTopStatic,
                    duration: duration
                }
            )
        ]).start();
    }

    _touchTimer = null

    _touchTime = -1

    judgeMoveItem(node) {
        // console.info(this._touchTime, new Date().getTime() - this._touchTime)
        if (this._touchTime > 0 && new Date().getTime() - this._touchTime > 500) {
            //准备拖拽环境
            //开始拦截拖拽事件
            return true
        }
        this.resetTouchState(" move ")
        return false
    }

    _setNodeDragTimer(node) {
        if (this._touchTime > 0) return;
        console.info(this._touchTime, "set timer")
        this._touchTime = new Date().getTime()
        this._touchTimer = setTimeout(() => {
            if (this._touchTime == -1) return;
            node.zIndex = this.maxzIndex++
            this.setState({ scrollEnabled: false });
            // vibrate(100)
            if (this.props.onDragStart) {
                console.info(" no ")
                this.props.onDragStart()
            }
        }, 500);
    }

    resetTouchState(msg) {
        if (this._touchTimer) {
            clearTimeout(this._touchTimer)
        }
        this._touchTime = -1
        this.setState({ scrollEnabled: true });
        if (this.props.onDragEnd) {
            console.info(" yes ", msg)
            this.props.onDragEnd()
        }
    }

    newPanResponder(node) {
        return PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => {
                // console.info('onStartShouldSetPanResponder')
                if (gestureState.numberActiveTouches <= 1) {
                    this._setNodeDragTimer(node)
                }
                return false
            },
            onStartShouldSetPanResponderCapture: (evt, gestureState) => {
                // console.info('onStartShouldSetPanResponderCapture')
                if (gestureState.numberActiveTouches <= 1) {
                    this._setNodeDragTimer(node)
                }
                return false
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                // console.info('onMoveShouldSetPanResponder')
                // this._clearNodeDragTimer(node)
                // return node.moveable
                return this.judgeMoveItem(node)
            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                // console.info('onMoveShouldSetPanResponderCapture', node.moveable, " #")
                // this._clearNodeDragTimer(node)
                // return node.moveable
                return this.judgeMoveItem(node)
            },

            onPanResponderGrant: (evt, gestureState) => {
                // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
                // gestureState.{x,y}0 现在会被设置为0
            },
            onPanResponderMove: (evt, gestureState) => {
                // 最近一次的移动距离为gestureState.move{X,Y}
                // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}

                // let newLeft = evt.nativeEvent.pageX - evt.nativeEvent.locationX
                // let newTop = evt.nativeEvent.pageY - evt.nativeEvent.locationY
                node.moveX += gestureState.dx;
                node.moveY += gestureState.dy;
                let newLeft = node.marginLeftStatic + node.moveX;
                let newTop = node.marginTopStatic + node.moveY;

                node.marginLeft.setValue(newLeft)
                node.marginTop.setValue(newTop)

                let selfIndex = node.index
                let currentIndex = Math.floor((newTop + boxSize / 2) / boxSize) * 3 + Math.floor((newLeft + boxSize / 2) / boxSize)
                // console.info(selfIndex, currentIndex)

                if (currentIndex > selfIndex && currentIndex < this.state.dataList.length) {
                    for (let i = selfIndex + 1; i <= currentIndex; i++) {
                        let newIndex = i - 1;
                        let moveNode = this.findNodeByIndex(i)
                        moveNode.index = newIndex
                        this._setMarginWithAnim(moveNode, 250)
                    }
                    node.index = currentIndex
                }
                if (currentIndex < selfIndex && currentIndex >= 0) {
                    for (let i = selfIndex - 1; i >= currentIndex; i--) {
                        let newIndex = i + 1;
                        let moveNode = this.findNodeByIndex(i)
                        moveNode.index = newIndex
                        this._setMarginWithAnim(moveNode, 250)
                    }
                    node.index = currentIndex
                }
                this.setState({});
            },
            onPanResponderTerminationRequest: (evt, gestureState) => false,//放权
            onPanResponderRelease: (evt, gestureState) => {
                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成。
                console.info('onPanResponderRelease')
                this.resetTouchState()
                node.moveX = 0;
                node.moveY = 0;
                this._setMarginWithAnim(node, 200)
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
                console.info('onPanResponderTerminate')
                this.resetTouchState()
                node.moveX = 0;
                node.moveY = 0;
                this._setMarginWithAnim(node, 200)
            },
            // onShouldBlockNativeResponder: (evt, gestureState) => {
            //     // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
            //     // 默认返回true。目前暂时只支持android。
            //     return true;
            // },

            //下滑两次 出现
        })
    }
}

const myStyles = StyleSheet.create({
    box: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 3,
        backgroundColor: '#00000000',
        position: 'absolute',
    }
})