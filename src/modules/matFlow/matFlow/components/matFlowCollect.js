import React,{useEffect} from "react";
import "./matFlowCollect.scss";
import {withRouter} from "react-router";
import MatFlowTable from "./matFlowTable";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";

const MatFlowCollect = props =>{

    const {matFlowStore} = props
    const {findAllFollow,fresh} = matFlowStore

    const userId = getUser().userId

    useEffect(()=>{
        findAllFollow(userId)
    },[fresh])

    return(
        <div className="matFlowCollect home-limited">
            <div className="matFlowCollect-title">我的收藏</div>
            <MatFlowTable
                {...props}
                type={2}
                matFlowStore={matFlowStore}
            />
        </div>
    )
}

export default withRouter(inject("matFlowStore")(observer(MatFlowCollect)))