import {action,observable} from "mobx";

import {PipelineCensus} from "../api/survey";

export class SurveyStore {

    @observable census = ""

    @action
    pipelineCensus = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        return new Promise((resolve,reject)=>{
            PipelineCensus(param).then(res=>{
                if(res.code===0){
                    this.census = res.data && res.data
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

}

export const SURVEY_STORE = "surveyStore"