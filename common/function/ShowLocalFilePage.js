import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';




// require the module
var RNFS = require('react-native-fs');

// get a list of files and directories in the main bundle
RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined), on iOS use 'MainBundlePath'
    .then((result) => {
        console.log('GOT RESULT', result.length, result[0].path);

        // stat the first file
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .then((statResult) => {
        if (statResult[0].isFile()) {
            // if we have a file, read it
            return RNFS.readFile(statResult[1], 'utf8');
        }

        return 'no file';
    })
    .then((contents) => {
        // log the file contents
        // console.log(contents);
    })
    .catch((err) => {
        console.log(err.message, err.code);
    });

console.info(RNFS.ExternalStorageDirectoryPath)
console.info(RNFS.ExternalDirectoryPath)
console.info(RNFS.TemporaryDirectoryPath)
console.info(RNFS.DocumentDirectoryPath)
console.info(RNFS.CachesDirectoryPath)
console.info(RNFS.MainBundlePath)

export default class ShowLocalFilePage extends Component {


    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>
                </Text>
            </View>
        )
    }
}