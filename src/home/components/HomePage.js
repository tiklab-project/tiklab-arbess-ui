import React,{useEffect,useState} from "react";
import {Col, Row} from "antd";
import {AimOutlined,HistoryOutlined,BlockOutlined} from "@ant-design/icons";
import homePageStore from "../store/HomePageStore";
import ListEmpty from "../../common/component/list/ListEmpty";
import ListIcon from "../../common/component/list/ListIcon";
import AgentList from "../../common/component/list/AgentList";
import {SpinLoading} from "../../common/component/loading/Loading";
import "./homePage.scss";

/**
 * 首页
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HomePage = props =>{

    const {findPipelineRecently,findAllOpen} = homePageStore

    // 最近打开的流水线加载
    const [newlyLoading,setNewlyLoading] = useState(true)

    // 最近打开的流水线列表
    const [newlyBuild,setNewlyBuild] = useState([])

    // 最近构建的流水线加载
    const [buildLoading,setBuildLoading] = useState(true)

    // 最近构建的流水线列表
    const [newlyOpen,setNewlyOpen] = useState([])

    useEffect(()=>{
        // 获取最近打开的流水线
        findAllOpen(5).then(res=> {
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
    },[])

    // 渲染最近访问的流水线
    const renderOpen = item => {
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
    }

    const lastRunState = runState => {
        switch (runState) {
            case 'success': return '成功'
            case 'error': return '失败'
            case 'run': return '运行中'
            case 'halt': return '终止'
        }
    }

    const renderBuild = item => (
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
                    <span className='desc-lastRunState'>{lastRunState(item.lastRunState)}</span>
                </div>
            </div>
            <div className='pipelineBuild-item-execTime'>
                {item.execTime}
            </div>
        </div>
    )

    return(
        <Row className="homePage" >
            <Col
                lg={{span: "24"}}
                xl={{ span: "18", offset: "3" }}
            >
                <div className="homePage-content mf-home-limited">
                    <div className="home-recent">
                        <div className="homePage-guide-title">
                            <HistoryOutlined className="guide-icon"/>
                            <span className="guide-title">常用</span>
                        </div>
                        {
                            newlyLoading ?
                                <SpinLoading type='table'/>
                                :
                                newlyOpen && newlyOpen.length > 0 ?
                                    <div className="pipelineRecent-content">
                                        {
                                            newlyOpen.map(item=> renderOpen(item))
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
                                        newlyBuild.map(item=>renderBuild(item))
                                        :
                                        <ListEmpty title={"暂无构建流水线"}/>
                            }
                        </div>
                    </div>
                    <div className="home-agent">
                        <div className="homePage-guide-title">
                            <AimOutlined className="guide-icon"/>
                            <span className="guide-title">我的待办</span>
                        </div>
                        <div className="home-agent-content">
                            <AgentList agentList={[]}/>
                        </div>
                    </div>

                </div>
            </Col>
        </Row>
    )
}

export default HomePage
