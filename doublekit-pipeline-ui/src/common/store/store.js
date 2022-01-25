/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-07-26 16:43:07
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-07-26 18:33:26
 */
import { observable,action } from "mobx";
import { initPlugins } from "doublekit-plugin-ui";
export class OverAllStore {
    @observable pluginData = [];

    @action
    getPluginConfig = async() => {
        const url = pluginAddressUrl;
        const data = await initPlugins(fetchMethod, url)
        this.pluginData = data
        return data;
    };
}
export const OVERALLSTORE_STORE = "overallStore"