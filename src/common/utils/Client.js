import moment from "moment";
// import {taskTitle} from "../../pipeline/design/processDesign/gui/TaskTitleIcon";

/**
 * 当前时间
 */
export default {
    moments:moment().format("YYYY-MM-DD HH:mm:ss"),
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
 *  form input效验
 */
export const Validation = name =>{
    return {
        pattern:/^(?=.*\S).+$/,
        message:`${name}不能为全为空格`
    }
}

/**
 * 分页删除
 */
export const deleteSuccessReturnCurrenPage = (totalRecord, pageSize, current) => {
    const maxCurrentCount = current * pageSize;
    const minCurrentCount = (current - 1) * pageSize + 1;
    if (totalRecord >= maxCurrentCount) {
        return current
    }
    if (totalRecord <= minCurrentCount) {
        return current === 1 ? 1 : current - 1
    }
    return current
}

function laterDebounce(func, wait = 50) {
    let timer = 0
    return function (...params) {
        timer && clearTimeout(timer)
        timer = setTimeout(() => func.apply(this, params), wait)
    }
}

/**
 * 立刻执行防抖
 * @param {function} func           防抖函数
 * @param {number} wait             防抖时间间隔
 * @return {function}               返回客户调用函数
 */
function immediateDebounce(func, wait = 50) {
    let timer
    let isRepeat = false // 是否重复点击
    const later = () => setTimeout(() => {
        isRepeat = false // 延时wait后 isRepeat=false，timer=null，便可以调用函数
        timer = null
    }, wait)

    return function (...params) {
        if (!timer && !isRepeat) { // isRepeat=false，timer=null，便可以调用函数
            func.apply(this, params)
        } else {
            isRepeat = true
        }
        timer && clearTimeout(timer)
        timer = later()
    }
}

/**
 * 可配置防抖函数
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
export function debounce(func, wait = 50, immediate = true) {
    return immediate ? immediateDebounce(func, wait) : laterDebounce(func, wait)
}

