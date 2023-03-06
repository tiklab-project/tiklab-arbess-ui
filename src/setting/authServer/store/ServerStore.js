import {action,observable} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

export class ServerStore{

    // 刷新
    @observable
    serverFresh = false

    // 服务添加编辑弹出框状态
    @observable
    modalVisible = false

    // 服务添加编辑弹出框的表单值
    @observable
    formValue = ""

    // 服务配置数据
    @observable
    authServerList = []

    // 回调地址
    @observable
    callUrlWarn = ""

    /**
     * 设置服务添加编辑弹出框状态
     * @param value
     */
    @action
    setModalVisible = value =>{
        this.modalVisible = value
    }

    /**
     * 设置服务添加编辑弹出框的表单值
     * @param value
     */
    @action
    setFormValue = value =>{
        this.formValue = value
    }

    /**
     * 添加服务配置
     * @param values
     * @returns {Promise<*>}
     */
    @action
    createAuthServer =async values =>{
        const data = await Axios.post("/authServer/createAuthServer",values)
        if(data.code===0){
            this.serverFresh = !this.serverFresh
            message.info(`添加成功`)
        }
        else {
            message.info(`添加失败`)
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
            this.serverFresh=!this.serverFresh
            message.info(`删除成功`)
        }
        else {
            message.info(`删除失败`)
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
            this.serverFresh=!this.serverFresh
            message.info(`修改成功`)
        }
        else {
            message.info(`修改失败`)
        }
        return data
    }

    /**
     * 获取所有服务配置
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAllAuthServerList = async value=>{
        const param = new FormData()
        param.append("type",value)
        const data = await Axios.post("/authServer/findAllAuthServerList",param)
        if(data.code===0 && data.data){
            this.authServerList = data.data
        }
        return data
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

export const SERVER_STORE = "serverStore"
