import React,{useEffect,useState} from "react";
import {getUser} from "tiklab-core-ui";
import DynamicList from "../components/dynamicList";
import PipelineNear from "../components/pipelineNear";
import QuickIn from "../components/quickIn";
import Agency from "../components/agency";
import State from "../components/state";
import "../components/homePage.scss";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";

const HomePage = props =>{

    const {homePageStore,pipelineStore} = props

    const {findAllOpen,pipelineNearList,findlogpage,dynamicList,taskList,findtodopage,
        setDynaPagination,dynaPagination,dynaPage,setDynamicList,findState,stateList
    } = homePageStore
    const {findAllFollow,findAllPipelineStatus,pipelineLength,followLength,setListType} = pipelineStore

    const userId = getUser().userId

    const [isDyna,setIsDyna] = useState(false)


    useEffect(()=>{

        // 所有流水线
        findAllPipelineStatus(userId)

        // 我收藏的流水线
        findAllFollow(userId)

        // 最近打开的流水线
        findAllOpen(userId)

        // 我的代办
        findtodopage(userId)

        // 构建状态
        findState()

        return () =>{
            setDynamicList([])
            setDynaPagination(1)
        }
    },[])

    useEffect(()=>{
        const params = {
            userId:userId,
        }
        // 近期动态
        findlogpage(params).then(res=>{
            res.code===0 && dynaPagination>1 && setIsDyna(false)
        })
    },[dynaPagination])

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
                    {/*<State*/}
                    {/*    stateList={stateList}*/}
                    {/*/>*/}
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
                        dynaPage={dynaPage}
                    />
                </div>
            </div>
        </div>

    )
}

export default withRouter(inject("homePageStore","pipelineStore")(observer(HomePage)))