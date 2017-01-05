import React, { Component } from 'react';
import { Text, View } from 'react-native';

class TestFetch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            str: 'xx'
        }
        this.initData()
    }

    initData() {
        fetch("http://www.97gyl.com.cn")
        fetch("http://www.97gyl.com", {
            method: 'post',
            headers: {

            },
            body: JSON.stringify({
                a: 'a',
                b: 'b'
            })
        })
        fetch('http://www.97gyl.com/download/testlist.json')
            .then((response) => {
                // console.info(response)
                let jsonObj = response.json()
                return jsonObj
            })
            .then((responseJson) => {
                console.info(responseJson.data)
                this.setState({ str: responseJson.msg });
            })
            .catch((error) => {
                console.info(error)
                this.setState({ str: '请求失败' });
            })


    }

    render() {
        return (
            <Text>
                {this.state.str}
            </Text>
        );
    }
}

export default TestFetch;