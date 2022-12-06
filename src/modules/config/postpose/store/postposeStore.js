import {observable,action} from "mobx";

import {
    CreateAfterConfig,
    UpdateAfterConfig,
    DeleteAfterConfig,
    FindAllAfterConfig,
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
    createAfterConfig = async value =>{
        const data = await CreateAfterConfig(value)
        if (data.code===0){
            message.info("添加成功",0.5)
            this.isFindPostposeData = !this.isFindPostposeData
        }
        return data
    }

    @action
    updateAfterConfig = async value =>{
        const data = await UpdateAfterConfig(value)
        if (data.code===0){
            message.info("更新成功",0.5)
            // this.isFindPostposeData = !this.isFindPostposeData
        }
        return data
    }

    @action
    deleteAfterConfig = async value =>{
        const param = new FormData()
        param.append("configId",value)
        const data = await DeleteAfterConfig(param)
        if(data.code===0){
            message.info("删除成功",0.5)
            this.isFindPostposeData = !this.isFindPostposeData
        }
        return data
    }

    @action
    findAllAfterConfig = async value =>{
        this.isLoading = true
        const params = new FormData()
        params.append("pipelineId",value)
        const data = await FindAllAfterConfig(params)
        if(data.code===0){
            this.postposeData = data.data && data.data
            this.fixedPostposeData = data.data && data.data
            this.isLoading = false
        }
        return data
    }
}

export const POSTPOSE_STORE = "postposeStore"

