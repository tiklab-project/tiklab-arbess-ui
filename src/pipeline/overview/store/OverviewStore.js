import {action,observable} from "mobx";
import {Axios} from "tiklab-core-ui";

class OverviewStore {

    // 运行概况数据
    @observable
    census = ""

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
        const data = await Axios.post("/oplog/findlogpage",values)
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
                if(res.code===0){
                    this.census = res.data && res.data
                }
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

}

const overviewStore = new OverviewStore();
export default overviewStore
