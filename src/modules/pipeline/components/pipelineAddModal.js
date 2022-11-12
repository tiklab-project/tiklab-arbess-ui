import React,{useEffect,useState} from "react";
import {Form,Modal,Steps,message} from "antd";
import "./pipelineAddModal.scss";
import ModalTitle from "../../common/modalTitle/modalTitle";
import Btn from "../../common/btn/btn";
import PipelineAddModalType from "./pipelineAddModalType";
import PipelineName from "../../projectSet/reDel/pipelineName";
import {autoHeight} from "../../common/client/client";

const {Step} = Steps

const PipelineAddModal = props =>{

    const {addPipelineVisible,setAddPipelineVisible,createPipeline,pipelineList} = props

    const [current,setCurrent] = useState(0)
    const [templateType,setTemplateType] = useState(1)
    const [powerType,setPowerType] = useState(1)
    const [height,setHeight] = useState(0)

    const [form] = Form.useForm()

    useEffect(()=>{
        setHeight(autoHeight())
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    const onOk = value => {
        const params={
            pipelineType:templateType,
            pipelineName:value.pipelineName,
            pipelinePower:powerType,
        }
        createPipeline(params).then(res=>{
            if(res.code===0 && res.data){
                props.history.push(`/index/task/${res.data}/config`)
            }else{
                message.error({content:"添加失败", className:"message"})
            }
            form.resetFields()
        })
    }

    const steps = [
        {
            title: "选择模板",
            content: <PipelineAddModalType
                        templateType={templateType}
                        setTemplateType={setTemplateType}
                     />
        },
        {
            title: "完善信息",
            content: <PipelineName
                        form={form}
                        pipelineList={pipelineList}
                        layout={"vertical"}
                        powerType={powerType}
                        setPowerType={setPowerType}
                    />
        }
    ]

    // 表单底部内容
    const modalFooter = (
        <>
            {current === 0 && (
                <Btn
                    onClick={()=>setAddPipelineVisible(false)}
                    title={"取消"}
                    isMar={true}
                />
            )}
            {current > 0 && (
                <Btn
                    onClick={()=>setCurrent(current - 1)}
                    title={"上一步"}
                    isMar={true}
                />
            )}
            {current < steps.length - 1 && (
                <Btn
                    type={"primary"}
                    onClick={()=>setCurrent(current + 1)}
                    title={"下一步"}
                />
            )}
            {current === steps.length - 1 && (
                <Btn
                    type={"primary"}
                    onClick={() => {
                        form
                            .validateFields()
                            .then((values) => {
                                onOk(values)
                            })
                    }}
                    title={"确认"}
                />
            )}
        </>
    )

    return(
        <Modal
            visible={addPipelineVisible}
            closable={false}
            onCancel={()=>setAddPipelineVisible(false)}
            footer={modalFooter}
            width={800}
            style={{height:height,top:60}}
            className="mf"
        >
            <div className="pipelineAddModal">
                <ModalTitle
                    setVisible={setAddPipelineVisible}
                    title={"创建流水线"}
                />
                <div className="steps-content"
                >
                    <div className="steps-top">
                        <Steps current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                    </div>
                    {steps[current].content}
                </div>
            </div>
        </Modal>
    )
}

export default PipelineAddModal