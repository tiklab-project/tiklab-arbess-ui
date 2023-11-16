import {action,observable} from "mobx";
import {Axios} from "tiklab-core-ui";

class CondStore{

    /**
     * 添加条件
     * @param value
     * @returns {Promise<*>}
     */
    @action
    createCond = async value =>{
        const data = await Axios.post("/pipelineCond/createCond",value)
        return data
    }

    /**
     * 删除条件
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteCond = async value =>{
        const param = new FormData()
        param.append("condId",value)
        const data = await Axios.post("/pipelineCond/deleteCond",param)
        return data
    }

    /**
     * 更新条件
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateCond = async value =>{
        const data = await Axios.post("/pipelineCond/updateCond",value)
        return data
    }

    /**
     * 获取天剑
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findTaskCond = async value =>{
        const param = new FormData()
        param.append("taskId",value)
        const data = await Axios.post("/pipelineCond/findAllTaskCond",param)
        return data
    }

}

const condStore = new CondStore();
export default condStore
