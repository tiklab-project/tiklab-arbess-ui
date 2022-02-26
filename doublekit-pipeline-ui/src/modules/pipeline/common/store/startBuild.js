import {observable, action} from "mobx";
import qs from "qs";

import {
    FoundPipelineLog,
    SelectPipelineLog,
} from "../api/startBuild";

class StartBuild {
    constructor(store) {
        this.store=store
    }
    @observable logId=''

    @action
    foundPipelineLog = values =>{
        const params = qs.stringify({pipelineId: values})
        FoundPipelineLog(params).then(res=>{
            this.logId=res.data.data
            localStorage.setItem('logId',this.logId)
            console.log("构建",res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    selectPipelineLog = values =>{
        const params = qs.stringify({logId: values})
        SelectPipelineLog(params).then(res=>{
            console.log("查询构建结果",res)
        }).catch(error=>{
            console.log(error)
        })
    }
}
export default StartBuild