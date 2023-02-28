import React,{useState,useEffect} from "react";
import {
    CaretRightOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import {message,Spin} from "antd";
import {inject,observer} from "mobx-react";
import Btn from "../../common/btn/Btn";
import BreadcrumbContent from "../../common/breadcrumb/Breadcrumb";
import TaskGui from "../tasks/tasks/container/TaskGui";
import Postprocess from "../postprocess/container/Postprocess";
import Trigger from "../trigger/container/Trigger";
import Variable from "../variable/container/Variable";
import HistoryDetail from "../../pipeline/history/components/HistoryDetail";
import "./Design.scss";

/**
 * 设计页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Design = props =>{

    const {pipelineStore,configStore,historyStore} = props

    const {pipelineStartStructure} = historyStore
    const {validType,data,setTaskFormDrawer,setDataItem} = configStore
    const {pipeline} = pipelineStore

    const [type,setType] = useState(1)
    const [process,setProcess] = useState(false) // 运行按钮
    const [isDetails,setIsDetails] = useState(false) // 运行页面

    useEffect(()=>{
        // 组件销毁
        return ()=> {
            setTaskFormDrawer(false)
            setIsDetails(false)
            setDataItem("")
        }
    },[pipeline])

    /**
     * 运行
     */
    const run = () => {
        // 改变按钮
        setProcess(true)

        pipelineStartStructure(pipeline.id).then(res=>{
            if(res.code===0){
                if(!res.data){
                    message.info("流水线正在运行")
                }
                setProcess(false)
                setIsDetails(true)
            }
        })
    }

    /**
     * 是否能运行
     * @returns {boolean}
     */
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
            title:"变量"
        },
        {
            id:4,
            title:"后置处理"
        }
    ]

    if(isDetails){
        return <HistoryDetail
                    index={2}
                    pipeline={pipeline}
                    firstItem={"设计"}
                    isAll={"config"}
                    isDetails={isDetails}
                    setIsDetails={setIsDetails}
                    historyStore={historyStore}
                />
    }

    return(
        <div className="config mf">
            <div className="config-up">
                <div className="config-top">
                    <BreadcrumbContent firstItem={"设计"}/>
                    <div className="config-tabs">
                        {
                            typeLis.map(item=>{
                                return(
                                    <div key={item.id}
                                         className={`config-tab ${type===item.id?"config-active":""}`}
                                         onClick={()=>setType(item.id)}
                                    >{item.title}</div>
                                )
                            })
                        }
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
            </div>
            { type===1 && <TaskGui configStore={configStore} pipelineStore={pipelineStore}/> }
            { type===2 && <Trigger pipelineStore={pipelineStore}/> }
            { type===3 && <Variable pipelineStore={pipelineStore}/> }
            { type===4 && <Postprocess pipelineStore={pipelineStore}/> }
        </div>
    )
}

export default inject("historyStore","configStore","pipelineStore")(observer(Design))
