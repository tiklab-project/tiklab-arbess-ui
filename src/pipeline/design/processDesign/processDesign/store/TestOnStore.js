import {action,observable} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

class TestOnStore {

    // 测试空间列表
    @observable
    testSpace = []

    // 测试环境
    @observable
    testEnv = []

    // 测试计划
    @observable
    testPlan = []

    // 关联测试列表
    @observable
    testList = []

    /**
     * 获取teston测试空间
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findTestSpace = async value =>{
        const param = new FormData()
        param.append('authId',value)
        const data = await Axios.post('/testOnAuthorize/findAllRepository',param)
        if(data.code===0){
            this.testSpace = data.data || []
        }
        else {
            message.info(data.msg)
            this.testSpace = []
        }
        return data
    }

    /**
     * 获取teston测试环境
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
        if(data.code===0){
            this.testEnv = data.data || []
        }
        else {
            message.info(data.msg)
            this.testEnv = []
        }
        return data
    }

    /**
     * 获取teston测试计划
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findTestPlan = async value =>{
        const param = new FormData()
        param.append('authId',value.authId)
        param.append('rpyId',value.rpyId)
        const data = await Axios.post('/testOnAuthorize/findAllTestPlan',param)
        if(data.code===0){
            this.testPlan = data.data || []
        }
        else {
            message.info(data.msg)
            this.testPlan = []
        }
        return data
    }

    /**
     * 获取关联的测试列表
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findAllRelevance = async value =>{
        const param = new FormData()
        param.append('pipelineId',value)
        const data = await Axios.post('/testOnRelevance/findAllRelevancePage',value)
        if(data.code===0){
            this.testList = data.data?.dataList || []
        }
        else {
            message.info(data.msg)
            this.testList = []
        }
        return data
    }

    /**
     * 删除关联的测试
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    deleteRelevance = async value =>{
        const param = new FormData()
        param.append('relevanceId',value)
        const data = await Axios.post('/testOnRelevance/deleteRelevance',param)
        if(data.code===0){
            message.info('删除成功',0.5)
        }
        else {
            message.info('删除失败',0.5)
        }
        return data
    }

}

const testOnStore = new TestOnStore();
export default testOnStore
