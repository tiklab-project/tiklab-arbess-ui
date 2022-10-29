import React,{useEffect} from "react";
import ProjectAside from "./projectAside";
import {renderRoutes} from "react-router-config";
import {inject,observer} from "mobx-react";
import {withRouter} from "react-router";
import {getUser} from "tiklab-core-ui";

const Project= (props)=>{

    const {route,pipelineStore,match}=props

    const {findAllPipelineStatus,setPipelineId,setPipeline} = pipelineStore

    const pipelineId = match.params.pipelineId
    const userId = getUser().userId

    useEffect(()=>{
        setPipelineId(pipelineId)
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
                    if(item.pipelineId === pipelineId){
                        setPipeline(item)
                    }
                })
            }
        })
    },[pipelineId])

    const isPipeline = data => {
        return data && data.some(item=>item.pipelineId === pipelineId)
    }

    useEffect(()=>{
        return ()=>setPipelineId("")
    },[])


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

export default withRouter(inject("pipelineStore")(observer(Project)))


