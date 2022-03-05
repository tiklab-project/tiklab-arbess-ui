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
        const se=setTimeout(()=>selectPipelineStatus(),100)
        return ()=>{
            clearTimeout(se)
        }
    },[])

    //点击收藏按钮
    const [icoStatus, setIcoStatus] = useState(true)
    const icoStatusData = record => {
        setIcoStatus(!icoStatus)
    }

    //去详情页面
    const goPipelineTask=(text,record)=>{
        localStorage.setItem('pipelineName',text)
        localStorage.setItem('pipelineId',record.pipelineId)
        props.history.push('/home/task/work')
    }

    //操作
    const [run,setRun]=useState(true)
    const move = record =>{
        setRun(!run)
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
                            icoStatus   ?
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
            render:(text,record)=>{
                switch (text) {
                    case 30:
                        return  <svg className="icon" aria-hidden="true" >
                                    <use xlinkHref="#icon-chenggong-"  />
                                </svg>
                    case 1:
                        return <svg className="icon" aria-hidden="true" >
                                    <use xlinkHref="#icon-yunhangshibai1"  />
                               </svg>

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
            render:(text ,record)=>{
                return(
                    <span className=' all-icon' onClick={() => move(record)}>
                        {
                            run   ?
                                <svg className="icon" aria-hidden="true" >
                                    <use xlinkHref="#icon-yunhang1"  />
                                </svg>
                                :
                                <Running />
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