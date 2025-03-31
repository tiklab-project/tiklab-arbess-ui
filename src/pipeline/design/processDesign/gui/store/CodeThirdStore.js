import {action} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

class CodeThirdStore {

    /**
     * 获取gitpuk仓库
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findGittokRpy = async value =>{
        const params = {
            authId:value
        }
        const data = await Axios.post("/code/third/gittok/findStoreHouseList",params)
        if(data.code!==0){
            message.info(data.msg)
        }
        return data
    }

    /**
     * 获取gitpuk分支
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findGittokBranch = async value =>{
        const params = {
            authId:value.authId,
            houseId:value.houseId
        }
        const data =  await Axios.post("/code/third/gittok/findHouseBranchList",params)
        return data
    }

    /**
     * 获取Gitee仓库
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findGiteeRpy = async value =>{
        const params = {
            authId:value
        }
        const data = await Axios.post("/code/third/gitee/findStoreHouseList",params)
        if(data.code!==0){
            message.info(data.msg)
        }
        return data
    }

    /**
     * 获取Gitee分支
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findGiteeBranch = async value =>{
        const params = {
            authId:value.authId,
            houseId:value.houseId
        }
        const data =  await Axios.post("/code/third/gitee/findHouseBranchList",params)
        return data
    }

    /**
     * 获取Github仓库
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findGithubRpy = async value =>{
        const params = {
            authId:value
        }
        const data = await Axios.post("/code/third/github/findStoreHouseList",params)
        if(data.code!==0){
            message.info(data.msg)
        }
        return data
    }

    /**
     * 获取gitlab分支
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findGithubBranch = async value =>{
        const params = {
            authId:value.authId,
            houseId:value.houseId
        }
        const data =  await Axios.post("/code/third/github/findHouseBranchList",params)
        return data
    }

    /**
     * 获取gitlab仓库
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findGitlabRpy = async value =>{
        const params = {
            authId:value
        }
        const data = await Axios.post("/code/third/gitlab/findStoreHouseList",params)
        if(data.code!==0){
            message.info(data.msg)
        }
        return data
    }

    /**
     * 获取gitlab分支
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findGitlabBranch = async value =>{
        const params = {
            authId:value.authId,
            houseId:value.houseId
        }
        const data =  await Axios.post("/code/third/gitlab/findHouseBranchList",params)
        return data
    }

    /**
     * 获取自建gitlab仓库
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findPriGitlabRpy = async value =>{
        const params = {
            authId:value
        }
        const data = await Axios.post("/code/third/pri/v4/gitlab/findStoreHouseList",params)
        if(data.code!==0){
            message.info(data.msg)
        }
        return data
    }

    /**
     * 获取自建gitlab分支
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findPriGitlabBranch = async value =>{
        const params = {
            authId:value.authId,
            houseId:value.houseId
        }
        const data = await Axios.post("/code/third/pri/v4/gitlab/findHouseBranchList",params)
        if(data.code!==0){
            message.info(data.msg)
        }
        return data
    }

}

export default new CodeThirdStore()
