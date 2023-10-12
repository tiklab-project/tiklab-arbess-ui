import {action,observable} from "mobx";
import {Axios, getUser} from "tiklab-core-ui";

class OverviewStore {

    // 动态
    @observable
    dynamicList = []

    // 动态分页
    @observable
    dynaPage = {
        currentPage: 1,
        totalPage: 1,
        totalRecord: 1,
    }

    /**
     * 获取所有动态
     * @param values
     * @returns {Promise<*>}
     */
    @action
    findlogpage = async values =>{
        const param = {
            ...values,
            bgroup:"matflow",
        }
        const data = await Axios.post("/oplog/findlogpage",param)
        if(data.code===0){
            this.dynamicList=data.data && data.data.dataList
            this.dynaPage = {
                currentPage: data.data.currentPage,
                totalPage: data.data.totalPage,
                totalRecord: data.data.totalRecord,
            }
        }
        return data
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
                console.log(error)
                reject()
            })
        })
    }
    /**
     * 获取代办
     * @returns {Promise<void>}
     */
    @action
    findtodopage = async () =>{
        const params = {
            pageParam:{
                pageSize:5,
                currentPage:1
            },
            bgroup:"matflow",
            userId: getUser().userId,
        }
        const data = await Axios.post("/todo/findtodopage",params)
        return data
    }

}

const overviewStore = new OverviewStore();
export default overviewStore
