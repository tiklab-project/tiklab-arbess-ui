import React,{useState,useEffect} from "react";
import {
    CaretRightOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import {Spin} from "antd";
import {inject,observer} from "mobx-react";
import Btn from "../../../common/btn/Btn";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import ProcessDesign from "../processDesign/processDesign/components/ProcessDesign";
import Postprocess from "../postprocess/components/Postprocess";
import Trigger from "../trigger/components/Trigger";
import Variable from "../variable/components/Variable";
import HistoryDetail from "../../history/components/HistoryDetail";
import "./Design.scss";

/**
 * 设计页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Design = props =>{

    const {match,pipelineStore,taskStore,historyStore,stageStore} = props

    const {pipeline,findOnePipeline,findDmUserPage} = pipelineStore
    const {execStart} = historyStore
    const {taskList,taskMustField} = taskStore
    const {stageList,stageMustField} = stageStore

    const pipelineId = match.params.id

    // 设计类型
    const [type,setType] = useState(1)

    // 运行页面展示||隐藏
    const [isDetails,setIsDetails] = useState(false)

    // 单个历史信息
    const [historyItem,setHistoryItem] = useState({})

    useEffect(()=>{
        // 获取项目成员
        findDmUserPage(pipelineId)
    },[])

    useEffect(()=>{
        // 监听运行状态，获取流水线信息
        findOnePipeline(pipelineId)
    },[isDetails])

    /**
     * 开始运行
     */
    const run = () => {
        execStart(pipeline.id).then(res=>{
            if(res.code===0){
                setHistoryItem(res.data && res.data)
                setIsDetails(true)
            }
        })
    }

    /**
     * 是否能运行
     * @returns {boolean}
     */
    const runStatu = () => {
        if(pipeline && pipeline.type===1){
            return !(taskList && taskList.length < 1 || taskMustField && taskMustField.length > 0)
        }
        return !(stageList && stageList.length < 1 || stageMustField && stageMustField.length > 0)
    }

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
                    historyItem={historyItem}
                    firstItem={"设计"}
                    detailsVisible={isDetails}
                    setDetailsVisible={setIsDetails}
                    historyStore={historyStore}
                />
    }

    return(
        <div className="design mf">
            <div className="design-up">
                <div className="design-top">
                    <BreadcrumbContent firstItem={"设计"}/>
                    <div className="design-tabs">
                        {
                            typeLis.map(item=>{
                                return(
                                    <div key={item.id}
                                         className={`design-tab ${type===item.id?"design-active":""}`}
                                         onClick={()=>setType(item.id)}
                                    >{item.title}</div>
                                )
                            })
                        }
                    </div>
                    <div className="changeView-btn">
                        {
                            pipeline && pipeline.state===2 ?
                                <Btn
                                    type={"primary"}
                                    icon={<Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />}
                                    title={"运行中"}
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
            { type===1 && <ProcessDesign pipelineStore={pipelineStore}/> }
            { type===2 && <Trigger pipelineStore={pipelineStore}/> }
            { type===3 && <Variable pipelineStore={pipelineStore}/> }
            { type===4 && <Postprocess pipelineStore={pipelineStore}/> }
        </div>
    )
}

export default inject("historyStore","taskStore","stageStore","pipelineStore")(observer(Design))
