import React,{useEffect,useRef} from "react";
import {Form,Input,message,Modal,Select} from "antd";
import moment from "../../../../common/moment/moment";

const {Option} = Select

const MatFlowAddModal = props =>{

    const {addMatFlowVisible,setAddMatFlowVisible,matFlowList,userId,createMatFlow} = props
    const inputRef = useRef()
    const [form] = Form.useForm()

    useEffect(()=>{
        if(addMatFlowVisible){
            inputRef.current.focus()
            form.resetFields()
        }
    },[addMatFlowVisible])
    
    const onOk = () => {
        form.validateFields().then((value)=>{
            const params={
                user:{id:userId},
                matflowName:value.matFlowName,
                matflowType:1,
                matflowCreateTime:moment.moment
            }
            createMatFlow(params).then(res=>{
                if(res.code===0 && res.data){
                    props.history.push(`/index/config/${value.matFlowName}`)
                }else{
                    message.error({content:"添加失败", className:"message"})
                }
            })
        })
    }

    return(
        <Modal
            visible={addMatFlowVisible}
            closable={false}
            forceRender
            onCancel={()=>setAddMatFlowVisible(false)}
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
                            initialValues={{matflowType:1}}
                        >
                            <Form.Item
                                label="流水线名称"
                                name="matFlowName"
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
                                            if(matFlowList){
                                                nameArray = matFlowList && matFlowList.map(item=>item.matFlowName);
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
                            <Form.Item name="matflowType" label="流水线类型">
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


export default MatFlowAddModal
