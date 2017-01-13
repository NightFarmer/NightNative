import React, { Component } from 'react';
import {
    Text,
    View,
    Navigator,
} from 'react-native';

import SplashPage from './SplashPage'
import MLP from './function/MessageListPage4'

export default class App extends Component {

    initialRoute = {
        title: 'login',
        component: MLP
    }

    render() {
        return (
            <Navigator
                initialRoute={this.initialRoute}
                renderScene={(route, navigator) => {
                    let NextComponent = route.component
                    return <NextComponent {...route.params} navigator={navigator} />
                } }
                />
        )
    }
}