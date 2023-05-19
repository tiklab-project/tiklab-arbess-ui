import React,{useState} from "react";
import {Steps} from "antd";
import {inject,observer} from "mobx-react";
import PipelineAddMould from "./PipelineAddMould";
import PipelineAddInfo from "./PipelineAddInfo";
import {Loading} from "../../../common/loading/Loading";
import Btn from "../../../common/btn/Btn";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import "./pipelineAdd.scss";

/**
 * 添加流水线
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineAdd = props =>{

    const {pipelineStore} = props

    const {createPipeline} = pipelineStore

    const [isLoading,setIsLoading] = useState(false)

    const [current,setCurrent] = useState(0)

    // 流水线模板 -- 下标
    const [templateType,setTemplateType] = useState(1)

    // 基本信息
    const [baseInfo,setBaseInfo] = useState({})

    /**
     * 创建流水线
     */
    const createPip = () => {
        const params = {
            ...baseInfo,
            template:templateType,
        }
        setIsLoading(true)
        createPipeline(params).then(res => {
            if (res.code===0) {
                setIsLoading(false)
                props.history.push(`/index/pipeline/${res.data}/config`)
            }
        })
    }

    // 渲染模板
    const renderTemplate = (
           <div className="pipeline-template">
               <div className="template-base">
                   <span>流水线名称：</span>
                   <span>{baseInfo.name}</span>
               </div>
               <div className="template-base">
                   <span>流水线类型：</span>
                   <span>{baseInfo.type===1?"多任务":"多阶段"}</span>
               </div>
               <div className="template-base">
                   <span>流水线权限：</span>
                   <span> {baseInfo.power===1?"全局":"私有"}</span>
               </div>
               <PipelineAddMould
                   templateType={templateType}
                   setTemplateType={setTemplateType}
               />
           </div>
    )

    // 完善信息
    const renderInfo = (
        <PipelineAddInfo
            {...props}
            pipelineStore={pipelineStore}
            setCurrent={setCurrent}
            setBaseInfo={setBaseInfo}
            set={false}
        />
    )

    const renderBtn = (
        current ===1 &&
        <>
            <Btn
                onClick={()=>props.history.push("/index/pipeline")}
                title={"取消"}
                isMar={true}
            />
            <Btn
                onClick={()=>setCurrent(0)}
                title={"上一步"}
                isMar={true}
            />
            <Btn
                type={"primary"}
                onClick={()=>createPip()}
                title={"确定"}
            />
        </>

    )

    const steps = [
        {
            title: "完善信息",
            content: renderInfo
        },
        {
            title: "选择模板",
            content: renderTemplate
        },
    ]

    return <div className="pipeline-add mf">
        <div className="pipeline-add-content">
            <BreadcrumbContent firstItem={'新建流水线'} goBack={()=>props.history.push("/index/pipeline")}/>
            <div className="steps-top">
                <Steps current={current}>
                    {steps.map(item => (
                        <Steps.Step key={item.title} title={item.title} />
                    ))}
                </Steps>
            </div>
            <div className="steps-content">
                {steps[current].content}
            </div>
            <div className="steps-bottom">
                {renderBtn}
            </div>
            { isLoading && <Loading/> }
        </div>
    </div>

}

export default inject("pipelineStore")(observer(PipelineAdd))
