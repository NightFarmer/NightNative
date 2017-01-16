package com.nightnative;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.nightnative.widget.swiperefresh.SwipeRefreshLayoutManager2;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by zhangfan on 2017/1/16 0016.
 */

public class MyExReactPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        ArrayList<ViewManager> modules = new ArrayList<>();
        modules.add(new SwipeRefreshLayoutManager2());
        return modules;
    }
}
