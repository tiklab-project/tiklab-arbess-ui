import {observable, action} from "mobx";
import qs from "qs";

import {
    PipelineStructure,
    SelectStructureState,
    SelectHistoryLog,
    SelectHistoryDetails,
    DeleteHistoryLog
} from "../api/build";

class BuildStore {
    constructor(store) {
        this.store=store
    }

    @observable logList=''
    @observable buildHistoryList=[]
    @observable historyLog=''

    @action //开始构建
    pipelineStructure = async(values) =>{
        const formData = new FormData()
        formData.append("pipelineId", values)
        const data = await PipelineStructure(formData);
        console.log('开始构建',data)
        return data.data;
    }

    @action //查询状态
    selectStructureState = async () =>{
        return new Promise((resolve, reject) => {
            SelectStructureState().then(res=>{
                this.logList=res.data.data
                console.log("查询状态",res)
                resolve(res.data)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }


    @action
    selectHistoryDetails = values =>{
        const formData = new FormData()
        formData.append("pipelineId", values)
        SelectHistoryDetails(formData).then(res=>{
            this.buildHistoryList=res.data.data
            console.log("构建历史详情",res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    SelectHistoryLog =values =>{
        const params = qs.stringify({historyId: values})
        SelectHistoryLog(params).then(res=>{
            console.log("历史详情",res)
            this.historyLog=res.data.data
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    deleteHistoryLog = values =>{
        const params = qs.stringify({historyId: values})
        DeleteHistoryLog(params).then(res=>{
            console.log("删除构建历史",res)
        }).catch(error=>{
            console.log(error)
        })
    }

}

export default BuildStore