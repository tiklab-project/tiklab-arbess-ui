import {observable,action} from "mobx";

import {
    CreatePostConfig,
    UpdatePostConfig,
    DeletePostConfig,
    FindAllPostConfig,
    MessageSendType
} from "../api/postprocess";

export class PostprocessStore {

    @observable postprocessData = []
    @observable fixedPostprocessData = []
    @observable isFindPostprocessData = false
    @observable mesSendData = []

    @action
    setIsFindPostprocessData = value =>{
        this.isFindPostprocessData = value
    }

    @action
    setPostprocessData = value =>{
        this.postprocessData = value
    }

    @action
    createPostConfig = async value =>{
        const data = await CreatePostConfig(value)
        if (data.code===0){
            this.isFindPostprocessData = !this.isFindPostprocessData
        }
        return data
    }

    @action
    updatePostConfig = async value =>{
        const data = await UpdatePostConfig(value)
        if (data.code===0){
            this.isFindPostprocessData = !this.isFindPostprocessData
        }
        return data
    }

    @action
    deletePostConfig = async value =>{
        const param = new FormData()
        param.append("configId",value)
        const data = await DeletePostConfig(param)
        if(data.code===0){
            this.isFindPostprocessData = !this.isFindPostprocessData
        }
        return data
    }

    @action
    findAllPostConfig = async value =>{
        const params = new FormData()
        params.append("taskId",value)
        const data = await FindAllPostConfig(params)
        if(data.code===0){
            this.fixedPostprocessData = data.data ? data.data : []
            this.postprocessData = data.data ? data.data : []
        }
        return data
    }

    @action
    messageSendType = async value =>{
        const data = await MessageSendType()
        if(data.code===0){
            this.mesSendData=data.data && data.data
        }
        return data
    }

}

export const POSTPROCESS_STORE = "postprocessStore"

