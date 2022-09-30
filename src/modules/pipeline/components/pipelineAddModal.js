import React,{useEffect,useRef} from "react";
import {Form,Input,message,Modal,Select} from "antd";
import moment from "../../../common/moment/moment";

const {Option} = Select

const PipelineAddModal = props =>{

    const {addPipelineVisible,setAddPipelineVisible,pipelineList,userId,createPipeline} = props
    const inputRef = useRef()
    const [form] = Form.useForm()

    useEffect(()=>{
        if(addPipelineVisible){
            inputRef.current.focus()
            form.resetFields()
        }
    },[addPipelineVisible])
    
    const onOk = () => {
        form.validateFields().then((value)=>{
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
        })
    }

    return(
        <Modal
            visible={addPipelineVisible}
            closable={false}
            forceRender
            onCancel={()=>setAddPipelineVisible(false)}
            onOk={onOk}
            okText="确认"
            cancelText="取消"
        >
            <div className="new">
                <div className="new-lump">
                    <div className="new-lump-form">
                        <Form
                            id="form"
                            name="basic"
                            autoComplete="off"
                            form={form}
                            initialValues={{pipelineType:1}}
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
                            <Form.Item name="pipelineType" label="流水线类型">
                                <Select>
                                    <Option value={1}>流水线</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </Modal>
    )
}


export default PipelineAddModal
