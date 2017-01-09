/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput } from 'react-native';

import x from './mytest/test'
import TF from './mytest/testFlex'

export default class NightNative extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //放一些状态值
      showText: true,
      myTest: 'default'
    }
    setInterval(() => {
      this.setState({ showText: !this.state.showText })
    }, 1000)

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!2
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <Text>
          {`多行的
${1 + 2}
字符串
          '引号',  \`反引号\`, ${"hehe".length}
`}
        </Text>
        <Text>
          多行的
            {1 + 3}
          字符串 {this.state.myTest}
        </Text>
        <Text>
          123{`${this.state.showText}`}
        </Text>
        <TF />
        <TextInput style={{ alignSelf: 'stretch' }}
          placeholder='yooooo'
          onChangeText={(text) => { this.setState({ myTest: text }) } }
          />
      </View>
    );
  }
}

/**
 * 设置字体的相关博客
 * https://my.oschina.net/zx0211/blog/644318
 * http://www.jianshu.com/p/96d5c66791c3
 */
//修改Text的render方法，达到修改所有Text字体的目的
import _ from 'lodash'
// _.wrap是lodash的一个函数,用来包裹传入的函数，然后返回一个新的函数 
Text.prototype.render = _.wrap(Text.prototype.render, function (func, ...args) {
  let originText = func.apply(this, args);
  return React.cloneElement(originText, {
    style: [
      originText.props.style,
      styles.defaultFontFamily
    ]
  });
});

const styles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: 'xmlt'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    color: "#FF0000",
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

import myListView from './mytest/testListView'
import myTestFetch from './mytest/testFetch'
import myXin from './mytest/testXin'
import myScrollView from './mytest/testScrollView'//仿viewpager
import myScrollView2 from './mytest/testScrollView2'//测试拖拽
import MainFunctionGrid from './common/MainFunctionGrid'
import MainPage from './common/MainPage'
import LoginPage from './common/LoginPage'

// AppRegistry.registerComponent('NightNative', () => NightNative);
AppRegistry.registerComponent('NightNative', () => LoginPage);
