import {observable,action} from "mobx";

import {
    GetSystemMassage,
    DeleteMatFlowScm,
    UpdateMatFlowScm,
    FindAllMatFlowScm,
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
    findAllMatFlowScm = async () =>{
        return await FindAllMatFlowScm()
    }

    @action
    deleteMatFlowScm = async value=>{
        const param = new FormData()
        param.append("ScmId",value)
        return await DeleteMatFlowScm(param)
    }

    @action
    updateMatFlowScm = async values=>{
        const params = {
            ScmId:values.ScmId,
            ScmType:values.ScmType,
            ScmName:values.ScmName,
            ScmAddress:values.ScmAddress,
        }
        return await UpdateMatFlowScm(params)
    }

}

export const SETTING_STORE = "settingStore"

