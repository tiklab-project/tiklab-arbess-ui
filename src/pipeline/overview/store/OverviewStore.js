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
        defaultCurrent: 1,
        pageSize: 15,
        total: 1, // 此处为动态分页的页数
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
            this.dynaPage.total=data.data && data.data.totalPage
            this.dynamicList=data.data && data.data.dataList
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
