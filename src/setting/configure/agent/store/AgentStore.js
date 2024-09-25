import {action} from "mobx";
import {Axios} from "thoughtware-core-ui";
import {message} from "antd";

class AgentStore {

    /**
     * 获取agent列表
     * @returns {Promise<unknown>}
     */
    @action
    findAgentList = async () =>{
        return await Axios.post("/agent/findAgentList",{});
    }

    /**
     * 获取agent列表(分页)
     * @param values
     * @returns {Promise<unknown>}
     */
    @action
    findAgentPage = async values =>{
        return await Axios.post("/agent/findAgentPage",values);
    }

    /**
     * 删除agent
     * @param values
     * @returns {Promise<unknown>}
     */
    @action
    deleteAgent = async values =>{
        const param = new FormData();
        param.append('id',values)
        const data = await Axios.post("/agent/deleteAgent",param);
        if(data.code===0){
            message.success("删除成功");
        } else {
            message.error(data.msg);
        }
        return data
    }

    /**
     * 设置默认agent
     */
    @action
    updateDefaultAgent = async values =>{
        const param = new FormData();
        param.append('id',values)
        const data =  await Axios.post("/agent/updateDefaultAgent",param);
        if(data.code===0){
            message.success("设置成功");
        }else {
            message.error(data.msg);
        }
        return data
    }

}

export default new AgentStore();
