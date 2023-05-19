import {action,observable} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

export class AuthorizeStore {

    // 仓库
    @observable
    storehouseList = []

    // 分支
    @observable
    branchList = []

    // xpack推送地址
    @observable
    xpackPutAddress = []

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
     * 获取仓库（gitee & github）
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
     * 获取分支（gitee & github）
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

    /**
     * 获取仓库（xcode）
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findAllRepository = async value =>{
        const params = new FormData()
        params.append("authId",value)
        const data = await Axios.post("/xcodeAuthorize/findAllRepository",params)
        if(data.code===0){
            this.storehouseList = data.data || []
        }else {
            message.info(data.msg,0.5)
            this.storehouseList = []
        }
    }

    /**
     * 获取分支（xcode）
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findAllBranch = async value =>{
        const params = new FormData()
        params.append("authId",value.authId )
        params.append("rpyName",value.rpyName)
        const data =  await Axios.post("/xcodeAuthorize/findAllBranch",params)
        if(data.code===0){
            this.branchList = data.data || []
        }
        else {
            message.info(data.msg,0.5)
            this.branchList = []
        }
    }

    /**
     * 获取xpack推送位置
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findXPackPutAddress = async value =>{
        const param = new FormData()
        param.append('authId',value)
        const data = await Axios.post('/xpackAuthorize/findAllRepository',param)
        if(data.code===0){
            this.xpackPutAddress = data.data || []
        }
        else {
            message.info(data.msg,0.5)
            this.xpackPutAddress = []
        }

    }

}

export const AUTHORIZE_STORE = "authorizeStore"
