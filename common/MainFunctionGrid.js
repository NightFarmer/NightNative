import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import DraggableGridView from './main/DraggableGridView'

export default class MainFunctionGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <DraggableGridView
                renderItem={this.renderItem}
                dataList={this.getDataList()}
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

    renderItem(itemData, index) {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'center'
                }}
                onPress={() => {
                    console.info('onclick..' + itemData)
                } } >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "#AAFF0088",
                        alignSelf: 'stretch',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    >
                    <Text key={itemData} style={myStyles.text} >
                        {itemData} - {index}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const myStyles = StyleSheet.create({
    text: {
        color: "#ff0000",
        fontSize: 30
    }
})