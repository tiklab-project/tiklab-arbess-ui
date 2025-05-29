import {action} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

class TestHuboStore {

    /**
     * 获取testhubo仓库
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findTestHuboRepositoryList = async value =>{
        return await Axios.post('/testHubo/message/findRepositoryList', value)
    }

    /**
     * 获取testhubo仓库
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findTestHuboRepositoryPage = async value =>{
        return await Axios.post('/testHubo/message/findRepositoryPage', value)
    }

    /**
     * 获取testhubo计划
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findTestHuboPlanList = async value =>{
        return await Axios.post('/testHubo/message/findTestPlanList', value)
    }

    /**
     * 获取testhubo计划
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findTestHuboPlanPage = async value =>{
        return await Axios.post('/testHubo/message/findTestPlanPage', value)
    }

    /**
     * 获取testhubo环境
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findTestHuboEnvList = async value =>{
        return await Axios.post('/testHubo/message/findEnvList', value)
    }

    /**
     * 获取testhubo环境
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findTestHuboEnvPage = async value =>{
        return await Axios.post('/testHubo/message/findEnvPage', value)
    }

    /**
     * 获取testhubo自动化测试列表
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findRelevancePage = async value =>{
        const data = await Axios.post('/testOnRelevance/findRelevancePage',value)
        return data
    }

    /**
     * 删除testhubo自动化测试
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    deleteRelevance = async value =>{
        const param = new FormData()
        param.append('relevanceId',value)
        const data = await Axios.post('/testOnRelevance/deleteRelevance',param)
        if(data.code===0){
            message.success('删除成功')
        } else {
            message.error('删除失败')
        }
        return data
    }

}

const testHuboStore = new TestHuboStore();
export default testHuboStore
