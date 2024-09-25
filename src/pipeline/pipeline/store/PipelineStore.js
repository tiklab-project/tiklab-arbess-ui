import {action,observable} from "mobx";
import {Axios, getUser} from "thoughtware-core-ui";
import {message} from "antd";

export class PipelineStore {

    // 流水线列表
    @observable
    pipelineList = []

    // 流水线信息
    @observable
    pipeline = null

    /**
     * 设置流水线信息
     * @param value
     */
    @action
    setPipeline = value =>{
        this.pipeline = value
    }

    /**
     * 分页、类型（所有，收藏）、模糊查询来获取流水线
     * @returns {Promise<unknown>}
     */
    @action
    findUserPipelinePage = async value =>{
        return new Promise((resolve, reject) => {
            Axios.post("/pipeline/findUserPipelinePage",{
                ...value,
                userId:getUser().userId
            }).then(res=>{
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    /**
     * 获取所有流水线（未分页）
     * @returns {Promise<unknown>}
     */
    @action
    findUserPipeline = () =>{
        return new Promise((resolve, reject) => {
            Axios.post("/pipeline/findUserPipeline",{userId:getUser().userId}).then(res=>{
                if(res.code===0){
                    this.pipelineList = res.data || []
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    /**
     * 添加流水线
     * @param values
     * @returns {Promise<unknown>}
     */
    @action
    createPipeline = values =>{
        return new Promise((resolve, reject) => {
            Axios.post("/pipeline/createPipeline",{
                ...values,
                user:{id:getUser().userId}
            }).then(res=>{
                if(res.code===0){
                    message.info("创建成功")
                } else {
                    message.info("创建失败")
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    /**
     * 删除流水线
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    deletePipeline = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        return new Promise((resolve, reject) => {
            Axios.post("/pipeline/deletePipeline",param).then(res=>{
                if(res.code===0){
                    message.info("删除成功")
                } else {
                    message.info("删除失败")
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    /**
     * 更新流水线
     * @param values
     * @returns {Promise<unknown>}
     */
    @action
    updatePipeline = values =>{
        return new Promise((resolve, reject) => {
            Axios.post("/pipeline/updatePipeline",values).then(res=>{
                if(res.code===0){
                    message.info("更新成功")
                } else{
                    message.info("更新失败")
                }
                resolve(res)
            }).catch(error=>{
                reject()
            })
        })
    }

    /**
     * 获取单个流水线信息
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findOnePipeline = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        const data = await Axios.post("/pipeline/findPipelineNoQuery",param)
        if(data.code===0){
            this.pipeline = data.data && data.data
        }
        return data
    }

    /**
     * 克隆
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    pipelineClone = async value =>{
        const param = new FormData()
        param.append("pipelineId",value.pipelineId)
        param.append("pipelineName",value.pipelineName)
        const data = await Axios.post("/pipeline/pipelineClone",param)
        return data
    }

    /**
     * 克隆前获取名字
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findPipelineCloneName = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        const data = await Axios.post("/pipeline/findPipelineCloneName",param)
        return data
    }

    /**
     * 导出yaml文件
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    importPipelineYaml = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        const data = await Axios.post(
            "/pipeline/importPipelineYaml",
            param,
            {},
            {responseType: "blob"})
        return data
    }

    /**
     * 更新最近打开的流水线
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateOpen = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        return await Axios.post("/open/updateOpen", param)
    }

    /**
     * 收藏
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updateFollow =async value =>{
        const params = {
            pipeline:value,
        }
        return await Axios.post("/follow/updateFollow",params)
    }

    /**
     * 切换流水线
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findRecentlyPipeline =async value =>{
        const params = new FormData();
        params.append("number",5);
        params.append("pipelineId",value);
        return await Axios.post("/pipeline/findRecentlyPipeline",params)
    }


    /**
     * 获取流水线用户
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findUserPage =async value =>{
        const data =  await Axios.post("/user/user/findUserPage",value)
        return data
    }

    /**
     * 获取流水线项目用户
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findDmUserPage = async value =>{
        const data = await Axios.post("/dmUser/findDmUserPage",value)
        return data
    }

}

export default new PipelineStore();
