import {observable,action} from "mobx";

import {
    GetSystemMassage,
    DeletePipelineScm,
    UpdatePipelineScm,
    FindAllPipelineScm,
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
    findAllPipelineScm = async () =>{
        return await FindAllPipelineScm()
    }

    @action
    deletePipelineScm = async value=>{
        const param = new FormData()
        param.append("scmId",value)
        return await DeletePipelineScm(param)
    }

    @action
    updatePipelineScm = async values=>{
        const params = {
            scmId:values.scmId,
            scmType:values.scmType,
            scmName:values.scmName,
            scmAddress:values.scmAddress,
        }
        return await UpdatePipelineScm(params)
    }

}

export const SETTING_STORE = "settingStore"

