import {observable, action} from "mobx";
import qs from "qs";

import {
    PipelineStructure,
    SelectStructureState,
    SelectHistoryLog,
    SelectHistoryDetails,
    DeleteHistoryLog
} from "../api/structure";

class StructureStore {
    constructor(store) {
        this.store=store
    }

    @observable logList=''
    @observable buildHistoryList=[]
    @observable historyLog=''

    @action
    pipelineStructure = async(values) =>{
        const formData = new FormData()
        formData.append("pipelineId", values)
        const data = await PipelineStructure(formData);
        console.log('开始构建',data)
        return data.data;
    }

    @action
    selectStructureState = async (values) =>{
        const params = qs.stringify({pipelineId: values})
        return new Promise((resolve, reject) => {
            SelectStructureState(params).then(res=>{
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
            console.log("构建历史",res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    SelectHistoryLog = values =>{
        const params = qs.stringify({historyId: values})
        SelectHistoryLog(params).then(res=>{
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