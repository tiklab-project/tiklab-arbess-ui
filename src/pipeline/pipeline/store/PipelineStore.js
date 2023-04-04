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

    // 最近打开流水线
    @observable
    pipelineNearList = []

    // 流水线用户
    @observable
    pipelineUserList = []

    // 流水线分页
    @observable
    pipPage = {
        defaultCurrent: 1,
        pageSize: 6,
        total: 1,
    }

    // 用户分页
    @observable
    userPage = {
        defaultCurrent: 1,
        pageSize: 6,
        total: 1,
    }

    // 流水线信息
    @observable
    pipeline = ""

    // 1:所有流水线；2：我收藏的流水线
    @observable
    listType = 1

    // 加载状态
    @observable
    isLoading = false

    // 重新查询
    @observable
    fresh = false

    @action
    setFresh = () =>{
        this.fresh = !this.fresh
    }

    /**
     * 改变流水线tab标签
     * @param value
     */
    @action
    setListType = value =>{
        this.listType = value
    }

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
    findUserPipelinePage = value =>{
        return new Promise((resolve, reject) => {
            Axios.post("/pipeline/findUserPipelinePage",value).then(res=>{
                if(res.code===0 && res.data){
                    // 流水线列表
                    this.pipelineListPage=res.data.dataList
                    // 流水线页数
                    this.pipPage.total = res.data.totalPage
                    // 流水线当前页
                    this.pipPage.defaultCurrent = res.data.currentPage
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
                if(res.code===0 && res.data){
                    // 流水线列表
                    this.pipelineList=res.data
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    /**
     * 所有收藏（未分页）
     * @returns {Promise<unknown>}
     */
    @action
    findUserFollowPipeline = () =>{
        return new Promise((resolve, reject) => {
            Axios.post("/pipeline/findUserFollowPipeline").then(res=>{
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
        this.isLoading = true
        return new Promise((resolve, reject) => {
            Axios.post("/pipeline/createPipeline",values).then(res=>{
                if(res.code===0){
                    message.info("创建成功")
                }
                else {
                    message.info("创建失败")
                }
                this.isLoading = false
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
        this.isLoading = true
        const param = new FormData()
        param.append("pipelineId",value)
        return new Promise((resolve, reject) => {
            Axios.post("/pipeline/deletePipeline",param).then(res=>{
                if(res.code===0){
                    message.info("删除成功")
                }
                else {
                    message.info("删除失败")
                }
                this.isLoading = false
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
        const params = {
            pageParam:{
                pageSize:6,
                currentPage:1
            },
            domainId:value,
        }
        const data = await Axios.post("/dmUser/findDmUserPage",params)
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
     * 获取最近打开的流水线
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAllOpen = async value =>{
        const param = new FormData()
        param.append("number",value)
        const data = await Axios.post("/open/findAllOpen",param)
        if(data.code===0 && data.data){
            this.pipelineNearList = data.data
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
