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
    ToastAndroid,
    Vibration,
} from 'react-native';

let boxSize = Dimensions.get('window').width / 3

export default class MainFunctionGrid extends Component {
    maxzIndex = 1;

    constructor(props) {
        super(props);
        if (props.resetState) {
            this.resetTouchState()
        }
        let eleList = this.props.dataList.map((v, i) => {
            // console.info(v, i)
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
        // console.info('pagere set clean ', this.props.resetState)
        // if (this.props.resetState) {
        //     if (this._touchTimer) {
        //         clearTimeout(this._touchTimer)
        //     }
        //     this._touchTime = -1
        // }
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
                    {[].concat(this.renderCellsBoder(), this.renderCells())}
                </View>
            </ScrollView>
        );
    }

    calcListHeight() {
        let listHeight = Math.ceil(this.state.dataList.length / 3) * boxSize
        return listHeight
    }

    renderCellsBoder() {
        return this.state.dataList.map((d, index) => {
            return (
                <View
                    style={[myStyles.box, {
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderRightWidth: StyleSheet.hairlineWidth,
                        borderBottomColor: '#E1E1E1',
                        borderRightColor: '#E1E1E1',
                        marginLeft: d.marginLeftStatic,
                        marginTop: d.marginTopStatic
                    }]}
                    key={"border_" + index}
                    >
                </View>
            )
        })
    }

    renderCells() {
        return this.state.dataList.map((d, index) => {
            return (
                <Animated.View
                    ref={(v) => { d.viewRef = v } }
                    style={[myStyles.box, {
                        zIndex: d.zIndex,
                        marginLeft: d.marginLeft,
                        marginTop: d.marginTop
                    }]}
                    key={index}
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

    judgeMoveItem(node, gestureState) {
        // console.info(this._touchTime, new Date().getTime() - this._touchTime)
        if (this._touchTime > 0 && new Date().getTime() - this._touchTime > 500) {
            //准备拖拽环境
            //开始拦截拖拽事件
            return true
        }
        if (gestureState.dy != 0 || gestureState.dx != 0) {
            this.resetTouchState(" move ")
        }
        return false
    }

    _setNodeDragTimer(node) {
        if (this._touchTime > 0) return;
        this._touchTime = new Date().getTime()
        this._touchTimer = setTimeout(() => {
            if (this.props.resetState) {//viewpager不能在翻页时取消长摁监听，所以在定时器触发时动态判断翻页状态，iOS使用scrollview不存在此问题
                this.resetTouchState()
                return
            }
            console.info('a')
            if (this._touchTime == -1) return;
            console.info('b')
            // if (this.props.resetState) return;
            console.info('c')
            node.zIndex = this.maxzIndex++
            this.setState({ scrollEnabled: false });
            if (this.props.onDragStart) {
                this.props.onDragStart()
            }
            Vibration.vibrate(50)
            // ToastAndroid.show('ok', ToastAndroid.SHORT)
        }, 500);
    }

    resetTouchState(msg) {
        if (this._touchTimer) {
            clearTimeout(this._touchTimer)
        }
        this._touchTime = -1
        this.setState({ scrollEnabled: true });
        if (this.props.onDragEnd) {
            // console.info(" yes ", msg)
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
                return this.judgeMoveItem(node, gestureState)
            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                // console.info('onMoveShouldSetPanResponderCapture', node.moveable, " #")
                // this._clearNodeDragTimer(node)
                // return node.moveable
                return this.judgeMoveItem(node, gestureState)
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
                node.moveX = gestureState.dx;
                node.moveY = gestureState.dy;
                let newLeft = node.marginLeftStatic + node.moveX;
                let newTop = node.marginTopStatic + node.moveY;
                // console.info(node.marginLeftStatic, node.moveX, gestureState.dx)



                // console.info()
                // node.viewRef

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
                // this.setState({});
                // node.viewRef.setState({})

                node.marginLeft.setValue(newLeft)
                node.marginTop.setValue(newTop)
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

// class ItemView extends Animated.View {

//     constructor(props) {
//         super(props);
//         this.state={}
//     }

//     render() {
//         return (
//             <Animated.View
//                 {...this.props}
//                 />
//         )
//     }
// }