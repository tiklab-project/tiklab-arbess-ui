import {observable,action} from "mobx";

import {
    FindAllPipelineStatus,
    CreatePipeline,
    FindLike,
    DeletePipeline,
    UpdatePipeline,
    FindAllFollow,
    UpdateFollow,
    FindUserPage
} from "../api/pipeline";

import {getUser} from "tiklab-core-ui";
import {message} from "antd";

export class PipelineStore {

    @observable pipelineList = []
    @observable pipelineLength = ""
    @observable followLength = ""
    @observable lastPath = ""
    @observable pipelineId = ""
    @observable fresh = false
    @observable listType = 1
    @observable pipeline = ""
    @observable pipelinePermissions = []

    @action
    setListType = value =>{
        this.listType = value
    }

    @action
    setLastPath = value =>{
        this.lastPath = value
    }

    @action
    setPipelineId = value =>{
        this.pipelineId = value
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
    setPipelinePermissions = value =>{
        this.pipelinePermissions = value
    }

    @action
    findAllPipelineStatus = value =>{
        const param = new FormData()
        param.append("userId",getUser().userId)
        return new Promise((resolve, reject) => {
            FindAllPipelineStatus(param).then(res=>{
                if(res.code===0 && res.data){
                    this.pipelineList=res.data
                    this.pipelineLength=res.data && res.data.length
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
            user: {id:getUser().userId},
            pipelineName: values.pipelineName,
            pipelinePower: values.pipelinePower,
            pipelineType: values.pipelineType,
            userList: values.userList,
        }
        return new Promise((resolve, reject) => {
            CreatePipeline(params).then(res=>{
                if(res.code===0){
                    message.info("创建成功")
                }
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
        const param = new FormData()
        param.append("pipelineId",value)
        param.append("userId",getUser().userId)
        return new Promise((resolve, reject) => {
            DeletePipeline(param).then(res=>{
                if(res.code===0){
                    message.info("删除成功")
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action //重命名流水线
    updatePipeline = values =>{
        const params={
            pipelineId:values.pipelineId,
            pipelineName:values.pipelineName,
            pipelinePower:values.pipelinePower,
        }
        return new Promise((resolve, reject) => {
            UpdatePipeline(params).then(res=>{
                if(res.code===0){
                    message.info("更新成功")
                }
                this.findAllPipelineStatus()
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
            pipeline:{pipelineId:value.pipeline.pipelineId},
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
        }
        const data =  await FindUserPage(params)
        const zz = data.data && data.data.dataList

        return data
    }

}

export const PIPELINE_STORE = "pipelineStore"
