import React from "react";
import './homePage.scss';
import Heads from "../components/head";
import PipelineNear from "../components/pipelineNear";
import StatusChart from "../components/statusChart";
import Dynamic from "../components/dynamic";
import {withRouter} from "react-router";
import {getUser} from "doublekit-core-ui";
import {inject,observer} from "mobx-react";

const HomePage = props =>{

    const {homePageStore} = props
    const userId = getUser().userId
    const {findAllOpen,pipelineNearList,runState,findAllAction,dynamicList} = homePageStore

    return(
        <div className='homePage'>
            <Heads {...props}/>
            <div className='homePage-content'>
                <div className='homePage-content-left'>
                    <PipelineNear
                        userId={userId}
                        findAllOpen={findAllOpen}
                        pipelineNearList={pipelineNearList}
                    />
                    <Dynamic
                        {...props}
                        userId={userId}
                        findAllAction={findAllAction}
                        dynamicList={dynamicList}
                    />
                </div>
                <div className='homePage-content-right'>
                    <StatusChart
                        userId={userId}
                        runState={runState}
                    />
                </div>
            </div>
        </div>
    )
}

export default withRouter(inject('homePageStore')(observer(HomePage)))