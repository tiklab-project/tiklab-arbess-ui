import React,{useEffect} from "react";
import "./configTop.scss";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import ConfigChangeView from "./configChangeView";
import {getUrlParam} from "../../../../common/getUrlParam/getUrlParam";
import {inject,observer} from "mobx-react";

const ConfigTop = props =>{

    const {view,setView,pipelineId,pipelineName,authorizeStore} = props

    const {findAccessToken} = authorizeStore
    const codeValue = getUrlParam("code")

    // Gitee和Github授权
    useEffect(() => {
        const params = {
            code:codeValue,
            type:localStorage.getItem("code"),
        }
        if(localStorage.getItem("code")){
            findAccessToken(params).then(res=>{
                console.log(res)
                if(res.code===0){
                    localStorage.setItem("gitProofId",res.data)
                    localStorage.removeItem("code")
                }
                window.close()
            })
        }
    }, [])

    if(localStorage.getItem("code")){
        return <span/>
    }

    return(
        <div className="config-top top-limited">
            <div className="config-top-content">
                <BreadcrumbContent
                    firstItem={pipelineName}
                    secondItem={"配置"}
                />
                <ConfigChangeView
                    view={view}
                    setView={setView}
                    pipelineId={pipelineId}
                />
            </div>
        </div>
    )
}

export default inject("authorizeStore")(observer(ConfigTop))