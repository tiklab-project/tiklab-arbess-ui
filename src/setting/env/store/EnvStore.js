import {action} from "mobx";
import {Axios,getUser} from "thoughtware-core-ui";
import {message} from "antd";

class EnvStore {

    /**
     * 添加环境管理
     * @param values
     * @returns {Promise<*>}
     */
    @action
    createEnv =async values =>{
        const params = {
            user:{id:getUser().userId},
            ...values
        }
        const data = await Axios.post("/env/createEnv",params)
        if(data.code===0){
            message.info(`添加成功`)
        }
        else {
            message.info(`添加失败`)
        }
        return data
    }

    /**
     * 删除环境管理
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteEnv =async value =>{
        const param = new FormData()
        param.append("envId",value)
        const data = await Axios.post("/env/deleteEnv",param)
        if(data.code===0){
            message.info(`删除成功`)
        }
        else {
            message.info(`删除失败`)
        }
        return data
    }

    /**
     * 更新环境管理
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateEnv =async value =>{
        const data = await Axios.post("/env/updateEnv",value)
        if(data.code===0){
            message.info(`修改成功`)
        }
        else {
            message.info(`修改失败`)
        }
        return data
    }

    /**
     * 获取环境管理
     * @returns {Promise<unknown>}
     */
    @action
    findEnvList =async ()=>{
        return await Axios.post("/env/findEnvList",{})
    }

    /**
     * 获取环境管理
     * @returns {Promise<unknown>}
     */
    @action
    findEnvPage = async value=>{
        return await Axios.post("/env/findEnvPage",value)
    }

}

export default new EnvStore();
