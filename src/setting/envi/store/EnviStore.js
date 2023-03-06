import {observable,action} from "mobx";
import {message} from "antd";
import {Axios} from "tiklab-core-ui";

export class EnviStore {

    // 系统信息
    @observable
    infoList = ""

    // 刷新
    @observable
    fresh = false

    /**
     * 获取系统信息
     * @returns {Promise<void>}
     */
    @action
    getSystemMessage = async () =>{
        Axios.post("/systemMassage/getSystemMassage").then(res=>{
            if(res.code === 0 && res.data){
                this.infoList = res.data
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    /**
     * 获取环境配置
     * @returns {Promise<*>}
     */
    @action
    findAllPipelineScm = async () =>{
        return await Axios.post("/scm/findAllPipelineScm")
    }

    /**
     * 删除环境配置
     * @param value
     * @returns {Promise<*>}
     */
    @action
    deletePipelineScm = async value=>{
        const param = new FormData()
        param.append("scmId",value)
        const data = await Axios.post("/scm/deletePipelineScm",param)
        if(data.code===0){
            this.fresh = !this.fresh
            message.info(`删除成功`)
        }
        else {
            message.info(`删除失败`)
        }
        return data
    }

    /**
     * 更新环境配置
     * @param values
     * @returns {Promise<*>}
     */
    @action
    updatePipelineScm = async values=>{
        const params = {
            scmId:values.scmId,
            scmType:values.scmType,
            scmName:values.scmName,
            scmAddress:values.scmAddress,
        }
        const data = await Axios.post("/scm/updatePipelineScm",params)
        if(data.code === 0){
            this.fresh=!this.fresh
            values.scmId==="" ?  message.info("添加成功") : message.info(`修改成功`)
        }
        else {
            values.scmId==="" ? message.info("添加失败") :  message.info(`修改失败`)

        }
        return data
    }

}
export const ENVI_STORE = "enviStore"

