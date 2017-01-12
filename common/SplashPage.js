/**
 * Created by zhangfan on 2016/9/30 0030.
 */

import React, {Component} from 'react'
import {
    View,
    Image,
    Text,
} from 'react-native'

import MainPage from './LoginPage'

import BackAndroidHelper from './android/BackAndroidHelper'

class SplashPage extends Component {

    render() {
        return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Image
                    source={require('./resource/img/func1.png')}
                />
                <Text
                    style={{fontSize: 30}}
                >欢迎页。。</Text>
            </View>
        )
    }

    componentDidMount() {
        this.timer = setTimeout(()=> {
            this.props.navigator.resetTo({
                component: MainPage
            })

        }, 2000)
    }

    componentWillUnMount() {
        this.timer && clearTimeout(this.timer)
    }


    componentWillMount() {
        BackAndroidHelper.register(this.props.navigator)
    }

    componentWillUnmount() {
        BackAndroidHelper.unRegister()
    }

}

export default SplashPage