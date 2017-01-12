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
import TestFuncPage from './TestFuncPage'

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
                renderItem={() => this.renderItem()}
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
                        component: TestFuncPage,
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
                        功能{itemData}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const myStyles = StyleSheet.create({
    text: {
        color: "#ff0000",
        fontSize: 16,
        marginTop: 5
    },
    icon: {
        width: iconSize,
        height: iconSize
    }
})