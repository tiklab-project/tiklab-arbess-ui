import {observable,action} from "mobx";

import {
    CreatePostConfig,
    UpdatePostConfig,
    DeletePostConfig,
    FindAllPostConfig,
} from "../api/postpose";

import {message} from "antd";

export class PostposeStore {

    @observable postposeData = []
    @observable fixedPostposeData = []
    @observable isFindPostposeData = false
    @observable isLoading = false

    @action
    setIsFindPostposeData = value =>{
        this.isFindPostposeData = value
    }

    @action
    setPostposeData = value =>{
        this.postposeData = value
    }

    @action
    createPostConfig = async value =>{
        const data = await CreatePostConfig(value)
        if (data.code===0){
            message.info("添加成功",0.5)
            this.isFindPostposeData = !this.isFindPostposeData
        }
        return data
    }

    @action
    updatePostConfig = async value =>{
        const data = await UpdatePostConfig(value)
        if (data.code===0){
            message.info("更新成功",0.5)
            this.isFindPostposeData = !this.isFindPostposeData
        }
        return data
    }

    @action
    deletePostConfig = async value =>{
        const param = new FormData()
        param.append("configId",value)
        const data = await DeletePostConfig(param)
        if(data.code===0){
            message.info("删除成功",0.5)
            this.isFindPostposeData = !this.isFindPostposeData
        }
        return data
    }

    @action
    findAllPostConfig = async value =>{
        const params = new FormData()
        params.append("pipelineId",value)
        const data = await FindAllPostConfig(params)
        if(data.code===0){
            this.postposeData = data.data && data.data
            this.fixedPostposeData = data.data && data.data
        }
        return data
    }
}

export const POSTPOSE_STORE = "postposeStore"

