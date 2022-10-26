import {observable,action} from "mobx";

import {
    FindAllOpen,
    FindState,
    Findlogpage,
    Findtodopage,
    FindMessage,
} from "../api/homePage";

export class HomePageStore{

    @observable pipelineNearList = []
    @observable dynamicList = []
    @observable taskList = []  // 代办
    @observable stateList = ""
    @observable messageDispatchItemPage = []
    @observable page = {
        defaultCurrent: 1,
        pageSize: "15",
        total: "1",
    }

    @observable dynaPage = {
        defaultCurrent: 1,
        pageSize: "15",
        total: "1",
    }
    @observable pagination = 1 //控制接口中页码page的变化，更新接口 -- 消息
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
    setDynamicList = value =>{
        this.dynamicList = value
    }

    @action
    findAllOpen = async value =>{
        const param = new FormData()
        param.append("userId",value)
        const data = await FindAllOpen(param)
        if(data.code===0 && data.data){
            this.pipelineNearList = data.data
        }
    }

    @action
    findState = async value =>{
        const param = new FormData()
        param.append("userId",value)
        const data = await FindState(param)
        if(data.code===0 && data.data){
            this.stateList=data.data
        }
    }

    @action
    findlogpage = async values =>{
        const params = {
            pageParam:{
                pageSize:15,
                currentPage:this.dynaPagination
            },
            bgroup:"matflow",
            userId:values.userId,
        }
        const data = await Findlogpage(params)
        if(data.code===0 && data.data){
            this.dynamicList = this.dynamicList.concat(data.data && data.data.dataList)
            this.dynaPage.total=data.data && data.data.totalRecord
        }
        return data
    }

    @action
    findtodopage = async value =>{
        const params = {
            pageParam:{
                pageSize:4,
                currentPage:1
            },
            bgroup:"matflow",
            userId:value.userId,
        }
        const data = await Findtodopage(params)
        if(data.code===0 && data.data){
            this.taskList = data.data && data.data.dataList
        }
    }

    @action
    findMessageDispatchItemPage = async values =>{
        const params = {
            pageParam:{
                pageSize:15,
                currentPage:this.pagination
            },
            application:"matflow",
            sendType:"site",
            receiver:values.receiver,
        }
        const data = await FindMessage(params)
        if(data.code===0){
            this.messageDispatchItemPage=this.messageDispatchItemPage.concat(data.data && data.data.dataList)
            this.page.total=data.data && data.data.totalRecord
        }
        return data
    }

}

export const HOMEPAGE_STORE = "homePageStore"