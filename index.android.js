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


const styles = StyleSheet.create({
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

// AppRegistry.registerComponent('NightNative', () => NightNative);
AppRegistry.registerComponent('NightNative', () => myListView);
