import {action} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

class TestMavenStore {

    /**
     * 获取maven单元测试列表
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findMavenTestPage = async value =>{
        const data = await Axios.post('/maven/test/findMavenTestPage',value)
        return data
    }

    /**
     * 删除maven单元测试列表
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    deleteMavenTest = async value =>{
        const param = new FormData()
        param.append('testId',value)
        const data = await Axios.post('/maven/test/deleteMavenTest',param)
        if(data.code===0){
            message.success('删除成功')
        } else {
            message.error('删除失败')
        }
        return data
    }

    /**
     * 获取maven单元测试
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findMavenTestList = async value =>{
        const data = await Axios.post('/maven/test/findMavenTestList',value)
        return data
    }

}

export default new TestMavenStore();
