import React,{useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import {AimOutlined,HistoryOutlined} from "@ant-design/icons";
import {EmptyText,DynamicList,Guide,SpinLoading} from "../../common";
import "./homePage.scss";

/**
 * 首页
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HomePage = props =>{

    const {homePageStore,pipelineStore} = props

    const {findlogpage,dynamicList,dynaPage} = homePageStore
    const {findAllOpen,pipelineNearList,findUserPipeline,findUserFollowPipeline,setListType} = pipelineStore

    const [pageParam] = useState({
        pageSize:13,
        currentPage: 1,
    })

    // 我的流水线数量
    const [pipelineLength,setPipelineLength] = useState(0)

    // 我的收藏数量
    const [followLength,setFollowLength] = useState(0)

    // 最近打开的流水线加载
    const [newlyLoading,setNewlyLoading] = useState(true)

    // 动态加载
    const [logLoading,setLogLoading] = useState(true)

    useEffect(()=>{
        // 获取所有流水线
        findUserPipeline().then(res=>{
            if(res.code===0 && res.data) setPipelineLength(res.data.length)
        })

        // 获取我的收藏
        findUserFollowPipeline({pageParam,pipelineFollow:1}).then(res=>{
            if(res.code===0 && res.data) setFollowLength(res.data.length)
        })

        // 获取近期动态
        findlogpage({
            pageParam,
            bgroup:"matflow",
            content:{}
        }).then(()=>setLogLoading(false))

        // 获取最近打开的流水线
        findAllOpen(5).then(()=>setNewlyLoading(false))

    },[])

    /**
     * 去流水线页面
     * @param type
     */
    const goPipeline = type =>{
        setListType(type)
        props.history.push("/index/pipeline")
    }

    const stableList = [
        {
            type:1,
            title: "我的流水线",
            icon:"#icon-renwu",
            listLength:pipelineLength
        },
        {
            type:2,
            title:"我的收藏",
            icon:"#icon-icon-test",
            listLength: followLength
        },
    ]

    const renderStableList = item => {
        return(
            <div key={item.type} className="quickIn-group" onClick={()=>goPipeline(item.type)}>
                <div className="quickIn-group-wrap">
                    <div className="quickIn-group-title">
                        <span className="quickIn-group-icon">
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`${item.icon}`}/>
                            </svg>
                        </span>
                        <span>{item.title}</span>
                    </div>
                    <div className="quickIn-group-number">{item.listLength}</div>
                </div>
            </div>
        )
    }


    // 渲染最近访问的流水线
    const renderList = item => {
        return  <div className="pipelineRecent-item" key={item.openId}
                     onClick={()=> props.history.push(`/index/pipeline/${item.pipeline && item.pipeline.id}/survey`)}
                >
            {
                item && item.pipeline &&
                <div className="pipelineRecent-item-title">
                    <div className={`mf-icon-${item.pipeline.color?item.pipeline.color:0} pipelineRecent-icon`}>
                        {item.pipeline.name && item.pipeline.name.substring(0,1).toUpperCase()}
                    </div>
                    <div className="pipelineRecent-name">
                        {item.pipeline.name && item.pipeline.name}
                    </div>
                </div>
            }
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

    return(
        <div className="homePage">
            <div className="homePage-content mf-home-limited">
                <div className="quickIn">
                    {
                        stableList && stableList.map(item=>renderStableList(item))
                    }
                </div>
                <div className="pipelineRecent">
                    <Guide title={"最近访问的流水线"} icon={<HistoryOutlined />}/>
                    {
                        newlyLoading ?
                            <SpinLoading type='table'/>
                            :
                            pipelineNearList && pipelineNearList.length > 0 ?
                            <div  className="pipelineRecent-content">
                                {
                                    pipelineNearList.map(item=> renderList(item))
                                }
                            </div>
                            :
                            <EmptyText title={"暂无访问流水线"}/>
                    }
                </div>

                <div className="home-dyna">
                    <Guide title={"近期动态"} icon={<AimOutlined/>} type={dynaPage}/>
                    {
                        logLoading ?
                            <SpinLoading type='table'/>
                            :
                            <DynamicList dynamicList={dynamicList}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default inject("homePageStore","pipelineStore")(observer(HomePage))
