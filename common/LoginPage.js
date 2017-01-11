import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

import CommonTopBar from './wedget/CommonTopBar'
import CommonButton from './wedget/CommonButton'
import ProgressDialog from './wedget/ProgressDialog'
import AlertDialog from './wedget/AlertDialog'

let loginUrl = 'http://120.27.107.170/yuerduo-front/loginapi/login'

export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginName: '',
            password: '',
            result: '',
            // alertShow: false,
            // alertMsg: '',
        }

        // AsyncStorage.getItem('loginUser', (error, result) => {
        //     console.info(error)
        //     this.setState({ result: result });
        // })
        AsyncStorage.getItem('loginUser')
            .then((value) => this.setState({ result: value }))
            .catch((error) => console.info(error))
    }

    render() {
        return (
            <View>
                <CommonTopBar
                    title='登录'
                    noBack={true}
                    // rightButtonText='注册'
                    />
                <View>
                    <TextInput
                        onChangeText={(text) => this.setState({ loginName: text })}
                        ></TextInput>
                    <TextInput
                        onChangeText={(text) => this.setState({ password: text })}
                        ></TextInput>
                    <CommonButton
                        onPress={() => this.login()}
                        />
                    <Text>
                        {this.state.result}
                    </Text>
                </View>
                <AlertDialog ref='dlg0' />
                <AlertDialog ref='dlg' />
            </View>
        )
    }

    login() {
        console.info('login', this.state.loginName, this.state.password)

        // this.hehe()

        let formData = new FormData();
        formData.append("username", this.state.loginName);
        formData.append("password", this.state.password);

        this.refs.dlg.show('loading')
        fetch(loginUrl, {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                console.info(response.status, response.ok)
                // console.info(response); 
                return response.json()
            })
            .then((jsonObj) => {
                console.info(jsonObj)
                return jsonObj
            })
            .then((jsonObj) => {
                if (jsonObj.result != 0) {
                    AsyncStorage.setItem('loginUser', JSON.stringify(jsonObj.data[0]))
                }
                this.setState({ result: JSON.stringify(jsonObj) });
                // this.refs.dlg0.dismiss()
                this.refs.dlg.show(JSON.stringify(jsonObj))
            })
            .catch((error) => {
                // this.refs.dlg.show('error')
                console.info(error)
                this.refs.dlg.show('error')
            })


        // fetch(loginUrl, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         username: 'yourValue',
        //         password: 'yourOtherValue',
        //     })
        // })
        //     .then((response) => {
        //         console.info(response.status, response.ok)
        //         console.info(response); return response.json()
        //     })
        //     .then((jsonObj) => console.info(jsonObj))
        //     .catch((error) => { console.info(error) })

        // fetch(loginUrl, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: 'username=123&password=33'
        // })
        //     .then((response) => {
        //         console.info(response.status, response.ok)
        //         console.info(response); return response.json()
        //     })
        //     .then((jsonObj) => console.info(jsonObj))
        //     .catch((error) => { console.info(error) })
    }
}

