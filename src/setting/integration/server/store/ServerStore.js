import {action, observable} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

class ServerStore{

    // 回调地址
    @observable
    callUrlWarn = ""

    /**
     * 添加服务配置
     * @param values
     * @returns {Promise<*>}
     */
    @action
    createAuthServer =async values =>{
        const data = await Axios.post("/authServer/createAuthServer",values)
        if(data.code===0){
            message.success(`添加成功`)
        } else {
            message.error(`添加失败`)
        }
        return data
    }

    /**
     * 删除服务配置
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteAuthServer =async value =>{
        const param = new FormData()
        param.append("serverId",value)
        const data = await Axios.post("/authServer/deleteAuthServer",param)
        if(data.code===0){
            message.success(`删除成功`)
        } else {
            message.error(`删除失败`)
        }
        return data
    }

    /**
     * 更新服务配置
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateAuthServer =async value =>{
        const data = await Axios.post("/authServer/updateAuthServer",value)
        if(data.code===0){
            message.success(`修改成功`)
        } else {
            message.error(`修改失败`)
        }
        return data
    }

    /**
     * 获取所有服务配置
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAuthServerList = async value=>{
        return await Axios.post("/authServer/findAuthServerList", value)
    }

    /**
     * 获取所有服务配置
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAuthServerPage = async value=>{
        return await Axios.post("/authServer/findAuthServerPage", value)
    }

    /**
     * 获取回调地址
     * @param value
     * @returns {Promise<*>}
     */
    @action
    callbackUrl = async value=>{
        const param = new FormData()
        param.append("callbackUrl",value)
        const data = await Axios.post("/codeAuthorize/callbackUrl",param)
        if(data.code===0){
            this.callUrlWarn = data.data
        }
        return data
    }

}

const serverStore  = new ServerStore();
export default serverStore
