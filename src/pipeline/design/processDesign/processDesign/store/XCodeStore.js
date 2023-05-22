import {action,observable} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

export class XCodeStore {

    // 仓库
    @observable
    storehouseList = []

    // 分支
    @observable
    branchList = []

    /**
     * 获取xcode仓库
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
     * 获取xcode分支
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

}

export const XCODE_STORE = "xcodeStore"
