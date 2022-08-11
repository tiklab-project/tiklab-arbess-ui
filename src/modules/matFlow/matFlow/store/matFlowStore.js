import {observable,action} from "mobx";

import {
    FindAllMatFlowStatus,
    CreateMatFlow,
    FindLike,
    DeleteMatFlow,
    UpdateMatFlow,
    FindAllFollow,
    UpdateFollow
} from "../api/matFlow";


export class MatFlowStore {
    
    @observable matFlowList=[]
    @observable searchMatFlowList = []
    @observable lastPath = ""
    @observable matFlowId = ""
    @observable matFlowName = ""
    @observable fresh = false

    @action
    setLastPath = value =>{
        this.lastPath = value
    }

    @action
    setMatFlowId = value =>{
        this.matFlowId = value
    }

    @action
    setMatFlowName = value =>{
        this.matFlowName = value
    }

    @action
    setFresh = value =>{
        this.fresh = value
    }

    @action
    findAllMatFlowStatus = value =>{
        const param = new FormData()
        param.append("userId",value)
        return new Promise((resolve, reject) => {
            FindAllMatFlowStatus(param).then(res=>{
                console.log( res)
                if(res.code === 0 && res.data){
                    this.matFlowList=res.data
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })

    }

    @action
    createMatFlow = values =>{
        const params = {
            user: {id:values.user.id,},
            matflowName: values.matflowName,
            matflowType: values.matflowType,
            matflowCreateTime:values.matflowCreateTime
        }
        return new Promise((resolve, reject) => {
            CreateMatFlow(params).then(res=>{
                console.log( res)
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
        params.append("matFlowName",values.matFlowName)
        params.append("userId",values.userId)
        return new Promise((resolve, reject) => {
            FindLike(params).then(res=>{
                console.log( res)
                if(res.code === 0 && res.data){
                    this.searchMatFlowList=res.data
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action //删除流水线
    deleteMatFlow = async value =>{
        const param = new FormData()
        param.append("matFlowId",value.matFlowId)
        param.append("userId",value.userId)
        return new Promise((resolve, reject) => {
            DeleteMatFlow(param).then(res=>{
                console.log(res)
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action //重命名流水线
    updateMatFlow = values =>{
        const params={
            matflowId:values.matflowId,
            matflowName:values.matflowName,
            user:{id:values.user.id}
        }
        return new Promise((resolve, reject) => {
            UpdateMatFlow(params).then(res=>{
                console.log( res)
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    findAllFollow = value =>{
        const param = new FormData()
        param.append("userId",value)
        FindAllFollow(param).then(res=>{
            console.log( res)
            if(res.code===0){
                this.matFlowList=res.data
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    updateFollow =async value =>{
        const params = {
            matFlow:{matflowId:value.matFlow.matflowId},
            userId:value.userId
        }
        return await UpdateFollow(params)
    }

}

export const MATFLOW_STORE = "matFlowStore"
