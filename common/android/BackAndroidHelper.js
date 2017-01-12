/**
 * Created by zhangfan on 2016/9/28 0028.
 */

import {
    Platform,
    ToastAndroid,
    BackAndroid,
} from 'react-native'

BackAndroidHelper = {

    listener: null,

    register: function (navigator) {
        if (Platform.OS === 'android') {
            this.listener = ()=>this.onBackAndroid(navigator);
            BackAndroid.addEventListener('hardwareBackPress', this.listener);
        }
    },
    unRegister: function () {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.listener);
        }
    },
    handle: function (scene, onBackPress) {
        const routers = scene.props.navigator.getCurrentRoutes();
        routers[routers.length - 1].onBackPress = onBackPress
    },

    /**
     * 返回键监听
     * @returns {boolean}
     */
    onBackAndroid: (navigator) => {
        const routers = navigator.getCurrentRoutes();
        if (routers.length > 1) {
            let topRouter = routers[routers.length - 1];
            if (topRouter.onBackPress && topRouter.onBackPress()) {
                return true;
            }
            navigator.pop();
            return true;
        }
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    }


}
;

export default BackAndroidHelper

