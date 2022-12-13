import React,{useEffect} from "react";
import {renderRoutes} from "react-router-config";
import {inject,observer} from "mobx-react";
import {withRouter} from "react-router";
import {getUser} from "tiklab-core-ui";
import {SYSTEM_ROLE_STORE} from "tiklab-privilege-ui/lib/store";
import ProjectAside from "./projectAside";

const Project= (props)=>{

    const {route,match,pipelineStore,systemRoleStore}=props

    const {findAllPipelineStatus,setPipelineId,setPipeline} = pipelineStore
    const {getInitProjectPermissions} = systemRoleStore

    const pipelineId = match.params.id
    const userId = getUser().userId

    useEffect(()=>{
        setPipelineId(pipelineId)

        // 所有流水线
        findAllPipelineStatus(userId).then(res=>{
            const data = res.data
            if(res.code===0 && data){
                // // 如果不存在就重定向404
                // if(!isPipeline(data)){
                //     props.history.push("/index/404")
                // }else {
                //     data && data.map(item=>{
                //         if(item.pipelineId === pipelineId){
                //             setPipelineName(item.pipelineId)
                //         }
                //     })
                // }
                data && data.map(item=>{
                    if(item.id === pipelineId){
                        setPipeline(item)
                        getInitProjectPermissions(userId,pipelineId,item.power===1)
                    }
                })
            }
        })
    },[pipelineId])

    const isPipeline = data => {
        return data && data.some(item=>item.id === pipelineId)
    }

    useEffect(()=>{
        return ()=>setPipeline("")
    },[pipelineId])

    return(
        <div className="project">
            <ProjectAside
                {...props}
                pipelineStore={pipelineStore}
            />
            <div className="project-content">
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default withRouter(inject("pipelineStore",SYSTEM_ROLE_STORE)(observer(Project)))


