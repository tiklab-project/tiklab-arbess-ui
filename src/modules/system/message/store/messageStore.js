import {observable,action} from "mobx";

import {
    GetSystemMassage,
} from "../api/message";

export class MessageStore {

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

}

export const MESSAGE_STORE = "messageStore"

