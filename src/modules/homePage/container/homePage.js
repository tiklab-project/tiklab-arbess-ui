import React from "react";
import './homePage.scss';
import Heads from "../components/head";
import PipelineNear from "../components/pipelineNear";
import AgencyMatters from "../components/agencyMatters";
import StatusChart from "../components/statusChart";
import Dynamic from "../components/dynamic";
import {withRouter} from "react-router-dom";

const HomePage = props =>{
    return(
        <div className='homePage'>
            <Heads {...props}/>
            <div className='homePage-content'>
                <div className='homePage-content-left'>
                    <div className='homePage-content-left-top'>
                        <PipelineNear {...props}/>
                        <Dynamic {...props}/>
                    </div>
                    <AgencyMatters {...props}/>
                </div>
                <div className='homePage-content-right'>
                    <StatusChart {...props}/>
                </div>
            </div>
        </div>
    )
}

export default withRouter(HomePage)