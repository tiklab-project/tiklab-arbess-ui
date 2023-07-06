import {action,observable} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

export class PipelineStore {

    // 流水线列表
    @observable
    pipelineList = []

    // 流水线分页列表
    @observable
    pipelineListPage = []

    // 流水线用户
    @observable
    pipelineUserList = []

    // 流水线分页
    @observable
    pipPage = {
        pageSize: 13,
        current: 1,
        total: 1,
    }

    // 用户分页
    @observable
    userPage = {
        pageSize: 13,
        defaultCurrent: 1,
        total: 1,
    }

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
            Axios.post("/pipeline/findUserPipelinePage",value).then(res=>{
                if(res.code===0 && res.data){
                    this.pipelineListPage = res.data.dataList
                    this.pipPage = {
                        pageSize: 13,
                        current: res.data.currentPage,
                        total: res.data.totalPage,
                    }
                }else {
                    this.pipelineListPage = []
                    this.pipPage = {
                        current: 1,
                        pageSize: 6,
                        total: 1,
                    }
                }
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
            Axios.post("/pipeline/findUserPipeline").then(res=>{
                if(res.code===0){
                    // 流水线列表
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
            Axios.post("/pipeline/createPipeline",values).then(res=>{
                if(res.code===0){
                    message.info("创建成功")
                    this.findUserPipeline()
                }
                else {
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
                    this.findUserPipeline()
                }
                else {
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
                    this.findUserPipeline()
                }
                else{
                    message.info("更新失败")
                }
                resolve(res)
            }).catch(error=>{
                reject()
            })
        })
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
     * 获取流水线用户
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findUserPage =async value =>{
        const data =  await Axios.post("/user/user/findUserPage",value)
        this.findPipelineUser(data)
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
        this.findPipelineUser(data)
        return data
    }

    @action
    findPipelineUser = data =>{
        if(data.code===0){
            this.pipelineUserList = data.data && data.data.dataList
            this.userPage.total = data.data.totalPage
        }
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
        const data = await Axios.post("/pipeline/findOnePipeline",param)
        if(data.code===0){
            this.pipeline = data.data && data.data
        }
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

}

export const PIPELINE_STORE = "pipelineStore"
