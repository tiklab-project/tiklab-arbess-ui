import {Axios} from "thoughtware-core-ui";
import {action} from "mobx";

class K8sStore {

    @action
    findAuthHostK8sPage = async params =>{
        return await Axios.post('/authHostK8s/findAuthHostK8sPage',params);
    }

    @action
    findAuthHostK8sList = async params =>{
        return await Axios.post('/authHostK8s/findAuthHostK8sList',params);
    }

    @action
    createAuthHostK8s = async params =>{
        return await Axios.post('/authHostK8s/createAuthHostK8s',params);
    }

    @action
    deleteAuthHostK8s = async params =>{
        const value = new FormData()
        value.append("hostId",params)
        return await Axios.post('/authHostK8s/deleteAuthHostK8s',value);
    }

    @action
    updateAuthHostK8s = async params =>{
        return await Axios.post('/authHostK8s/updateAuthHostK8s',params);
    }


}

export default new K8sStore();
