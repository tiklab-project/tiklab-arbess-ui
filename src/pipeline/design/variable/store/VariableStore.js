import {action,observable} from "mobx";
import {Axios} from "tiklab-core-ui";

class VariableStore{

    // 刷新
    @observable
    fresh = false

    // 变量数据
    @observable
    variableData = []

    /**
     * 添加变量
     * @param value
     * @returns {Promise<*>}
     */
    @action
    createVariable = async value =>{
        const data = await Axios.post("/pipelineVariable/createVariable",value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
        return data
    }

    /**
     * 删除变量
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteVariable = async value =>{
        const param = new FormData()
        param.append("varId",value)
        const data = await Axios.post("/pipelineVariable/deleteVariable",param)
        if(data.code===0){
            this.fresh=!this.fresh
        }
        return data
    }

    /**
     * 更新变量
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateVariable = async value =>{
        const data = await Axios.post("/pipelineVariable/updateVariable",value)
        if(data.code===0){
            this.fresh=!this.fresh
        }
        return data
    }

    /**
     * 获取所有变量
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAllVariable = async value =>{
        const param = new FormData()
        param.append("taskId",value)
        const data = await Axios.post("/pipelineVariable/findAllVariable",param)
        if(data.code===0){
            this.variableData = data.data && data.data
        }
        return data
    }

}

const variableStore = new VariableStore();
export default variableStore
