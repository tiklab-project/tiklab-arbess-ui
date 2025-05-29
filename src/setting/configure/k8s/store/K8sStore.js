import {Axios} from "tiklab-core-ui";
import {action} from "mobx";

class K8sStore {

    /**
     * 创建Kubernetes集群
     * @param params
     * @returns {Promise<unknown>}
     */
    @action
    createKubectl = async params =>{
        return await Axios.post('/kubectl/createKubectl',params);
    }

    /**
     * 删除Kubernetes集群
     * @param params
     * @returns {Promise<unknown>}
     */
    @action
    deleteKubectl = async params =>{
        const value = new FormData()
        value.append("id",params)
        return await Axios.post('/kubectl/deleteKubectl',value);
    }

    /**
     * 更新Kubernetes集群
     * @param params
     * @returns {Promise<unknown>}
     */
    @action
    updateKubectl = async params =>{
        return await Axios.post('/kubectl/updateKubectl',params);
    }

    /**
     * 获取Kubernetes集群
     * @param params
     * @returns {Promise<unknown>}
     */
    @action
    findKubectlPage = async params =>{
        return await Axios.post('/kubectl/findKubectlPage',params);
    }

    /**
     * 获取Kubernetes集群
     * @param params
     * @returns {Promise<unknown>}
     */
    @action
    findKubectlList = async params =>{
        return await Axios.post('/kubectl/findKubectlList',params);
    }


    /**
     * 获取Kubernetes集群
     * @param params
     * @returns {Promise<unknown>}
     */
    @action
    findKubectl = async params =>{
        return await Axios.post('/kubectl/findKubectl',params);
    }

}

export default new K8sStore();
