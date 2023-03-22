const api =  "http://192.168.10.21:8089";
const base_url = JSON.stringify(api);

const url = "http://127.0.0.1:3004";
const plugin_base_url = JSON.stringify(url);

let pluginAddressUrl = `/pluginConfig/getPluginConfig`;
pluginAddressUrl = JSON.stringify(pluginAddressUrl);

// 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false
const userProduction = false; // 权限

const devProduction = true; // 基础数据

let fetchMethod = "post"
fetchMethod = JSON.stringify(fetchMethod);

let env = "dev";
env = JSON.stringify(env)

const appKey = JSON.stringify("");
const appSecret = JSON.stringify("");
const version = JSON.stringify("ce");
const client = JSON.stringify("web");

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
