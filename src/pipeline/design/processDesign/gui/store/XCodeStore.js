import {action} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

class XCodeStore {

    /**
     * 获取xcode仓库
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findXcodeRpy = async value =>{
        const params = new FormData()
        params.append("authId",value)
        const data = await Axios.post("/xcodeAuthorize/findAllRepository",params)
        if(data.code!==0){
            message.info(data.msg)
        }
        return data
    }

    /**
     * 获取xcode分支
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findXcodeBranch = async value =>{
        const params = new FormData()
        params.append("authId",value.authId )
        params.append("rpyId",value.rpyId)
        const data =  await Axios.post("/xcodeAuthorize/findAllBranch",params)
        return data
    }

}

const xcodeStore= new XCodeStore()
export default xcodeStore
