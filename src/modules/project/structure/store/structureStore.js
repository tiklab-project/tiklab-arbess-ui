import {action,observable} from "mobx";

import {
    DeleteHistoryLog,
    FindAllPipelineConfig,
    FindExecState,
    FindHistoryLog,
    FindStructureState,
    KillInstance,
    PipelineStartStructure,
    FindPageHistory,
    FindPipelineUser,
} from "../api/structure";

import {getUser} from "tiklab-core-ui";

export class StructureStore {

    @observable leftPageList = []
    @observable execState = ""
    @observable rightFlowData = []
    @observable rightExecuteData = []
    @observable pipelineUserList = []
    @observable modeData = {}
    @observable index = 0  // 构建区分显示 -- 构建1 、2、……
    @observable page = {
        defaultCurrent: 1,
        pageSize: "11",
        total: "1",
    }
    @observable isData = false  // 构建情况是否有数据
    @observable pageCurrent = 1 // 筛选时，设置当前页数初始化

    @observable state = 0  //状态
    @observable enforcer = null //执行人
    @observable mode = 0  //执行方式
    @observable freshen = false  // 渲染页面

    @action
    setState = value =>{
        this.state = value
    }

    @action
    setEnforcer = value =>{
        this.enforcer = value
    }

    @action
    setMode = value =>{
        this.mode = value
    }

    @action
    setFreshen = value =>{
        this.freshen = value
    }

    @action
    setModeData = value =>{
        this.modeData = Object(value)
    }

    @action
    setPageCurrent = value =>{
        this.pageCurrent = value
    }

    @action
    setIndex = value =>{
        this.index = value
    }

    @action
    setIsData = value =>{
        this.isData = value
    }

    @action
    setExecState = value =>{
        this.execState = value
    }

    // 开始构建
    @action
    pipelineStartStructure = async values =>{
        const params = new FormData()
        params.append("pipelineId", values)
        params.append("userId", getUser().userId)
        return await PipelineStartStructure(params);
    }

    // 判断当前流水线是否在构建
    @action
    findExecState = async value =>{
        const param = new FormData()
        param.append("pipelineId", value)
        return new Promise((resolve, reject) => {
            FindExecState(param).then(res=>{
                if(res.code===0){
                    if(res.data===1){
                        this.index = 0
                    }else {
                        this.index = 1
                        this.execState = ""
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
        param.append("pipelineId", value)
        return new Promise((resolve, reject) => {
            FindStructureState(param).then(res=>{
                if(res.code===0 && res.data){
                    this.execState = res.data
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    //停止构建
    @action
    killInstance = async values =>{
        const params = new FormData()
        params.append("pipelineId", values)
        params.append("userId",getUser().userId)
        const data = await KillInstance(params)
        if(data.code===0){
            this.pageCurrent = 1
        }
    }

    //正在执行的详情
    @action
    findAllPipelineConfig =async value =>{
        const param = new FormData()
        param.append("pipelineId", value)
        FindAllPipelineConfig(param).then(res=>{
            if(res.code===0){
                this.rightExecuteData = res.data
                this.isData = true
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    //构建历史
    @action
    findPageHistory =async values =>{
        const params = {
            pageParam: {
                pageSize: 11,
                currentPage: this.pageCurrent,
            },
            ...values,
        }
        return new Promise((resolve, reject)=>{
            FindPageHistory(params).then(res=>{
                if(res.code===0 && res.data){
                    if(res.data.dataList.length===0){
                        this.leftPageList = []
                        this.page = {}
                    }else{
                        this.page.total = res.data.totalPage
                        this.leftPageList = res.data.dataList
                        this.findHistoryLog(  res.data.dataList && res.data.dataList[0].historyId)
                        this.modeData =  res.data.dataList && res.data.dataList[0]
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
        const data = await DeleteHistoryLog(param)
        if(data.code===0){
            this.pageCurrent = 1
        }
        return data
    }

    @action
    findPipelineUser =async value =>{
        const param = new FormData()
        param.append("pipelineId", value)
        FindPipelineUser(param).then(res=>{
            if(res.code === 0 && res.data){
                this.pipelineUserList = res.data
            }
        }).catch(error=>{
            console.log(error)
        })
    }

}

export const STRUCTURE_STORE = "structureStore"