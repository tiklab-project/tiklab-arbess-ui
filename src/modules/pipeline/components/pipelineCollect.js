import React,{useEffect} from "react";
import "./pipelineCollect.scss";
import {withRouter} from "react-router";
import PipelineTable from "./pipelineTable";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";

const PipelineCollect = props =>{

    const {pipelineStore} = props
    const {findAllFollow,fresh} = pipelineStore

    const userId = getUser().userId

    useEffect(()=>{
        findAllFollow(userId)
    },[fresh])

    return(
        <div className="pipelineCollect home-limited">
            <div className="pipelineCollect-title">我的收藏</div>
            <PipelineTable
                {...props}
                type={2}
                pipelineStore={pipelineStore}
            />
        </div>
    )
}

export default withRouter(inject("pipelineStore")(observer(PipelineCollect)))