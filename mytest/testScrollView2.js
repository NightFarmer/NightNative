import React, { Component } from 'react';
import {
    Text, View, ScrollView, Dimensions, StyleSheet, UIManager

    , LayoutAnimation,
    TouchableHighlight,
    ToastAndroid,
    Platform,
    Animated,
} from 'react-native';


var CustomLayoutAnimation = {
    duration: 800,
    create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
    },
    update: {
        type: LayoutAnimation.Types.easeInEaseOut,
    },
};


class TestScrollView extends Component {

    constructor(props) {
        super(props);
        let initList = []
        for (let i = 0; i < 20; i++) {
            initList.push(i)
        }
        let boxSize = Dimensions.get('window').width / 3
        let eleList = initList.map((v, i) => {
            console.info(v, i)
            return {
                data: v,
                marginLeft: new Animated.Value(i % 3 * boxSize),
                marginTop: new Animated.Value(Math.floor(i / 3) * boxSize),
                zIndex: 0,
                index: i
            }
        })
        this.state = {
            num: 10,
            dataList: eleList,
            scrollEnabled: true,
            bounceValue: new Animated.Value(0),
            pan: new Animated.ValueXY()
            // justifyContent: 'flex-start'
        }
        // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        // // Enable LayoutAnimation under Android
        // if (Platform.OS === 'android') {
        //     UIManager.setLayoutAnimationEnabledExperimental(true)
        // }

        // setInterval(() => {
        //     // this.setState({ num: Number.parseInt(this.state.num) + 1 })
        //     let list2 = this.state.dataList
        //     this.setState({ dataList: list2.sort((a, b) => a - b), justifyContent: 'center' });
        // }, 1000)
    }
    componentWillUpdate() {
        console.log('componentWillUpdate...');
        LayoutAnimation.easeInEaseOut();
        //或者可以使用如下的自定义的动画效果
        //LayoutAnimation.configureNext(CustomLayoutAnimation);
    }

    // _onPressAddView() {
    //     this.setState({ num: Number.parseInt(this.state.num) + 1 });
    // }
    // _onPressRemoveView() {
    //     this.setState({ num: Number.parseInt(this.state.num) - 1 });
    // }
    // _renderAddedView(i) {
    //     return (
    //         <View key={i} style={styles.view}>
    //             <Text style={{ color: '#fff' }}>{i}</Text>
    //         </View>
    //     );
    // }
    maxzIndex = 1;

    // component

    componentDidMount() {
        // this.state.bounceValue.setValue(1.5);     // 设置一个较大的初始值
        // Animated.spring(                          // 可选的基本动画类型: spring, decay, timing
        //     this.state.bounceValue,                 // 将`bounceValue`值动画化
        //     {
        //         toValue: 0.8,                         // 将其值以动画的形式改到一个较小值
        //         friction: 1,                          // Bouncier spring
        //     }
        // ).start();                                // 开始执行动画


    }

