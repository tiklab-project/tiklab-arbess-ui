import React,{ useEffect,useState } from "react";
import {Table,Tooltip } from "antd";
import {withRouter} from "react-router";
import PipelineRun from "./pipelineRun";
import {observer,inject} from "mobx-react";

const PipelineTabs_all= props=>{

    const {pipelineStore,structureStore}=props
    const {findAllPipelineStatus,pipelineList,updatePipeline}=pipelineStore

    //初始化表格
    useEffect(()=>{
        // findAllPipelineStatus()
        const se = setTimeout(()=> findAllPipelineStatus(),100)
        return ()=> clearTimeout(se)
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
        props.history.push('/home/task/work')
    }

    //操作
    const [run,setRun]=useState()
    const move = record =>{
        setRun(record.pipelineId)
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
                                    <svg className="icon" aria-hidden="true" >
                                        <use xlinkHref="#icon-yunhangshibai1"  />
                                    </svg>
                                </Tooltip>

                    case 0:
                        return  <Tooltip title="待构建" className='all-icon'>
                                    <svg className="icon" aria-hidden="true" >
                                        <use xlinkHref="#icon-dengdai1"  />
                                    </svg>
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
                    <span className=' all-icon' onClick={() => move(record,index)}>
                        {
                            run===record.pipelineId   ?
                                <PipelineRun />
                                :
                                <svg className="icon" aria-hidden="true" >
                                    <use xlinkHref="#icon-yunhang1"  />
                                </svg>

                        }
                    </span>
                )
            }
        },
    ]

    return(
        <Table
            rowKey={record => record.pipelineId}
            columns={columns}
            dataSource={pipelineList}
        />
    )
}

export default withRouter(inject('pipelineStore','structureStore')(observer(PipelineTabs_all)));