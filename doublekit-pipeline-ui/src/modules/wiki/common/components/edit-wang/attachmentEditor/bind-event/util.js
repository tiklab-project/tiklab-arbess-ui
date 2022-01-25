/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-13 11:13:51
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-13 11:13:51
 */
export default function getRandom(prefix){
    return prefix + Math.random().toString().slice(2)
}