import {action} from "mobx";
import {Axios} from "tiklab-core-ui";

class StatisticsStore {

    /**
     * 运行时间段统计
     * @param params
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findPipelineRunTimeSpan = async (params) => {
        return await Axios.post('/pipeline/count/findPipelineRunTimeSpan', params);
    }

    /**
     * 运行统计
     * @param params
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findPipelineRunCount = async (params) => {
        return await Axios.post('/pipeline/count/findPipelineRunCount', params);
    }

    /**
     * 结果统计
     * @param params
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findPipelineRunResultCount = async (params) => {
        return await Axios.post('/pipeline/count/findPipelineRunResultCount', params);
    }

    /**
     * 流水线概况统计
     * @param params
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findPipelineSurveyCount = async (params) => {
        const data = new FormData();
        data.append('pipelineId',params)
        return await Axios.post('/pipeline/count/findPipelineSurveyCount', data);
    }

    /**
     * 流水线概况统计
     * @param params
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findPipelineSurveyResultCount = async (params) => {
        const data = new FormData();
        data.append('pipelineId',params)
        return await Axios.post('/pipeline/count/findPipelineSurveyResultCount', data);
    }

    /**
     * 流水线动态统计
     * @param params
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findPipelineLogTypeCount = async (params) => {
        const data = new FormData();
        data.append('pipelineId',params)
        return await Axios.post('/pipeline/count/findPipelineLogTypeCount', data);
    }

    /**
     * 流水线动态统计
     * @param params
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findPipelineLogUserCount = async (params) => {
        const data = new FormData();
        data.append('pipelineId',params)
        return await Axios.post('/pipeline/count/findPipelineLogUserCount', data);
    }

    /**
     * 所有动态统计
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findLogTypeCount = async () => {
        return await Axios.post('/pipeline/count/findLogTypeCount');
    }

    /**
     * 所有动态统计
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findLogUserCount = async () => {
        return await Axios.post('/pipeline/count/findLogUserCount');
    }

    /**
     * 所有流水线统计
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findSurveyResultCount = async () => {
        return await Axios.post('/pipeline/count/findSurveyResultCount');
    }

    /**
     * 所有流水线运行统计
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findRunResultCount = async data => {
        return await Axios.post('/pipeline/count/findRunResultCount',data);
    }

    /**
     * 所有流水线发布总次数
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findRunTimeSpan = async data => {
        return await Axios.post('/pipeline/count/findRunTimeSpan',data);
    }

    /**
     * 发布次数TOP10统计
     * @returns {Promise | Promise<unknown>}
     */
    @action
    findDayRateCount = async data => {
        return await Axios.post('/pipeline/count/findDayRateCount',data);
    }

    /**
     * 近七天时间
     */
    @action
    findRecentDaysFormatted = async data => {
        const value = new  FormData();
        value.append('day',7)
        return await Axios.post('/pipeline/count/findRecentDaysFormatted',value);
    }



}


export default new StatisticsStore();
