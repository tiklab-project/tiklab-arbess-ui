import {action} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

class HostStore {

    /**
     * 添加主机配置
     * @param value
     * @returns {Promise<*>}
     */
    @action
    createAuthHost = async value =>{
        const data = await Axios.post("/authHost/createAuthHost",value)
        if(data.code===0){
            message.info(`添加成功`)
        }
        else {
            message.info(`添加失败`)
        }
        return data
    }

    /**
     * 获取主机配置
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAllAuthHostList = async value =>{
        const param = new FormData()
        param.append("type",value)
        return await Axios.post("/authHost/findAllAuthHostList", param)
    }

    /**
     * 获取主机配置(分页)
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAuthHostPage = async value =>{
        return await Axios.post("/authHost/findAuthHostPage", value)
    }

    /**
     * 删除主机
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteAuthHost =async value =>{
        const param = new FormData()
        param.append("hostId",value)
        const data = await Axios.post("/authHost/deleteAuthHost",param)
        if(data.code===0){
            message.info(`删除成功`)
        }
        else {
            message.info(`删除失败`)
        }
        return data
    }

    /**
     * 更新主机
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateAuthHost =async value =>{
        const data = await Axios.post("/authHost/updateAuthHost",value)
        if(data.code===0){
            message.info(`修改成功`)
        }
        else {
            message.info(`修改失败`)
        }
        return data
    }


}

const hostStore = new HostStore();
export default hostStore
