import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
    ViewPagerAndroid,
} from 'react-native';

import MainFunctionGrid from './MainFunctionGrid'
import ContactsList from './ContactsList'
import FunctionList from './FunctionList'
import AboutMe from './AboutMe'
import BackAndroidHelper from './android/BackAndroidHelper'

//82X102
let iconWidth = 24.6//20.5
let iconHeight = 30.6//25.5
let windowWidth = Dimensions.get('window').width

export default class MainPage extends Component {

    itemList = [
        '首页',
        '通讯录',
        '功能',
        '我'
    ]

    constructor(props) {
        super(props);
        this.state = {
            scrollEnabled: true,
            resetMainPageState: false,
            titleStr: this.itemList[0],
            currentPageIndex: 0,
        }
        console.info(this.props.navigator.getCurrentRoutes().length)
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#FFFFFF'
            }}>
                <View
                    style={{
                        backgroundColor: '#37ACFE',
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    >
                    <Text
                        style={{
                            color: '#FFFFFF',
                            fontSize: 20,

                        }}
                        >{this.state.titleStr}</Text>
                </View>
                {Platform.OS == 'android' ?
                    <ViewPagerAndroid
                        ref="viewPager"
                        // scrollEnabled={this.state.scrollEnabled}  //viewPager在子view处理触摸事件后会默认释放拦截
                        style={{ flex: 1 }}
                        initialPage={0}
                        onPageScroll={(evt) => {
                            console.info('page move ...' + evt.nativeEvent.position + "  " + evt.nativeEvent.offset)
                            if (evt.nativeEvent.offset == 0 && this.state.resetMainPageState) {
                                this.setState({ resetMainPageState: false });
                            }
                            if (evt.nativeEvent.offset != 0 && !this.state.resetMainPageState) {
                                this.setState({ resetMainPageState: true });
                            }
                        } }
                        onPageScrollStateChanged={(state) => {
                            console.info(state)
                            if ('idle' == state && this.state.resetMainPageState) {
                                this.setState({ resetMainPageState: false });
                            }
                        } }
                        onPageSelected={(event) => {
                            let index = event.nativeEvent.position
                            if (this.state.currentPageIndex != index) {
                                this.setState({ titleStr: this.itemList[index], currentPageIndex: index });
                            }
                        } }
                        >
                        {this._renderPagerViews()}
                    </ViewPagerAndroid>
                    :
                    <ScrollView
                        ref="scrollView"
                        scrollEnabled={this.state.scrollEnabled}
                        style={{ flex: 1 }}
                        pagingEnabled={true}
                        horizontal={true}
                        onScroll={(evt) => {
                            console.info(this.refs.length)
                            this.refs.mainGrid.resetGridViewTouchState("bb")

                            let offset = evt.nativeEvent.contentOffset.x;
                            // console.info(offset)
                            let p = Math.floor(offset / windowWidth)
                            let x = Math.round((offset % windowWidth) / windowWidth)
                            let index = p + x
                            if (this.state.currentPageIndex != index) {
                                this.setState({ titleStr: this.itemList[p + x], currentPageIndex: index });
                            }
                        } }
                        showsHorizontalScrollIndicator={false}
                        >
                        {this._renderPagerViews()}
                    </ScrollView>
                }
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                        borderTopColor: '#F2F1F2',
                        borderTopWidth: 1,
                        height: 62
                    }}>
                    {this.itemList.map((value, index) => {
                        return this._renderItemButton(value, index)
                    })}
                </View>
            </View>
        )
    }

    _renderPagerViews() {
        let am = new AboutMe()
        return ([
            <MainFunctionGrid
                resetState={this.state.resetMainPageState}
                key={0}
                ref='mainGrid'
                onDragStart={() => {
                    if (this.state.scrollEnabled) {
                        this.setState({ scrollEnabled: false });
                    }
                } }
                onDragEnd={() => {
                    if (!this.state.scrollEnabled) {
                        this.setState({ scrollEnabled: true });
                    }
                } }
                style={mainStyles.pageView}
                navigator={this.props.navigator}
                />,
            <ContactsList key={1} style={mainStyles.pageView} />,
            <FunctionList key={2} style={mainStyles.pageView} />,
            am.render()
        ])
    }

    _renderItemButton(text, index) {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    if (this.state.currentPageIndex != index) {
                        this.setState({ titleStr: this.itemList[index], currentPageIndex: index });
                    }
                    if (Platform.OS == 'android') {
                        this.refs.viewPager.setPage(index)
                    } else {
                        this.refs.scrollView.scrollTo({ x: index * windowWidth, y: 0, animated: true })
                    }
                } }
                >
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 10
                    }}
                    >
                    <Image style={mainStyles.icon}
                        source={this.getItemButtonIcon(index)} />
                    <Text style={mainStyles.iconLabel} >
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    getItemButtonIcon(index) {
        switch (index) {
            case 0:
                return require('./resource/img/iconmain/main_home0.png')
            case 1:
                return require('./resource/img/iconmain/main_contacts_0.png')
            case 2:
                return require('./resource/img/iconmain/main_function0.png')
            case 3:
                return require('./resource/img/iconmain/main_me0.png')
        }
    }

    componentWillMount() {
        BackAndroidHelper.register(this.props.navigator)
    }

    componentWillUnmount() {
        BackAndroidHelper.unRegister()
    }


}



const mainStyles = StyleSheet.create({
    pageView: {
        width: windowWidth
    },
    icon: {
        width: iconWidth,
        height: iconHeight
    },
    iconLabel: {
        marginTop: 2,
        fontSize: 12,
        color: '#999999',
        //#38ADFF
    }
})