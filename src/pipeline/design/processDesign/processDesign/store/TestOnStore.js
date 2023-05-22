import {action,observable} from "mobx";
import {Axios} from "tiklab-core-ui";

export class TestOnStore {

    // 测试空间列表
    @observable
    testSpace = []

    // 测试环境
    @observable
    testEnv = []

    // 测试计划
    @observable
    testPlan = []

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
        param.append('rpyName',value.rpyName)
        param.append('env',value.env)
        const data = await Axios.post('/testOnAuthorize/findAllEnv',param)
        if(data.code===0){
            this.testEnv = data.data || []
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
        param.append('rpyName',value.rpyName)
        const data = await Axios.post('/testOnAuthorize/findAllTestPlan',param)
        if(data.code===0){
            this.testPlan = data.data || []
        }
        return data
    }

}

export const TESTON_STORE = "testOnStore"
