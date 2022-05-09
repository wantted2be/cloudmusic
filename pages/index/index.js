// pages/index/index.js
import request from "../../utils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList:[],  //轮播图的数据
        recommendList:[],  //推荐歌单数据
        topList:[],  //排行榜数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function(options) {
        //获取轮播图数据
        let bannerListData = await request('/banner',{type : 2});
        this.setData({
            bannerList:bannerListData.banners
        });
        //获取推荐歌单数据
        let recommendListData = await request('/personalized',{limit : 10});
        this.setData({
            recommendList: recommendListData.result
        });
        //获取排行榜数据
        /*
        * 需要根据idx的取值发送五次请求*/
        let index = 0;
        let resultArray = [];
        while(index < 5){
            let topListData = await request('/top/list',{idx : index++});
            let topListItem = {
                name:topListData.playlist.name,
                //splice会修改源数组，slice不会
                tracks:topListData.playlist.tracks.slice(0,3)
            };
            resultArray.push(topListItem);
        }
        this.setData({
            topList:resultArray
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})