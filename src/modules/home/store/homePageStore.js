import {observable,action} from "mobx";

import {
    FindAllOpen,
    RunState,
    FindLog,
    FindTask,
    FindMessage,
} from "../api/homePage";

export class HomePageStore{

    @observable visible = false // 消息详情
    @observable pipelineNearList = []
    @observable dynamicList = []
    @observable taskList = []
    @observable messageList = []
    @observable messageDispatchItemPage = []
    @observable page = {
        defaultCurrent: 1,
        pageSize: "15",
        total: "1"
    }

    @action
    setVisible = value =>{
        this.visible = value
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
    runState = async value =>{
        const param = new FormData()
        param.append("userId",value)
        return await RunState(param)
    }

    @action
    findLog = async values =>{
        const params = {
            userId:values.userId,
            page:values.page,
            pageSize:values.pageSize,
        }
        const data = await FindLog(params)
        if(data.code===0 && data.data){
            this.dynamicList = data.data
            this.page.total = data.data.listSize
        }
    }

    @action
    findTask = async value =>{
        const param = new FormData()
        param.append("userId",value)
        const data = await FindTask(param)
        if(data.code===0 && data.data){
            this.taskList = data.data
        }
    }

    // 首页消息
    @action
    findHomePageMessage = async values =>{
        await this.findMessageDispatchItemPage(values,7)
    }

    // 头部消息
    @action
    findHeaderMessage = async values =>{
        await this.findMessageDispatchItemPage(values,100)
    }

    @action
    findMessageDispatchItemPage = async (values,pageSize) =>{
        const params = {
            pageParam:{
                pageSize:pageSize,
                currentPage:1
            },
            application:"matflow",
            sendType:"site",
            receiver:values.receiver,
        }
        const data = await  FindMessage(params)
        if(data.code===0){
            if(pageSize===7){
                this.messageList = data.data && data.data.dataList
            }else this.messageDispatchItemPage=data.data && data.data.dataList
        }
    }

}

export const HOMEPAGE_STORE = "homePageStore"