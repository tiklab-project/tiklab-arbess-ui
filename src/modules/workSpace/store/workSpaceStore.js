import {observable,action} from "mobx";

import {
    GetSubmitMassage
} from "../api/workSpace";

export class WorkSpaceStore{

    @action
    getSubmitMassage = async value =>{
        const param = new FormData()
        param.append('pipelineId',value)
        const data = await GetSubmitMassage(param)
        return data.data
    }
}

export const WORKSPACE_STORE = 'workSpaceStore'