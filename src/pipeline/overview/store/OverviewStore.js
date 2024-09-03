import {action} from "mobx";
import {Axios, getUser} from "thoughtware-core-ui";

class OverviewStore {

    /**
     * 获取所有动态
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findlogpage = async values =>{
        const param = {
            ...values,
            bgroup:"arbess",
        }
        return await Axios.post("/oplog/findlogpage", param)
    }

    /**
     * 获取所有动态
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findLogPageByTime = async values =>{
        const param = {
            ...values,
            bgroup:"arbess",
        }
        return await Axios.post("/oplog/findLogPageByTime", param)
    }

    /**
     * 获取所有动态筛选类型
     * @returns {Promise<*>}
     */
    @action
    findlogtype = async () =>{
        return await Axios.post("/oplog/type/findlogtypelist", {
            bgroup:"arbess"
        })
    }

    /**
     * 获取运行概况数据
     * @param value
     * @returns {Promise<unknown>}
     */
    @action
    pipelineCensus = async value =>{
        const param = new FormData()
        param.append("pipelineId",value)
        return new Promise((resolve,reject)=>{
            Axios.post("/overview/pipelineCensus",param).then(res=>{
                resolve(res)
            }).catch(error=>{
                reject()
            })
        })
    }

    /**
     * 获取待办
     * @returns {Promise<void>}
     */
    @action
    findtodopage = async () =>{
        const params = {
            pageParam:{
                pageSize:5,
                currentPage:1
            },
            bgroup:"arbess",
            userId: getUser().userId,
        }
        return await Axios.post("/todo/findtodopage", params)
    }

}

const overviewStore = new OverviewStore();
export default overviewStore
