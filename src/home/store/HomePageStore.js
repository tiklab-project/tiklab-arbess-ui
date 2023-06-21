import {observable,action} from "mobx";
import {getUser,Axios} from "tiklab-core-ui";

class HomePageStore{

    // 代办
    @observable
    taskList = []

    // 最近构建
    newlyBuild = []

    // 最近打开
    newlyOpen = []

    /**
     * 获取最近打开的流水线
     * @param value
     * @returns {Promise<*>}
     */
    @action
    findAllOpen = async value =>{
        const param = new FormData()
        param.append("number",value)
        const data = await Axios.post("/open/findAllOpen",param)
        if(data.code===0){
            this.newlyOpen = data.data || []
        }
        return data
    }

    /**
     * 获取最近构建的流水线
     * @returns {Promise<unknown>}
     */
    findPipelineRecently = async value =>{
        const param = new FormData()
        param.append("number",value)
        const data = await Axios.post('/pipeline/findPipelineRecently',param)
        if(data.code===0){
            this.newlyBuild = data.data || []
        }
        return data
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
        if(data.code===0 && data.data){
            this.taskList=data.data && data.data.dataList
        }
    }

}

const homePageStore = new HomePageStore();
export default homePageStore;
