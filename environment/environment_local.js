const api =  "https://172.11.1.18:8080:8080";
const base_url = JSON.stringify(api);


const url = "http://127.0.0.1:3004";
const plugin_base_url = JSON.stringify(api);

let pluginAddressUrl = `/pluginConfig/getPluginConfig`;
pluginAddressUrl = JSON.stringify(pluginAddressUrl);

let fetchMethod = "post"
fetchMethod = JSON.stringify(fetchMethod);
// 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false

const userProduction = true; // 权限

const devProduction = true; // 存在基础数据

const appKey = JSON.stringify("");
const appSecret = JSON.stringify("");
const version = JSON.stringify("");
const client = JSON.stringify("");

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
    devProduction,
}
module.exports = {webpackGlobal}
