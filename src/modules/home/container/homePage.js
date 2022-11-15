import React,{useEffect,useState} from "react";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import PipelineNear from "../components/pipelineNear";
import QuickIn from "../components/quickIn";
import Agency from "../components/agency";
import "../components/homePage.scss";
import DynaLatest from "../../dyna/dynaLatest/dynaLatest";

const HomePage = props =>{

    const {homePageStore,pipelineStore} = props

    const {findAllOpen,pipelineNearList,findlogpage,taskList,findtodopage,
        dynamicList,
    } = homePageStore
    const {findAllPipelineStatus,pipelineList,findAllFollow,pipelineLength,followLength,setListType} = pipelineStore

    useEffect(()=>{
        // 所有流水线
        findAllPipelineStatus().then(res=>{
            if(res.code===0){
                const params = {
                    pageParam:{
                        pageSize:8,
                        currentPage:1
                    },
                    bgroup:"matflow",
                    content:{
                        pipelineId:pipeline(res.data)
                    }
                }
                // 近期动态
                findlogpage(params)
            }
        })

        // 我收藏的流水线
        findAllFollow()

        // 最近打开的流水线
        findAllOpen()

        // 我的代办
        findtodopage()

    },[])

    const pipeline = data =>{
        const newArr = []
        data && data.map(item => {
            newArr.push(item.pipelineId)
        })
        return newArr
    }

    return(
        <div className="homePage">
            <div className="homePage-content home-limited">
                <QuickIn
                    {...props}
                    setListType={setListType}
                    pipelineLength={pipelineLength}
                    followLength={followLength}
                />
                <PipelineNear
                    {...props}
                    pipelineNearList={pipelineNearList}
                />
                {/*<Agency*/}
                {/*    {...props}*/}
                {/*    taskList={taskList}*/}
                {/*    isHome={"isHome"}*/}
                {/*/>*/}
                <DynaLatest
                    dynamicList={dynamicList}
                    title={"近期动态"}
                    pipelineId={pipeline(pipelineList)}
                />
            </div>
        </div>
    )
}

export default withRouter(inject("homePageStore","pipelineStore")(observer(HomePage)))