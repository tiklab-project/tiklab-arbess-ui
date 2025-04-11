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
            message.success(`添加成功`)
        } else {
            message.error(`添加失败`)
        }
        return data
    }

    /**
     * 获取主机配置
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAuthHostList = async value =>{
        return await Axios.post("/authHost/findAuthHostList", value)
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
            message.success(`删除成功`)
        } else {
            message.error(`删除失败`)
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
            message.success(`修改成功`)
        } else {
            message.error(`修改失败`)
        }
        return data
    }


}

const hostStore = new HostStore();
export default hostStore
