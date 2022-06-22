import {observable,action} from "mobx";
import {
    FindAllOpen,
    RunState,
    FindUserAction
} from "../api/homePage";

export class HomePageStore{

    @observable pipelineNearList = []
    @observable dynamicList = []

    @action
    findAllOpen = async value =>{
        const param = new FormData()
        param.append('userId',value)
        FindAllOpen(param).then(res=>{
            if(res.code === 0 && res.data ){
                this.pipelineNearList = res.data
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    runState = async value =>{
        const param = new FormData()
        param.append('userId',value)
        return await RunState(param)
    }

    @action
    findUserAction = async value =>{
        // const param = {
        //     userId:value.userId
        // }
        const param = new FormData()
        param.append('userId',value.userId)
        FindUserAction(param).then(res=>{
            console.log('动态',res)
            if(res.code === 0 && res.data ){
                this.dynamicList = res.data
            }
        }).catch(error=>{
            console.log(error)
        })
    }

}

export const HOMEPAGE_STORE = 'homePageStore'