import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Animated,
    PanResponder,
} from 'react-native';


const isVerticalGesture = (x, y) => {
    return (Math.abs(x) < Math.abs(y));
};

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            <View>
                <Animated.View style={{ height: this.topHeight, marginTop: this.state.marginTop, backgroundColor: '#ff9999' }}>
                    <Text>
                        head
                        </Text>
                </Animated.View>
                <View
                    {...this.contentPanResponder.panHandlers}

                    >
                    <ScrollView
                        scrollEnabled={this.state.scrollEnabled}
                        ref={(it) => this.scroll = it}
                        onScroll={(evt) => {
                            // console.info(this.refs.length)
                            // this.refs.mainGrid.resetGridViewTouchState("bb")
                            this.offset = evt.nativeEvent.contentOffset.y;
                            console.info('offset', this.offset)
                            if (this.offset == 0) {
                                this.setState({ scrollEnabled: false });
                            }
                        } }
                        >
                        <View>
                            <View style={{
                                height: 20 * 100,
                                // marginTop: this.state.marginTop
                                backgroundColor: '#99ff99'
                            }}
                                >
                                {items}
                            </View>
                        </View>
                    </ScrollView>
                </View>

            </View>
        )
    }

    renderItem(i) {
        return (
            <Text key={i} style={{ height: 100, backgroundColor: '#aaaaff' }}>
                {i}
            </Text>
        )
    }

    renderSV(dt) {
        if (this.vy != 0) {
            console.info('vy', this.vy)
            let absVy = Math.abs(this.vy)
            let s = this.vy / absVy
            // let dt = (fn - this.pref)
            // let dt = 20
            console.info("~~~", this.vy * dt, dt)
            this.scroll.scrollTo({ y: this.vy * dt * -1 + this.offset });
            absVy = absVy - this.avy * dt
            let newVy = absVy * s
            let news = newVy / Math.abs(newVy)
            console.info('newVy ', newVy)
            if (news != s) {
                this.vy = 0
            } else {
                this.vy = newVy
            }
        }
    }

    componentDidMount() {
        // (function animloop(fn) {
        //     requestAnimationFrame(animloop.bind(this));
        //     this.renderSV(fn - this.pref);
        //     this.pref = fn
        // }).bind(this)(0);
        //有问题啊 js调用原生是异步的 每帧调用会发生并发请求，scrollview会来回闪烁
    }

    vy = 0
    pref = 0;
    avy = 0.001

    contentPanResponder = PanResponder.create({
        // 要求成为响应者：
        onStartShouldSetPanResponder: (evt, gestureState) => {
            // console.info('onStartShouldSetPanResponder')
            // if (gestureState.numberActiveTouches <= 1) {
            //     this._setNodeDragTimer(node)
            // }
            // if (!this.pullable || !isVerticalGesture(gesture.dx, gesture.dy)) { //不使用pullable,或非向上 或向下手势不响应
            //     return false;
            // }
            // if (!this.state.scrollEnabled) {
            //     this.lastY = this.state.pullPan.y._value;
            //     return true;
            // } else {
            //     return false;
            // }
            if (this.offset > 0) return false
            return true
        },

        onMoveShouldSetPanResponder: (evt, gestureState) => {
            console.info('onMoveShouldSetPanResponder')
            // this._clearNodeDragTimer(node)
            // return node.moveable
            // return this.judgeMoveItem(node, gestureState)
            if (gestureState.dy > 0 && this.offset == 0) {
                if (this.state.scrollEnabled) {
                    console.info("yooooo1111")
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
            return false
        },


        onPanResponderGrant: (evt, gestureState) => {
            // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
            // gestureState.{x,y}0 现在会被设置为0
        },
        onPanResponderMove: (evt, gestureState) => {
            // if (this.offset == 0) {
            // console.info(gestureState.dy, gestureState.dy - this.topHeight)
            if (gestureState.dy >= 0) {
                if (this.offset > 0) return;
                if (this.state.scrollEnabled) {
                    console.info("yooooo")
                    this.setState({ scrollEnabled: false });
                    // this.refs.sv.scrollEnabled = false
                }
                this.state.marginTop.setValue(gestureState.dy - this.topHeight)
                this.marginTopValue = gestureState.dy - this.topHeight
            } else if (!this.state.scrollEnabled) {
                this.scroll.scrollTo({ x: 0, y: gestureState.dy * -1 });
                // this.setState({ scrollEnabled: true });
            }

        },
        onPanResponderTerminationRequest: (evt, gestureState) => false,//放权
        onPanResponderRelease: (evt, gestureState) => {
            // gestureState.vy
            // console.info(gestureState.vy)
            //  this.setState({ scrollEnabled: true });
            // this.scroll.scrollTo({ y: gestureState.vy * -1000 + this.offset, animated: true });
            this.vy = gestureState.vy

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
    marginTopValue = 0;
    onRelease(msg) {
        if (this.offset == 0 && this.marginTopValue == 0) {
            this.setState({ scrollEnabled: false });
            return;
        }
        console.info('release', msg)
        Animated.timing(
            this.state.marginTop,
            {
                toValue: -this.topHeight,
                duration: 300
            }
        ).start(() => {
            if (this.offset == 0) {
                this.setState({ scrollEnabled: false });
            } else {
                this.setState({ scrollEnabled: true });
            }
        })
    }
}