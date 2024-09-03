import {action} from "mobx";
import {Axios, getUser} from "thoughtware-core-ui";
import {message} from "antd";

class MessageStore {

    /**
     * 获取消息
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findMessageItemPage = async values =>{
        const params = {
            ...values,
            bgroup:"arbess",
            sendType:"site",
            receiver:getUser().userId,
        }
        return await Axios.post("/message/messageItem/findMessageItemPage", params)
    }

    /**
     * 更新消息
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateMessageItem = async value =>{
        return await Axios.post("/message/messageItem/updateMessageItem", value)
    }


    /**
     * 删除消息
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deleteMessageItem = async value =>{
        const param = new FormData()
        param.append("id",value)
        const data = await Axios.post("/message/messageItem/deleteMessageItem",param)
        if(data.code===0){
            message.info("删除成功")
        }
        return data
    }

}

const messageStore = new MessageStore();
export default messageStore;
