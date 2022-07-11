const api =  "http://192.168.10.100:8080";
const base_url = JSON.stringify(api);

const url = "http://127.0.0.1:3004";
const plugin_base_url = JSON.stringify(url);
let pluginAddressUrl = `/pluginConfig/getPluginConfig`;
pluginAddressUrl = JSON.stringify(pluginAddressUrl);

// 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false
const userProduction = false;

let fetchMethod = "post"
fetchMethod = JSON.stringify(fetchMethod);

let env = "dev";
env = JSON.stringify(env)

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
}
module.exports = {webpackGlobal}