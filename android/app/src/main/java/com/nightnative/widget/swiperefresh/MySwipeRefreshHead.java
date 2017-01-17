package com.nightnative.widget.swiperefresh;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.nightnative.R;

/**
 * Created by zhangfan on 2017/1/17 0017.
 */

public class MySwipeRefreshHead implements SwipeRefreshHeadProvider<MySwipeRefreshHead.HeadViewHolder> {


    @Override
    public MySwipeRefreshHead.HeadViewHolder getHeadView(ViewGroup parent) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.layout_swiper_refresh_head, parent, false);
        return new HeadViewHolder(view);
    }

    @Override
    public void onProgressChange(MySwipeRefreshHead.HeadViewHolder headHolder, float progress, int state) {
        switch (state) {
            case 0: {
                Log.i("aaa", "" + 0 + ", " + progress);
                headHolder.tv_label.setText("..." + progress);
                break;
            }
            case 1: {
                Log.i("aaa", "" + 1 + ", " + progress);
                headHolder.tv_label.setText("○" + progress);
                break;
            }
            case 2: {
                Log.i("aaa", "" + 2 + ", " + progress);
                headHolder.tv_label.setText("√" + progress);
            }
        }
    }

    class HeadViewHolder extends SwipeRefreshHeadProvider.HeadViewHolder {
        TextView tv_label;

        HeadViewHolder(View headView) {
            super(headView);
            tv_label = (TextView) headView.findViewById(R.id.tv_label);
        }
    }
}
