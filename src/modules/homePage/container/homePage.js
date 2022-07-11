import React,{useEffect} from "react";
import "../components/homePage.scss";
import Heads from "../components/head";
import PipelineNear from "../components/pipelineNear";
import StatusChart from "../components/statusChart";
import Dynamic from "../components/dynamic";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import {getUser} from "doublekit-core-ui";

const HomePage = props =>{

    const {homePageStore} = props
    const {findAllOpen,pipelineNearList,runState,findUserAction,dynamicList} = homePageStore
    const userId = getUser().userId

    // 最近动态
    useEffect(()=>{
        const params = {
            userId:userId,
            page:1,
            pageSize:10,
        }
        findUserAction(params)
    },[])

    // 最近打开的流水线
    useEffect(()=>{
        findAllOpen(userId)
    },[])

    return(
        <div className="homePage">
            <Heads {...props}/>
            <div className="homePage-content">
                <div className="homePage-content-left">
                    <PipelineNear
                        {...props}
                        pipelineNearList={pipelineNearList}
                    />
                    <Dynamic
                        {...props}
                        userId={userId}
                        dynamicList={dynamicList}
                    />
                </div>
                <div className="homePage-content-right">
                    <StatusChart userId={userId} runState={runState}/>
                </div>
            </div>
        </div>
    )
}

export default withRouter(inject("homePageStore")(observer(HomePage)))