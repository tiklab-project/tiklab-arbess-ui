import React,{useState,useEffect} from "react";
import ConfigTop from "../components/common/configTop";
import {inject,observer} from "mobx-react";
import ConfigView from "../components/common/configView";
import {getUrlParam} from "../../../common/getUrlParam/getUrlParam";

const Config = props =>{

    const {pipelineStore,authorizeStore} = props

    const {pipelineId,pipeline} = pipelineStore
    const {findAccessToken} = authorizeStore

    const [view,setView] = useState("forms")
    const codeValue = getUrlParam("code")

    // Gitee和Github授权
    useEffect(() => {
        const params = {
            code:codeValue,
            type:localStorage.getItem("code"),
        }
        if(localStorage.getItem("code")){
            findAccessToken(params).then(res=>{
                window.close()
                if(res.code===0){
                    localStorage.setItem("gitProofId",res.data)
                    localStorage.removeItem("code")
                }
            })
        }
    }, [])

    if(localStorage.getItem("code")){
        return <span/>
    }


    return (
        <div className="config">
            <ConfigTop
                view={view}
                setView={setView}
                pipelineId={pipelineId}
                pipelineName={pipeline.pipelineName}
            />
            <ConfigView view={view}/>
        </div>
    )
}

export default inject("pipelineStore","authorizeStore")(observer(Config))