import React,{useEffect,useState} from "react";
import {Col,Row} from "antd";
import {AimOutlined, HistoryOutlined, BlockOutlined, RightOutlined} from "@ant-design/icons";
import homePageStore from "../store/HomePageStore";
import overviewStore from "../../pipeline/overview/store/OverviewStore";
import ListEmpty from "../../common/component/list/ListEmpty";
import ListIcon from "../../common/component/list/ListIcon";
import DynamicList from "../../common/component/list/DynamicList";
import {SpinLoading} from "../../common/component/loading/Loading";
import "./HomePage.scss";

/**
 * 首页
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HomePage = props =>{

    const {findPipelineRecently,findAllOpen} = homePageStore;
    const {findlogpage} = overviewStore

    //常用流水线加载
    const [newlyLoading,setNewlyLoading] = useState(true)
    //常用流水线列表
    const [newlyBuild,setNewlyBuild] = useState([])
    //最近构建的流水线加载
    const [buildLoading,setBuildLoading] = useState(true)
    //最近构建的流水线列表
    const [newlyOpen,setNewlyOpen] = useState([]);
    //最新动态加载
    const [dynaLoading,setDynaLoading] = useState(true)
    //最新动态
    const [dyna,setDyna] = useState([]);

    useEffect(()=>{
        // 获取常用流水线
        findAllOpen(4).then(res=> {
            setNewlyLoading(false)
            if(res.code===0){
                setNewlyOpen(res.data || [])
            }
        })

        // 获取最近构建的流水线
        findPipelineRecently(6).then(res=>{
            setBuildLoading(false)
            if(res.code===0){
                setNewlyBuild(res.data || [])
            }
        })

        // 获取最新动态
        findlogpage({
            pageParam:{
                pageSize:10,
                currentPage:1
            },
            data:{}
        }).then(res=>{
            setDynaLoading(false)
            if(res.code===0){
                setDyna(res.data?.dataList || [])
            }
        })
    },[])

    return(
        <Row className="homePage" >
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "16", offset: "4" }}
            >
                <div className="homePage-content mf-home-limited">
                    <div className="home-recent">
                        <div className="homePage-guide-title">
                            <HistoryOutlined className="guide-icon"/>
                            <span className="guide-title">常用流水线</span>
                        </div>
                        {
                            newlyLoading ?
                                <SpinLoading type='table'/>
                                :
                                newlyOpen && newlyOpen.length > 0 ?
                                    <div className="pipelineRecent-content">
                                        {
                                            newlyOpen.map(item=> {
                                                const {pipeline,pipelineExecState} = item
                                                return(
                                                    <div className="pipelineRecent-item" key={pipeline?.id}
                                                         onClick={()=> props.history.push(`/pipeline/${pipeline?.id}/history`)}
                                                    >
                                                        {
                                                            pipeline &&
                                                            <div className="pipelineRecent-item-title">
                                                                <ListIcon
                                                                    text={pipeline?.name || "T"}
                                                                    colors={pipeline?.color}
                                                                />
                                                                <div className="pipelineRecent-name">
                                                                    {pipeline?.name}
                                                                </div>
                                                            </div>
                                                        }
                                                        <div className="pipelineRecent-item-details">
                                                            <div className="pipelineRecent-item-detail">
                                                                <span className="details-desc">成功</span>
                                                                <span>{pipelineExecState?.successNumber || 0}</span>
                                                            </div>
                                                            <div className="pipelineRecent-item-detail">
                                                                <span className="details-desc">失败</span>
                                                                <span>{pipelineExecState?.errorNumber || 0}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <ListEmpty title={"暂无访问流水线"}/>
                        }
                    </div>
                    <div className="home-build">
                        <div className="homePage-guide-title">
                            <BlockOutlined className="guide-icon"/>
                            <span className="guide-title">我最近构建的</span>
                        </div>
                        <div className="home-build-content">
                            {
                                buildLoading ?
                                    <SpinLoading type='table'/>
                                    :
                                    newlyBuild && newlyBuild.length > 0 ?
                                        newlyBuild.map(item=>(
                                            <div
                                                key={item.pipelineId}
                                                className='pipelineBuild-item'
                                                onClick={()=>props.history.push(`/pipeline/${item.pipelineId}/history/${item.instanceId}`)}
                                            >
                                                <ListIcon
                                                    text={item?.pipelineName || 'T'}
                                                    colors={item?.color}
                                                />
                                                <div className='pipelineBuild-item-info'>
                                                    <div className='pipelineBuild-item-name'>{item.pipelineName || '无'}</div>
                                                    <div className='pipelineBuild-item-desc'>
                                                        <span className='desc-number'>#{(item.number)}</span>
                                                        <span className='desc-lastRunState'>
                                                            {item.lastRunState==='success'&&'成功'}
                                                            {item.lastRunState==='error'&&'失败'}
                                                            {item.lastRunState==='run'&&'运行中'}
                                                            {item.lastRunState==='halt'&&'终止'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='pipelineBuild-item-execTime'>
                                                    {item.execTime}
                                                </div>
                                            </div>
                                        ))
                                        :
                                        <ListEmpty title={"暂无构建流水线"}/>
                            }
                        </div>
                    </div>
                    <div className="home-agent">
                        <div className='homePage-guide'>
                            <div className='homePage-guide-title'>
                                <AimOutlined className='guide-icon'/>
                                <span className='guide-title'>最新动态</span>
                            </div>
                            <div onClick={()=>props.history.push('/dyna')}
                                 className="homePage-guide-skip"
                            >
                                <RightOutlined />
                            </div>
                        </div>
                        <div className="home-agent-content">
                            {
                                dynaLoading ?
                                    <SpinLoading type='table'/>
                                    :
                                    <DynamicList dynamicList={dyna}/>
                            }
                        </div>
                    </div>

                </div>
            </Col>
        </Row>
    )
}

export default HomePage
