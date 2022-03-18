import React,{ useEffect,useState } from "react";
import {Table,Tooltip } from "antd";
import {withRouter} from "react-router-dom";
import './pipelineAll.scss'
import Running from "../../../../common/running/running";
import {observer,inject} from "mobx-react";

const PipelineAll= props=>{

    const {PipelineStore,StructureStore}=props
    const {selectPipelineStatus,pipelineList}=PipelineStore

    //初始化表格
    useEffect(()=>{
        selectPipelineStatus()
        // const se = setTimeout(()=>selectPipelineStatus(),100)
        // return ()=> clearTimeout(se)
    },[])

    //收藏
    const [icoStatus, setIcoStatus] = useState(true)
    const collectAction = (record) => {
        setIcoStatus(!icoStatus)
    }

    //去详情页面
    const goPipelineTask=(text,record)=>{
        localStorage.setItem('pipelineName',text)
        localStorage.setItem('pipelineId',record.pipelineId)
        props.history.push('/home/task/work')
    }

    //操作
    const [run,setRun]=useState()
    let  interval=null
    const move = record =>{
        setRun(record.pipelineId)
    }

    const columns = [
        {
            title: '收藏',
            dataIndex: 'collection',
            key:"collection",
            render:(text ,record)=>{
                return(
                    <span className='all-icon' onClick={() => collectAction(record)}>
                        {
                            icoStatus  ?
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
            render:text=>{
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
                                <Running />
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

export default withRouter(inject('PipelineStore','StructureStore')(observer(PipelineAll)));