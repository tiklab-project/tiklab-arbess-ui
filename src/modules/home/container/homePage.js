import React,{useEffect,useState} from "react";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import Dyna from "../../common/dyna/dynaList";
import PipelineNear from "../components/pipelineNear";
import QuickIn from "../components/quickIn";
import Agency from "../components/agency";
import "../components/homePage.scss";

const HomePage = props =>{

    const {homePageStore,pipelineStore} = props

    const {findAllOpen,pipelineNearList,findlogpage,taskList,findtodopage,dynaPageTotal,
        dynamicList,setDynamicList
    } = homePageStore
    const {findAllPipelineStatus,findAllFollow,pipelineLength,followLength,setListType} = pipelineStore

    const [isDyna,setIsDyna] = useState(false)
    const [dynaPagination,setDynaPagination] = useState(1)
    // const [dynamicList,setDynamicList] = useState([])


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
            userId:getUser().userId,
            pageParam:{
                currentPage:dynaPagination
            },
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
        <div className="homePage mf">
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
                <Agency
                    {...props}
                    taskList={taskList}
                />
                <Dyna
                    {...props}
                    dynamicList={dynamicList}
                    moreDynamic={moreDynamic}
                    isDyna={isDyna}
                    dynaPageTotal={dynaPageTotal}
                    dynaPagination={dynaPagination}
                    guideTitle={"近期动态"}
                />
            </div>
        </div>
    )
}

export default withRouter(inject("homePageStore","pipelineStore")(observer(HomePage)))