import React,{useState} from "react";
import ConfigTop from "../components/common/configTop";
import {inject,observer} from "mobx-react";
import ConfigView from "../components/common/configView";

const Config = props =>{

    const {pipelineStore,configDataStore} = props

    const {pipelineId,pipeline} = pipelineStore
    const {data,setOpt} = configDataStore

    const [view,setView] = useState("forms")

    const onScroll = () =>{
        const scrollTop=document.getElementById("config-content").scrollTop
        data && data.map((item,index)=>{
            const form = `formView_${index+1}`
            const iId = document.getElementById(form)
            const lastId = document.getElementById(form) && document.getElementById(form).previousSibling
            const iTop = iId && iId.offsetTop
            const lastTop =lastId && lastId.offsetTop
            if(scrollTop>lastTop && scrollTop<iTop ){
                setOpt(index+1)
            }
        })
    }

    return (
        <div
            className="config"
            id="config-content"
            onScroll={onScroll}
        >
            <div className="config-content">
                <ConfigTop
                    view={view}
                    setView={setView}
                    pipelineId={pipelineId}
                    pipelineName={pipeline.pipelineName}
                />
                <ConfigView view={view}/>
            </div>
        </div>
    )
}

export default inject("pipelineStore","configDataStore")(observer(Config))