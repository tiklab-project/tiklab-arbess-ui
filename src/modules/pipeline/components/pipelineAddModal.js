import React,{useState} from "react";
import {Form,Modal,Button,Steps,message} from "antd";
import "./pipelineAddModal.scss";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import PipelineAddModalType from "./pipelineAddModalType";
import PipelineName from "../../projectSet/reDel/pipelineName";

const {Step} = Steps

const PipelineAddModal = props =>{

    const {addPipelineVisible,setAddPipelineVisible,createPipeline,pipelineList} = props

    const [current,setCurrent] = useState(0)
    const [templateType,setTemplateType] = useState(1)
    const [powerType,setPowerType] = useState(1)

    const [form] = Form.useForm()

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
        <div className="steps-action">
            {current === 0 && (
                <Button onClick={()=>setAddPipelineVisible(false)}>
                    取消
                </Button>
            )}
            {current > 0 && (
                <Button  onClick={()=>setCurrent(current - 1)}>
                    上一步
                </Button>
            )}
            {current < steps.length - 1 && (
                <Button type="primary" onClick={()=>setCurrent(current + 1)}>
                    下一步
                </Button>
            )}
            {current === steps.length - 1 && (
                <Button type="primary"
                        onClick={() => {
                            form
                                .validateFields()
                                .then((values) => {
                                    onOk(values)
                                })
                        }}
                >
                    确认
                </Button>
            )}
        </div>
    )

    return(
        <Modal
            visible={addPipelineVisible}
            closable={false}
            onCancel={()=>setAddPipelineVisible(false)}
            okText="确认"
            cancelText="取消"
            width={800}
            footer={modalFooter}
        >
            <div className="pipelineAddModal">
                <ModalTitle
                    setVisible={setAddPipelineVisible}
                    title={"创建流水线"}
                />
                <div className="steps-top">
                    <Steps current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                </div>
                <div className="steps-content">{steps[current].content}</div>
            </div>
        </Modal>
    )
}

export default PipelineAddModal