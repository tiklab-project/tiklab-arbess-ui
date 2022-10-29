import React,{useEffect,useState} from "react";
import {Modal,Form,Select,Input,message} from "antd";
import ModalTitle from "../../../../common/modalTitle/modalTitle";

const lis = [
    {
        scmId:"1",
        scmType:1,
    },
    {
        scmId:"5",
        scmType:5,
    },
    {
        scmId:"22",
        scmType:22,
    },
    {
        scmId:"21",
        scmType:21,
    },
]

const EnviModal = props =>{

    const {visible,setVisible,enviData,scmTitle,updatePipelineScm,formValue,fresh,setFresh} = props

    const [form] = Form.useForm()
    const [scmType,setScmType] = useState(1)

    useEffect(()=>{
        if(visible){
            if(formValue){
                form.setFieldsValue(formValue)
            }else form.resetFields()
        }
    },[visible])

    const opt = value => {
        setScmType(value)
    }

    // 环境配置是否已经存在
    const isGray = scmType => {
        return enviData.some(item=>item.scmType===scmType)
    }

    const onOk = values =>{
        const params = {
            scmId:formValue && formValue.scmId,
            scmType:values.scmType,
            scmName:values.scmName,
            scmAddress:values.scmAddress,
        }
        updatePipelineScm(params).then(res=>{
            if(res.code===0){
                message.success({content:"保存成功",className:"message"})
                setFresh(!fresh)
            }
        }).catch(error=>{
            console.log(error)
        })
        setVisible(false)
    }

    return(
        <Modal
            visible={visible}
            onCancel={()=>setVisible(false)}
            closable={false}
            okText="确认"
            cancelText="取消"
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields()
                        onOk(values)
                    })
            }}
        >
            <ModalTitle
                setVisible={setVisible}
                title={formValue===""? "添加环境配置":"修改环境配置"}
            />
            <Form
                form={form}
                layout="vertical"
                name="userForm"
                autoComplete = "off"
            >
                <Form.Item name="scmType" label="环境配置类型"
                           rules={[{required:true,message:`请选择环境配置类型`}]}
                >
                    <Select onChange={opt}>
                        {
                            lis.map(item=>{
                                return <Select.Option value={item.scmType} key={item.scmType}  disabled={isGray(item.scmType)}>
                                    {scmTitle(item.scmType)}
                                </Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="名称" name="scmName"
                           rules={[{required:true,message:`请输入${scmTitle(scmType)}名称`}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item label="地址" name="scmAddress"
                           rules={[{required:true,message:`请输入${scmTitle(scmType)}地址`}]}
                >
                    <Input/>
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default EnviModal