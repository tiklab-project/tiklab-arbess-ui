import {action} from "mobx";
import {Axios,getUser} from "tiklab-core-ui";
import {message} from "antd";

class HostGroupStore {

    /**
     * 获取主机组
     * @returns {Promise<unknown>}
     */
    @action
    findHostGroupList = async () =>{
        const param = new FormData();
        param.append("userId",getUser().userId);
        const res = await Axios.post("/authHostGroup/findHostGroupList",param)
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
        return res
    }


}

export default  new HostGroupStore();
