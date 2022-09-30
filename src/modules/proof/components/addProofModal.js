import React,{useState} from "react";
import "./addProofModal.scss";
import moment from "../../../common/moment/moment";
import {Modal,Form,Input,Select,Checkbox,Row,Col} from "antd";

const {Option} = Select;

const AddProofModal = props =>{

    const {visible,setVisible,createProof,userId,fresh,setFresh,isAuthority,type,pipelineList,pipelineId} = props

    const [form] = Form.useForm()
    const [isShowPipeline,setIsShowPipeline] = useState(1)

    const onOk = values =>{
        let proofScope,proofList;
        if(pipelineList){
            proofList = values.proofList
        }else {
            proofList = [`${pipelineId}`]
        }
        if(isAuthority){
            proofScope = values.proofScope
        }else {
            proofScope = type
        }
        const params = {
            user:{id:userId},
            type:values.type,
            proofScope:proofScope,
            proofType:values.proofType,
            proofName:values.proofName,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe,
            proofCreateTime:moment.moment,
            proofList:proofList
        }
        createProof(params).then(()=>{
            setFresh(!fresh)
        }).catch(error=>{
            console.log(error)
        })
        setVisible(false)
    }

    const opt = value => {
        setIsShowPipeline(value)
    }

    return (
        <Modal
            visible={visible}
            closable={false}
            okText="确认"
            cancelText="取消"
            onCancel={()=>setVisible(false)}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields()
                        onOk(values)
                    })
            }}
            bodyStyle={{maxHeight:700,"overflow":"auto"}}
        >
            <Form form={form}
                  layout="vertical"
                  name="userForm"
                  autoComplete = "off"
                  initialValues={{proofType:"password",type:1,proofScope:1}}
            >
                <Form.Item label="凭证级别" name="type">
                    <Select onChange={opt}>
                        <Option value={1}>全局凭证</Option>
                        <Option value={2}>项目凭证</Option>
                    </Select>
                </Form.Item>
                {
                    pipelineList && isShowPipeline === 2 ?
                    <Form.Item
                        label="项目作用域"
                        name="proofList"
                        className="proofModal-showPipeline"
                        rules={[{required:true,message:"请选择项目作用域"}]}
                    >
                        <Checkbox.Group>
                        {
                            pipelineList && pipelineList.map(item=>{
                                return  <Row key={item.pipelineId}>
                                            <Col>
                                                <Checkbox value={item.pipelineId}>
                                                    {item.pipelineName}
                                                </Checkbox>
                                            </Col>
                                        </Row>
                            })
                        }
                        </Checkbox.Group>
                    </Form.Item> :null
                }
                {
                    isAuthority ?
                    <Form.Item label="凭证作用域" name="proofScope">
                        <Select>
                            <Option value={1}>源码凭证</Option>
                            <Option value={5}>部署凭证</Option>
                        </Select>
                    </Form.Item>
                    :null
                }
                <Form.Item
                    label="凭证名称"
                    name="proofName"
                    rules={[{required:true, message:"请输入凭证名称"}]}
                >
                    <Input placeholder="名称"/>
                </Form.Item>
                <Form.Item label="凭证类型" name="proofType" >
                    <Select placeholder="选择类型" >
                        <Option value="SSH">SSH</Option>
                        <Option value="password">password</Option>
                    </Select>
                </Form.Item>
                <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.proofType !== currentValues.proofType}>
                    {({ getFieldValue })=>
                        getFieldValue("proofType") === "password" ? (
                            <>
                                <Form.Item label="用户名" name="proofUsername">
                                    <Input placeholder="账号"/>
                                </Form.Item>
                                <Form.Item label="密码" name="proofPassword">
                                    <Input.Password  placeholder="密码"/>
                                </Form.Item>
                            </>
                            ):
                            <Form.Item name="proofPassword" label="私钥">
                                <Input.TextArea  placeholder="私钥"/>
                            </Form.Item>
                    }
                </Form.Item>
                <Form.Item name="proofDescribe" label="描述">
                    <Input.TextArea  placeholder="备注"/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddProofModal