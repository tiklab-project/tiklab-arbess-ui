import { Axios } from 'doublekit-core-ui';

class WorkService {


    /**
     *
     * @param data
     * @returns {Promise<*>}
     */
    createWorkAppLink = async data => {
        const appData = await Axios.post('/appLink/createAppLink', data);
        return appData;
    };

    // 获取所有应用数据
    getWorkList = async () => {
        const appData = await Axios.post('/appLink/findAppLinkList', {});
        if (!appData.code) {
            return appData.data;
        }
        return [];
    };

    findWorkByID = async id => {

        const formData = new FormData();
        formData.append('id', id);
        const appData = await Axios.post('/appLink/findAppLink', formData);
        if (!appData.code) {
            return appData.data;
        }
        return {};
    };

    deleteWorkByID = async id => {
        const formData = new FormData();
        formData.append('id', id);

        const appData = await Axios.post('/appLink/deleteAppLink', formData);
        return appData;
    };

    updateWork = async data => {
        const updateData = await Axios.post('/appLink/updateAppLink', data);
        return updateData;
    };

}
export default new WorkService()