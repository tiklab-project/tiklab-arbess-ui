import {action, observable} from "mobx";

import {
    CreatePipeline,
    DeletePipeline,
    FindAllFollow,
    FindAllPipelineStatus,
    FindDmUserPage,
    FindLike,
    FindOnePipeline,
    FindUserPage,
    UpdateFollow,
    UpdatePipeline
} from "../api/Pipeline";

import {getUser} from "tiklab-core-ui";
import {message} from "antd";

export class PipelineStore {

    // 流水线列表
    @observable
    pipelineList = []

    // 流水线长度
    @observable
    pipelineLength = 0

    // 流水线收藏长度
    @observable
    followLength = 0

    // 流水线用户
    @observable
    pipelineUserList = []

    // 流水线信息
    @observable
    pipeline = ""

    // 1:所有流水线；2：我收藏的流水线
    @observable
    listType = 1

    // 加载状态
    @observable
    isLoading = false

    // 刷新
    @observable
    fresh = false

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
     */
    @action
    setPipeline = () =>{
        this.pipeline = ""
    }

    /**
     * 设置刷新状态
     * @param value
     */
    @action
    setFresh = value =>{
        this.fresh = value
    }

    /**
     * 查找所有流水线
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findAllPipelineStatus = value =>{
        const param = new FormData()
        param.append("userId",getUser().userId)
        return new Promise((resolve, reject) => {
            FindAllPipelineStatus(param).then(res=>{
                if(res.code===0 && res.data){
                    this.pipelineList=res.data
                    this.pipelineLength=res.data.length
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
        const params = {
            ...values,
            user: {id:getUser().userId}
        }
        this.isLoading = true
        return new Promise((resolve, reject) => {
            CreatePipeline(params).then(res=>{
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
     * 模糊搜索流水线
     * @param values
     * @returns {Promise<unknown>}
     */
    @action
    findLike = values =>{
        const params = new FormData()
        params.append("pipelineName",values)
        params.append("userId",getUser().userId)
        return new Promise((resolve, reject) => {
            FindLike(params).then(res=>{
                if(res.code===0){
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
     * 删除流水线
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    deletePipeline = async value =>{
        this.isLoading = true
        const param = new FormData()
        param.append("pipelineId",value)
        param.append("userId",getUser().userId)
        return new Promise((resolve, reject) => {
            DeletePipeline(param).then(res=>{
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
            UpdatePipeline(values).then(res=>{
                if(res.code===0){
                    message.info("更新成功")
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
     * 获取我收藏的流水线
     * @param value
     */
    @action
    findAllFollow = value =>{
        const param = new FormData()
        param.append("userId",getUser().userId)
        FindAllFollow(param).then(res=>{
            if(res.code===0){
                this.pipelineList=res.data
                this.followLength=res.data && res.data.length
            }
        }).catch(error=>{
            console.log(error)
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
            userId:getUser().userId
        }
        return await UpdateFollow(params)
    }

    /**
     * 获取流水线用户
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findUserPage =async value =>{
        const params = {
            pageParam:{
                pageSize:6,
                currentPage:1
            },
            ...value
        }
        const data =  await FindUserPage(params)
        if(data.code===0){
            this.pipelineUserList = data.data && data.data.dataList
        }
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
                pageSize:10,
                currentPage:1
            },
            domainId:value,
            // ...value,
        }
        const data = await FindDmUserPage(params)
        if(data.code===0){
            this.pipelineUserList = data.data && data.data.dataList
        }
        return data
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
        const data = await FindOnePipeline(param)
        if(data.code===0){
            this.pipeline = data.data && data.data
        }
        return data

    }

}

export const PIPELINE_STORE = "pipelineStore"
