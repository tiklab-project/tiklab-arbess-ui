import {action} from "mobx";
import {Axios} from "thoughtware-core-ui";
import {message} from "antd";

class TestRuboStore {

    /**
     * 获取testrubo测试空间
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findTestSpace = async value =>{
        const param = new FormData()
        param.append('authId',value)
        const data = await Axios.post('/testOnAuthorize/findAllRepository',param)
        if(data.code!==0){
            message.info(data.msg)
        }
        return data
    }

    /**
     * 获取testrubo测试环境
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findTestEnv = async value =>{
        const param = new FormData()
        param.append('authId',value.authId)
        param.append('rpyId',value.rpyId)
        param.append('env',value.env)
        const data = await Axios.post('/testOnAuthorize/findAllEnv',param)
        if(data.code!==0){
            message.info(data.msg)
        }
        return data
    }

    /**
     * 获取testrubo测试计划
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findTestPlan = async value =>{
        const param = new FormData()
        param.append('authId',value.authId)
        param.append('rpyId',value.rpyId)
        const data = await Axios.post('/testOnAuthorize/findAllTestPlan',param)
        if(data.code!==0){
            message.info(data.msg)
        }
        return data
    }

    /**
     * 获取testrubo自动化测试列表
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findAllRelevance = async value =>{
        const data = await Axios.post('/testOnRelevance/findAllRelevancePage',value)
        return data
    }

    /**
     * 删除testrubo自动化测试
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    deleteRelevance = async value =>{
        const param = new FormData()
        param.append('relevanceId',value)
        const data = await Axios.post('/testOnRelevance/deleteRelevance',param)
        if(data.code===0){
            message.info('删除成功')
        } else {
            message.info('删除失败')
        }
        return data
    }

}

const testRuboStore = new TestRuboStore();
export default testRuboStore
