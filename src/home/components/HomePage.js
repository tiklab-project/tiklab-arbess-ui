import React,{useEffect,useState} from "react";
import {AimOutlined,HistoryOutlined,BlockOutlined} from "@ant-design/icons";
import homePageStore from "../store/HomePageStore";
import EmptyText from "../../common/emptyText/EmptyText";
import AgentList from "../../common/list/AgentList";
import Guide from "../../common/guide/Guide";
import {SpinLoading} from "../../common/loading/Loading";
import "./homePage.scss";

/**
 * 首页
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HomePage = props =>{

    const {findPipelineRecently,newlyBuild,findAllOpen,newlyOpen} = homePageStore

    // 最近打开的流水线加载
    const [newlyLoading,setNewlyLoading] = useState(true)

    // 最近构建的流水线加载状态
    const [buildLoading,setBuildLoading] = useState(true)

    useEffect(()=>{
        // 获取最近打开的流水线
        findAllOpen(5).then(()=>setNewlyLoading(false))

        // 获取最近构建的流水线
        findPipelineRecently(6).then(()=>setBuildLoading(false))
    },[])

    // 渲染最近访问的流水线
    const renderOpen = item => {
        return  <div className="pipelineRecent-item" key={item.pipeline?.id}
                     onClick={()=> props.history.push(`/index/pipeline/${item.pipeline?.id}/survey`)}
                >
            {
                item && item.pipeline &&
                <div className="pipelineRecent-item-title">
                    <div className={`mf-icon-${item.pipeline?.color || 0} pipeline-icon`}>
                        {item.pipeline.name.substring(0,1).toUpperCase()}
                    </div>
                    <div className="pipelineRecent-name">
                        {item.pipeline?.name}
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
            onClick={()=>props.history.push(`/index/pipeline/${item.pipelineId}/structure/${item.instanceId}/post`)}
        >
            <div className={`mf-icon-${item?.color} pipeline-icon`}>
                {item.pipelineName?.substring(0,1).toUpperCase()}
            </div>
            <div className='pipelineBuild-item-info'>
                <div className='pipelineBuild-item-name'>{item.pipelineName}</div>
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
        <div className="homePage">
            <div className="homePage-content mf-home-limited">
                <div className="home-recent">
                    <Guide title={"我最近访问的"} icon={<HistoryOutlined />}/>
                    {
                        newlyLoading ?
                            <SpinLoading type='table'/>
                            :
                            newlyOpen && newlyOpen.length > 0 ?
                            <div  className="pipelineRecent-content">
                                {
                                    newlyOpen.map(item=> renderOpen(item))
                                }
                            </div>
                            :
                            <EmptyText title={"暂无访问流水线"}/>
                    }
                </div>
                <div className="home-build">
                    <Guide title={"我最近构建的"} icon={<BlockOutlined />}/>
                    {
                        buildLoading ?
                            <SpinLoading type='table'/>
                            :
                            newlyBuild && newlyBuild.length > 0 ?
                                <div className='pipelineBuild-content'>
                                    {
                                        newlyBuild.map(item=>renderBuild(item))
                                    }
                                </div>
                                :
                                <EmptyText title={"暂无构建流水线"}/>
                    }
                </div>
                <div className="home-agent">
                    <Guide title={"我的代办"} icon={<AimOutlined />}/>
                    <AgentList agentList={[]}/>
                </div>

            </div>
        </div>
    )
}

export default HomePage
