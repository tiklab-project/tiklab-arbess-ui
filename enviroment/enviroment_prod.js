/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-04-19 15:58:49
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-01-20 13:23:49
 */
const api =  '/';
const base_url = JSON.stringify(api);

const url = "/";
const plugin_base_url = JSON.stringify(url);

let pluginAddressUrl = `/plugin/getPluginConfig`;
pluginAddressUrl = JSON.stringify(pluginAddressUrl);

// 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false
const userProduction = true;

let fetchMethod = "post"
fetchMethod = JSON.stringify(fetchMethod);

const appKey = JSON.stringify('');
const appSecret = JSON.stringify('');
const version = JSON.stringify('');
const client = JSON.stringify('');

const webpackGlobal = {
    base_url,
    userProduction,
    plugin_base_url,
    pluginAddressUrl,
    fetchMethod,
    appKey,
    appSecret,
    version,
    client,
}
module.exports = {webpackGlobal}