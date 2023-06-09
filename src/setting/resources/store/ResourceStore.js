import {action,observable} from "mobx";
import {Axios} from "tiklab-core-ui";

export class ResourceStore {

    // 资源占用列表
    @observable
    resourceList = {}

    /**
     * 获取资源占用内存
     * @returns {Promise<unknown>}
     */
    @action
    findResourcesList = async () =>{
        const data = await Axios.post("/resources/findResourcesList")
        if(data.code===0){
            this.resourceList = data.data || {}
        }
        return data
    }

}

export const RESOURCE_STORE = 'resourceStore'
