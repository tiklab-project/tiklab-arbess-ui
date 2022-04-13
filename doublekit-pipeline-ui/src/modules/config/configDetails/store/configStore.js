import {observable, action, values} from "mobx";
import qs from "qs";

import {
    CreateCode
} from '../api/configDetails'

class ConfigStore{
    constructor(store) {
        this.store=store
    }

    @action
    createCode = values =>{
        const params = qs.stringify({pipelineId: values})
        CreateCode(params).then(res=>{
            console.log('添加代码源',res)
        }).catch(error=>{
            console.log(error)
        })
    }
}

export default ConfigStore
