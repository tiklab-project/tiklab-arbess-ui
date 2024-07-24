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

    /**
     * 流水线概况统计
     * @param params
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findPipelineSurveyCount = (params) => {
        const data = new FormData();
        data.append('pipelineId',params)
        return Axios.post('/pipeline/count/findPipelineSurveyCount', data);
    }

    /**
     * 流水线概况统计
     * @param params
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findPipelineSurveyResultCount = (params) => {
        const data = new FormData();
        data.append('pipelineId',params)
        return Axios.post('/pipeline/count/findPipelineSurveyResultCount', data);
    }

    /**
     * 流水线动态统计
     * @param params
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findPipelineLogTypeCount = (params) => {
        const data = new FormData();
        data.append('pipelineId',params)
        return Axios.post('/pipeline/count/findPipelineLogTypeCount', data);
    }

    /**
     * 流水线动态统计
     * @param params
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findPipelineLogUserCount = (params) => {
        const data = new FormData();
        data.append('pipelineId',params)
        return Axios.post('/pipeline/count/findPipelineLogUserCount', data);
    }


}


export default new StatisticsStore();
