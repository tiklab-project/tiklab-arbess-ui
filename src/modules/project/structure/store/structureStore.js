import {action, observable} from "mobx";

import {
    DeleteHistoryLog,
    FindAll,
    FindExecState,
    FindHistoryLog,
    FindStructureState,
    KillInstance,
    MatFlowStartStructure,
    FindPageHistory,
    FindMatFlowUser,
} from "../api/structure";

export class StructureStore {

    @observable leftPageList = []
    @observable rightFlowData = []
    @observable rightExecuteData = []
    @observable matFlowUserList = []
    @observable modeData = {}
    @observable index = 0  // 构建区分显示 -- 构建1 、2、……
    @observable page = {
        defaultCurrent: 1,
        pageSize: "10",
        total: "1"
    }
    @observable isData = false  // 构建情况是否有数据

    @action
    setModeData = value =>{
        this.modeData = Object(value)
    }

    @action
    setIndex = value =>{
        this.index = value
    }

    @action
    setIsData = value =>{
        this.isData = value
    }

    // 开始构建
    @action
    matFlowStartStructure = async values =>{
        const params = new FormData()
        params.append("matFlowId", values.matFlowId)
        params.append("userId", values.userId)
        return await MatFlowStartStructure(params);
    }

    // 判断当前流水线是否在构建
    @action
    findExecState = async value =>{
        const param = new FormData()
        param.append("matFlowId", value)
        return new Promise((resolve, reject) => {
            FindExecState(param).then(res=>{
                if(res.code === 0){
                    if(res.data === 1){
                        this.index = 0
                    }else {
                        this.index = 1
                    }
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    //构建状态
    @action
    findStructureState = async value =>{
        const param = new FormData()
        param.append("matFlowId", value)
        return await FindStructureState(param)
    }

    //停止构建
    @action
    killInstance = async values =>{
        const params = new FormData()
        params.append("matFlowId", values.matFlowId)
        params.append("userId", values.userId)
        return await KillInstance(params)
    }

    //正在执行的详情
    @action
    findAll =async value =>{
        const param = new FormData()
        param.append("matFlowId", value)
        FindAll(param).then(res=>{
            this.rightExecuteData = res.data
            this.isData = true
        }).catch(error=>{
            console.log(error)
        })
    }

    //构建历史
    @action
    findPageHistory =async values =>{
        const params = {
            userId: values.userId,
            matFlowId: values.matFlowId,
            pageParam: {
                pageSize: 10,
                currentPage: values.pageParam.currentPage,
            },
            state:values.state,
            type:values.type,
        }
        return new Promise((resolve, reject)=>{
            FindPageHistory(params).then(res=>{
                console.log("所有历史",res)
                if(res.code === 0 ){
                    if(res.data.dataList.length === 0){
                        this.leftPageList = []
                        this.page = {}
                    } else {
                        this.leftPageList = res.data.dataList
                        this.findHistoryLog(  res.data.dataList && res.data.dataList[0].historyId)
                        this.modeData =  res.data.dataList && res.data.dataList[0]
                        this.page.total = res.data.totalRecord
                        this.isData = true
                    }
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    //历史详情日志
    @action
    findHistoryLog =async value =>{
        const param = new FormData()
        param.append("historyId", value)
        return new Promise((resolve, reject) => {
            FindHistoryLog(param).then(res=>{
                if(res.code === 0){
                    if(this.index!==0){
                        this.rightFlowData = res.data
                    }
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    //删除构建历史
    @action
    deleteHistoryLog =async value =>{
        const param = new FormData()
        param.append("historyId", value)
        return await DeleteHistoryLog(param)
    }

    @action
    findMatFlowUser =async value =>{
        const param = new FormData()
        param.append("matFlowId", value)
        FindMatFlowUser(param).then(res=>{
            console.log("执行人",res)
            if(res.code === 0 && res.data){
                this.matFlowUserList = res.data
            }
        }).catch(error=>{
            console.log(error)
        })
    }

}

export const STRUCTURE_STORE = "structureStore"