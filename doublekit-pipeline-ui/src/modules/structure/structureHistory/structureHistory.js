import React,{useState,useEffect} from 'react'
import {Button,  Table} from "antd";
import {withRouter} from "react-router-dom";
import './structureHistory.scss'
import StructureHistoryScreenModal from "./structureHistoryScreenModal";
import {observer,inject} from "mobx-react";
import {SettingOutlined} from "@ant-design/icons";

const StructureHistory=props=>{

    const {StructureStore}=props
    const {selectHistoryDetails,buildHistoryList}=StructureStore

    const pipelineId=localStorage.getItem('pipelineId')

    useEffect(()=>{
        // selectHistoryDetails(pipelineId)
        const se = setTimeout(()=>selectHistoryDetails(pipelineId),100)
        return ()=> clearTimeout(se)
    },[])

    const [visible, setVisible] = useState(false);

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };

    //构建详情
    const goBuildDetails = record =>{
        localStorage.setItem('historyId',record.historyId)
        props.history.push(`/home/task/build/${"构建"+record.historyNumber}`)
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
                        className='structure-history-table'
                    >
                        构建{text}
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
                            <use xlinkHref="#icon-chenggong-"/>
                        </svg>
                    )
                }else if(text===1){
                    return(
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yunhangshibai1"/>
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
                        className='structure-history-table'
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
            title: <SettingOutlined />,
            key: 'operation',
            fixed: 'right',
            width: 100,
            render:(text, record) => {
                return(
                    <span>
                        查看
                    </span>
                )
            }
        },

    ]

    return(
        <div className='structure-history task'>
            <div className='structure-history-top'>
                <Button type='primary'  onClick={()=>{setVisible(true)}}>
                    筛选
                </Button>

                <StructureHistoryScreenModal
                    visible={visible}
                    onCreate={onCreate}
                    onCancel={() => {setVisible(false);}}
                />
            </div>
            <div className='structure-history-bottom'>
                <Table
                    rowKey={record => record.historyId}
                    columns={columns}
                    dataSource={buildHistoryList}
                />
            </div>
        </div>
    )
}

export default withRouter(inject('StructureStore')(observer(StructureHistory)))