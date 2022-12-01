import {action} from "mobx";

import {PipelineCensus} from "../api/survey";

export class SurveyStore {

    @action
    pipelineCensus = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        return new Promise((resolve,reject)=>{
            PipelineCensus(param).then(res=>{
                resolve(res)

            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

}

export const SURVEY_STORE = "surveyStore"