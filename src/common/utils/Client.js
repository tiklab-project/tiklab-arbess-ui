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
 * 文件路径截取
 */
export const interceptUrl = (url,data) =>{
    if(data){
        return url.split('/pipeline/'+data)
    }
    else {
        return url.split('/')
    }
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

/**
 * 防抖
 */
export function debounce(fn, delay) {
    let timer
    return function(...args) {
        if (timer) clearTimeout(timer)
        // 使用箭头函数来处理this问题
        timer = setTimeout(() => fn.apply(this, args), delay)
    }
}

// /**
//  * 模糊搜索
//  * @param search
//  * @param data
//  * @returns {*[]}
//  */
// export const fuzzySearch = (search, data) => {
//     const matches = [];
//     for (let item of data) {
//         if (fuzzyMatch(search, item.title)) {
//             matches.push(item);
//             continue;
//         }
//         // 标记是否匹配当前对象
//         let isMatch = false;
//         // 过滤描述数组
//         const filteredDesc = item.desc.filter(desc => {
//             if (fuzzyMatch(search, taskTitle(desc.type))) {
//                 isMatch = true;
//                 return true;
//             }
//             return false;
//         });
//         if (isMatch) {
//             // 构建过滤后的对象
//             const match = {
//                 id: item.id,
//                 title: item.title,
//                 desc: filteredDesc
//             };
//             matches.push(match);
//         }
//     }
//     return matches;
// }
//
// const fuzzyMatch = (s1, s2) => {
//     const regexp = new RegExp(s1, 'i');
//     return regexp.test(s2);
// }
