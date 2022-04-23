import React,{useState,useEffect} from 'react'
import {Button,  Table} from "antd";
import {withRouter} from "react-router";
import './structureHistory.scss'
import StructureHistoryScreenModal from "./structureHistoryScreenModal";
import {observer,inject} from "mobx-react";
import {SettingOutlined} from "@ant-design/icons";

const StructureHistory=props=>{

    const {StructureStore}=props
    const {selectHistoryDetails,buildHistoryList}=StructureStore

    const pipelineId=localStorage.getItem('pipelineId')

    useEffect(()=>{
        const se = setTimeout(()=>selectHistoryDetails(pipelineId),100)
        return ()=> clearTimeout(se)
    },[])

    const [visible, setVisible] = useState(false);

    const onCreate = values => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };

    //构建详情
    const goBuildDetails = record =>{
        localStorage.setItem('historyId',record.historyId)
        props.history.push(`/home/task/build/${record.historyId}`)
    }

    //执行人详情
    const goImplementorDetails = (text,record) =>{

    }

    const columns = [
        {
            title: '构建',
            dataIndex: 'historyId',
            key: 'historyId',
            render:(text,record,index) =>{
                return(
                    <span>
                        # {text}
                    </span>
                )
            }
        },
        {
            title: '状态',
            dataIndex: 'runStatus',
            key: 'runStatus',
            render:text =>{
                switch (text){
                    case 0:
                        return  <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-dengdai1"/>
                                </svg>
                    case 1:
                        return  <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-yunhangshibai1"/>
                                </svg>
                    case 30:
                        return  <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-chenggong-"/>
                                </svg>
                }
            }
        },
        {
            title: '构建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '执行人',
            dataIndex: 'execName',
            key: 'execName',
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
            dataIndex: 'runWay',
            key: 'runWay',
            render:text =>{
               switch (text) {
                   case 1:
                       return   <span>
                                    用户点击执行
                                </span>
               }
            }

        },
        {
            title: '执行时间',
            dataIndex: 'execTime',
            key: 'execTime',
        },
        {
            title: <SettingOutlined />,
            key: 'operation',
            render:(text, record) => {
                return(
                    <span
                        onClick={()=>
                            goBuildDetails(record)
                        }
                        className='structure-history-table'
                    >
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