import React from "react";
import "./matFlowCollect.scss";
import {withRouter} from "react-router";
import MatFlowTable from "./matFlowTable";

const MatFlowCollect = props =>{

    return(
        <div className="matFlowCollect">
            <div className="matFlowCollect-title">我的收藏</div>
            <MatFlowTable {...props} type={2}/>
        </div>
    )
}

export default withRouter(MatFlowCollect)