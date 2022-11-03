import React,{useEffect,useState} from "react";
import {getUser} from "tiklab-core-ui";
import DynamicList from "../components/dynamicList";
import PipelineNear from "../components/pipelineNear";
import QuickIn from "../components/quickIn";
import Agency from "../components/agency";
import "../components/homePage.scss";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";

const HomePage = props =>{

    const {homePageStore,pipelineStore} = props

    const {findAllOpen,pipelineNearList,findlogpage,taskList,findtodopage,dynaPageTotal,dynamicList,setDynamicList} = homePageStore
    const {findAllFollow,findAllPipelineStatus,pipelineLength,followLength,setListType} = pipelineStore

    const userId = getUser().userId

    const [isDyna,setIsDyna] = useState(false)
    const [dynaPagination,setDynaPagination] = useState(1)

    useEffect(()=>{

        // 所有流水线
        findAllPipelineStatus()

        // 我收藏的流水线
        findAllFollow()

        // 最近打开的流水线
        findAllOpen()

        // 我的代办
        findtodopage()

    },[])

    useEffect(()=>{
        const params = {
            userId:userId,
            pageParam:{
                currentPage:dynaPagination
            }
        }
        // 近期动态
        findlogpage(params).then(res=>{
            res.code===0 && dynaPagination > 1 && setIsDyna(false)
        })
    },[dynaPagination])

    useEffect(()=>{
        return ()=>{
            setDynamicList([])
        }
    },[])

    const moreDynamic = () =>{
        setIsDyna(true)
        setDynaPagination(dynaPagination+1)
    }

    return(
        <div className="homePage">
            <div className="homePage-content">
                <div className="homePage-content-top">
                    <QuickIn
                        {...props}
                        setListType={setListType}
                        pipelineLength={pipelineLength}
                        followLength={followLength}
                    />
                </div>
                <div className="homePage-content-center">
                    <PipelineNear
                        {...props}
                        pipelineNearList={pipelineNearList}
                    />
                    <Agency
                        {...props}
                        taskList={taskList}
                    />
                </div>
                <div className="homePage-content-bottom">
                    <DynamicList
                        {...props}
                        dynamicList={dynamicList}
                        moreDynamic={moreDynamic}
                        isDyna={isDyna}
                        dynaPageTotal={dynaPageTotal}
                        dynaPagination={dynaPagination}
                    />
                </div>
            </div>
        </div>

    )
}

export default withRouter(inject("homePageStore","pipelineStore")(observer(HomePage)))