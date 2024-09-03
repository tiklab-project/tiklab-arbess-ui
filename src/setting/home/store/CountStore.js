import {action} from "mobx";
import {Axios, getUser} from "thoughtware-core-ui";


class CountStore {

    /**
     * 获取统计数
     */
    @action
    findCount = async () => {
        return await Axios.post('/count/findCount')
    }

    /**
     * 查询产品状态
     * @returns {Promise<unknown>}
     */
    findHomesApplyProduct= async () =>{
        return await Axios.post('/home/product/findApplyProduct', {
            type: 'cloud',
            versionType: 'server',
            tenantId: getUser().tenant,
            code:'arbess',
        })
    }

    /**
     * 查询产品状态
     * @returns {Promise<unknown>}
     */
    findUseLicence= async () =>{
        return await Axios.post('/licence/findUseLicence')
    }

}


export default new CountStore()
