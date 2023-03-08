import React,{useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import {Spin} from "antd";
import {AimOutlined,HistoryOutlined} from "@ant-design/icons";
import Guide from "../../common/guide/Guide";
import DynamicList from "../../common/dynamic/DynamicList";
import EmptyText from "../../common/emptyText/EmptyText";
import "./homePage.scss";

/**
 * 首页
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HomePage = props =>{

    const {homePageStore,pipelineStore} = props

    const {findlogpage,dynamicList} = homePageStore
    const {findAllOpen,pipelineNearList,findUserPipeline,findAllFollow,pipelineLength,followLength,setListType} = pipelineStore

    // 最近打开的流水线加载
    const [newlyLoading,setNewlyLoading] = useState(true)

    // 动态加载
    const [logLoading,setLogLoading] = useState(true)

    useEffect(()=>{
        // 获取所有流水线
        findUserPipeline().then(res=>{
            if(res.code===0){
                const params = {
                    pageParam:{
                        pageSize:10,
                        currentPage:1
                    },
                    bgroup:"matflow",
                    content:{
                        pipelineId:setPipelineId(res.data)
                    }
                }
                // 近期动态
                findlogpage(params).then(()=>setLogLoading(false))
            }
        })

        // 获取我收藏的流水线
        findAllFollow()

        // 获取最近打开的流水线
        findAllOpen(5).then(()=>setNewlyLoading(false))

    },[])

    /**
     * 获取流水线所有id
     * @param data
     * @returns {*[流水线id]}
     */
    const setPipelineId = data =>{
        const newArr = []
        data && data.map(item => {
            newArr.push(item.id)
        })
        return newArr
    }

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


    /**
     * 最近访问的流水线
     * @param item
     * @returns {JSX.Element}
     */
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
                            <div className='homePage-loading'><Spin/></div>
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
                    <Guide title={"近期动态"} icon={<AimOutlined/>} type={"dynamic"}/>
                    {
                        logLoading ?
                            <div className='homePage-loading'><Spin/></div>
                            :
                            <DynamicList dynamicList={dynamicList}/>
                    }

                </div>
            </div>
        </div>
    )
}

export default inject("homePageStore","pipelineStore")(observer(HomePage))