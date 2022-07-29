import React from "react";
import {withRouter} from "react-router-dom";
import "../components/matFlow.scss";
import MatFlowSearch from "../components/matFlowSearch";
import MatFlowTabs from "../components/matFlowTabs";

const MatFlow = props =>{
    return(
        <div className="matFlow">
            <MatFlowSearch />
            <MatFlowTabs/>
        </div>
    )
}

export default withRouter(MatFlow)