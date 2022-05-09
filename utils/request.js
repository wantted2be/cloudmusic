// 发送Ajax请求
/*
1.封装功能函数
   1.功能点明确
   2.函数内部应该保留固定的代码
   3.将动态的数据抽取称为形参，由使用者根据需求动态传入
2.封装功能组件
    1.功能点明确
    2.函数内部应该保留固定的代码
    3.将动态的数据抽取为prop参数，由使用者根据需求动态传入prop数据
    4.设置组件的必要性和数据类型
*/
import config from "./config"
export default (url, data={},method='GET')=>{
    return new Promise((resolve,reject)=>{
        //new promise
        wx.request({
            url: config.mobileHost + url,
            data: data,
            method:method,
            header:{
                cookie:wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item=>item.indexOf('MUSIC_U') !== -1):''
            },
            success:(res)=>{
                if(data.isLogin){  //登录请求 存储cookies
                    wx.setStorage({
                        key: 'cookies',
                        data: res.cookies
                    })
                }
                resolve(res.data);
            },
            fail:(err)=>{
                console.log("请求失败" + err);
                reject(err);
            }
          })
    })
}
