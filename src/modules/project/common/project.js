import React,{useEffect,useState} from "react";
import {renderRoutes} from "react-router-config";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import {SYSTEM_ROLE_STORE} from "tiklab-privilege-ui/lib/store";
import ProjectAside from "./projectAside";
import Loading from "../../common/loading/loading";
import {ApartmentOutlined, ClockCircleOutlined, CreditCardOutlined} from "@ant-design/icons";

const Project= (props)=>{

    const {route,match,pipelineStore,systemRoleStore,configStore}=props

    const {findAllPipelineStatus,setPipeline,findOnePipeline} = pipelineStore
    const {getInitProjectPermissions} = systemRoleStore

    const pipelineId = match.params.id
    const userId = getUser().userId
    const [isAside,setIsAside] = useState(true)
    const [isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
        // 所有流水线
        findAllPipelineStatus()
        return ()=>setPipeline("")
    },[])

    useEffect(()=>{
        // 所有流水线
        findOnePipeline(pipelineId).then(res=>{
            if(res.data===null){
                props.history.push('/index/404')
            }else {
                setIsAside(false)
                getInitProjectPermissions(userId,pipelineId,res.data.power===1)
            }
        })
    },[pipelineId])

    // 侧边第一栏导航
    const firstRouters=[
        {
            to:`/index/task/${pipelineId}/survey`,
            title:"概况",
            icon:<ApartmentOutlined />,
            key:"2",
        },
        {
            to:`/index/task/${pipelineId}/config`,
            title: "设计",
            icon: <CreditCardOutlined />,
            key:"3",
        },
        {
            to:`/index/task/${pipelineId}/structure`,
            title: "历史",
            icon: <ClockCircleOutlined />,
            key:"4",
        },
    ]

    if(isAside){
        return <Loading/>
    }

    return(
        <div className="project">
            <ProjectAside
                {...props}
                firstRouters={firstRouters}
                pipelineStore={pipelineStore}
                configStore={configStore}
                setIsLoading={setIsLoading}
            />
            {
                isLoading ? <Loading/> :
                <div className="project-content">
                    {renderRoutes(route.routes)}
                </div>
            }
        </div>
    )
}

export default inject("pipelineStore","configStore",SYSTEM_ROLE_STORE)(observer(Project))


