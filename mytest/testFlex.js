
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';


export default class TestFlex extends Component {

    render() {
        return (
            <View style={styleTest.main}>
                <View style={{ height: 150, width: 100, backgroundColor: 'powderblue' }} />
                <View style={{ height: 150, width: 100, backgroundColor: 'skyblue' }} />
                <View style={{ alignSelf: 'flex-end', height: 150, width: 100, backgroundColor: 'steelblue' }} />
            </View>
        )
    }
}

/**
 * 用于子元素的
 * flexGrow:1 当兄弟元素不足以填满父容器时，扩展自己到所有元素撑满父元素，数值为子元素扩展的比例，是扩大的比例，并不是子元素真实大小的比例，和flex有区别
 * flexShrink:1 当兄弟元素在父容器中放不下时，收缩自己到所有元素刚好填满父元素，数值为子元素的收缩比例，和flexGrow相反，0不收缩
 * flex:1 子元素占用父容器的比例，最常用，其实是flex-grow, flex-shrink和flex-basis属性的复合属性的一个简写的方式
 * alignSelf:'flex-end' 子元素在父容器布局的垂直方向上的位置，能够覆盖父容器的alignItems值
 */
const styleTest = StyleSheet.create({
    main: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: "#886699",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // flexWrap: 'wrap',//换行,需要指定子元素宽高，子元素不能使用flex等自适应属性
    }
})