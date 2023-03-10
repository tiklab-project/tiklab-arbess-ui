import {action, observable} from "mobx";
import {Axios} from "tiklab-core-ui";

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
    createPost = async value =>{
        const data = await Axios.post("/postprocess/createPost",value)
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
    updatePost = async value =>{
        const data = await Axios.post("/postprocess/updatePost",value)
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
    deletePost = async value =>{
        const param = new FormData()
        param.append("postprocessId",value)
        const data = await Axios.post("/postprocess/deletePost",param)
        if(data.code===0){
            this.isFindPostprocessData = !this.isFindPostprocessData
        }
        return data
    }

    /**
     * 获取流水线后置处理
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findPipelinePost = async value =>{
        const params = new FormData()
        params.append("pipelineId",value)
        const data = await Axios.post("/postprocess/findPipelinePost",params)
        if(data.code===0){
            this.postprocessData = data.data && data.data
        }
        return data
    }

    /**
     * 获取任务后置处理
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findTaskPost = async value =>{
        const params = new FormData()
        params.append("taskId",value)
        const data = await Axios.post("/postprocess/findTaskPost",params)
        if(data.code===0){
            this.fixedPostprocessData = data.data ? data.data : []
            this.postprocessData = data.data ? data.data : []
        }
        return data
    }

    /**
     * 获取单个后置处理信息
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findOnePost = async value =>{
        const param = new FormData()
        param.append("postprocessId",value)
        return await Axios.post("/postprocess/findOnePost", param)
    }

    /**
     * 获取未配置的消息发送方式
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findMessageSendType = async value =>{
        const data = await Axios.post("/taskMessage/findMessageSendType")
        if(data.code===0){
            this.mesSendData=data.data && data.data
        }
        return data
    }

}

export const POSTPROCESS_STORE = "postprocessStore"

