import {action,observable} from "mobx";
import {
    UpdateConfigure,
    CodeTestPass,
    FileAddress,
    GetFile,
} from "../api/config";

export class ConfigStore {

    @observable profileAddress = ""

    @action
    updateConfigure = values =>{
        return new Promise((resolve, reject) => {
            UpdateConfigure(values).then(res=>{
                console.log(res)
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

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
            if(res.code ===0){
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

const configStore = new ConfigStore()
export default configStore;
