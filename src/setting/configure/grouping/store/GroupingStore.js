import {action} from "mobx";
import {Axios,getUser} from "tiklab-core-ui";
import {message} from "antd";

class GroupingStore {

    /**
     * 添加应用管理
     * @param values
     * @returns {Promise<*>}
     */
    @action
    createGroup =async values =>{
        const params = {
            user:{id:getUser().userId},
            ...values
        }
        const data = await Axios.post("/group/createGroup",params)
        if(data.code===0){
            message.success(`添加成功`)
        } else {
            message.error(`添加失败`)
        }
        return data
    }

    /**
     * 删除应用管理
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteGroup =async value =>{
        const param = new FormData()
        param.append("groupId",value)
        const data = await Axios.post("/group/deleteGroup",param)
        if(data.code===0){
            message.success(`删除成功`)
        } else {
            message.error(`删除失败`)
        }
        return data
    }

    /**
     * 更新应用管理
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateGroup =async value =>{
        const data = await Axios.post("/group/updateGroup",value)
        if(data.code===0){
            message.success(`修改成功`)
        } else {
            message.error(`修改失败`)
        }
        return data
    }

    /**
     * 获取应用管理
     * @returns {Promise<unknown>}
     */
    @action
    findGroupList =async ()=>{
        return await Axios.post("/group/findGroupList",{})
    }

    /**
     * 获取应用管理
     * @returns {Promise<unknown>}
     */
    @action
    findGroupPage = async value=>{
        return await Axios.post("/group/findGroupPage",value)
    }

}

export default new GroupingStore();
