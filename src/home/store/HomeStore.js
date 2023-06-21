import {observable,action} from "mobx";
import {getUser,Axios} from "tiklab-core-ui";
import {message} from "antd";

export class HomeStore {

    // 消息
    @observable
    messageList = []

    // 控制接口中页码page的变化，更新接口 -- 消息
    @observable
    messagePagination = 1

    // 消息分页
    @observable
    messPage = {
        defaultCurrent: 1,
        pageSize: 15,
        total: 1, // 此处为总数
    }

    // 未读消息num
    @observable
    unread = ""

    //消息刷新
    @observable
    mesFresh = false

    /**
     * 设置消息列表
     * @param value
     */
    @action
    setMessageList = value =>{
        this.messageList = value
    }

    /**
     * 设置消息page
     * @param value
     */
    @action
    setMessagePagination = value =>{
        this.messagePagination = value
    }

    /**
     * 获取消息
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findMessageItemPage = async values =>{
        const params = {
            pageParam:{
                pageSize: 12,
                currentPage:this.messagePagination
            },
            bgroup:"matflow",
            sendType:"site",
            receiver:getUser().userId,
        }
        if(values===0 || values===1){
            params.status = values
        }
        const data = await Axios.post("/message/messageItem/findMessageItemPage",params)
        if(data.code===0){
            // 消息的总数
            this.messPage.total=data.data && data.data.totalRecord

            // 未读消息的长度
            if(values===0){
                this.unread = data.data && data.data.totalRecord
            }

            if(this.messagePagination === 1){
                this.messageList=data.data.dataList
            }
            if(this.messagePagination > 1) {
                this.messageList = this.messageList.concat(data.data && data.data.dataList)
            }

        }
        return data
    }

    /**
     * 更新消息
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateMessageItem = async value =>{
        const data = await Axios.post("/message/messageItem/updateMessageItem",value)
        if(data.code===0){
            this.mesFresh = !this.mesFresh
            this.unread = this.unread - 1
        }
        return data
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
            this.mesFresh = !this.mesFresh
            message.info("删除成功",0.5)
        }
        return data
    }

}

export const HOME_STORE = "homeStore"
