import React, { Component } from 'react';
import {
    Text, View, ScrollView, Dimensions, StyleSheet, UIManager

    , LayoutAnimation,
    TouchableHighlight,
    ToastAndroid,
    Platform,
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
        for (let i = 20; i > 0; i--) {
            initList.push(i)
        }
        this.state = {
            num: 10,
            dataList: initList,
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

    render() {
        let items = []
        let boxSize = Dimensions.get('window').width / 3
        console.info(boxSize)
        for (let i = 0; i < this.state.dataList.length; i++) {
            items.push(
                <Text key={i} style={[myStyles.box, {
                    position: 'absolute',
                    marginLeft: i % 3 * boxSize,
                    marginTop: Math.floor(i / 3) * boxSize
                }]} >
                    {this.state.dataList[i]}
                </Text>
            )
        }
        let listHeight = Math.ceil(this.state.dataList.length / 3) * boxSize

        //也可以在循环的地方使用list的map方法来进行映射，得到组件的list
        return (
            <ScrollView
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
    box: {

        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 3,
        color: "#ff0000",
        fontSize: 30
    }
})

export default TestScrollView
    ;