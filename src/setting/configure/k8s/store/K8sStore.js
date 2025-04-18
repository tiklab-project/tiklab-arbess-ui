import {Axios} from "tiklab-core-ui";
import {action} from "mobx";

class K8sStore {

    /**
     * 获取Kubernetes集群
     * @param params
     * @returns {Promise<unknown>}
     */
    @action
    findAuthHostK8sPage = async params =>{
        return await Axios.post('/authHostK8s/findAuthHostK8sPage',params);
    }

    /**
     * 获取Kubernetes集群
     * @param params
     * @returns {Promise<unknown>}
     */
    @action
    findAuthHostK8sList = async params =>{
        return await Axios.post('/authHostK8s/findAuthHostK8sList',params);
    }

    /**
     * 添加Kubernetes集群
     * @param params
     * @returns {Promise<unknown>}
     */
    @action
    createAuthHostK8s = async params =>{
        return await Axios.post('/authHostK8s/createAuthHostK8s',params);
    }

    /**
     * 删除Kubernetes集群
     * @param params
     * @returns {Promise<unknown>}
     */
    @action
    deleteAuthHostK8s = async params =>{
        const value = new FormData()
        value.append("hostId",params)
        return await Axios.post('/authHostK8s/deleteAuthHostK8s',value);
    }

    /**
     * 更新Kubernetes集群
     * @param params
     * @returns {Promise<unknown>}
     */
    @action
    updateAuthHostK8s = async params =>{
        return await Axios.post('/authHostK8s/updateAuthHostK8s',params);
    }


}

export default new K8sStore();
