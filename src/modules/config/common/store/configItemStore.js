import {action,observable} from "mobx";
import {
    CodeTestPass,
    FileAddress,
    GetFile,
} from "../api/configItem";

export class ConfigItemStore {

    @observable profileAddress = ""

    @action
    codeTestPass =async values =>{
        const params = {
            proofId:values.proofId,
            url:values.url,
            port:values.port,
            type:values.type,
        }
        return await CodeTestPass(params)
    }

    @action
    fileAddress = () =>{
        FileAddress().then(res=>{
            if(res.code===0){
                this.profileAddress = res.data
            }
            console.log("配置文件地址",res.data)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    getFile = async values =>{
        const params = new FormData()
        params.append("pipelineName",values.pipelineName)
        params.append("regex",values.regex)
        return await GetFile(params)
    }

}

export const CONFIGITEM_STORE = "configItemStore"

