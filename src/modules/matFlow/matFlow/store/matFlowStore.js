import {observable,action} from "mobx";

import {
    FindAllMatFlowStatus,
    CreateMatFlow,
    FindOneName,
    DeleteMatFlow,
    UpdateMatFlow
} from "../api/matFlow";

export class MatFlowStore {
    
    @observable matFlowList=[]
    @observable searchMatFlowList = []
    @observable lastPath = ""
    @observable matFlowId = ""
    @observable matFlowName = ""

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
    findAllMatFlowStatus = value =>{
        const param = new FormData()
        param.append("userId",value)
        return new Promise((resolve, reject) => {
            FindAllMatFlowStatus(param).then(res=>{
                if(res.code === 0 ){
                    this.matFlowList=res.data
                }
                resolve(res)
                console.log("所有流水线", res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })

    }

    @action
    createMatFlow = values =>{
        const params = {
            user: {
                id:values.user.id,
            },
            matFlowName: values.matFlowName,
            matFlowType: values.matFlowType,
            matFlowCreateTime:values.matFlowCreateTime
        }
        return new Promise((resolve, reject) => {
            CreateMatFlow(params).then(res=>{
                console.log("创建流水线",res)
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    findOneName = values =>{
        const params = new FormData()
        params.append("matFlowName",values.matFlowName)
        params.append("userId",values.userId)
        return new Promise((resolve, reject) => {
            FindOneName(params).then(res=>{
                this.searchMatFlowList=res.data
                console.log("搜索流水线",res)
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
                console.log("删除流水线",res)
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
            matFlowId:values.matFlowId,
            matFlowName:values.matFlowName,
            user:{
                id: values.user.id
            }
        }
        return new Promise((resolve, reject) => {
            UpdateMatFlow(params).then(res=>{
                console.log("重命名",res)
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

}

export const MATFLOW_STORE = "matFlowStore"
