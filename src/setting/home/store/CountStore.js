import {action} from "mobx";
import {Axios} from "thoughtware-core-ui";


class CountStore {

    /**
     * 获取统计数
     */
    @action
    findCount = async () => {
        return await Axios.post('/count/findCount')
    }

}


export default new CountStore()
