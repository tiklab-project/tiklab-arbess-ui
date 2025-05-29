/**
 * @Description:
 * @Author: gaomengyuan
 * @Date: 2025/5/26
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/5/26
 */
import {action} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

class SonarQubeScanStore {

    /**
     * 获取SonarQube
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findSonarQubeScanPage = async value =>{
        return await Axios.post('/sonarQubeScan/findSonarQubeScanPage',value)
    }

    /**
     * 删除SonarQube
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    deleteSonarQubeScan = async value =>{
        const id = new FormData();
        id.append('id',value)
        const data = await Axios.post('/sonarQubeScan/deleteSonarQubeScan',id);
        if(data.code===0){
            message.success('删除成功')
        } else {
            message.error('删除失败')
        }
        return data
    }

}

export default new SonarQubeScanStore();
