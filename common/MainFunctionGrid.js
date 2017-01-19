import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';

import DraggableGridView from './main/DraggableGridView'
import MessageListPage from './function/MessageListPage'
import FileChoosePage from './function/FileChoosePage'
import Map1 from './function/WebViewTestPage'
import Map2 from './function/WebViewTestPage2'
import Map3 from './function/WebViewTestPage3'

let iconSize = Dimensions.get('window').width / 3 / 2.5

export default class MainFunctionGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <DraggableGridView
                ref="dgv"
                renderItem={this.renderItem.bind(this)}
                dataList={this.getDataList()}
                {...this.props}
                >
            </DraggableGridView>
        )
    }

    getDataList() {
        let initList = []
        for (let i = 0; i < 20; i++) {
            initList.push(i)
        }
        return initList
    }

    resetGridViewTouchState(msg) {
        this.refs.dgv.resetTouchState(msg)
    }

    renderItem(itemData, index) {
        let comp = MessageListPage
        if (index % 2 == 0) {
            comp = FileChoosePage
        }
        if (index == 3) {
            comp = Map1
        }
        if (index == 4) {
            comp = Map2
        }
        if (index == 5) {
            comp = Map3
        }
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'center'
                }}
                onPress={() => {
                    console.info('onclick..' + itemData)
                    this.resetGridViewTouchState("aa")
                    this.props.navigator.push({
                        component: comp,
                        params: {
                            title: '测试'
                        }
                    })
                } } >
                <View
                    style={{
                        flex: 1,
                        // backgroundColor: "#AAFF0088",
                        alignSelf: 'stretch',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    >
                    <Image style={myStyles.icon}
                        source={require('./resource/img/func1.png')} />
                    <Text key={itemData} style={myStyles.text} >
                        功能{itemData}-{index % 2}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const myStyles = StyleSheet.create({
    text: {
        color: "#656565",
        fontSize: 16,
        marginTop: 5
    },
    icon: {
        width: iconSize,
        height: iconSize
    }
})