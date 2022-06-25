import React, {Fragment} from "react";
import {message, Table, Tooltip} from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    PlayCircleOutlined
} from "@ant-design/icons";
import PipelineRun from "./pipelineRun";
import {getUser} from "doublekit-core-ui";
import {inject,observer} from "mobx-react";
import {withRouter} from "react-router";
import './pipelineTable.scss';

const PipelineTable = props =>{

    const {structureStore,pipelineCollectStore,list,fresh,setFresh}=props

    const {pipelineStartStructure,killInstance}=structureStore
    const {updateFollow} = pipelineCollectStore
    const userId = getUser().userId

    //收藏
    const collectAction = record => {
        const params = {
            pipeline:record.pipelineId,
            userId:userId
        }
        updateFollow(params).then(res=>{
            console.log('取消收藏',res)
            if(res.data !== '1'){
                message.info({content:'收藏成功', className:'message',})
            }
            if(res.data === '1'){
                message.info({content:'取消收藏', className:'message',})
            }
            setFresh(!fresh)
        }).catch(error=>{
            console.log(error)
        })
    }

    //去详情页面
    const goPipelineTask=(text,record)=>{
        localStorage.setItem('pipelineName',text)
        localStorage.setItem('pipelineId',record.pipelineId)
        props.history.push('/index/task/work')
    }

    const work = record =>{
        const params = {
            userId:userId,
            pipelineId:record.pipelineId
        }
        if(record.pipelineState === 0){
            pipelineStartStructure(params).then(res=>{
                if(res.data === 1){
                    // setFresh(!fresh)
                    setTimeout(()=>setFresh(!fresh),1000)
                    message.info({content:'开始运行', className:'message',})
                }
            })
        }else {
            killInstance(params).then(()=>{
                setFresh(!fresh)
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
                        return  <Tooltip title="成功" placement="rightTop" className='all-icon'>
                                    <CheckCircleOutlined style = {{fontSize:25,color:'#1890ff'}}/>
                                </Tooltip>
                    case 1:
                        return <Tooltip title="失败" placement="rightTop" className='all-icon'>
                                    <CloseCircleOutlined style = {{fontSize:25,color:'#ff0000'}}/>
                                </Tooltip>
                    case 0:
                        return  <Tooltip title="待构建" placement="rightTop" className='all-icon'>
                                    <PlayCircleOutlined style = {{fontSize:25}}/>
                                </Tooltip>
                    default:
                        return  <Tooltip title="停止" placement="rightTop" className='all-icon'>
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
                    <span onClick={()=>goPipelineTask(text,record)}
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
                                <PipelineRun/>
                        }
                    </span>
                )
            }
        },
    ]

    return  <Table
                bordered
                rowKey={record => record.pipelineId}
                columns={columns}
                dataSource={list}
                pagination={{ pageSize: 12, hideOnSinglePage:true}}
                locale={{emptyText:
                    <Fragment>
                        <svg className="icon" aria-hidden="true" >
                            <use xlinkHref="#icon-meiyouxiangguan"/>
                        </svg>
                        <div>没有数据</div>
                    </Fragment>
                }}
            />
}

export default withRouter(inject('structureStore','pipelineCollectStore')(observer(PipelineTable)))