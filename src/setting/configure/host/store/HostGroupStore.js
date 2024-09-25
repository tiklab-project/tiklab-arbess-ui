import {action} from "mobx";
import {Axios,getUser} from "thoughtware-core-ui";
import {message} from "antd";

class HostGroupStore {

    /**
     * 获取主机组
     * @returns {Promise<unknown>}
     */
    @action
    findHostGroupList = async () =>{
        const res = await Axios.post("/authHostGroup/findHostGroupList",{})
        return res
    }

    /**
     * 添加主机组
     * @returns {Promise<unknown>}
     */
    @action
    createAuthHostGroup = async value =>{
        const params = {
            user:{ id: getUser().userId},
            ...value
        }
        const res = await Axios.post("/authHostGroup/createAuthHostGroup",params)
        return res
    }

    /**
     * 更新主机组
     * @returns {Promise<unknown>}
     */
    @action
    updateAuthHostGroup = async value =>{
        const params = {
            user:{ id: getUser().userId},
            ...value
        }
        const res = await Axios.post("/authHostGroup/updateAuthHostGroup",params)
        if(res.code===0){
            message.info(`修改成功`)
        } else {
            message.info(`修改失败`)
        }
        return res
    }

    /**
     * 删除主机组
     * @returns {Promise<unknown>}
     */
    @action
    deleteAuthHostGroup = async value =>{
        const params = new FormData();
        params.append("groupId",value)
        const res = await Axios.post("/authHostGroup/deleteAuthHostGroup",params)
        if(res.code===0){
            message.info(`删除成功`)
        } else {
            message.info(`删除失败`)
        }
        return res
    }


}

export default  new HostGroupStore();
