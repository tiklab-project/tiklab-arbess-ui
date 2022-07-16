import React,{useEffect,useState} from "react";
import ProjectAside from "../components/projectAside";
import PromptContent from "../../../../common/prompt/prompt";
import {renderRoutes} from "react-router-config";
import {inject,observer} from "mobx-react";
import {withRouter} from "react-router";
import {getUser} from "doublekit-core-ui";

const Project= (props)=>{

    const {route,pipelineStore,configDataStore}=props

    const {findAllPipelineStatus,pipelineList,pipeline,setPipeline} = pipelineStore
    const {isPrompt,setIsPrompt} = configDataStore

    const [visible,setVisible] = useState(false)
    const pipelineName = localStorage.getItem("pipelineName")
    const pipelineId = localStorage.getItem("pipelineId")

    useEffect(()=>{
        findAllPipelineStatus(getUser().userId)
    },[])

    useEffect(()=>{
        if(pipeline !== undefined ){
            pipelineList && pipelineList.map(item=>{
                if(pipeline.pipelineId === item.pipelineId){
                    localStorage.setItem("pipelineName",pipeline.pipelineName)
                    localStorage.setItem("pipelineId",pipeline.pipelineId)
                }
            })
        }
    },[pipeline])

    useEffect(()=>{
        return ()=>{
            localStorage.removeItem("pipelineName")
            localStorage.removeItem("pipelineId")
        }
    },[])

    const confirmLeave = pathname =>{
        if(pathname!=="/home/task/config"){
            pathname && setTimeout(()=>{
                props.history.push(pathname)
            })
        }
        setIsPrompt(false)
    }

    const confirmStay = () => {
        setPipeline()
        localStorage.setItem("pipelineName",pipelineName)
        localStorage.setItem("pipelineId",pipelineId)
    }

    return(
        <div className="project">
            <ProjectAside
                {...props}
                isPrompt={isPrompt}
                visible={visible}
                setVisible={setVisible}
            />
            <div className="project-content"
                 onClick={()=>setVisible(false)}
                 style={{marginLeft:65}}
            >
                { renderRoutes(route.routes) }
            </div>
            <PromptContent
                isPrompt={isPrompt}
                confirmLeave={confirmLeave}
                confirmStay={confirmStay}
            />
        </div>
    )
}

export default withRouter(inject("pipelineStore","configDataStore")(observer(Project)))


