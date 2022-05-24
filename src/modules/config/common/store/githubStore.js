import {observable,action} from "mobx";

import {
    GetCode,
    GetAccessToken,
    GetAllStorehouse,
    GetBranch,
} from "../api/github";


class GithubStore {

    constructor(store) {
        this.store = store
    }

    @action
    getCode = async () =>{
        const data = await GetCode()
        return data.data
    }

    @action
    getAccessToken = async () =>{
        const data = await GetAccessToken()
        return data.data
    }

    @action
    getAllGithubStorehouse = async () =>{
        const data = await GetAllStorehouse()
        return data.data
    }

    @action
    getGithubBranch = async () =>{
        const data = await GetBranch()
        return data.data
    }

}

export default GithubStore