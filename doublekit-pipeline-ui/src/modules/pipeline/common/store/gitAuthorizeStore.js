import {observable,action} from "mobx";
import qs from "qs";

import {
    Url,
    Code,
    GetAllStorehouse,
} from "../api/gitAuthorize";

class GitAuthorizeStore{
    constructor(store) {
        this.store=store
    }

    @observable gitList = []

    @action
    url =async () =>{
        const data = await Url();
        return data.data;
    }

    @action
    code = value =>{
        const param = qs.stringify({code: value})
        Code(param).then(res=>{
            console.log('code', res)
        }).catch(error=>{
            console.log(error)
        })
    }

    @action
    getAllStorehouse = value =>{
        GetAllStorehouse().then(res=>{
            this.gitList =res.data.data
            console.log('getAllStorehouse',  this.gitList )
        }).catch(error=>{
            console.log(error)
        })
    }

}

export default GitAuthorizeStore