    render() {
        let boxSize = Dimensions.get('window').width / 3
        let items = []
        items = this.state.dataList.map((d) => {
            return (
                <Animated.View
                    style={[myStyles.box, {
                        position: 'absolute',
                        // marginLeft: d.marginLeft,
                        // marginTop: d.marginTop,
                        zIndex: d.zIndex,
                        // transform: [                        // `transform`是一个有序数组（动画按顺序执行）
                        // { scale: this.state.bounceValue },  // 将`bounceValue`赋值给 `scale`
                        // { translateX: this.state.bounceValue }
                        // ],
                        marginLeft: d.marginLeft,
                        marginTop: d.marginTop
                    }]}

                    key={d.data}
                    onStartShouldSetResponder={(evt) => {
                        console.info("onStartShouldSetResponder")
                        return true
                    } }
                    onResponderGrant={(evt) => {
                        console.info('onResponderGrant')
                        d.zIndex = this.maxzIndex++
                        this.setState({ scrollEnabled: false });
                    } }
                    onResponderMove={(evt) => {
                        // console.info("onResponderMove " + evt.nativeEvent.pageX + " " + evt.nativeEvent.locationX)
                        let newLeft = evt.nativeEvent.pageX - evt.nativeEvent.locationX
                        let newTop = evt.nativeEvent.pageY - evt.nativeEvent.locationY

                        // let selfIndex = 0;
                        // for (let i = 0; i < this.state.dataList.length; i++) {
                        //     console.info(this.state.dataList[i].data, d.data, this.state.dataList[i].data == d.data)
                        //     if (this.state.dataList[i].data == d.data) {
                        //         selfIndex = i;
                        //         console.info(i)
                        //         break
                        //     }
                        // }
                        // let selfIndex = this.state.dataList.indexOf(d)
                        let selfIndex = d.index
                        let currentIndex = Math.floor((newTop + boxSize / 2) / boxSize) * 3 + Math.floor((newLeft + boxSize / 2) / boxSize)
                        console.info(selfIndex, currentIndex)
                        d.marginLeft.setValue(newLeft)
                        d.marginTop.setValue(newTop)
                        let dataList = this.state.dataList
                        let findNodeByIndex = function (index) {
                            for (let i = 0; i < dataList.length; i++) {
                                if (dataList[i].index == index) {
                                    return dataList[i]
                                }
                            }
                        }
                        if (currentIndex > selfIndex) {
                            for (let i = selfIndex + 1; i <= currentIndex; i++) {
                                let newIndex = i - 1;
                                // let newIndex = dataList[i].index - 1
                                let moveNode = findNodeByIndex(i)
                                moveNode.index = newIndex
                                Animated.timing(                          // 可选的基本动画类型: spring, decay, timing
                                    moveNode.marginLeft,                 // 将`bounceValue`值动画化
                                    {
                                        toValue: newIndex % 3 * boxSize,                         // 将其值以动画的形式改到一个较小值
                                        duration: 250
                                    }
                                ).start();                                // 开始执行动画
                                Animated.timing(                          // 可选的基本动画类型: spring, decay, timing
                                    moveNode.marginTop,                 // 将`bounceValue`值动画化
                                    {
                                        toValue: Math.floor(newIndex / 3) * boxSize,                         // 将其值以动画的形式改到一个较小值
                                        duration: 250
                                    }
                                ).start();                                // 开始执行动画
                                // moveNode.marginLeft = newIndex % 3 * boxSize;
                                // moveNode.marginTop = Math.floor(newIndex / 3) * boxSize;
                            }
                            d.index = currentIndex
                        }
                        if (currentIndex < selfIndex) {
                            for (let i = selfIndex - 1; i >= currentIndex; i--) {
                                let newIndex = i + 1;
                                // let newIndex = dataList[i].index + 1
                                let moveNode = findNodeByIndex(i)
                                moveNode.index = newIndex

                                // this.state.bounceValue.setValue(1.5);     // 设置一个较大的初始值
                                Animated.timing(                          // 可选的基本动画类型: spring, decay, timing
                                    moveNode.marginLeft,                 // 将`bounceValue`值动画化
                                    {
                                        toValue: newIndex % 3 * boxSize,                         // 将其值以动画的形式改到一个较小值
                                        duration: 250
                                    }
                                ).start();                                // 开始执行动画
                                Animated.timing(                          // 可选的基本动画类型: spring, decay, timing
                                    moveNode.marginTop,                 // 将`bounceValue`值动画化
                                    {
                                        toValue: Math.floor(newIndex / 3) * boxSize,                         // 将其值以动画的形式改到一个较小值
                                        duration: 250
                                    }
                                ).start();                                // 开始执行动画


                                // Animated.timing(
                                //     moveNode.marginLeft,
                                //     { toValue: newIndex % 3 * boxSize }
                                // ).start
                                // moveNode.marginLeft = newIndex % 3 * boxSize;
                                // moveNode.marginTop = Math.floor(newIndex / 3) * boxSize;
                            }
                            d.index = currentIndex
                        }
                        // this.state.dataList = this.state.
                        // this.state.dataList.forEach(function (element) {
                        // console.info(element.data, element.index)
                        // }, this);
                        this.setState({ dataList: dataList });
                    } }
                    onResponderRelease={(evt) => {
                        console.info('onResponderRelease')
                        this.setState({ scrollEnabled: true });

                        let newIndex = d.index                                // this.state.bounceValue.setValue(1.5);     // 设置一个较大的初始值
                        Animated.timing(                          // 可选的基本动画类型: spring, decay, timing
                            d.marginLeft,                 // 将`bounceValue`值动画化
                            {
                                toValue: newIndex % 3 * boxSize,                         // 将其值以动画的形式改到一个较小值
                                duration: 200
                            }
                        ).start();                                // 开始执行动画
                        Animated.timing(                          // 可选的基本动画类型: spring, decay, timing
                            d.marginTop,                 // 将`bounceValue`值动画化
                            {
                                toValue: Math.floor(newIndex / 3) * boxSize,                         // 将其值以动画的形式改到一个较小值
                                duration: 300
                            }
                        ).start();                                // 开始执行动画
                    } }
                    onResponderTerminationRequest={(evt) => {
                        console.info('onResponderTerminationRequest')
                        return true
                    } }
                    onResponderTerminate={(evt) => {
                        console.info('onResponderTerminate')
                    } }
                    >

                    <Text key={d.data} style={myStyles.text} >
                        {d.data} - {d.index}
                    </Text>
                </Animated.View>
            )
        })
        let listHeight = Math.ceil(this.state.dataList.length / 3) * boxSize

        //也可以在循环的地方使用list的map方法来进行映射，得到组件的list
        return (
            <ScrollView
                scrollEnabled={this.state.scrollEnabled}
                // onScroll={(x) => {
                //     console.info(x)
                // } }
                >
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',//让子元素能够自动换行，但现在子元素是绝对布局，所以无用
                        height: listHeight
                    }}
                    >
                    {items}
                </View>

            </ScrollView>
        );
    }
}

const myStyles = StyleSheet.create({
    text: {
        color: "#ff0000",
        fontSize: 30
    },
    box: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 3,
        backgroundColor: '#99ff9988',
    }
})

export default TestScrollView
    ;