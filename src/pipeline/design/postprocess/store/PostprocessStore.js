import {action, observable} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

class PostprocessStore {

    // 后置处理数据
    @observable
    postprocessData = []

    //未配置的消息发送方式
    @observable
    mesSendData = []

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
            message.success("添加成功")
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
            message.success("更新成功")
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
        param.append("postId",value)
        const data = await Axios.post("/postprocess/deletePost",param)
        if(data.code===0){
            message.success("删除成功")
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
    findTaskPost = async (value,type) =>{
        const params = new FormData()
        params.append("taskId",value)
        const data = await Axios.post("/postprocess/findTaskPost",params)
        if(data.code===0){
            if(type==='task'){

            }else {
                this.postprocessData = data?.data || []
            }
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
        param.append("postId",value)
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

const postprocessStore = new PostprocessStore();
export default postprocessStore
