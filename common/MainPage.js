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


let iconSize = 30
let windowWidth = Dimensions.get('window').width

export default class MainPage extends Component {

    itemList = [
        'A',
        'B',
        'C',
        'D'
    ]

    constructor(props) {
        super(props);
        this.state = {
            scrollEnabled: true,
            resetMainPageState: false,
            titleStr: "标题0",
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
                        backgroundColor: '#7777FF',
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
                                this.setState({ titleStr: "标题" + index, currentPageIndex: index });
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

                            let offset = e.nativeEvent.contentOffset.x;
                            // console.info(offset)
                            let p = Math.floor(offset / windowWidth)
                            let x = Math.round((offset % windowWidth) / windowWidth)
                            let index = p + x
                            if (this.state.currentPageIndex != index) {
                                this.setState({ titleStr: "标题" + (p + x), currentPageIndex: index });
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
                        borderTopColor: '#ff0000',
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
        return ([
            <MainFunctionGrid
                resetState={this.state.resetMainPageState}
                key={0}
                ref={(aaa) => { console.info(11111111111111111111111111) } }
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
            <AboutMe key={3} style={mainStyles.pageView} />
        ])
    }

    _renderItemButton(text, index) {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    if (this.state.currentPageIndex != index) {
                        this.setState({ titleStr: "标题" + index, currentPageIndex: index });
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
                        source={require('./resource/img/func1.png')} />
                    <Text style={mainStyles.iconLabel} >
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        )
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
        width: iconSize,
        height: iconSize
    },
    iconLabel: {
        marginTop: 2,
        fontSize: 15,
    }
})