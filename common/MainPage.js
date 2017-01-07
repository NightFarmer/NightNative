import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

import MainFunctionGrid from './MainFunctionGrid'
import ContactsList from './ContactsList'
import FunctionList from './FunctionList'
import AboutMe from './AboutMe'


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
            scrollEnabled: true
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
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
                        >标题</Text>
                </View>
                <ScrollView
                    ref="scrollView"
                    scrollEnabled={this.state.scrollEnabled}
                    style={{ flex: 1 }}
                    pagingEnabled={true}
                    horizontal={true}
                    onScroll={(evt)=>{
                        this.refs.mainGrid.resetGridViewTouchState("bb")
                    }}
                    showsHorizontalScrollIndicator={false}
                    >
                    <MainFunctionGrid
                        ref = 'mainGrid'
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
                        style={mainStyles.pageView} />
                    <ContactsList style={mainStyles.pageView} />
                    <FunctionList style={mainStyles.pageView} />
                    <AboutMe style={mainStyles.pageView} />
                </ScrollView>
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

    _renderItemButton(text, index) {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    this.refs.scrollView.scrollTo({ x: index * windowWidth, y: 0, animated: true })
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