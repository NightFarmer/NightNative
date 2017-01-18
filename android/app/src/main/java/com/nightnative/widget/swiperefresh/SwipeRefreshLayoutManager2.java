package com.nightnative.widget.swiperefresh;

import android.graphics.Color;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewProps;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.nightfarmer.lightrefreshlayout.LightRefreshLayout;

import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by zhangfan on 2017/1/16 0016.
 */

/**
 * ViewManager for {@link ReactSwipeRefreshLayout2} which allows the user to "pull to refresh" a
 * child view. Emits an {@code onRefresh} event when this happens.
 */
public class SwipeRefreshLayoutManager2 extends ViewGroupManager<ReactSwipeRefreshLayout2> {

    @Override
    protected ReactSwipeRefreshLayout2 createViewInstance(ThemedReactContext reactContext) {
        ReactSwipeRefreshLayout2 reactSwipeRefreshLayout2 = new ReactSwipeRefreshLayout2(reactContext);
//        reactSwipeRefreshLayout2.setHeadViewProvider(new MySwipeRefreshHead());
        return reactSwipeRefreshLayout2;
    }

    @Override
    public String getName() {
        return "AndroidSwipeRefreshLayout2";
    }

    @ReactProp(name = ViewProps.ENABLED, defaultBoolean = true)
    public void setEnabled(ReactSwipeRefreshLayout2 view, boolean enabled) {
        view.setEnabled(enabled);
    }

    @ReactProp(name = "colors", customType = "ColorArray")
    public void setColors(ReactSwipeRefreshLayout2 view, @Nullable ReadableArray colors) {
        if (colors != null) {
            int[] colorValues = new int[colors.size()];
            for (int i = 0; i < colors.size(); i++) {
                colorValues[i] = colors.getInt(i);
            }
            view.setColorSchemeColors(colorValues);
        } else {
            view.setColorSchemeColors();
        }
    }

    @ReactProp(name = "progressBackgroundColor", defaultInt = Color.TRANSPARENT, customType = "Color")
    public void setProgressBackgroundColor(ReactSwipeRefreshLayout2 view, int color) {
        view.setProgressBackgroundColorSchemeColor(color);
    }

    @ReactProp(name = "size", defaultInt = LightRefreshLayout.DEFAULT)
    public void setSize(ReactSwipeRefreshLayout2 view, int size) {
        view.setSize(size);
    }

    @ReactProp(name = "refreshing")
    public void setRefreshing(ReactSwipeRefreshLayout2 view, boolean refreshing) {
        view.setRefreshing(refreshing);
    }

    @ReactProp(name = "progressViewOffset", defaultFloat = 0)
    public void setProgressViewOffset(final ReactSwipeRefreshLayout2 view, final float offset) {
        view.setProgressViewOffset(offset);
    }

    @Override
    protected void addEventEmitters(
            final ThemedReactContext reactContext,
            final ReactSwipeRefreshLayout2 view) {
        view.setOnRefreshListener(
                new LightRefreshLayout.OnRefreshListener() {
                    @Override
                    public void onCancel() {

                    }

                    @Override
                    public void onRefresh() {
                        reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher()
                                .dispatchEvent(new RefreshEvent(view.getId()));
                    }
                });
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedViewConstants() {
        return MapBuilder.<String, Object>of(
                "SIZE",
                MapBuilder.of("DEFAULT", android.support.v4.widget.SwipeRefreshLayout.DEFAULT, "LARGE", android.support.v4.widget.SwipeRefreshLayout.LARGE));
    }

    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
                .put("topRefresh", MapBuilder.of("registrationName", "onRefresh"))
                .build();
    }
}
