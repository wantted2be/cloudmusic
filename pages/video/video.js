// pages/video/video.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoGroupList:[],  //导航的标签数据
        navId:'',  //导航的标识
        videoList:[],  //video列表数据
        videoId:'',  //视频的id表示
        videoUpdateTime:[],  //记录video播放的时间长度
    },
    //获取导航的数据
    async getVideoGroupListData(){
        let videoGroupListData = await request('/video/group/list');
        this.setData({
            videoGroupList:videoGroupListData.data.splice(0,14),
            navId:videoGroupListData.data[0].id
        })
        //获取video列表数据
        this.getVideoList(this.data.navId);
    },
    //获取video列表的数据
    async getVideoList(navId){
        if(!navId){
            return;
        }
        let videoListData = await request('/video/group',{id:navId});
        //关闭消息提示框
        wx.hideLoading();
        let index = 0;
        let videoList = videoListData.datas.map(item=>{
            item.id = index++;
            return item;
        })
        this.setData({
            videoList
        })
    },
    //点击切换导航的回调
    changeNav(event){
        let navId = event.currentTarget.id;
        this.setData({
            navId:navId>>>0,
            videoList:[]
        })
        //显示正在加载
        wx.showLoading({
          title: '你着急起飞啊',
        });
        //动态获取当前导航对应的视频数据
        this.getVideoList(this.data.navId);
    },
    //点击播放或者是继续播放
    handleplay(event){
        /**播放新的视频关闭上一个 */
        //创建控制video的标签实例对象
        let vid = event.currentTarget.id;
        // this.vid !== vid && this.videoContext && this.videoContext.stop();
        // this.vid = vid;
        //更新data中的videoID的状态数据
        this.setData({
          videoId:vid,
        })
        //创建控制video标签的实例
        this.videoContext = wx.createVideoContext(vid);
        //判断当前的视频是否播放过
        // let {videoUpdateTime} = this.data;
        // let videoItem = videoUpdateTime.find( item => item.vid === vid);
        // if(videoItem){
        //     this.videoContext.seek(videoItem.currentTime);
        // }
        //播放
        this.videoContext.play();
    },
    //监听视频播放进度的回调
    handleTimeUpdate(event){
        let videoTimeObj = {
            vid:event.currentTarget.id,
            currentTime:event.detail.currentTime
        };
        let {videoUpdateTime} = this.data;
        //判断数组是否已经存在
        let videoItem = videoUpdateTime.find(item=>item.vid === videoTimeObj.vid);
        if(videoItem){
            videoItem.currentTime = event.detail.currentTime;
        }else{
            videoUpdateTime.push(videoTimeObj);
        }
        this.setData({
            videoUpdateTime:videoUpdateTime
        });
    },
    //视频播放结束调用
    handleEnded(event){
        //移除记录
        let {videoUpdateTime} = this.data;
        videoUpdateTime.splice(videoUpdateTime.findIndex( item => item.vid === event.currentTarget.id),1);
        this.setData({
            videoUpdateTime:videoUpdateTime
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getVideoGroupListData();
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