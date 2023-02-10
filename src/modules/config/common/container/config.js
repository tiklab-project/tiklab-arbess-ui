import React,{useState,useEffect} from "react";
import {
    CaretRightOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import {message,Spin} from "antd";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import Btn from "../../../common/btn/btn";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import Gui from "../../view/container/gui";
import Postpose from "../../postpose/container/postpose";
import Trigger from "../../trigger/container/trigger";
import Variable from "../../variable/container/variable";
import StrDetail from "../../../structure/components/strDetail";
import "./config.scss";

const Config = props =>{

    const {pipelineStore,configStore,structureStore} = props

    const {pipelineStartStructure,pipelineRunStatus} = structureStore
    const {validType,data,setTaskFormDrawer,setDataItem} = configStore
    const {pipeline} = pipelineStore

    const [type,setType] = useState(1)
    const [process,setProcess] = useState(false) // 运行按钮
    const [isDetails,setIsDetails] = useState(false) // 运行页面

    const pipelineId = pipeline.id

    useEffect(()=>{
        pipelineId && setIsDetails(false)
        return ()=> {
            setTaskFormDrawer(false)
            setDataItem("")
        }
    },[pipelineId])

    // 配置运行状态
    let interval = null
    useEffect(()=>{
        if(isDetails && pipelineId){
            interval=setInterval(()=>
                pipelineRunStatus(pipeline.id).then(res=>{
                    if(res.code===0){ res.data && res.data.allState === 0 && clearInterval(interval)}
                }), 1000)
        }
        return ()=> clearInterval(interval)
    },[isDetails,pipelineId])

    const run = () => {
        // 改变按钮
        setProcess(true)
        pipelineStartStructure(pipelineId).then(res=>{
            if(res.code===0){
                if(!res.data){
                    message.info("流水线正在运行")
                }
                setProcess(false)
                setIsDetails(true)
            }
        })
    }

    // 是否能运行
    const runStatu = () => !(data && data.length < 1 || validType && validType.length > 0)

    const typeLis = [
        {
            id:1,
            title:"流程设计"
        },
        {
            id:2,
            title:"触发器"
        },
        {
            id:3,
            title:"后置处理"
        },
        {
            id:4,
            title:"变量"
        }
    ]

    if(isDetails){
        return <StrDetail
                    index={1}
                    pipeline={pipeline}
                    setIsDetails={setIsDetails}
                    firstItem={"配置"}
                    structureStore={structureStore}
                />
    }

    return(
        <div className="config mf">
            <div className="config-up">
                <div className="config-top">
                    <div className="config_bread">
                        <BreadcrumbContent firstItem={pipeline.name} secondItem={"设计"}/>
                    </div>
                    <div className="changeView-btn">
                        {
                            process ?
                                <Btn
                                    type={"primary"}
                                    title={<Spin indicator={<LoadingOutlined style={{ fontSize: 25 }} spin />} />}
                                />
                                :
                                <Btn
                                    type={runStatu() ? "primary" : "disabled" }
                                    onClick={runStatu() ? ()=>run() : null }
                                    icon={<CaretRightOutlined />}
                                    title={"运行"}
                                />

                        }
                    </div>
                </div>
                <div className="config-tabs">
                    {
                        typeLis.map(item=>{
                            return(
                                <div
                                    key={item.id}
                                    className={`config-tab ${type===item.id?"config-active":""}`}
                                    onClick={()=>setType(item.id)}
                                >{item.title}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                type === 1 &&
                <Gui
                    configStore={configStore}
                    pipelineStore={pipelineStore}
                />
            }
            {
                type===2 &&
                <Trigger pipelineStore={pipelineStore}/>
            }
            {
                type===3 &&
                <Postpose pipelineStore={pipelineStore}/>
            }
            {
                type===4 &&
                <Variable pipelineStore={pipelineStore}/>
            }
        </div>
    )
}

export default withRouter(inject("structureStore","configStore","pipelineStore")
                (observer(Config)))
