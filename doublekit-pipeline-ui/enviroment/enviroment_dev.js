/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-04-19 15:32:55
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-11-01 15:44:08
 */
const api =  'http://192.168.2.84:8060/';
const base_url = JSON.stringify(api);

const url = "http://127.0.0.1:3004/";
const plugin_base_url = JSON.stringify(url);

let pluginAddressUrl = `${url}/config.json`;
pluginAddressUrl = JSON.stringify(pluginAddressUrl);

// 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false
const userProduction = true;

let fetchMethod = "get"
fetchMethod = JSON.stringify(fetchMethod);

let env = "dev";
env = JSON.stringify(env)

const appKey = JSON.stringify('');
const appSecret = JSON.stringify('');
const version = JSON.stringify('');
const client = JSON.stringify('');
// const authType = JSON.stringify('loc');
// const authUrl = JSON.stringify('http://192.168.2.6:8090/#/login')
const isSaas = true
const plugin_url =  JSON.stringify( 'http://localhost:8080/plugins/config.json')
// const authLogOut = JSON.stringify('http://192.168.2.6:8090/#/logout')
const pickerData = JSON.stringify([
    {
        value: 'wiki',
        label: 'Wiki系统',
        url: 'http://192.168.2.10:3001/'
    },
    {
        value: 'apibox',
        label: 'Apibox系统',
        url: 'http://192.168.2.8:3001/'
    },
    {
        value: 'wikital',
        label: 'wikital系统',
        url: 'http://192.168.2.6:8000/'
    }
])
module.exports = {
    base_url,
    userProduction,
    plugin_base_url,
    pluginAddressUrl,
    fetchMethod,
    env,
    appKey,
    appSecret,
    version,
    client,
    isSaas,
    plugin_url,
    pickerData
}