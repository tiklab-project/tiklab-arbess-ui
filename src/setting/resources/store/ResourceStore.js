import {action} from "mobx";
import {Axios} from "thoughtware-core-ui";
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
     * 查看磁盘空间详情
     */
    @action
    findResourcesDetails = async  value =>{
        const param = new FormData();
        param.append('type',value)
        return await Axios.post("/resources/findResourcesDetails", param)
    }

    /**
     * 获取流水线缓存
     */
    @action
    findDiskList = async () =>{
        return await Axios.post("/disk/findDiskList")
    }

    /**
     * 清理磁盘空间
     */
    @action
    cleanDisk = async value =>{
        const param = new FormData();
        param.append("fileList",value.fileList)
        const data = await Axios.post("/disk/cleanDisk",param)
        if(data.code===0){
            message.info("清理成功")
        } else {
            message.info("清理失败")
        }
        return data
    }

    /**
     * 获取日志、制品保存时长
     */
    @action
    findAllCathe = async () =>{
        return await Axios.post("/cache/findAllCathe")
    }

    /**
     * 更新日志、制品保存时长
     */
    @action
    updateCathe = async value =>{
        return await Axios.post("/cache/updateCathe", value)
    }

}

const resourceStore = new ResourceStore();
export default resourceStore;
