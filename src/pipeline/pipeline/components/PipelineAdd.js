import React,{useState} from "react";
import {Spin, Steps, Row, Col} from "antd";
import {getUser} from "thoughtware-core-ui";
import Btn from "../../../common/component/btn/Btn";
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import PipelineAddMould from "./PipelineAddMould";
import PipelineAddInfo from "./PipelineAddInfo";
import pipelineStore from "../store/PipelineStore";
import "./pipelineAdd.scss";

/**
 * 添加流水线
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineAdd = props =>{

    const {createPipeline} = pipelineStore
    const user = getUser()

    // 添加状态
    const [isLoading,setIsLoading] = useState(false)

    // 当前步骤
    const [current,setCurrent] = useState(0)

    // 流水线模板 -- 下标
    const [templateType,setTemplateType] = useState(1)

    // 基本信息
    const [baseInfo,setBaseInfo] = useState({
        power:1,
        type:2,
        userList:[{
            ...user,
            id: user.userId,
            adminRole: true
        }]
    })

    /**
     * 创建流水线
     */
    const createPip = () => {
        const {name,type,power,userList,group,env} = baseInfo
        const params = {
            name:name,
            type:type,
            power:power,
            env:{id:env},
            group:{id:group},
            userList:userList && userList.map(item=>({id:item.id,adminRole:item.adminRole})),
            template:templateType,
        }
        setIsLoading(true)
        createPipeline(params).then(res => {
            if (res.code===0) {
                setIsLoading(false)
                props.history.push(`/pipeline/${res.data}/config`)
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
               {/*<div className="template-base">*/}
               {/*    <span>流水线类型：</span>*/}
               {/*    <span>{baseInfo.type===1?"多任务":"多阶段"}</span>*/}
               {/*</div>*/}
               <div className="template-base">
                   <span>流水线权限：</span>
                   <span>{baseInfo.power===1?"全局":"私有"}</span>
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
            set={false}
            setCurrent={setCurrent}
            baseInfo={baseInfo}
            setBaseInfo={setBaseInfo}
            pipelineStore={pipelineStore}
        />
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

    return (
        <Row className="pipeline-add">
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "18", offset: "3" }}
                xl={{ span: "14", offset: "5" }}
                xxl={{ span: "12", offset: "6" }}
            >
               <Spin spinning={isLoading}>
                   <div className="mf-home-limited">
                       <BreadCrumb firstItem={'新建流水线'} onClick={()=>props.history.push("/pipeline")}/>
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
                       {
                           current===1 &&
                           <div className="steps-bottom">
                               <Btn
                                   onClick={()=>props.history.push("/pipeline")}
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
                           </div>
                       }
                   </div>
               </Spin>
            </Col>
        </Row>
    )

}

export default PipelineAdd
