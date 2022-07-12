import {action, observable} from "mobx";

import {
    DeleteHistoryLog,
    FindAll,
    FindExecState,
    FindHistoryLog,
    FindStructureState,
    KillInstance,
    PipelineStartStructure,
    FindPageHistory,
    FindPipelineUser,
} from "../api/structure";

export class StructureStore {

    @observable leftPageList = []
    @observable rightFlowData = []
    @observable rightExecuteData = []
    @observable pipelineUserList = []
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
    pipelineStartStructure = async values =>{
        const params = new FormData()
        params.append("pipelineId", values.pipelineId)
        params.append("userId", values.userId)
        return await PipelineStartStructure(params);
    }

    // 判断当前流水线是否在构建
    @action
    findExecState = async values =>{
        const param = new FormData()
        param.append("pipelineId", values)
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
    findStructureState = async values=>{
        const param = new FormData()
        param.append("pipelineId", values)
        return await FindStructureState(param)
    }

    //停止构建
    @action
    killInstance = async values =>{
        const params = new FormData()
        params.append("pipelineId", values.pipelineId)
        params.append("userId", values.userId)
        return await KillInstance(params)
    }

    //正在执行的详情
    @action
    findAll =async values =>{
        const param = new FormData()
        param.append("pipelineId", values)
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
            pipelineId: values.pipelineId,
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
                        this.modeData =  res.data.dataList && res.data.dataList[0]
                        this.findHistoryLog(  res.data.dataList && res.data.dataList[0].historyId)
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
    findHistoryLog =async values =>{
        const params = new FormData()
        params.append("historyId", values)
        return new Promise((resolve, reject) => {
            FindHistoryLog(params).then(res=>{
                if(res.code === 0){
                    if( this.index!==0 ){
                        this.rightFlowData = res.data
                        this.index=1
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
    deleteHistoryLog =async values =>{
        const param = new FormData()
        param.append("historyId", values)
        return await DeleteHistoryLog(param)
    }

    @action
    findPipelineUser =async value =>{
        const param = new FormData()
        param.append("pipelineId", value)
        FindPipelineUser(param).then(res=>{
            console.log("执行人",res)
            if(res.code === 0 && res.data){
                this.pipelineUserList = res.data
            }
        }).catch(error=>{
            console.log(error)
        })
    }

}

export const STRUCTURE_STORE = "structureStore"