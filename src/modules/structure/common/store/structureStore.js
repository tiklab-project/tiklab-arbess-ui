import {observable, action} from "mobx";
import qs from "qs";

import {
    PipelineStartStructure,
    FindExecState,
    FindStructureState,
    FindHistoryLog,
    SelectHistoryDetails,
    DeleteHistoryLog,
    FindAll
} from "../api/structure";

class StructureStore {
    
    constructor(store) {
        this.store=store
    }

    @observable logList=''

    @action
    pipelineStartStructure = async values =>{
        const formData = new FormData()
        formData.append("pipelineId", values)
        const data = await PipelineStartStructure(formData);
        return data.data;
    }

    @action
    findExecState = async(values) =>{
        const formData = new FormData()
        formData.append("pipelineId", values)
        const data = await FindExecState(formData);
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
                resolve(res.data)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

    @action
    selectHistoryDetails =async values =>{
        const params = new FormData()
        params.append("pipelineId", values)
        const data = await SelectHistoryDetails(params);
        return data.data;

    }

    @action
    findHistoryLog =async values =>{
        const params = new FormData()
        params.append("historyId", values)
        const data = await FindHistoryLog(params);
        return data.data;
    }

    @action
    deleteHistoryLog = values =>{
        const params = qs.stringify({historyId: values})
        DeleteHistoryLog(params).then(res=>{
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    findAll =async values =>{
        const params = new FormData()
        params.append("pipelineId", values)
        const data = await FindAll(params);
        return data.data;
    }


}

export default StructureStore