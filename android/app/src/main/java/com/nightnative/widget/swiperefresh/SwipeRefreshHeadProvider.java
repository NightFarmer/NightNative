package com.nightnative.widget.swiperefresh;

import android.view.View;
import android.view.ViewGroup;

/**
 * Created by zhangfan on 2017/1/17 0017.
 */

public interface SwipeRefreshHeadProvider<T extends SwipeRefreshHeadProvider.HeadViewHolder> {

    T getHeadView(ViewGroup parent);

    /**
     * 拖拽进度改变时调用，用于更新头部状态
     * @param headHolder 头部viewholder
     * @param progress 拖拽进度，0-1表示没有超过阀值，大于1代表超过阀值
     * @param state 刷新状态，0代表拖拽中，1代表刷新中，2代表刷新完成
     */
    void onProgressChange(T headHolder, float progress, int state);


    class HeadViewHolder {
        public final View headView;

        HeadViewHolder(View headView) {
            this.headView = headView;
        }
    }
}
