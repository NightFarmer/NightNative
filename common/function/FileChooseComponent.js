import React, { Component } from 'react';
import {
    Text,
    View,
    Platform,
    ScrollView,
    TouchableOpacity,
    ListView,
    Image,
    Navigator,
} from 'react-native';

import FileUtils from './FileUtils'

var RNFS = require('react-native-fs')
const FileOpener = require('react-native-file-opener');

const SavePath = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalStorageDirectoryPath;

export default class FileChooseComponent extends Component {
    initialRoute = {
        title: '',
        rootPath: SavePath
    }
    render() {
        return (
            <Navigator
                initialRoute={this.initialRoute}
                renderScene={(route, navigator) => {
                    return <FileChoosePage {...route} navigator={navigator} />
                } }
                />
        )
    }
}


class FileChoosePage extends Component {

    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    constructor(props) {
        super(props);
        this.state = {
            rowData: [],
            dataSource: this.ds.cloneWithRows([])
        }
        this.pushFolder(this.props.rootPath)
    }

    render() {
        return (
            <ListView
                ref='listView'
                enableEmptySections={true}
                style={{ flex: 1, backgroundColor: '#FFFFFF' }}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <Row data={rowData} onClick={this._onClick.bind(this)} />}
                />
        )
    }

    _onClick(data) {

        if (!data.isRoot && data.isDirectory()) {
            // this.pushFolder(data.path)
            this.props.navigator.push({
                rootPath: data.path
            })
            return;
        }
        if (data.isRoot) {
            this.popFolder()
            return;
        }
        if (data.isFile()) {
            let mime = FileUtils.getMIME(data.name)
            FileOpener.open(
                data.path,
                mime
            ).then((msg) => {
                console.log('success!!')
            }, () => {
                console.log('error!!')
            });
        }
    }

    goBackFolder = {
        name: '返回上一页',
        isDirectory() {
            return true
        },
        isRoot: true,
    }

    popFolder() {
        this.props.navigator.pop()
    }

    pushFolder(path) {
        console.info('go path ', path)
        RNFS.readDir(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined), on iOS use 'MainBundlePath'
            .then((result) => {
                if (path != SavePath) {
                    result = [this.goBackFolder].concat(result)
                }
                this.sortFileList(result)
                this.setState({ dataSource: this.ds.cloneWithRows(result) });
            })
            .catch((err) => {
                console.log(err.message, err.code);
            });
    }

    sortFileList(fileList) {
        fileList.sort((a, b) => {
            if (a.isRoot) return -1;
            if (b.isRoot) return 1;
            let a1 = a.isDirectory() ? 0 : 1;
            let b1 = b.isDirectory() ? 0 : 1;
            if (a1 == b1) {
                return a.name.localeCompare(b.name);
            }
            return a1 - b1
        })
    }
}



class Row extends Component {

    render() {
        let rightArrow = null
        let fileTypeImage = require('../resource/img/format_folder.png')
        if (this.props.data.isDirectory()) {
            rightArrow = (
                <Image
                    style={{ height: 16.8, width: 8.8, marginRight: 10 }}
                    source={require('../resource/img/arrow_right.png')} />
            )
        } else {
            fileTypeImage = FileUtils.getIcon(this.props.data.name)
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.onClick(this.props.data)
                } }
                style={{ flex: 1, height: 60, justifyContent: 'center' }}>
                <View style={{ flex: 1, padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 35, height: 35, marginRight: 10 }} source={fileTypeImage} />
                    <View style={{ flex: 1 }}>
                        <Text>
                            {this.props.data.name}
                        </Text>
                    </View>
                    {rightArrow}
                </View>
                <View style={{ backgroundColor: '#D2D2D2', height: 1, marginLeft: 10, marginRight: 10 }} />
            </TouchableOpacity>
        )
    }
}