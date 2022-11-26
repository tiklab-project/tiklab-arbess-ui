import React,{useEffect} from "react";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import {AimOutlined} from "@ant-design/icons";
import QuickIn from "../components/quickIn";
import "../components/homePage.scss";
import PipelineRecent from "../components/pipelineRecent";
import Guide from "../../common/guide/guide";
import DynaList from "../../dyna/common/dynaList";

const HomePage = props =>{

    const {homePageStore,pipelineStore} = props

    const {findAllOpen,pipelineNearList,findlogpage,findtodopage,dynamicList} = homePageStore
    const {findAllPipelineStatus,pipelineList,findAllFollow,pipelineLength,followLength,setListType} = pipelineStore

    useEffect(()=>{
        // 所有流水线
        findAllPipelineStatus().then(res=>{
            if(res.code===0){
                const params = {
                    pageParam:{
                        pageSize:10,
                        currentPage:1
                    },
                    bgroup:"matflow",
                    content:{
                        pipelineId:pipeline(res.data)
                    }
                }
                findlogpage(params) // 近期动态
            }
        })

        // 我收藏的流水线
        findAllFollow()
        // 最近打开的流水线
        findAllOpen(5)

        // 我的代办 findtodopage()

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

                <PipelineRecent
                    {...props}
                    pipelineNearList={pipelineNearList}
                />

                <div className="home-dyna">
                    <Guide
                        title={"近期动态"}
                        icon={<AimOutlined/>}
                        type={"dynamic"}
                        pipelineId={pipeline(pipelineList)}
                    />
                    <DynaList
                        dynamicList={dynamicList}
                        pipelineId={pipeline(pipelineList)}
                    />
                </div>
            </div>
        </div>
    )
}

export default withRouter(inject("homePageStore","pipelineStore")(observer(HomePage)))