import {action,observable} from "mobx";
import {Axios} from "thoughtware-core-ui";
import {message} from "antd";


export class ScanStore {

    /**
     * 查询代码扫描
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    spotbugsScan = async value=> {
        const res = await Axios.post("/spotbugsScan/findSpotbugsPage", value);
        return res;
    }

    /**
     * 删除代码扫描
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    deleteSpotbugs = async value=> {
        const param = new FormData();
        param.append("bugId",value)
        const res = await Axios.post("/spotbugsScan/deleteSpotbugs", param);
        return res;
    }

    /**
     * 获取bug详情
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    findBugs = async value=> {
        const params = new FormData();
        params.append("xmlPath", value);
        const res = await Axios.post("/spotbugsScan/findBugs", params);
        return res;
    }

}

export default new ScanStore();
