import {observable,action} from "mobx";

import {
    GetSystemMassage,
    DeleteMatFlowPath,
    UpdateMatFlowPath,
    FindAllMatFlowPath,
} from "../api/setting";

export class SettingStore {

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
    findAllMatFlowPath = async () =>{
        return await FindAllMatFlowPath()
    }

    @action
    deleteMatFlowPath = async value=>{
        const param = new FormData()
        param.append("pathId",value)
        return await DeleteMatFlowPath(param)
    }

    @action
    updateMatFlowPath = async values=>{
        const params = {
            pathId:values.pathId,
            pathType:values.pathType,
            pathName:values.pathName,
            pathAddress:values.pathAddress,
        }
        return await UpdateMatFlowPath(params)
    }

}

export const SETTING_STORE = "settingStore"

