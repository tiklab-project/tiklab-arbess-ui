import React,{useEffect} from "react";
import "../components/homePage.scss";
import Heads from "../components/head";
import MatFlowNear from "../components/matFlowNear";
import StatusChart from "../components/statusChart";
import Dynamic from "../components/dynamic";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";

const HomePage = props =>{

    const {homePageStore} = props
    const {findAllOpen,matFlowNearList,runState,findUserAction,dynamicList} = homePageStore
    const userId = getUser().userId

    useEffect(()=>{
        const params = {
            userId:userId,
            page:1,
            pageSize:10,
        }
        // 最近动态
        findUserAction(params)
        // 最近打开的流水线
        findAllOpen(userId)
    },[])

    return(
        <div className="homePage">
            <Heads {...props}/>
            <div className="homePage-content">
                <div className="homePage-content-left">
                    <MatFlowNear {...props} matFlowNearList={matFlowNearList}/>
                    <Dynamic {...props} userId={userId} dynamicList={dynamicList}/>
                </div>
                <div className="homePage-content-right">
                    <StatusChart userId={userId} runState={runState}/>
                </div>
            </div>
        </div>
    )
}

export default withRouter(inject("homePageStore")(observer(HomePage)))