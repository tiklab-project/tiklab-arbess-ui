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
        param.append("ScmId",value)
        return await DeletePipelineScm(param)
    }

    @action
    updatePipelineScm = async values=>{
        const params = {
            ScmId:values.ScmId,
            ScmType:values.ScmType,
            ScmName:values.ScmName,
            ScmAddress:values.ScmAddress,
        }
        return await UpdatePipelineScm(params)
    }

}

export const SETTING_STORE = "settingStore"

