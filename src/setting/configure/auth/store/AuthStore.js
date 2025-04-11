import {action} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

class AuthStore {

    /**
     * 添加认证
     * @param values
     * @returns {Promise<*>}
     */
    @action
    createAuth =async values =>{
        const data = await Axios.post("/auth/createAuth",values)
        if(data.code===0){
            message.success(`添加成功`)
        } else {
            message.error(`添加失败`)
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
            message.success(`删除成功`)
        } else {
            message.error(`删除失败`)
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
            message.success(`修改成功`)
        } else {
            message.error(`修改失败`)
        }
        return data
    }

    /**
     * 获取认证数据
     * @returns {Promise<unknown>}
     */
    @action
    findAllAuth =async ()=>{
        return await Axios.post("/auth/findAllAuth")
    }

}

const authStore = new AuthStore();
export default authStore
