import React,{useEffect} from "react";
import ProjectAside from "../components/projectAside";
import PromptContent from "../../../../common/prompt/prompt";
import {renderRoutes} from "react-router-config";
import {inject,observer} from "mobx-react";
import {withRouter} from "react-router";
import {getUser} from "doublekit-core-ui";

const Project= (props)=>{

    const {route,pipelineStore,configDataStore,match}=props

    const {findAllPipelineStatus,lastPath,setLastPath,setPipelineId,setPipelineName} = pipelineStore
    const {isPrompt,setIsPrompt} = configDataStore

    const pipelineName = match.params.pipelineName
    const userId = getUser().userId

    useEffect(()=>{
        setPipelineName(pipelineName)
        findAllPipelineStatus(userId).then(res=>{
            const data = res.data
            if(res.code===0 && data){
                data && data.map(item=>{
                    if(item.pipelineName === pipelineName){
                        setPipelineId(item.pipelineId)
                    }
                })
            }
        })
    },[pipelineName])

    useEffect(()=>{
        return ()=>setPipelineId("")
    },[])

    const confirmLeave = pathname =>{
        if(pathname!==`/home/task/${pipelineName}/config`){
            pathname && setTimeout(()=>{
                props.history.push(pathname)
            })
        }
        setIsPrompt(false)
    }

    return(
        <div className="project">
            <ProjectAside
                {...props}
                lastPath={lastPath}
                setLastPath={setLastPath}
                pipelineName={pipelineName}
            />
            <div className="project-content" style={{marginLeft:65,padding:"0 10px"}}>
                {renderRoutes(route.routes)}
            </div>
            <PromptContent
                isPrompt={isPrompt}
                confirmLeave={confirmLeave}
            />
        </div>
    )
}

export default withRouter(inject("pipelineStore","configDataStore")(observer(Project)))


