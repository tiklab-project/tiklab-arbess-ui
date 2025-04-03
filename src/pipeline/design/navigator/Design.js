/**
 * @Description: 设计
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/11
 */
import React,{useState,useEffect} from "react";
import {Spin,Tooltip} from "antd";
import {inject,observer,Provider} from "mobx-react";
import taskStore from "../processDesign/gui/store/TaskStore";
import stageStore from "../processDesign/gui/store/StageStore";
import historyStore from "../../history/store/HistoryStore";
import variableStore from "../variable/store/VariableStore";
import postprocessStore from "../postprocess/store/PostprocessStore";
import triggerStore from "../trigger/store/TriggerStore";
import Btn from "../../../common/component/btn/Btn";
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import HistoryRunDetail from "../../history/components/HistoryRunDetail";
import DesignAgent from "./DesignAgent";
import PipelineDrawer from "../../../common/component/drawer/Drawer";
import Gui from "../processDesign/gui/component/Gui";
import Trigger from "../trigger/components/Trigger";
import Variable from "../variable/components/Variable";
import Postprocess from "../postprocess/components/Postprocess";
import "./Design.scss";
import {getUser} from "tiklab-core-ui";

const Design = props =>{

    const store = {
        taskStore,
        stageStore,
        postprocessStore,
        variableStore,
        triggerStore,
    }

    const {match,pipelineStore,systemRoleStore} = props

    const {domainPermissions} = systemRoleStore;
    const {pipeline,findOnePipeline} = pipelineStore;
    const {execStart} = historyStore;
    const {setTaskPermissions,taskFresh,mustFieldFresh} = taskStore;
    const {validStagesMustField,stageMustField,stageFresh} = stageStore;
    const {findPipelinePost,postprocessData} = postprocessStore;
    const {findAllTrigger,triggerData} = triggerStore;
    const {findAllVariable,variableData} = variableStore;

    const userId = getUser().userId;
    const pipelineId = match.params.id;

    const pipelinePermissions = domainPermissions[`${userId}_${pipelineId}`] && domainPermissions[`${userId}_${pipelineId}`];

    //点击运行按钮
    const [isSpin,setIsSpin] = useState(false);
    //运行页面展示||隐藏
    const [isDetails,setIsDetails] = useState(false);
    //单个历史信息
    const [historyItem,setHistoryItem] = useState(null);
    //默认agent
    const [defaultAgent,setDefaultAgent] = useState(null);
    //选择类型
    const [active,setActive] = useState('config');

    useEffect(()=>{
        //后置处理
        findPipelinePost(pipelineId).then();
        //触发器
        findAllTrigger(pipelineId).then();
        //变量
        findAllVariable(pipelineId).then();
    },[])

    useEffect(() => {
        //权限
        if(pipelinePermissions){
            setTaskPermissions(pipelinePermissions);
        }
    }, [pipelinePermissions]);

    useEffect(() => {
        //多阶段未填写必需任务
        validStagesMustField(pipelineId).then()
    }, [taskFresh,stageFresh,mustFieldFresh]);

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
        execStart(defaultAgent? {
            agentId:defaultAgent,
            pipelineId:pipeline.id
        }:{pipelineId:pipeline.id}).then(res=>{
            if(res.code===0){
                setHistoryItem(res.data && res.data)
                setIsDetails(true)
            }
        }).finally(()=>setIsSpin(false))
    }

    const typeLis = [
        {
            id:`config`,
            title:"流程设计",
            long:false,
        },
        {
            id:`tigger`,
            title:"触发设置",
            long: triggerData?.length || '0'
        },
        {
            id:`vari`,
            title:"变量",
            long: variableData?.length || '0'
        },
        {
            id:`postprocess`,
            title:"消息通知",
            long: postprocessData?.length || '0'
        }
    ]

    /**
     * 关闭弹出框
     */
    const goBack = () =>{
        setIsDetails(false);
        setHistoryItem(null);
    }

    //按钮组件
    const runButtonHtml = () => {
        if(!pipeline){return}
        const {state} = pipeline;
        if(state===2){
            return (
                <Btn type={"primary"} title={"运行中"}/>
            )
        }
        if(stageMustField?.length>0){
            return (
                <Btn type={"disabled"} title={"运行"}/>
            )
        }
        if(!pipelinePermissions?.includes('pipeline_task_run')){
            return (
                <Tooltip title={'当前没有运行权限，请联系管理员分配'}>
                    <span>
                        <Btn title={"运行"}/>
                    </span>
                </Tooltip>
            )
        }
        return (
            <Btn type={"primary"} title={"运行"} onClick={run}/>
        )
    }


    return(
        <Provider {...store}>
            <div className="design">
                <Spin spinning={isSpin}>
                    <div className="design-up">
                        <div className="design-top">
                            <div>
                                <BreadCrumb
                                    crumbs={[
                                        {title:'设计'}
                                    ]}
                                />
                                <div className="design-tabs">
                                    {
                                        typeLis.map(item=>{
                                            return(
                                                <div key={item.id} className={`design-tab ${active===item.id?"design-active":""}`}
                                                     onClick={()=>setActive(item.id)}
                                                >
                                                    <div className="design-tab-title">
                                                        {item.title}
                                                        {
                                                            item?.long &&
                                                            <span className="design-tab-long">{item.long}</span>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="changeView-btn">
                                <DesignAgent
                                    defaultAgent={defaultAgent}
                                    setDefaultAgent={setDefaultAgent}
                                />
                                {runButtonHtml()}
                            </div>
                        </div>
                    </div>
                    { active==='config'  && <Gui {...props}/> }
                    { active==='tigger'  && <Trigger {...props}/> }
                    { active==='vari'  && <Variable {...props}/> }
                    { active==='postprocess'  && <Postprocess {...props}/> }
                </Spin>
            </div>
            <PipelineDrawer
                width={"75%"}
                visible={isDetails}
                onClose={goBack}
            >
                <HistoryRunDetail
                    back={goBack}
                    historyType={"drawer"}
                    historyItem={historyItem}
                    setHistoryItem={setHistoryItem}
                />
            </PipelineDrawer>
        </Provider>
    )
}

export default inject("pipelineStore","systemRoleStore")(observer(Design))
