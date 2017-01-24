
import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ListView,
  Platform,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native'

import RefreshControl from '../wedget/RefreshControl2'
import TopBar from '../wedget/CommonTopBar'

import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview'

import TimerEnhance from 'react-native-smart-timer-enhance'

class MessagelistPage extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   isRefreshing: false,
    //   loaded: 0,
    //   rowData: Array.from(new Array(20)).map(
    //     (val, i) => ({ text: 'Initial row ' + i, clicks: 0 })),
    // }

    this._dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      //sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    let dataList = []

    this.state = {
      first: true,
      dataList: dataList,
      dataSource: this._dataSource.cloneWithRows(dataList),
    }
  }

  _onClick(row) {
    row.clicks++;
    this.setState({
      rowData: this.state.rowData,
    });
  }

  componentDidMount() {
    this._pullToRefreshListView.beginRefresh()
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <TopBar {...this.props} title='消息列表'
          rightButtonText='新增'
          onRighButtonPress={() => { } }
          />
        <PullToRefreshListView
          ref={(component) => this._pullToRefreshListView = component}
          viewType={PullToRefreshListView.constants.viewType.listView}
          contentContainerStyle={{ backgroundColor: '#FFF', }}
          style={{ marginTop: Platform.OS == 'ios' ? 64 : 0, }}
          initialListSize={20}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          pageSize={20}
          renderRow={this._renderRow}
          renderHeader={this._renderHeader}
          renderFooter={this._renderFooter}
          //renderSeparator={(sectionID, rowID) => <View style={styles.separator} />}
          onRefresh={this._onRefresh}
          onLoadMore={this._onLoadMore}
          pullUpDistance={40}
          pullUpStayDistance={40}
          pullDownDistance={60}
          pullDownStayDistance={60}
          autoLoadMore={true}
          />
      </View>
    )
  }


  _renderRow = (rowData, sectionID, rowID) => {
    return (
      <TouchableHighlight
        underlayColor='#EEE'
        onPress={() => { } }
        style={styles.thumbnail}>
        <View style={styles.textContainer}>
          <Text>{rowData.text}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  _renderHeader = (viewState) => {
    let {pullState, pullDistancePercent} = viewState
    let {refresh_none, refresh_idle, will_refresh, refreshing, } = PullToRefreshListView.constants.viewState
    pullDistancePercent = Math.round(pullDistancePercent * 100)
    switch (pullState) {
      case refresh_none:
        return (
          <View style={{ height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEE', }}>
            <Text>pull down to refresh</Text>
          </View>
        )
      case refresh_idle:
        return (
          <View style={{ height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEE', }}>
            <Text>pull down to refresh{pullDistancePercent}%</Text>
          </View>
        )
      case will_refresh:
        return (
          <View style={{ height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEE', }}>
            <Text>release to refresh{pullDistancePercent > 100 ? 100 : pullDistancePercent}%</Text>
          </View>
        )
      case refreshing:
        return (
          <View style={{ flexDirection: 'row', height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEE', }}>
            {this._renderActivityIndicator()}<Text>refreshing</Text>
          </View>
        )
    }
  }

  _renderFooter = (viewState) => {
    let {pullState, pullDistancePercent} = viewState
    let {load_more_none, load_more_idle, will_load_more, loading_more, loaded_all, } = PullToRefreshListView.constants.viewState
    pullDistancePercent = Math.round(pullDistancePercent * 100)
    switch (pullState) {
      case load_more_none:
        return (
          <View style={{ height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEE', }}>
            <Text>pull up to load more</Text>
          </View>
        )
      case load_more_idle:
        return (
          <View style={{ height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEE', }}>
            <Text>pull up to load more{pullDistancePercent}%</Text>
          </View>
        )
      case will_load_more:
        return (
          <View style={{ height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEE', }}>
            <Text>release to load more{pullDistancePercent > 100 ? 100 : pullDistancePercent}%</Text>
          </View>
        )
      case loading_more:
        return (
          <View style={{ flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEE', }}>
            {this._renderActivityIndicator()}<Text>loading</Text>
          </View>
        )
      case loaded_all:
        return (
          <View style={{ height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEE', }}>
            <Text>no more</Text>
          </View>
        )
    }
  }

  _onRefresh = () => {
    //console.log('outside _onRefresh start...')

    //simulate request data
    this.setTimeout(() => {

      //console.log('outside _onRefresh end...')
      let addNum = 20
      let refreshedDataList = []
      for (let i = 0; i < addNum; i++) {
        refreshedDataList.push({
          text: `item-${i}`
        })
      }

      this.setState({
        dataList: refreshedDataList,
        dataSource: this._dataSource.cloneWithRows(refreshedDataList),
      })
      this._pullToRefreshListView.endRefresh()

    }, 3000)
  }

  _onLoadMore = () => {
    //console.log('outside _onLoadMore start...')

    this.setTimeout(() => {

      //console.log('outside _onLoadMore end...')

      let length = this.state.dataList.length
      let addNum = 20
      let addedDataList = []
      if (length >= 100) {
        addNum = 3
      }
      for (let i = length; i < length + addNum; i++) {
        addedDataList.push({
          text: `item-${i}`
        })
      }
      let newDataList = this.state.dataList.concat(addedDataList)
      this.setState({
        dataList: newDataList,
        dataSource: this._dataSource.cloneWithRows(newDataList),
      })

      let loadedAll
      if (length >= 100) {
        loadedAll = true
        this._pullToRefreshListView.endLoadMore(loadedAll)
      }
      else {
        loadedAll = false
        this._pullToRefreshListView.endLoadMore(loadedAll)
      }

    }, 3000)
  }

  _renderActivityIndicator() {
    return ActivityIndicator ? (
      <ActivityIndicator
        style={{ marginRight: 10, }}
        animating={true}
        color={'#ff0000'}
        size={'small'} />
    ) : Platform.OS == 'android' ?
        (
          <ProgressBarAndroid
            style={{ marginRight: 10, }}
            color={'#ff0000'}
            styleAttr={'Small'} />

        ) : (
          <ActivityIndicatorIOS
            style={{ marginRight: 10, }}
            animating={true}
            color={'#ff0000'}
            size={'small'} />
        )
  }

}



const styles = StyleSheet.create({
  itemHeader: {
    height: 60,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    backgroundColor: 'blue',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    height: 60,
    //borderBottomWidth: StyleSheet.hairlineWidth,
    //borderBottomColor: '#ccc',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentContainer: {
    paddingTop: 20 + 44,
  },

  thumbnail: {
    padding: 6,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    overflow: 'hidden',
  },

  textContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default TimerEnhance(MessagelistPage)









