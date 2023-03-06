import {action,observable} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

export class HostStore {

    // 刷新
    @observable
    hostFresh = false

    // 主机添加编辑弹出框状态
    @observable
    modalVisible = false

    // 主机添加编辑弹出框的表单值
    @observable
    formValue = ""

    // 主机配置数据
    @observable
    hostList = []

    /**
     * 设置主机添加编辑弹出框状态
     * @param value
     */
    @action
    setModalVisible = value =>{
        this.modalVisible = value
    }

    /**
     * 设置主机添加编辑弹出框的表单值
     * @param value
     */
    @action
    setFormValue = value =>{
        this.formValue = value
    }

    /**
     * 添加主机配置
     * @param value
     * @returns {Promise<*>}
     */
    @action
    createAuthHost = async value =>{
        const data = await Axios.post("/authHost/createAuthHost",value)
        if(data.code===0){
            this.hostFresh=!this.hostFresh
            message.info(`添加成功`)
        }
        else {
            message.info(`添加失败`)
        }
        return data
    }

    /**
     * 获取主机配置数据
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAllAuthHostList = async value =>{
        const param = new FormData()
        param.append("type",value)
        const data = await Axios.post("/authHost/findAllAuthHostList",param)
        if(data.code===0 && data.data){
            this.hostList = data.data
        }
        return data
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
            this.hostFresh=!this.hostFresh
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
            this.hostFresh=!this.hostFresh
            message.info(`修改成功`)
        }
        else {
            message.info(`修改失败`)
        }
        return data
    }


}

export const HOST_STORE = "hostStore"
