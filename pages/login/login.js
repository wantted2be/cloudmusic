// pages/login/login.js
import request from '../../utils/request.js';
/**
 * 1.收集表单项数据
 * 2.前端验证
 *    验证账号密码是否合法
 *    前端验证不通过，不发请求
 *    前端验证通过了 发请求给后端
 * 3.后端验证
 *    验证用户是否存在
 *    用户不存在直接返回
 */
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone:'',  //手机号
        password:'',  //密码
    },

    //表单项内容发出改变时
    handleInput(event){
        // let type = event.currentTarget.id;
        let type = event.currentTarget.dataset.type;
        console.log(type, event.detail.value);
        this.setData({
            [type]:event.detail.value
        });
    },
    async login(){
        let {phone,password} = this.data;
        if(!phone){
            wx.showToast({
              title: '手机号码呢？你吃了？',
              icon:'none'
            })
            return;
        };
        let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        if(!phoneReg.test(phone)){
            wx.showToast({
                title: '哎呦，手机号码格式都错啦',
                icon:'none'
            })
            return;
        };
        if(!password){
            wx.showToast({
              title: '密码呢？你吃了？',
              icon:'none'
            })
            return;  
        }
        let result = await request('/login/cellphone',{phone,password,isLogin:true});
        if(result.code === 200){
            wx.showToast({
              title: 'login successfully',
              icon:'none'
            });
            //将用户的信息存储在本地
            wx.setStorageSync('userInfo', JSON.stringify(result.profile));
            wx.reLaunch({
              url: '/pages/personal/personal',
            });
        }else if(result.code === 400){
            wx.showToast({
              title: '手机号错误',
              icon:'none'
            })
        }else if(result.code === 502){
            wx.showToast({
              title: '密码错误',
              icon:'none'
            })
        }else{
            wx.showToast({
              title: '未知错误',
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
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