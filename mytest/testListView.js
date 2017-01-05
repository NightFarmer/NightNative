import React, { Component } from 'react';
import {
    Text, View,
    ListView,
    Dimensions,
    TextInput,
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
        let bColor = rowData % 2 == 0 ? '#998877' : '#997777'
        console.info(bColor)
        return (
            <View
                style={{
                    backgroundColor: bColor,
                    // height: Dimensions.get('window').height * 0.33
                    height: Dimensions.get('window').width * 0.5,
                    // width: Dimensions.get('window').width
                }}>
                <View style={{
                    position: 'absolute',
                    width: Dimensions.get('window').width,
                    height: 100,
                    backgroundColor: '#ff9999',
                    justifyContent: 'center'
                }}>
                    <Text
                        style={{
                            alignSelf: 'center'
                        }}
                        >绝对布局的文本</Text>
                </View>
                <TextInput
                    style={{
                        alignSelf:'stretch'
                    }}
                    // onChangeText={(text)=>rowData} 暂时不知道怎么记录输入的数据
                />
                <Text
                    style={{
                        height: 50,
                        fontSize: 30,
                        // fontFamily: 'xmlt',
                        color: '#FF0000'
                    }}
                    >{rowData}测试字体</Text>
            </View>
        )
    }
}