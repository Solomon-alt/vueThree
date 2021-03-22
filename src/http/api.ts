import http from './index'
export default {
     // login({username,password}:{username:string,password:string,query?:string}){

    // } //参数后面一定要补充{username:string,password:string,query?:string}，不然会报错
    // 登录 =============================================================
     // 获取手机验证码 =============================================================
     verify(){
         return http.get('captcha',)
     },
     // 登录 =============================================================
     login({username,password}:{username:string,password:string}){
        return http.post('/user/login',{username:username,password:password})
     }
}