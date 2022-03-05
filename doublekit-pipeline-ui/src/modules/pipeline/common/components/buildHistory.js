import React,{useState,useEffect} from 'react'
import {Button,  Table} from "antd";
import {withRouter} from "react-router-dom";
import BuildHistoryScreenModal from "./buildHistoryScreenModal";
import {observer,inject} from "mobx-react";

const HistoryTask=props=>{

    const {BUILD_STORE}=props
    const {selectHistoryDetails,buildHistoryList}=BUILD_STORE

    const pipelineId=localStorage.getItem('pipelineId')

    useEffect(()=>{
        const se=setTimeout(()=> selectHistoryDetails(pipelineId),100)
        return () =>{
            clearTimeout(se)
        }
    },[])

    const [visible, setVisible] = useState(false);
    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };

    //构建详情
    const goBuildDetails = record =>{
        localStorage.setItem('historyId',record.historyId)
        localStorage.setItem('historyNumber',record.historyNumber)
        props.history.push({pathname:'/home/task/build', record})
    }

    //执行人详情
    const goImplementorDetails = (text,record) =>{

    }

    const columns = [
        {
            title: '构建',
            dataIndex: 'historyNumber',
            key: 'historyNumber',
            render:(text,record)=>{
                return(
                    <span
                        onClick={()=>
                            goBuildDetails(record)
                        }
                        className='task-history-table'
                    >
                        {text}
                    </span>
                )
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render:(text,record)=>{
                if(text===30){
                    return (
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-chenggong-"></use>
                        </svg>
                    )
                }else if(text===1){
                    return(
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yunhangshibai1"></use>
                        </svg>
                    )
                }
            }
        },
        {
            title: '构建时间',
            dataIndex: 'createStructureTime',
            key: 'createStructureTime',
        },
        {
            title: '执行人',
            dataIndex: 'implementor',
            key: 'implementor',
            render:(text, record) =>{
                return(
                    <span
                        onClick={()=>
                            goImplementorDetails(text,record)
                        }
                        className='task-history-table'
                    >
                        {text}
                    </span>
                )
            }
        },
        {
            title: '执行方式',
            dataIndex: 'structureWay',
            key: 'structureWay',
        },
        {
            title: '执行时间',
            dataIndex: 'implementTime',
            key: 'implementTime',
        },
        {
            title: '代码源',
            dataIndex: 'codeSource',
            key: 'codeSource',
            render:(text,record)=>{
                if(text==='b'){
                    return <span>git</span>

                }else {
                    return <span>无</span>

                }
            }
        },
        {
            title: '凭证',
            dataIndex: 'proof',
            key: 'proof',
        },
        {
            title: '分支',
            dataIndex: 'branch',
            key: 'branch',
        },
    ]

    return(
        <div className='task-history'>
            <div className='task-history-top'>
                <h1>历史记录</h1>
                <Button type='primary'  onClick={()=>{setVisible(true)}}>
                    筛选
                </Button>
                {/* 弹出框 */}
                <BuildHistoryScreenModal
                    visible={visible}
                    onCreate={()=>onCreate()}
                    onCancel={() => {
                        setVisible(false);
                    }}
                />
            </div>
            <div className='task-history-bottom'>
                <Table
                    rowKey={record => record.historyId}
                    columns={columns}
                    dataSource={buildHistoryList}
                />
            </div>
        </div>
    )
}

export default withRouter(inject('BUILD_STORE')(observer(HistoryTask)))