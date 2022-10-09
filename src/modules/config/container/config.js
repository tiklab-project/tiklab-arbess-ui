import React,{useState,useEffect} from "react";
import {getUser} from "tiklab-core-ui";
import ConfigTop from "../components/configTop";
import {inject,observer} from "mobx-react";
import {getUrlParam} from "../../../common/getUrlParam/getUrlParam";
import ConfigView from "../components/configView";

const ConfigDetails = props =>{

    const {giteeStore,githubStore,pipelineStore} = props

    const {code,getState} = giteeStore
    const {getAccessToken} = githubStore
    const {pipelineId,pipelineName} = pipelineStore

    const [visible,setVisible] = useState(false)
    const [view,setView] = useState("forms")
    const codeValue = getUrlParam("code")
    const codeError = getUrlParam("error")
    const userId = getUser().userId

    // Gitee和Github授权
    useEffect(() => {
        if(codeValue){
            setVisible(true)
            const params = {
                code:codeValue,
                state:1,
            }
            if(localStorage.getItem("giteeCode")){
                code(codeValue).then(res=>{
                    localStorage.setItem("giteeToken",JSON.stringify(res.data))
                    localStorage.removeItem("giteeCode")
                    window.close()
                })
            }
            else if(localStorage.getItem("githubCode")){
                getAccessToken(codeValue).then(res=>{
                    localStorage.setItem("githubToken",res.data)
                    localStorage.removeItem("githubCode")
                    window.close()
                })
            }
            getState(params)
        }
        if(codeError){
            setVisible(true)
            const params = {
                code:codeError,
                state:1,
            }
            getState(params)
            window.close()
        }
    }, [])

    if(visible){return  null}

    return (
        <div className="home-limited">
            <div className="config-top home-limited">
                <ConfigTop
                    userId={userId}
                    view={view}
                    setView={setView}
                    pipelineId={pipelineId}
                    pipelineName={pipelineName}
                />
            </div>
            <ConfigView
                view={view}
                pipelineId={pipelineId}
            />
        </div>
    )
}

export default inject("giteeStore","githubStore","pipelineStore")(observer(ConfigDetails))