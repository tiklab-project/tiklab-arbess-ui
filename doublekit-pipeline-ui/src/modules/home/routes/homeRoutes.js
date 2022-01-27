import Pipeline from "../../pipeline/pipeline";
import System from "../../system";
import Task from "../../pipelineTask/task";
import PipelineNew from "../../pipelineNew/pipelineNew";
import NewDeployment from "../../pipelineNewDeployment/newDeployment";
export const homeRoutes=[
    {
        title:"流水线",
        path:"/pipeline",
        component:Pipeline,
        isShow:true
    },
    {
        title:"系统设置",
        path:"/system",
        component: System,
        isShow:true
    },
    {
        path:"/task",
        component: Task,
        isShow: false
    },
    {
        path:"/new",
        component: PipelineNew,
        isShow: false
    },
    {
        path:"/deployment",
        component: NewDeployment,
        isShow: false
    }
]