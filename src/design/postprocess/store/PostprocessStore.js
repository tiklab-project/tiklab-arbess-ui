import {observable,action} from "mobx";

import {
    CreatePostConfig,
    UpdatePostConfig,
    DeletePostConfig,
    FindAllPostConfig,
    MessageSendType
} from "../api/Postprocess";

export class PostprocessStore {

    // 后置处理数据
    @observable
    postprocessData = []

    // 后置处理数据
    @observable
    fixedPostprocessData = []

    // 查找后置处理
    @observable
    isFindPostprocessData = false

    //未配置的消息发送方式
    @observable
    mesSendData = []

    /**
     * 设置重新查找后置处理
     * @param value
     */
    @action
    setIsFindPostprocessData = value =>{
        this.isFindPostprocessData = value
    }

    /**
     * 设置后置处理数据
     * @param value
     */
    @action
    setPostprocessData = value =>{
        this.postprocessData = value
    }

    /**
     * 添加后置处理
     * @param value
     * @returns {Promise<*>}
     */
    @action
    createPostConfig = async value =>{
        const data = await CreatePostConfig(value)
        if (data.code===0){
            this.isFindPostprocessData = !this.isFindPostprocessData
        }
        return data
    }

    /**
     * 更新后置处理
     * @param value
     * @returns {Promise<*>}
     */
    @action
    updatePostConfig = async value =>{
        const data = await UpdatePostConfig(value)
        if (data.code===0){
            this.isFindPostprocessData = !this.isFindPostprocessData
        }
        return data
    }

    /**
     * 删除后置处理
     * @param value
     * @returns {Promise<*>}
     */
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

    /**
     * 获取所有后置处理
     * @param value
     * @returns {Promise<*>}
     */
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

    /**
     * 获取未配置的消息发送方式
     * @param value
     * @returns {Promise<*>}
     */
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

