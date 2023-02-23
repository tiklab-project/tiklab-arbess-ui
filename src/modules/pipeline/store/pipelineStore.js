import {observable,action} from "mobx";

import {
    FindAllPipelineStatus,
    CreatePipeline,
    FindLike,
    DeletePipeline,
    UpdatePipeline,
    FindAllFollow,
    UpdateFollow,
    FindUserPage,
    FindDmUserPage,
    FindOnePipeline
} from "../api/pipeline";

import {getUser} from "tiklab-core-ui";
import {message} from "antd";

export class PipelineStore {

    @observable pipelineList = []
    @observable pipelineLength = 0
    @observable followLength = 0
    @observable pipelineUserList = []
    @observable pipeline = ""
    @observable listType = 1
    @observable isLoading = false
    @observable fresh = false

    @action
    setListType = value =>{
        this.listType = value
    }

    @action
    setPipeline = value =>{
        this.pipeline = value
    }

    @action
    setFresh = value =>{
        this.fresh = value
    }

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

    @action //删除流水线
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

    @action //重命名流水线
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

    @action
    updateFollow =async value =>{
        const params = {
            pipeline:value,
            userId:getUser().userId
        }
        const data = await UpdateFollow(params)
        return data
    }

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
