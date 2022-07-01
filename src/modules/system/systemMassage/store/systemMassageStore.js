import {observable,action} from "mobx";

import {
    GetSystemMassage,
    GetSystemLog
} from "../api/systemMassage";


export class SystemMassageStore {

    @observable infoList = ""
    @observable logList = []

    @action
    getSystemMessage = async () =>{
        GetSystemMassage().then(res=>{
            console.log("系统信息",res)
            if(res.code === 0 && res.data){
                this.infoList = res.data
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    getSystemLog = async () =>{
        GetSystemLog().then(res=>{
            console.log("系统日志",res)
            if(res.code === 0 && res.data){
                this.logList = res.data
            }
        }).catch(error=>{
            console.log(error)
        })
    }

}

export const SYSTEMMASSAGE_STORE = "systemMassageStore"

