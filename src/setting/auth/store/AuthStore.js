import {action,observable} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

export class AuthStore {

    // 刷新
    @observable
    authFresh = false

    // 认证添加编辑弹出框状态
    @observable
    modalVisible = false

    // 认证添加编辑弹出框的表单值
    @observable
    formValue = ""

    // 认证配置数据
    @observable
    authList = []

    /**
     * 设置认证添加编辑弹出框状态
     * @param value
     */
    @action
    setModalVisible = value =>{
        this.modalVisible = value
    }

    /**
     * 设置认证添加编辑弹出框的表单值
     * @param value
     */
    @action
    setFormValue = value =>{
        this.formValue = value
    }

    /**
     * 添加认证
     * @param values
     * @returns {Promise<*>}
     */
    @action
    createAuth =async values =>{
        const data = await Axios.post("/auth/createAuth",values)
        if(data.code===0){
            this.authFresh = !this.authFresh
            message.info(`添加成功`)
        }
        else {
            message.info(`添加失败`)
        }
        return data
    }

    /**
     * 删除认证
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteAuth =async value =>{
        const param = new FormData()
        param.append("authId",value)
        const data = await Axios.post("/auth/deleteAuth",param)
        if(data.code===0){
            this.authFresh=!this.authFresh
            message.info(`删除成功`)
        }
        else {
            message.info(`删除失败`)
        }
        return data
    }

    /**
     * 更新认证
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateAuth =async value =>{
        const data = await Axios.post("/auth/updateAuth",value)
        if(data.code===0){
            this.authFresh=!this.authFresh
            message.info(`修改成功`)
        }
        else {
            message.info(`修改失败`)
        }
        return data
    }

    /**
     * 获取认证数据
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAllAuth = async value=>{
        const data = await Axios.post("/auth/findAllAuth")
        if(data.code===0 && data.data){
            this.authList = data.data
        }
        return data
    }

}

export const AUTH_STORE = "authStore"
