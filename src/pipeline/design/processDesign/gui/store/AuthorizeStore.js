import {action,observable} from "mobx";
import {Axios} from "thoughtware-core-ui";
import {message} from "antd";

class AuthorizeStore {

    // 是否在授权中
    @observable
    skin = false

    /**
     * 授权,获取code
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findCode = async value =>{
        return await Axios.post("/codeAuthorize/findCode",value)
    }

    /**
     * 获取token
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAccessToken = async value =>{
        this.skin = true
        const data = await Axios.post("/codeAuthorize/findAccessToken",value)
        if(data.code===0){
            this.skin = false
            message.success("授权成功")
        } else {
            this.skin = false
            message.info(data.msg)
        }
        return data
    }

    /**
     * 获取gitee | github仓库
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findAllStorehouse = async value =>{
        const params = new FormData()
        params.append("authId",value)
        const data = await Axios.post("/codeAuthorize/findAllStorehouse",params)
        if(data.code!==0){
            message.info(data.msg)
        }
        return data
    }

    /**
     * 获取gitee | github分支
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findBranch = async value =>{
        const params = new FormData()
        params.append("authId",value.authId)
        params.append("houseName",value.houseName)
        const data =  await Axios.post("/codeAuthorize/findBranch",params)
        return data
    }
}

const authorizeStore = new AuthorizeStore();
export default authorizeStore
