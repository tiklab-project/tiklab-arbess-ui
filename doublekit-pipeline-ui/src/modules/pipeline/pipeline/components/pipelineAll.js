import React,{ useEffect,useState } from "react";
import {Table} from "antd";
import {withRouter} from "react-router-dom";
import {observer,inject} from "mobx-react";
import Running from "../../../../common/running/running";


const PipelineAll= props=>{

    const {PIPELINE_STORE}=props
    const {selectPipelineStatus,pipelineList}=PIPELINE_STORE

    //初始化表格
    useEffect(()=>{
        selectPipelineStatus().then(res=>{
            console.log(res)
        })
    },[])

    //点击收藏按钮
    const [icoStatus, setIcoStatus] = useState()
    const icoStatusData = record => {
        setIcoStatus(record.pipelineId)
    }

    //最近构建状态
    const structureStatus = (text,record) =>{
        // setRun(record.pipelineId )
        switch (text) {
            case 0:
                return (
                    <div>
                        <svg className="icon" aria-hidden="true" >
                            <use xlinkHref="#icon-chenggong4"  />
                        </svg>
                    </div>
                )
        }
    }

    //去详情页面
    const goPipelineTask=(text,record)=>{
        localStorage.setItem('pipelineName',text)
        localStorage.setItem('pipelineId',record.pipelineId)
        props.history.push('/home/task/work')
    }

    //操作
    const [run,setRun]=useState()
    const move = (text,record) =>{
        setRun(record.pipelineId )

    }

    const columns = [
        {
            title: '收藏',
            dataIndex: 'collection',
            key:"collection",
            render:(text ,record)=>{
                return(
                    <span className='all-icon' onClick={() => icoStatusData(record)}>
                        {
                            icoStatus === record.pipelineId   ?
                                <svg className="icon" aria-hidden="true" >
                                    <use xlinkHref="#icon-xingxing1"  />
                                </svg>
                                :
                                <svg className="icon" aria-hidden="true" >
                                    <use xlinkHref="#icon-xingxing-kong"  />
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
            // render:structureStatus
            render:(text ,record)=> {
                return (
                    <span className=' all-icon' onClick={() => structureStatus(text,record)}>
                        {
                            run === record.pipelineId ?
                                <Running/>
                                :
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-yunhang1"/>
                                </svg>
                        }
                    </span>
                )
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
            render:(text ,record)=>{
                return(
                    <span className=' all-icon' onClick={() => move(text,record)}>
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
    ];

    return(
            <Table
                rowKey={record => record.pipelineId}
                columns={columns}
                dataSource={pipelineList}
            />
    )
}

export default withRouter(inject('PIPELINE_STORE')(observer(PipelineAll)));