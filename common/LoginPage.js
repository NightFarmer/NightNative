import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';


let loginUrl = 'http://120.27.107.170/yuerduo-front/loginapi/login'

export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginName: '',
            password: '',
            result: ''
        }
    }

    render() {
        return (
            <View>

                <View>
                    <TextInput
                        onChangeText={(text) => this.setState({ loginName: text })}
                        ></TextInput>
                    <TextInput
                        onChangeText={(text) => this.setState({ password: text })}
                        ></TextInput>
                    <TouchableOpacity
                        onPress={() => this.login()}
                        >
                        <Text>
                            登录
                        </Text>
                    </TouchableOpacity>
                    <Text>
                        {this.state.result}
                    </Text>
                </View>
            </View>
        )
    }

    login() {
        console.info('login', this.state.loginName, this.state.password)

        let formData = new FormData();
        formData.append("username", this.state.loginName);
        formData.append("password", this.state.password);
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
                this.setState({ result: JSON.stringify(jsonObj) });
            })
            .catch((error) => { console.info(error) })


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
