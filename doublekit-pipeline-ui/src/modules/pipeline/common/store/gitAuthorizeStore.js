import {observable,action} from "mobx";
import qs from "qs";

import {
    Url,
    Code,
} from "../api/gitAuthorize";

class GitAuthorizeStore{
    constructor(store) {
        this.store=store
    }

    @action
    url =async () =>{
        const data = await Url();
        return data.data;
    }

    @action
    code = value =>{
        const param = qs.stringify({code: value})
        Code(param).then(res=>{
            console.log('code',res)
        })
    }

}

export default GitAuthorizeStore