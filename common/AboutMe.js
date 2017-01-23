import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    Image,
} from 'react-native';

let windowWidth = Dimensions.get('window').width

export default class AboutMe extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     }
    // }

    render() {
        return (
            <View
                key={3}
                style={[styles.container]}
                >
                <View style={{ height: 100 }}>

                </View>
                <View style={{ height: 20, backgroundColor: '#FAFAFA', borderTopWidth: StyleSheet.hairlineWidth, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#DBDBDB', borderTopColor: '#DBDBDB' }}>

                </View>
                <TouchableHighlight onPress={() => { } } underlayColor='#EEE' style={styles.itemRowWraper}>
                    <View style={styles.itemRow}>
                        <Image source={require('./resource/img/icon/share.png')} style={styles.itemIcon} />
                        <Text style={styles.itemText}>好友分享</Text>
                        {this.renderRightArrow()}
                    </View>
                </TouchableHighlight>
                <View style={{ backgroundColor: '#EBE8E6', height: StyleSheet.hairlineWidth, marginLeft: 10, marginRight: 10 }} />
                <TouchableHighlight onPress={() => { } } underlayColor='#EEE' style={styles.itemRowWraper}>
                    <View style={styles.itemRow}>
                        <Image source={require('./resource/img/icon/setting.png')} style={styles.itemIcon} />
                        <Text style={styles.itemText}>系统设置</Text>
                        {this.renderRightArrow()}
                    </View>
                </TouchableHighlight>
                <View style={{ backgroundColor: '#EBE8E6', height: StyleSheet.hairlineWidth, marginLeft: 10, marginRight: 10 }} />
                <TouchableHighlight onPress={() => { } } underlayColor='#EEE' style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#DBDBDB', height: 70, justifyContent: 'center' }} >
                    <View style={styles.itemRow}>
                        <Image source={require('./resource/img/icon/about.png')} style={styles.itemIcon} />
                        <Text style={styles.itemText}>关于我们</Text>
                        {this.renderRightArrow()}
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    renderRightArrow() {
        return <Image
            style={{ height: 14.3, width: 8.8, marginRight: 15 }}
            source={require('./resource/img/account_ic_right_arrow.png')}
            />
    }
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth
    },
    itemRowWraper: { height: 70, justifyContent: 'center' },
    itemRow: { flexDirection: 'row', alignItems: 'center', paddingLeft: 15 },
    itemText: { fontSize: 15, color: '#343434', paddingLeft: 10, flex: 1 },
    itemIcon: { width: 40, height: 40 }
})