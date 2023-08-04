import moment from "moment";

/**
 * 系统时间
 */
export default {
    moment:moment().format("YYYY-MM-DD HH:mm:ss"), //当前时间
    time:moment().format("HH:mm"),
}

/**
 * 获取url里面的值(code)
 * @param name
 * @returns {string|boolean}
 */
export const getUrlParam = name => {
    // 取得url中?后面的字符
    const query = window.location.search.substring(1);
    // 把参数按&拆分成数组
    const param_arr = query.split("&");
    for (let i = 0; i < param_arr.length; i++) {
        let pair = param_arr[i].split("=");
        if (pair[0] === name) {
            return pair[1]
        }
    }
    return false
}

/**
 * 监听浏览器高度
 * @returns {number}
 */
export const autoHeight = () =>{
    let winHeight=0
    if (window.innerHeight)
        winHeight = window.innerHeight
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight
    if (document.documentElement && document.documentElement.clientHeight)
        winHeight = document.documentElement.clientHeight
    return winHeight-120
}

/**
 * 时间转换
 * @param time
 * @returns {string}
 */
export const getTime = time =>{
    let DateTimes ;
    let days = parseInt(time / ( 60 * 60 * 24));
    let hours = parseInt((time % ( 60 * 60 * 24)) / (60 * 60));
    let minutes = parseInt((time % ( 60 * 60)) /60);
    let seconds =  parseInt(time % 60);
    if(days >= 1){
        DateTimes= days + " 天 " + hours + " 时 " + minutes + " 分 " + seconds + " 秒"
    }else if(hours >= 1){
        DateTimes=hours + " 时 " + minutes + " 分 " + seconds + " 秒"
    }else if(minutes >= 1){
        DateTimes=minutes + " 分 " + seconds + " 秒"
    }else{
        DateTimes=seconds + " 秒"
    }
    return DateTimes
}

/**
 * 文件路径截取
 * @param url:路径
 * @param data:截取数据
 * @returns {*}
 */
export const interceptUrl = (url,data) =>{
    if(data){
        return url.split('/index/pipeline/'+data)
    }
    else {
        return url.split('/')
    }
}

/**
 *  form input效验
 * @param name：名称
 * @returns {{pattern: RegExp, message: string}}
 * @constructor
 */
export const Validation = name =>{
    return {
        pattern:/^[^\s]*$/,
        message:`${name}不能包含空格`
    }
}
