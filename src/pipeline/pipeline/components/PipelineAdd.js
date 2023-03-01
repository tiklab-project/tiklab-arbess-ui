import React,{useState} from "react";
import {Steps} from "antd";
import {RightOutlined,SwapOutlined} from "@ant-design/icons";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import PipelineAddMould from "./PipelineAddMould";
import PipelineAddInfo from "./PipelineAddInfo";
import "./pipelineAdd.scss";

/**
 * 添加流水线
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineAdd = props =>{

    const [current,setCurrent] = useState(0)

    // 流水线类型
    const [type,setType] = useState(1)

    // 流水线模板 -- 下标
    const [templateType,setTemplateType] = useState(1)

    // 模板list
    const templateLis = [
        {
            id:2,
            title:"Java",
            brand:"Maven",
            desc:"Linux",
            first:"Maven构建",
            second:"部署",
            type:2131,
        },
        {
            id:3,
            title:"Java",
            brand:"Maven",
            desc: "docker",
            first:"构建",
            second:"部署",
            type:2132,
        },
        {
            id:4,
            title:"Java",
            brand:"Maven",
            desc: "Linux",
            zreo: "测试",
            first:"构建",
            second:"部署",
            type:112131,
        },
        {
            id:5,
            title:"Java",
            brand:"Maven",
            desc: "docker",
            zreo: "测试",
            first:"构建",
            second:"部署",
            type:112132,
        },
        {
            id:6,
            title:"Node.js",
            brand:"npm",
            desc: "Linux",
            first:"构建",
            second:"部署",
            type:2231,
        },
        {
            id:7,
            title:"Node.js",
            brand:"npm",
            desc: "docker",
            first:"构建",
            second:"部署",
            type:2232,
        },
    ]

    /**
     * 改变模板
     * @param index
     */
    const changTemplate = index =>{
        setTemplateType(index)
        setCurrent(2)
    }

    /**
     * 改变类型
     * @param index
     */
    const changType = index =>{
        setType(index)
        setCurrent(1)
    }

    // 渲染类型
    const renderType = (
        <div className="pipeline-template">
            <div className="pipeline-template-ul">
                <div className="pipeline-template-title">任务类型</div>
                <div className={`pipeline-template-li pipeline-template-li-step1`} onClick={()=>changType(1)}>
                    <div className="li-self">多任务</div>
                    <div className="pipeline-template-arrow">
                        <RightOutlined />
                    </div>
                </div>
                <div className={`pipeline-template-li`} onClick={()=>changType(2)}>
                    <div className="li-self">多阶段</div>
                    <div className="pipeline-template-arrow">
                        <RightOutlined />
                    </div>
                </div>
            </div>
        </div>
    )

    // 渲染模板
    const renderTemplate = (
        <div className="pipeline-template">
            <div className="pipeline-template-ul">
                <div className="pipeline-template-title">流水线类型</div>
                <div className="pipeline-template-content">
                    <div className='pipeline-template-li pipeline-template-li-step2'>
                        <div className="li-self">{type===1?"多任务":"多阶段"}</div>
                    </div>
                    <Btn
                        icon={<SwapOutlined/>}
                        title={"切换类型"}
                        onClick={()=>setCurrent(0)}
                        type={"link"}
                    />
                </div>
                <div className="pipeline-template-title">自定义模板</div>
                <div className='pipeline-template-li' onClick={()=>changTemplate(0)}>
                    <div className="li-self">自定义配置</div>
                    <div className="pipeline-template-arrow">
                        <RightOutlined />
                    </div>
                </div>
                <div className="pipeline-template-title">推荐模板</div>
                {
                    templateLis.map((item,index)=>{
                        return  <PipelineAddMould
                            item={item}
                            index={index+1}
                            key={item.id}
                            changTemplate={changTemplate}
                        />
                    })
                }
            </div>
        </div>
    )

    // 完善信息
    const renderInfo = (
        <>
            <div className="pipeline-template" style={{paddingBottom:"var(--tiklab-padding-item)"}}>
                <div className="pipeline-template-title">流水线类型</div>
                <div className="pipeline-template-content">
                    <div className={`pipeline-template-li pipeline-template-li-step2`}>
                        <div className="li-self">{type===1?"多任务":"多阶段"}</div>
                    </div>
                    <div>
                        <Btn
                            icon={<SwapOutlined/>}
                            title={"切换类型"}
                            onClick={()=>setCurrent(0)}
                            type={"link"}
                        />
                    </div>
                </div>
                <div className="pipeline-template-title">流水线模板</div>
                <div className="pipeline-template-content">
                    {
                        templateType === 0 &&
                        <div className={`pipeline-template-li pipeline-template-li-step2`}>
                            <div className="li-self">自定义配置</div>
                        </div>
                    }
                    {
                        templateType > 0 &&
                        <PipelineAddMould
                            item={templateLis[templateType-1]}
                        />
                    }
                    <Btn
                        icon={<SwapOutlined/>}
                        title={"切换模板"}
                        onClick={()=>setCurrent(1)}
                        type={"link"}
                    />
                </div>
            </div>
            <PipelineAddInfo
                {...props}
                setCurrent={setCurrent}
                templateLis={templateLis}
                templateType={templateType}
                pipelineType={type}
                set={false}
            />
        </>
    )

    const steps = [
        {
            title: "选择类型",
            content: renderType
        },
        {
            title: "选择模板",
            content: renderTemplate
        },
        {
            title: "完善信息",
            content: renderInfo
        }
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
        </div>
    </div>

}

export default PipelineAdd
