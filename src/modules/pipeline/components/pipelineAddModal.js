import React,{useEffect,useRef,useState} from "react";
import {Form,Input,message,Modal,Select} from "antd";
import moment from "../../../common/moment/moment";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import PipelineAddTemplate from "./pipelineAddTemplate";

const {Option} = Select

const PipelineAddModal = props =>{

    const {addPipelineVisible,setAddPipelineVisible,pipelineList,userId,createPipeline} = props
    const inputRef = useRef()
    const [form] = Form.useForm()
    const [templateType,setTemplateType] = useState(1)

    useEffect(()=>{
        if(addPipelineVisible){
            inputRef.current.focus()
            form.resetFields()
        }
    },[addPipelineVisible])
    
    const onOk = value => {
        const params={
            user:{id:userId},
            pipelineName:value.pipelineName,
            pipelineType:1,
            pipelineCreateTime:moment.moment
        }
        createPipeline(params).then(res=>{
            if(res.code===0 && res.data){
                props.history.push(`/index/task/${value.pipelineName}/config`)
            }else{
                message.error({content:"添加失败", className:"message"})
            }
        })
    }

    return(
        <Modal
            visible={addPipelineVisible}
            closable={false}
            onCancel={()=>setAddPipelineVisible(false)}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields()
                        onOk(values)
                    })
            }}
            okText="确认"
            cancelText="取消"
        >
            <div className="new">
                <ModalTitle
                    setVisible={setAddPipelineVisible}
                    title={"创建流水线"}
                />
                <Form
                    id="form"
                    name="basic"
                    autoComplete="off"
                    form={form}
                    initialValues={{pipelineType:1}}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 24 }}
                    layout={"vertical"}
                >
                    <Form.Item
                        label="流水线名称"
                        name="pipelineName"
                        rules={[
                            {required:true,message:""},
                            {
                                pattern: /^[\s\u4e00-\u9fa5a-zA-Z0-9_-]{0,}$/,
                                message: "流水线名称不能包含非法字符，如&,%，&，#……等",
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value) {
                                        return Promise.reject("请输入名称")
                                    }
                                    let nameArray = []
                                    if(pipelineList){
                                        nameArray = pipelineList && pipelineList.map(item=>item.pipelineName);
                                    }
                                    if (nameArray.includes(value)) {
                                        return Promise.reject("名称已经存在");
                                    }
                                    return Promise.resolve()
                                },
                            }),
                        ]}
                    >
                        <Input ref={inputRef}/>
                    </Form.Item>
                    {/*<Form.Item name="pipelineType" label="流水线类型">*/}
                    {/*    <Select>*/}
                    {/*        <Option value={1}>流水线</Option>*/}
                    {/*    </Select>*/}
                    {/*</Form.Item>*/}
                </Form>
                <PipelineAddTemplate
                    templateType={templateType}
                    setTemplateType={setTemplateType}
                />
            </div>
        </Modal>
    )
}


export default PipelineAddModal
