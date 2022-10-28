import {observable,action} from "mobx";

import {
    FindAllOpen,
    Findlogpage,
    Findtodopage,
    FindMessageDispatchItemPage,
} from "../api/homePage";

import {getUser} from "tiklab-core-ui";

export class HomePageStore{

    @observable pipelineNearList = []

    @observable taskList = []  // 代办
    @observable messageList = []
    @observable page = {
        defaultCurrent: 1,
        pageSize: 15,
        total: 1,
    }
    @observable pagination = 1 //控制接口中页码page的变化，更新接口 -- 消息

    @observable dynamicList = []
    @observable dynaPageTotal = 1
    @observable dynaPagination = 1 // 动态

    @action
    setPagination = value =>{
        this.pagination = value
    }

    @action
    setDynaPagination = value =>{
        this.dynaPagination = value
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
                    currentPage:this.dynaPagination,
                },
                bgroup:"matflow",
                userId: values.userId
            }
        }else {
            params = {
                pageParam:{
                    pageSize:15,
                    currentPage:this.dynaPagination,
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
                pageSize: 9,
                currentPage:this.pagination
            },
            application:"matflow",
            sendType:"site",
            receiver:getUser().userId,
        }
        const data = await FindMessageDispatchItemPage(params)
        if(data.code===0){
            this.messageList=this.messageList.concat(data.data && data.data.dataList)
            this.page.total=data.data && data.data.totalRecord
        }
        return data
    }

}

export const HOMEPAGE_STORE = "homePageStore"