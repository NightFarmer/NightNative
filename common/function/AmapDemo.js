import React, {
    Component,
} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    NativeAppEventEmitter,
    TouchableHighlight,
    ListView,
    Dimensions,
    Alert,
    Platform,
} from 'react-native'

import AMapLocation from 'react-native-smart-amap-location'
import AMap from 'react-native-smart-amap'
import Button from 'react-native-smart-button'
import AppEventListenerEnhance from 'react-native-smart-app-event-listener-enhance'
// import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview'
// import TimerEnhance from 'react-native-smart-timer-enhance'
// import AMapALoneNearByList from './amp-alone-nearby-list'
// import ListViewActivityIndicator from './ListViewActivityIndicator'

import TopBar from '../wedget/CommonTopBar'

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window')

class AMapDemo extends Component {

    constructor(props) {
        super(props);

        this._amap = null
        this._page = 0
        console.log(`this._coordinate -> `)
        console.log(this._coordinate)
        this._keywords = ''
        this._onDidMoveByUserTimer = null

        this.state = {
            result: ''
        }
    }

    componentDidMount() {
        this.addAppEventListener(
            NativeAppEventEmitter.addListener('amap.location.onLocationResult', this._onLocationResult),
            NativeAppEventEmitter.addListener('amap.onPOISearchDone', this._onPOISearchDone),
            // NativeAppEventEmitter.addListener('amap.onPOISearchFailed', this._onPOISearchFailed)
            NativeAppEventEmitter.addListener('amap.onReGeocodeQueryDone', this._onReGeocodeQueryDone),
        )
    }

    render() {
        //console.log(`amap-alone render...`)
        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <TopBar {...this.props} title='文件选择'
                    // rightButtonText='新增'
                    // onRighButtonPress={() => { } }
                    />
                <View style={{ position: 'relative', height: (deviceHeight - (Platform.OS == 'ios' ? 64 : 56)) - 50 * 5, }}>
                    <AMap
                        ref={component => this._amap = component}
                        style={{ flex: 1, height: 300 }}
                        options={{
                            frame: {
                                width: deviceWidth,
                                // height: (deviceHeight - 64) - 50 * 5
                                height: 300
                            },
                            showsUserLocation: false,
                            userTrackingMode: Platform.OS == 'ios' ? AMap.constants.userTrackingMode.none : null,
                            centerCoordinate: {
                                latitude: 34.7837895376,
                                longitude: 113.6923388579,
                            },
                            zoomLevel: 18.1,
                            centerMarker: Platform.OS == 'ios' ? 'icon_location' : 'poi_marker',
                        }}
                        onLayout={this._onLayout}
                        onDidMoveByUser={this._onDidMoveByUser}
                        onMoveShouldSetResponder={()=>true}
                        onResponderTerminationRequest={() => false}
                        />
                    <Button
                        touchableType={Button.constants.touchableTypes.highlight}
                        underlayColor={'#ccc'}
                        style={{ padding: 5, position: 'absolute', left: 10, bottom: 20, backgroundColor: '#fff', justifyContent: 'center', borderRadius: 3, borderWidth: StyleSheet.hairlineWidth, borderColor: '#ffffff' }}
                        onPress={() => {
                            AMapLocation.init(null)
                            AMapLocation.getLocation()
                            //this._activityIndicator.setState({ visible: true,})
                        } }>
                        <Image source={{ uri: Platform.OS == 'ios' ? 'gpsStat1' : 'gps_stat1' }} style={{ width: 28, height: 28, }} />
                    </Button>
                </View>
                <Text>
                    {this.state.result}
                </Text>
            </View>
        )
    }

    _onDidMoveByUser = (e) => {
        console.log(`_onDidMoveByUser....`)
        if (this._onDidMoveByUserTimer) {
            clearTimeout(this._onDidMoveByUserTimer)
            this._onDidMoveByUserTimer = null
        }
        let { longitude, latitude, } = e.nativeEvent.data.centerCoordinate
        this._onDidMoveByUserTimer = setTimeout(() => {

            // let {refresh_none, refresh_idle, load_more_none, load_more_idle, loaded_all, } = PullToRefreshListView.constants.viewState
            // if ((this._amapALoneNearByList._pullToRefreshListView._refreshState == refresh_none || this._amapALoneNearByList._pullToRefreshListView._refreshState == refresh_idle)
            //     && (this._amapALoneNearByList._pullToRefreshListView._loadMoreState == load_more_none
            //         || this._amapALoneNearByList._pullToRefreshListView._loadMoreState == load_more_idle
            //         || this._amapALoneNearByList._pullToRefreshListView._loadMoreState == loaded_all)) {
            //     console.log(`beginRefresh(true)....`)
            //     this._coordinate = {
            //         longitude,
            //         latitude,
            //     }
            //     this._activityIndicator.setState({ visible: true, })
            //     this._amapALoneNearByList._pullToRefreshListView._scrollView.scrollTo({ y: 0, animated: false, })
            //     this._amapALoneNearByList._pullToRefreshListView.beginRefresh(true)
            //     //this._amapALoneNearByList._pullToRefreshListView.beginRefresh()
            //     this._beginRefresh = true
            // }
        }, 300)
        this._coordinate = {
            longitude,
            latitude,
        }
        console.info(latitude, longitude)
        this._searchNearBy({
            page: (this._page = 1),
            coordinate: this._coordinate,
            keywords: this._keywords,
        })
    }

    _onReGeocodeQueryDone = (result) => {
        console.info(JSON.stringify(result))
        this.setState({ result: JSON.stringify(result) });
    }

    _onPOISearchDone = (result) => {
        console.log(`_onPOISearchDone...`, result.searchResultList, result.error)

        // if (Platform.OS == 'ios') {
        //     this._endSearch(result)
        // }
        // else {
        //     this.setTimeout(() => {
        //         this._endSearch(result)
        //     }, 255)
    }

    _searchNearBy = (searchParams) => {
        this._amap.searchPoiByCenterCoordinate(searchParams)
        this._amap.reGeocodeQuery(searchParams.coordinate)
    }

    _onLocationResult = (result) => {
        if (result.error) {
            console.log(`map-错误代码: ${result.error.code}, map-错误信息: ${result.error.localizedDescription}`)
            this.setState({ result: `map-错误代码: ${result.error.code}, map-错误信息: ${result.error.localizedDescription}` });
        }
        else {
            // if (result.formattedAddress) {
            console.log(`map-格式化地址 = ${result.formattedAddress}`)
            this.setState({ result: JSON.stringify(result) })
            // }
            // else {
            //     console.log(`map-纬度 = ${result.coordinate.latitude}, map-经度 = ${result.coordinate.longitude}`)
            //     this._coordinate = {
            //         latitude: result.coordinate.latitude,
            //         longitude: result.coordinate.longitude,
            //     }
            //     this._amap.setOptions({
            //         zoomLevel: 18.1,
            //     })
            //     this._amap.setCenterCoordinate(this._coordinate)
            // }
        }
    }

}

// export default TimerEnhance(AppEventListenerEnhance(AMapDemo))
export default AppEventListenerEnhance(AMapDemo)