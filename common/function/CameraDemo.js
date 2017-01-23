import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';


import ImagePicker from 'react-native-image-crop-picker';


export default class CameraDemo extends Component {

    constructor(props) {
        super(props);
        this.state={
            result:''
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <TouchableOpacity
                    onPress={this.onCamera.bind(this)}
                    >
                    <Text>
                        YO
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.onCamera2.bind(this)}
                    >
                    <Text>
                        YO
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.onCamera3.bind(this)}
                    >
                    <Text>
                        YO
                    </Text>
                </TouchableOpacity>
                <Text>
                    {this.state.result}
                </Text>
            </View>
        )
    }

    onCamera() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            this.setState({result:JSON.stringify(image)});
        });
    }
    onCamera2() {
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            console.log(images);
            this.setState({result:JSON.stringify(image)});
        });
    }
    onCamera3() {
        ImagePicker.openCamera({
            // width: 300,
            // height: 400,
            // cropping: true
        }).then(image => {
            console.log(image);
            this.setState({result:JSON.stringify(image)});
        });
    }
}