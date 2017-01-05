import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
class TestScrollView extends Component {
    render() {
        return (
            //下面三个属性能模拟viewpager
            <ScrollView
                pagingEnabled={true}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                >
                <Text
                    style={{ width: Dimensions.get('window').width }}
                    >1111</Text>
                <Text
                    style={{ width: Dimensions.get('window').width }}
                    >222</Text>
                <Text
                    style={{ width: Dimensions.get('window').width }}
                    >3333</Text>
                <Text
                    style={{ width: Dimensions.get('window').width }}
                    >4444</Text>
                <Text
                    style={{ width: Dimensions.get('window').width }}
                    >5555</Text>
                <Text
                    style={{ width: Dimensions.get('window').width }}
                    >6666</Text>
                <Text
                    style={{ width: Dimensions.get('window').width }}
                    >7777</Text>

            </ScrollView>
        );
    }
}

export default TestScrollView
    ;