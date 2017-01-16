package com.nightnative.widget.swiperefresh;

import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by zhangfan on 2017/1/16 0016.
 */

public class RefreshEvent extends Event<com.facebook.react.views.swiperefresh.RefreshEvent> {

    protected RefreshEvent(int viewTag) {
        super(viewTag);
    }

    @Override
    public String getEventName() {
        return "topRefresh";
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), null);
    }
}
