import React, { Component } from 'react';
import {
    Text,
    View,
    Platform
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

const FileOpener = require('react-native-file-opener');
const SavePath = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath;
const sampleDocFilePath = SavePath + '/myapp.apk';

RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined), on iOS use 'MainBundlePath'
    .then((result) => {
        console.log('GOT RESULT', result.length, result[0].path);
        console.info(sampleDocFilePath)
        // stat the first file
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .catch((err) => {
        console.log(err.message, err.code);
    });

let filePath = RNFS.ExternalStorageDirectoryPath + '/readConfig.txt';
FileOpener.open(
    filePath,
    getMEME(filePath)
).then(() => {
    console.log('success!!');
}, (e) => {
    console.log('error!!', e);
});

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





function getMEME(filePath) {

    const MIMEMAP = {
        'css': 'text/css',
        'gif': 'image/gif',
        'html': 'text/html',
        'ico': 'image/x-icon',
        'jpeg': 'image/jpeg',
        'jpg': 'image/jpeg',
        'js': 'text/javascript',
        'json': 'application/json',
        'pdf': 'application/pdf',
        'png': 'image/png',
        'svg': 'image/svg+xml',
        'swf': 'application/x-shockwave-flash',
        'tiff': 'image/tiff',
        'txt': 'text/plain',
        'wav': 'audio/x-wav',
        'wma': 'audio/x-ms-wma',
        'wmv': 'video/x-ms-wmv',
        'xml': 'text/xml',
        'apk': 'application/vnd.android.package-archive',
        'avi': 'video/x-msvideo',
        'doc': 'application/msword',
        'dot': 'application/msword',
        'htm': 'text/html',
        'shtml': 'text/html',
        'jpe': 'image/jpeg',
        'mpeg': 'video/mpeg',
        'mpg': 'video/mpeg',
        'mpe': 'video/mpeg',
        'mp3': 'audio/mpeg',
        'qt ': 'video/quicktime',
        'mov': 'video/quicktime',
        'ppt': 'application/mspowerpoint',
        'ppz': 'application/mspowerpoint',
        'pps': 'application/mspowerpoint',
        'pot': 'application/mspowerpoint',
        'rar': 'application/octet-stream',
        'rtf': 'application/rtf',
        'rtx': 'text/richtext',
        'xls': 'application/msexcel',
        'xla': 'application/msexcel',
        'z': 'application/x-compress',
        'zip': 'application/x-zip-compressed',
        'rmvb': 'application/vnd.rn-realmedia',
        'rm': 'application/vnd.rn-realmedia',
        'swf': 'application/x-shockwave-flash',
        'cab': 'application/x-shockwave-flash',
    }

    if (!filePath) {
        return null
    }
    var index1 = filePath.lastIndexOf(".");
    var index2 = filePath.length;
    var postf = filePath.substring(index1 + 1, index2);//后缀名  
    var mime = MIMEMAP[postf]
    if (!mime) {
        return '*/*'
    }
    return mime
}