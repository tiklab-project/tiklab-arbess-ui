import {observable,action} from "mobx";

import {
    FindAllOpen,
    Findlogpage,
    Findtodopage,
    FindMessageItemPage,
    UpdateMessageItem,
    DeleteMessageItem,
} from "../api/HomePage";

import {getUser} from "tiklab-core-ui";
import {message} from "antd";

export class HomePageStore{

    @observable pipelineNearList = [] // 最近打开流水线
    @observable taskList = []  // 代办
    @observable messageList = [] // 消息
    @observable messPage = {
        defaultCurrent: 1,
        pageSize: 15,
        total: 1,
    }  // 消息分页
    @observable dynaPage = {
        defaultCurrent: 1,
        pageSize: 15,
        total: 1,
    } // 动态分页
    @observable messagePagination = 1 //控制接口中页码page的变化，更新接口 -- 消息
    @observable unread = "" // 未读消息num
    @observable mesFresh = false
    @observable dynamicList = [] // 动态

    // 消息page
    @action
    setMessagePagination = value =>{
        this.messagePagination = value
    }

    @action
    setMessageList = value =>{
        this.messageList = value
    }

    @action
    setDynamicList = value =>{
        this.dynamicList = value
    }

    @action
    findAllOpen = async value =>{
        const param = new FormData()
        param.append("userId",getUser().userId)
        param.append("number",value)
        const data = await FindAllOpen(param)
        if(data.code===0 && data.data){
            this.pipelineNearList = data.data
        }
        return data
    }

    @action
    findlogpage = async values =>{
        const data = await Findlogpage(values)
        if(data.code===0){
            this.dynaPage.total=data.data && data.data.totalPage
            this.dynamicList=data.data && data.data.dataList
        }
        return data
    }

    @action
    findtodopage = async value =>{
        const params = {
            pageParam:{
                pageSize:5,
                currentPage:1
            },
            bgroup:"matflow",
            userId: getUser().userId,
        }
        const data = await Findtodopage(params)
        if(data.code===0 && data.data){
            this.taskList=data.data && data.data.dataList
        }
    }

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
            params.status=values
        }
        const data = await FindMessageItemPage(params)
        if(data.code===0){

            this.messPage.total=data.data && data.data.totalRecord

            if(values===0){
                this.unread = data.data && data.data.totalRecord  // 未读消息的长度
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

    @action
    updateMessageItem = async value =>{
        const data = await UpdateMessageItem(value)
        if(data.code===0){
            this.mesFresh = !this.mesFresh
            this.unread = this.unread - 1
        }
        return data
    }

    @action
    deleteMessageItem = async value =>{
        const param = new FormData()
        param.append("id",value)
        const data = await DeleteMessageItem(param)
        if(data.code===0){
            this.mesFresh = !this.mesFresh
            message.info("删除成功",0.5)
        }
        return data
    }

}

export const HOMEPAGE_STORE = "homePageStore"
