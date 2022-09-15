import React,{useEffect} from "react";
import ProjectAside from "../components/projectAside";
import PromptContent from "../../../../common/prompt/prompt";
import {renderRoutes} from "react-router-config";
import {inject,observer} from "mobx-react";
import {withRouter} from "react-router";
import {getUser} from "tiklab-core-ui";

const Project= (props)=>{

    const {route,matFlowStore,configDataStore,match}=props

    const {findAllMatFlowStatus,lastPath,setLastPath,setMatFlowId,setMatFlowName} = matFlowStore
    const {isPrompt,setIsPrompt} = configDataStore

    const matFlowName = match.params.matFlowName
    const userId = getUser().userId

    useEffect(()=>{
        setMatFlowName(matFlowName)
        findAllMatFlowStatus(userId).then(res=>{
            const data = res.data
            if(res.code===0 && data){
                // // 如果不存在就重定向404
                // if(!isMatFlow(data)){
                //     props.history.push("/index/404")
                // }else {
                //     data && data.map(item=>{
                //         if(item.matFlowName === matFlowName){
                //             setMatFlowId(item.matFlowId)
                //         }
                //     })
                // }
                data && data.map(item=>{
                    if(item.matFlowName === matFlowName){
                        setMatFlowId(item.matFlowId)
                    }
                })
            }
        })
    },[matFlowName])

    const isMatFlow = data => {
        return data && data.some(item=>item.matFlowName === matFlowName)
    }

    useEffect(()=>{
        return ()=>setMatFlowId("")
    },[])

    const confirmLeave = pathname =>{
        if(pathname!==`/home/task/${matFlowName}/config`){
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
                matFlowName={matFlowName}
            />
            <div className="project-content" style={{marginLeft:80}}>
                {renderRoutes(route.routes)}
            </div>
            <PromptContent
                isPrompt={isPrompt}
                confirmLeave={confirmLeave}
            />
        </div>
    )
}

export default withRouter(inject("matFlowStore","configDataStore")(observer(Project)))


