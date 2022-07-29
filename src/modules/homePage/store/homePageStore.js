import {observable,action} from "mobx";

import {
    FindAllOpen,
    RunState,
    FindUserAction
} from "../api/homePage";

export class HomePageStore{

    @observable matFlowNearList = []
    @observable dynamicList = []
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
            if(res.code === 0 && res.data ){
                this.matFlowNearList = res.data
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
    findUserAction = async values =>{
        const params = {
            userId:values.userId,
            page:values.page,
            pageSize:values.pageSize,
        }
        FindUserAction(params).then(res=>{
            if(res.code === 0 && res.data ){
                this.dynamicList = res.data.dataList
                this.page.total = res.data.listSize
            }
        }).catch(error=>{
            console.log(error)
        })
    }

}

export const HOMEPAGE_STORE = "homePageStore"