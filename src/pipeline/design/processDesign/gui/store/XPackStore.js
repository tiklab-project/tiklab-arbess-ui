import {action} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

class XPackStore {

    /**
     * 获取xpack推送位置
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findXPackRpy = async value =>{
        const param = new FormData()
        param.append('authId',value)
        const data = await Axios.post('/xpackAuthorize/findAllRepository',param)
        if(data.code!==0){
            message.info(data.msg)
        }
        return data
    }


}

const xpackStore = new XPackStore();
export default xpackStore;
