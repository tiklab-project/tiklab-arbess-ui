import {action} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

class ResourceStore {

    /**
     * 获取资源占用内存
     * @returns {Promise<unknown>}
     */
    @action
    findResourcesList = async () =>{
        const data = await Axios.post("/resources/findResourcesList")
        return data
    }


    /**
     * 获取流水线缓存
     */
    @action
    findDiskList = async () =>{
        const data = await Axios.post("/disk/findDiskList")
        return data
    }


    /**
     * 清理磁盘空间
     */
    @action
    cleanDisk = async value =>{
        const data = await Axios.post("/disk/cleanDisk",value)
        if(data.code===0){message.info("清理成功")}
        else {message.info("清理失败")}
        return data
    }

}

const resourceStore = new ResourceStore();
export default resourceStore;
