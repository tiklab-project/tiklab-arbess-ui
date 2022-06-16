import {observable,action} from "mobx";
import {
    FindAllOpen
} from "../api/homePage";


export class HomePageStore{

    @observable pipelineNearList = []

    @action
    findAllOpen = async value =>{
        const param = new FormData()
        param.append('userId',value)
        FindAllOpen(param).then(res=>{
            console.log('最近打开的流水线',res)
            this.pipelineNearList = res.data
        }).catch(error=>{
            console.log(error)
        })
    }

}

export const HOMEPAGE_STORE = 'homePageStore'