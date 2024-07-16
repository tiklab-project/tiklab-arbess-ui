import {action} from "mobx";
import {Axios} from "thoughtware-core-ui";

class StatisticsStore {

    /**
     * 运行时间段统计
     * @param params
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findPipelineRunTimeSpan = (params) => {
        return Axios.post('/pipeline/count/findPipelineRunTimeSpan', params);
    }

    /**
     * 运行统计
     * @param params
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findPipelineRunCount = (params) => {
        return Axios.post('/pipeline/count/findPipelineRunCount', params);
    }

    /**
     * 结果统计
     * @param params
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findPipelineRunResultCount = (params) => {
        return Axios.post('/pipeline/count/findPipelineRunResultCount', params);
    }

}


export default new StatisticsStore();
