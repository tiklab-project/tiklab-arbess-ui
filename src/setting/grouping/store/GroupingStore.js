import {action} from "mobx";
import {Axios,getUser} from "tiklab-core-ui";
import {message} from "antd";

class GroupingStore {

    /**
     * 添加分组管理
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
            message.info(`添加成功`)
        }
        else {
            message.info(`添加失败`)
        }
        return data
    }

    /**
     * 删除分组管理
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteGroup =async value =>{
        const param = new FormData()
        param.append("groupId",value)
        const data = await Axios.post("/group/deleteGroup",param)
        if(data.code===0){
            message.info(`删除成功`)
        }
        else {
            message.info(`删除失败`)
        }
        return data
    }

    /**
     * 更新分组管理
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateGroup =async value =>{
        const data = await Axios.post("/group/updateGroup",value)
        if(data.code===0){
            message.info(`修改成功`)
        }
        else {
            message.info(`修改失败`)
        }
        return data
    }

    /**
     * 获取分组管理
     * @returns {Promise<unknown>}
     */
    @action
    findGroupList =async ()=>{
        return await Axios.post("/group/findGroupList",{})
    }

    /**
     * 获取分组管理
     * @returns {Promise<unknown>}
     */
    @action
    findGroupPage = async value=>{
        return await Axios.post("/group/findGroupPage",value)
    }

}

export default new GroupingStore();
