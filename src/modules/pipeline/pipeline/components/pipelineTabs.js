import React, {useEffect} from "react";
import {Tabs, Tooltip} from "antd";
import './pipelineTabs.scss'
import PipelineTabs_all from "./pipelineTabs_all";
import PipelineTabs_my from "./pipelineTabs_my";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import PipelineRun from "./pipelineRun";
import {ExclamationCircleOutlined,CloseCircleOutlined,PlayCircleOutlined} from "@ant-design/icons";

const { TabPane } = Tabs;

const PipelineTabs = props =>{

    const {pipelineStore,structureStore}=props

    const {findAllPipelineStatus,pipelineList,updatePipeline}=pipelineStore
    const {pipelineStartStructure,killInstance}=structureStore

    useEffect(()=>{
            findAllPipelineStatus()
    },[])
    //收藏
    let pipelineCollect
    const collectAction = record => {
        if(record.pipelineCollect===1){
            pipelineCollect=0
        }else {
            pipelineCollect=1
        }
        const params={
            pipelineId:record.pipelineId,
            pipelineName:record.pipelineName,
            pipelineCollect:pipelineCollect
        }
        updatePipeline(params).then(res=>{
            findAllPipelineStatus()

        })
    }

    //去详情页面
    const goPipelineTask=(text,record)=>{
        localStorage.setItem('pipelineName',text)
        localStorage.setItem('pipelineId',record.pipelineId)
        props.history.push('/index/task/work')
    }

    const work = record =>{
        if(record.pipelineState === 0){
            pipelineStartStructure(record.pipelineId).then(res=>{
                console.log(res)
                setTimeout(()=>findAllPipelineStatus(),500)
            })
        }else {
            killInstance(record.pipelineId).then(res=>{
                findAllPipelineStatus()
            })
        }
    }

    const columns = [
        {
            title: '收藏',
            dataIndex: 'pipelineCollect',
            key:"pipelineCollect",
            render:(text,record) =>{
                return(
                    <span className='all-icon' onClick={() => collectAction(record)}>
                        {
                            record.pipelineCollect === 0 ?
                                <svg className="icon" aria-hidden="true" >
                                    <use xlinkHref="#icon-xingxing-kong"  />
                                </svg>
                                :
                                <svg className="icon" aria-hidden="true" >
                                    <use xlinkHref="#icon-xingxing1"  />
                                </svg>
                        }
                    </span>
                )
            }
        },
        {
            title: '最近构建状态',
            dataIndex: 'structureStatus',
            key: 'structureStatus',
            render:text =>{
                switch (text) {
                    case 30:
                        return  <Tooltip title="成功" className='all-icon'>
                                    <svg className="icon" aria-hidden="true" >
                                        <use xlinkHref="#icon-chenggong-"  />
                                    </svg>
                                </Tooltip>
                    case 1:
                        return <Tooltip title="失败" className='all-icon'>
                                    <CloseCircleOutlined style = {{fontSize:25,color:'red'}}/>
                                </Tooltip>
                    case 0:
                        return  <Tooltip title="待构建" className='all-icon'>
                                    <PlayCircleOutlined style = {{fontSize:25}}/>
                                </Tooltip>
                    default:
                        return  <Tooltip title="停止" className='all-icon'>
                                    <ExclamationCircleOutlined style = {{fontSize:25}}/>
                                </Tooltip>
                }
            }
        },
        {
            title: '任务名',
            dataIndex: 'pipelineName',
            key: 'pipelineName',
            render:(text,record)=>{
                return(
                    <span
                        onClick={()=>
                            goPipelineTask(text,record)
                        }
                        className='all-columns all-icon'
                    >
                        {text}
                    </span>
                )
            }
        },
        {
            title: '上次构建时间',
            dataIndex: 'lastStructureTime',
            key: 'lastStructureTime',
        },
        {
            title: '上次成功时间',
            dataIndex: 'lastSuccessTime',
            key: 'lastSuccessTime',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key:"action",
            render:(text ,record,index)=>{
                return(
                    <span className=' all-icon' onClick={() =>work(record,index)}>
                        {
                            record.pipelineState === 0 ?
                                <svg className="icon" aria-hidden="true" >
                                    <use xlinkHref="#icon-yunhang"  />
                                </svg>
                                :
                                <PipelineRun />
                        }
                    </span>
                )
            }
        },
    ]

    return(
        <Tabs className='pipeline-tabs'>
            <TabPane tab="全部" key="1">
                <PipelineTabs_all
                    pipelineList={pipelineList}
                    columns={columns}
                    rowKey={record => record.pipelineId}
                />
            </TabPane>
            <TabPane tab="我的" key="2">
                <PipelineTabs_my/>
            </TabPane>
        </Tabs>
    )
}

export default withRouter(inject('pipelineStore', 'structureStore')(observer(PipelineTabs)))
