const api =  "/";
const base_url = JSON.stringify(api);

const url = "/";
const plugin_base_url = JSON.stringify(url);

let pluginAddressUrl = `/pluginConfig/getPluginConfig`;
pluginAddressUrl = JSON.stringify(pluginAddressUrl);

// 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false
const userProduction = true;
const devProduction = false;

let fetchMethod = "post"
fetchMethod = JSON.stringify(fetchMethod);

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