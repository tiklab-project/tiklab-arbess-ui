import React,{useState,useEffect} from "react";
import {
    CaretRightOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import {Spin, Drawer} from "antd";
import {inject,observer,Provider} from "mobx-react";
import {renderRoutes} from "react-router-config";
import taskStore from "../processDesign/gui/store/TaskStore";
import stageStore from "../processDesign/gui/store/StageStore";
import historyStore from "../../history/store/HistoryStore";
import variableStore from "../variable/store/VariableStore";
import postprocessStore from "../postprocess/store/PostprocessStore";
import triggerStore from "../trigger/store/TriggerStore";
import Btn from "../../../common/component/btn/Btn";
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import HistoryDetail from "../../history/components/HistoryDetail";
import DiskModal from "../../../common/component/modal/DiskModal";
import {
    DeploymentUnitOutlined,
    CrownOutlined,
    BugOutlined,
    PartitionOutlined,
} from "@ant-design/icons"
import "./Design.scss";

/**
 * 设计页面
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

    const {pipeline,findOnePipeline} = pipelineStore
    const {execStart} = historyStore
    const {validTaskMustField, taskMustField,taskFresh} = taskStore
    const {validStagesMustField,stageMustField,stageFresh} = stageStore
    const {findPipelinePost,postprocessData} = postprocessStore
    const {findAllTrigger,triggerData} = triggerStore
    const {findAllVariable,variableData} = variableStore

    const pipelineId = match.params.id

    // 路由菜单
    const [path,setPath] = useState("");

    // 点击运行按钮
    const [isSpin,setIsSpin] = useState(false);

    // 运行页面展示||隐藏
    const [isDetails,setIsDetails] = useState(false);

    // 单个历史信息
    const [historyItem,setHistoryItem] = useState(null);

    // 磁盘内存弹出框状态
    const [diskVisible,setDiskVisible] = useState(false);

    useEffect(()=>{
        setPath(props.location.pathname)
    },[props.location.pathname])

    useEffect(()=>{
        findPipelinePost(pipelineId).then()
        findAllTrigger(pipelineId).then()
        findAllVariable(pipelineId).then()
    },[])

    useEffect(() => {
        if(pipeline?.type===1){
            return validTaskMustField(pipelineId)
        }
        return validStagesMustField(pipelineId)
    }, [taskFresh,stageFresh]);

    useEffect(()=>{
        // 监听运行状态，获取流水线信息
        if(!isDetails){
            findOnePipeline(pipelineId)
        }
    },[isDetails])

    /**
     * 开始运行
     */
    const run = () =>{
        setIsSpin(true)
        execStart(pipeline.id).then(res=>{
            setIsSpin(false)
            if(res.code===0){
                setHistoryItem(res.data && res.data)
                setIsDetails(true)
                return
            }
            if(res.code===9000) return setDiskVisible(true)
        })
    }

    /**
     * 是否能运行
     * @returns {boolean}
     */
    const runStatu = () => {
        if(pipeline?.type===1){
            return taskMustField?.length <= 0;
        }
        return stageMustField?.length <= 0;
    }

    const typeLis = [
        {
            id:`/pipeline/${pipelineId}/config`,
            title:"流程设计",
            icon: <DeploymentUnitOutlined/>
        },
        {
            id:`/pipeline/${pipelineId}/config/tigger`,
            title:"触发设置",
            icon: <CrownOutlined/>,
            long: triggerData
        },
        {
            id:`/pipeline/${pipelineId}/config/vari`,
            title:"变量",
            icon: <BugOutlined/>,
            long: variableData
        },
        {
            id:`/pipeline/${pipelineId}/config/postprocess`,
            title:"后置处理",
            icon: <PartitionOutlined/>,
            long: postprocessData
        }
    ]

    const goBack = () =>{
        setIsDetails(false)
    }

    return(
        <Provider {...store}>
            <div className="design mf">
                <Spin spinning={isSpin}>
                    <div className="design-up">
                        <div className="design-top">
                            <BreadCrumb firstItem={"设计"}/>
                            <div className="changeView-btn">
                                <Btn
                                    isMar={true}
                                    title={"帮助"}
                                    onClick={()=>window.open('http://thoughtware.net/document')}
                                />
                                {
                                    pipeline?.state===2 ?
                                        <Btn
                                            type={"primary"}
                                            icon={<Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />}
                                            title={"运行中"}
                                        />
                                        :
                                        <Btn
                                            type={runStatu() ? "primary" : "disabled" }
                                            onClick={runStatu() ? ()=>run() : undefined }
                                            icon={<CaretRightOutlined />}
                                            title={"运行"}
                                        />
                                }
                            </div>
                        </div>
                        <div className="design-tabs">
                            {
                                typeLis.map(item=>{
                                    return(
                                        <div key={item.id}
                                             className={`design-tab ${path===item.id?"design-active":""}`}
                                             onClick={()=>props.history.push(item.id)}
                                        >
                                            <div className="design-tab-icon">{item.icon}</div>
                                            <div className="design-tab-title">
                                                {item.title}
                                                <span>({item?.long?.length || 0})</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    { renderRoutes(route.routes) }
                </Spin>
            </div>
            <DiskModal
                visible={diskVisible}
                setVisible={setDiskVisible}
            />
            <Drawer
                placement="right"
                visible={isDetails}
                onClose={goBack}
                closable={false}
                destroyOnClose={true}
                width={"75%"}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
                bodyStyle={{padding:0}}
            >
                <HistoryDetail
                    back={goBack}
                    historyType={"drawer"}
                    historyItem={historyItem}
                    setHistoryItem={setHistoryItem}
                    historyStore={historyStore}
                />
            </Drawer>
        </Provider>
    )
}

export default inject("pipelineStore")(observer(Design))
