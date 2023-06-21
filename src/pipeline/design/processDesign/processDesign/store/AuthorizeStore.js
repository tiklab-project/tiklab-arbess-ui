import {action,observable} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

class AuthorizeStore {

    // 仓库
    @observable
    storehouseList = []

    // 分支
    @observable
    branchList = []

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
            message.success("授权成功",0.5)
        }
        else {
            this.skin = false
            message.info(data.msg,0.5)
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
        if(data.code===0){
            this.storehouseList = data.data || []
        }else {
            message.info(data.msg,0.5)
            this.storehouseList = []
        }
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
        if(data.code===0){
            this.branchList = data.data || []
        }
        else {
            message.info(data.msg,0.5)
            this.branchList = []
        }
    }
}

const authorizeStore = new AuthorizeStore();
export default authorizeStore
