import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';


var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
    title: 'Select Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
    quality: 0.5
};

export default class CameraDemo3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: '',
            source: require('../resource/img/func1.png')
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <TouchableOpacity onPress={this.onOpen.bind(this)}>
                    <Text>
                        取图
                    </Text>
                </TouchableOpacity>

                <Text>
                    {this.state.uri}

                </Text>
                <Image
                    resizeMode='contain'
                    style={{ width: 200, height: 200 }}
                    source={this.state.source} />
            </View>
        )
    }

    onOpen() {

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
                this.setState({ result: 'User cancelled image picker' });
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                this.setState({ result: 'ImagePicker Error: ' + response.error });
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                this.setState({ result: 'User tapped custom button: ' + response.customButton });
            }
            else {
                let source;

                // You can display the image using either data...
                source = { uri: 'data:image/jpeg;base64,' + response.data };

                // Or a reference to the platform specific asset location
                if (Platform.OS === 'android') {
                    source = { uri: response.uri };
                } else {
                    source = { uri: response.uri.replace('file://', '') };
                }
                // source = { uri: "https://facebook.github.io/react/img/logo_og.png" }
                this.setState({
                    avatarSource: source,
                    result: JSON.stringify(source),
                    uri: source.uri,
                    source: source
                });
            }
        });
    }
}