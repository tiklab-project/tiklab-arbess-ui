import React,{useEffect} from "react";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import {Space} from "antd";
import {AimOutlined, HistoryOutlined} from "@ant-design/icons";
import Guide from "../../common/guide/guide";
import DynaList from "../../dyna/common/dynaList";
import EmptyText from "../../common/emptyText/emptyText";
import "./homePage.scss";

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

        // 我的代办
        // findtodopage()

    },[])

    // 流水线所有id
    const pipeline = data =>{
        const newArr = []
        data && data.map(item => {
            newArr.push(item.id)
        })
        return newArr
    }

    // 最近访问的流水线
    const renderList = item => {
        return  <div className="pipelineRecent-item" key={item.openId}
                     onClick={()=> props.history.push(`/index/task/${item.pipeline && item.pipeline.id}/survey`)}
                >
            <div className="pipelineRecent-item-title">
                <Space>
                    <span className={`mf-icon-${item.pipeline.color} pipelineRecent-icon`}>
                        {item.pipeline && item.pipeline.name.substring(0,1).toUpperCase()}
                    </span>
                    <span className="pipelineRecent-name">
                        {item.pipeline && item.pipeline.name}
                    </span>
                </Space>
            </div>
            <div className="pipelineRecent-item-details">
                <div className="pipelineRecent-item-detail">
                    <span className="details-desc">成功</span>
                    <span>{item.pipelineExecState.successNumber}</span>
                </div>
                <div className="pipelineRecent-item-detail">
                    <span className="details-desc">失败</span>
                    <span>{item.pipelineExecState.errorNumber}</span>
                </div>
            </div>
        </div>
    }

    const stableList = [
        {
            id:1,
            title: "我的流水线",
            icon:"#icon-renwu",
            listLength:pipelineLength
        },
        {
            id:2,
            title:"我的收藏",
            icon:"#icon-icon-test",
            listLength: followLength
        },
    ]
    
    const renderStableList = item => {
        return(
            <div key={item.id} className="quickIn-group" onClick={()=>goPipeline(item.id)}>
                <div className="quickIn-group-wrap">
                    <div className="quickIn-group-title">
                        <span className="quickIn-group-icon">
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`${item.icon}`}/>
                            </svg>
                        </span>
                        <span>{item.title}</span>
                    </div>
                    <div className="quickIn-group-number">
                        {item.listLength}
                    </div>
                </div>
            </div>
        )
    }

    const goPipeline = id =>{
        setListType(id)
        props.history.push("/index/pipeline")
    }


    return(
        <div className="homePage">
            <div className="homePage-content home-limited">
                <div className="quickIn">
                    {
                        stableList && stableList.map(item=>{
                            return renderStableList(item)
                        })
                    }
                </div>
                <div className="pipelineRecent">
                    <Guide title={"最近访问的流水线"} icon={<HistoryOutlined />}/>
                    {
                        pipelineNearList && pipelineNearList.length > 0 ?
                            <div  className="pipelineRecent-content">
                                {
                                    pipelineNearList.map(item=>{
                                            return renderList(item)
                                    })
                                }
                            </div>
                            :
                            <EmptyText title={"最近没有访问流水线"}/>
                    }
                </div>

                <div className="home-dyna">
                    <Guide
                        title={"近期动态"}
                        icon={<AimOutlined/>}
                        type={"dynamic"}
                        pipelineId={pipeline(pipelineList)}
                    />
                    <DynaList dynamicList={dynamicList} pipelineId={pipeline(pipelineList)}/>
                </div>
            </div>
        </div>
    )
}

export default withRouter(inject("homePageStore","pipelineStore")(observer(HomePage)))