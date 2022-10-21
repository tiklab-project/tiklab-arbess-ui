import {observable,action} from "mobx";

import {
    FindAllOpen,
    RunState,
    FindLog,
    FindTask
} from "../api/homePage";

export class HomePageStore{

    @observable pipelineNearList = []
    @observable dynamicList = []
    @observable taskList = []
    @observable page = {
        defaultCurrent: 1,
        pageSize: "15",
        total: "1"
    }

    @action
    findAllOpen = async value =>{
        const param = new FormData()
        param.append("userId",value)
        FindAllOpen(param).then(res=>{
            if(res.code===0 && res.data){
                this.pipelineNearList = res.data
            }
        }).catch(error=>{
            console.log(error)
        })
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
        FindLog(params).then(res=>{
            if(res.code===0 && res.data){
                this.dynamicList = res.data
                this.page.total = res.data.listSize
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    findTask = async value =>{
        const param = new FormData()
        param.append("userId",value)
        FindTask(param).then(res=>{
            if(res.code===0&&res.data){
                this.taskList=res.data
            }
        })

    }

}

export const HOMEPAGE_STORE = "homePageStore"