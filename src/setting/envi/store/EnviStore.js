import {observable,action} from "mobx";

import {
    GetSystemMassage,
    DeletePipelineScm,
    UpdatePipelineScm,
    FindAllPipelineScm,
} from "../api/Envi";
import {message} from "antd";

export class EnviStore {

    @observable infoList = ""
    @observable logList = []
    @observable fresh = false

    @action
    getSystemMessage = async () =>{
        GetSystemMassage().then(res=>{
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
        const data = await DeletePipelineScm(param)
        if(data.code===0){
            this.fresh = !this.fresh
            message.info(`删除成功`)
        }
        else {
            message.info(`删除失败`)
        }
        return data
    }

    @action
    updatePipelineScm = async values=>{
        const params = {
            scmId:values.scmId,
            scmType:values.scmType,
            scmName:values.scmName,
            scmAddress:values.scmAddress,
        }
        const data = await UpdatePipelineScm(params)
        if(data.code === 0){
            this.fresh=!this.fresh
            values.scmId==="" ?  message.info("保存成功") : message.info(`修改成功`)
        }
        else {
            values.scmId==="" ? message.info("保存失败") :  message.info(`修改失败`)

        }
        return data
    }

}
export const ENVI_STORE = "enviStore"

