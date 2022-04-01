import {observable, action} from "mobx";
import qs from "qs";

import {
    PipelineStartStructure,
    FindStructureState,
    FindHistoryLog,
    SelectHistoryDetails,
    DeleteHistoryLog
} from "../api/structure";

class StructureStore {
    constructor(store) {
        this.store=store
    }

    @observable buildHistoryList=[]
    @observable historyLog=''
    @observable logList=''

    @action
    pipelineStartStructure = async(values) =>{
        const formData = new FormData()
        formData.append("pipelineId", values)
        const data = await PipelineStartStructure(formData);
        console.log('开始构建',data)
        return data.data;
    }

    @action
    findStructureState = async (values) =>{
        const params = qs.stringify({pipelineId: values})
        return new Promise((resolve, reject) => {
            FindStructureState(params).then(res=>{
                if(res.data.data){
                    this.logList=res.data.data
                }
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
            console.log("构建历史",res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    findHistoryLog = values =>{
        const params = qs.stringify({logId: values})
        FindHistoryLog(params).then(res=>{
            console.log("历史日志",res)
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

export default StructureStore