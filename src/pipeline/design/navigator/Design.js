import React,{useState,useEffect} from "react";
import {
    CaretRightOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import {Spin} from "antd";
import {inject,observer,Provider} from "mobx-react";
import {renderRoutes} from "react-router-config";
import taskStore from "../processDesign/processDesign/store/TaskStore";
import stageStore from "../processDesign/processDesign/store/StageStore";
import historyStore from "../../history/store/HistoryStore";
import variableStore from "../variable/store/VariableStore";
import postprocessStore from "../postprocess/store/PostprocessStore";
import triggerStore from "../trigger/store/TriggerStore";
import Btn from "../../../common/btn/Btn";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import HistoryDetail from "../../history/components/HistoryDetail";
import "./Design.scss";

/**
 * 设计页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Design = props =>{

    const store = {
        taskStore,
        stageStore,
        postprocessStore,
        variableStore,
        triggerStore
    }

    const {route,match,pipelineStore} = props

    const {pipeline,findOnePipeline,findDmUserPage} = pipelineStore
    const {execStart} = historyStore
    const {taskList,taskMustField} = taskStore
    const {stageList,stageMustField} = stageStore

    const pipelineId = match.params.id

    const [path,setPath] = useState("")

    // 运行页面展示||隐藏
    const [isDetails,setIsDetails] = useState(false)

    // 单个历史信息
    const [historyItem,setHistoryItem] = useState({})

    useEffect(()=>{
        setPath(props.location.pathname)
    },[props.location.pathname])

    useEffect(()=>{
        // 获取项目成员
        findDmUserPage({
            pageParam:{
                pageSize:5,
                currentPage:1
            },
            domainId:pipelineId,
        })
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
            id:`/index/pipeline/${pipelineId}/config`,
            title:"流程设计",
        },
        {
            id:`/index/pipeline/${pipelineId}/config/tigger`,
            title:"触发器",
        },
        {
            id:`/index/pipeline/${pipelineId}/config/vari`,
            title:"变量"
        },
        {
            id:`/index/pipeline/${pipelineId}/config/postprocess`,
            title:"后置处理"
        }
    ]

    if(isDetails){
        return <HistoryDetail
                    firstItem={"设计"}
                    historyItem={historyItem}
                    back={()=>setIsDetails(false)}
                    historyStore={historyStore}
                />
    }

    return(
        <Provider {...store}>
            <div className="design mf">
                <div className="design-up">
                    <div className="design-top">
                        <BreadcrumbContent firstItem={"设计"}/>
                        <div className="design-tabs">
                            {
                                typeLis.map(item=>{
                                    return(
                                        <div key={item.id}
                                             className={`design-tab ${path===item.id?"design-active":""}`}
                                             onClick={()=>props.history.push(item.id)}
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
                { renderRoutes(route.routes) }
            </div>
        </Provider>
    )
}

export default inject("pipelineStore")(observer(Design))
