import React, { Component } from 'react';
import {
    Text, View,
    ListView
} from 'react-native';

export default class TestList extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => { r1 !== r2 },
        })
        let myData = new Array()
        for (let i = 0; i < 100; i++) {
            myData.push(i)
        }
        this.state = {
            dataSource: ds.cloneWithRows([...myData])
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.myRenderRow}
                    />
            </View>
        )
    }

    myRenderRow(rowData) {
        return (
            <Text
                style={{
                    height: 50,
                    fontSize: 30,
                    fontFamily: 'xmlt',
                    color: '#FF0000'
                }}
                >{rowData}测试字体</Text>
        )
    }
}