import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Dimensions,
} from 'react-native';

import DraggableGridView from './main/DraggableGridView'
import MessageListPage from './function/MessageListPage'
import FileChoosePage from './function/FileChoosePage'
import Map1 from './function/WebViewTestPage'
import Map2 from './function/WebViewTestPage2'
import Map3 from './function/WebViewTestPage3'
import AmapDemo from './function/AmapDemo'
import CameraDemo from './function/CameraDemo'
import CameraDemo2 from './function/CameraDemo2'
import CameraDemo3 from './function/CameraDemo3'
import QRCodeDemo from './function/QRCodeDemo'


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
        let initList = [
            { title: '列表刷新', component: MessageListPage },
            { title: '文件选择', component: FileChoosePage },
            { title: '地图测试1', component: Map1 },
            { title: '地图测试2', component: Map2 },
            { title: '地图测试3', component: Map3 },
            { title: '高德测试', component: AmapDemo },
            { title: '拍照测试', component: CameraDemo },
            { title: '拍照测试2', component: CameraDemo2 },
            { title: '拍照测试3', component: CameraDemo3 },
            { title: '二维码生成', component: QRCodeDemo },
            
        ]
        for (let i = 0; i < 20; i++) {
            initList.push({ title: "" + i })
        }
        return initList
    }

    resetGridViewTouchState(msg) {
        this.refs.dgv.resetTouchState(msg)
    }

    renderItem(itemData, index) {
        let comp = MessageListPage
        if (itemData.component) {
            comp = itemData.component
        }
        return (
            <TouchableHighlight
                underlayColor={'#EEE'}
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
                    <Text key={index} style={myStyles.text} >
                        {itemData.title ? itemData.title : '功能{itemData.title}-{index % 2}'}

                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const myStyles = StyleSheet.create({
    text: {
        color: "#656565",
        fontSize: 14,
        marginTop: 10
    },
    icon: {
        width: iconSize,
        height: iconSize
    }
})