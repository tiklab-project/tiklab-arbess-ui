import {action,observable} from "mobx";
import {Axios} from "tiklab-core-ui";
import {message} from "antd";

export class XPackStore {


    // xpack推送地址
    @observable
    xpackPutAddress = []

    /**
     * 获取xpack推送位置
     * @param value
     * @returns {Promise<void>}
     */
    @action
    findXPackPutAddress = async value =>{
        const param = new FormData()
        param.append('authId',value)
        const data = await Axios.post('/xpackAuthorize/findAllRepository',param)
        if(data.code===0){
            this.xpackPutAddress = data.data || []
        }
        else {
            message.info(data.msg,0.5)
            this.xpackPutAddress = []
        }
    }


}

export const XPACK_STORE = 'xpackStore'
