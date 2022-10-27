import React,{useEffect} from "react";
import {Modal,Form,Input,Select,Checkbox,Row,Col} from "antd";
import ModalTitle from "../../../common/modalTitle/modalTitle";

const {Option} = Select

const UpdateProof = props =>{

    const {visible,setVisible,formValue,updateProof,setFresh,fresh,displayPart,pipelineList,
        pipelineId,isShowPipeline,setIsShowPipeline} = props

    const [form] = Form.useForm()

    useEffect(()=>{
        if(visible){
            form.setFieldsValue(formValue)
        }
    },[visible])

    const onOk = () =>  {
        form.validateFields().then((values) => {
            let proofList
            if(pipelineId){
                proofList = [`${pipelineId}`]
            } else {
                proofList = values.proofList
            }
            const params = {
                proofId:formValue.proofId,
                proofScope:values.proofScope,
                proofType:values.proofType,
                proofName:values.proofName,
                proofUsername:values.proofUsername,
                proofPassword:values.proofPassword,
                proofDescribe:values.proofDescribe,
                type:values.type,
                proofList:proofList
            }
            updateProof(params).then(()=>{
                setFresh(!fresh)
            }).catch(error=>{
                console.log(error)
            })
            setVisible(false)
        })
    }

    const opt = value => {
        setIsShowPipeline(value)
    }

    return(
        <Modal
            visible={visible}
            closable={false}
            okText="确认"
            cancelText="取消"
            onCancel={()=>setVisible(false)}
            onOk={onOk}
            bodyStyle={{maxHeight:750,"overflow": "auto"}}
        >
            <ModalTitle
                setVisible={setVisible}
                title={"修改凭证"}
            />
            <div style={{maxHeight:650,overflow:"auto"}}>
                <Form
                    form={form}
                    layout="vertical"
                    name="userForm"
                    autoComplete="off"
                >
                    <Form.Item label="凭证级别" name="type">
                        <Select onChange={opt}>
                            <Option value={1}>全局凭证</Option>
                            <Option value={2}>项目凭证</Option>
                        </Select>
                    </Form.Item>
                    {
                        isShowPipeline === 2 && pipelineList &&
                            <Form.Item
                                label="项目作用域"
                                name="proofList"
                                rules={[{required:true,message:"请选择项目作用域"}]}
                            >
                                <Checkbox.Group>
                                    {
                                        pipelineList && pipelineList.map(item=>{
                                            return <Row key={item.pipelineId}>
                                                        <Col>
                                                            <Checkbox value={item.pipelineId}>
                                                                {item.pipelineName}
                                                            </Checkbox>
                                                        </Col>
                                                    </Row>
                                        })
                                    }
                                </Checkbox.Group>
                            </Form.Item>
                    }
                    <Form.Item label="凭证作用域" name="proofScope">
                        {
                            displayPart ?
                                <Select disabled={displayPart}>
                                    <Option value={2}>Gitee凭证</Option>
                                    <Option value={3}>Github凭证</Option>
                                </Select>
                                :
                                <Select>
                                    <Option value={1}>源码凭证</Option>
                                    <Option value={5}>部署凭证</Option>
                                </Select>
                        }
                    </Form.Item>
                    <Form.Item
                        label="凭证名称"
                        name="proofName"
                        rules={[
                            {required:true, message:"请输入凭证名称"},
                            {type:"string", max: 10, message:"凭证名称过长"}
                        ]}
                    >
                        <Input placeholder="名称"/>
                    </Form.Item>
                    <Form.Item label="凭证类型" name="proofType" >
                        <Select placeholder="选择类型" disabled={displayPart}>
                            <Option value="SSH">SSH</Option>
                            <Option value="password">password</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.proofType !== currentValues.proofType}>
                        {({ getFieldValue })=>
                            getFieldValue("proofType") === "password" ? (
                                    <>
                                        <Form.Item label="用户名" name="proofUsername" >
                                            <Input disabled={displayPart}/>
                                        </Form.Item>
                                        <Form.Item label="密码" name="proofPassword">
                                            <Input.Password disabled={displayPart}/>
                                        </Form.Item>
                                        <Form.Item name="proofDescribe" label="描述">
                                            <Input.TextArea />
                                        </Form.Item>
                                    </>
                                ):
                                <>
                                    <Form.Item name="proofPassword" label="私钥">
                                        <Input.TextArea  disabled={displayPart}/>
                                    </Form.Item>
                                    <Form.Item name="proofDescribe" label="描述">
                                        <Input.TextArea />
                                    </Form.Item>
                                </>
                        }
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default UpdateProof