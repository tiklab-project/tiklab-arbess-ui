import {observable,action} from "mobx";

import {
    FindAllOpen,
    Findlogpage,
    Findtodopage,
    FindMessageDispatchItemPage,
    UpdateMessageDispatchItem,
} from "../api/homePage";

import {getUser} from "tiklab-core-ui";

export class HomePageStore{

    @observable pipelineNearList = []

    @observable taskList = []  // 代办
    @observable messageList = []
    @observable messPage = {
        defaultCurrent: 1,
        pageSize: 15,
        total: 1,
    }
    @observable messagePagination = 1 //控制接口中页码page的变化，更新接口 -- 消息
    @observable unread = ""

    @observable fresh = false
    @observable dynaPageTotal = 1
    @observable dynamicList = []

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
        const data = await FindAllOpen(param)
        if(data.code===0 && data.data){
            this.pipelineNearList = data.data
        }
    }

    @action
    findlogpage = async values =>{
        let params
        if(values.userId){
            params = {
                pageParam:{
                    pageSize:15,
                    currentPage:values.pageParam.currentPage,
                },
                bgroup:"matflow",
                userId: values.userId
            }
        }else {
            params = {
                pageParam:{
                    pageSize:15,
                    currentPage:values.pageParam.currentPage,
                },
                bgroup:"matflow",
                contentKey:"pipelineId",
                content: values.content,
            }
        }
        const data = await Findlogpage(params)
        if(data.code===0){
            this.dynamicList=this.dynamicList.concat(data.data && data.data.dataList)
            this.dynaPageTotal=data.data && data.data.totalRecord
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
    findMessageDispatchItemPage = async values =>{
        const params = {
            pageParam:{
                pageSize: 10,
                currentPage:this.messagePagination
            },
            application:"matflow",
            sendType:"site",
            receiver:getUser().userId,
        }
        if(values===0 || values===1){
            params.status=values
        }
        const data = await FindMessageDispatchItemPage(params)
        if(data.code===0){
            this.messPage.total=data.data && data.data.totalRecord
            if(this.messagePagination === 1){
                this.messageList=data.data.dataList
            }
            if(this.messagePagination > 1) {
                this.messageList = this.messageList.concat(data.data && data.data.dataList)
            }
            if(values===0){
                this.unread=data.data && data.data.totalRecord
            }
        }
        return data
    }

    @action
    updateMessageDispatchItem = async value =>{
        const data = await UpdateMessageDispatchItem(value)
        if(data.code===0){
            this.fresh = !this.fresh
        }
        return data
    }

}

export const HOMEPAGE_STORE = "homePageStore"