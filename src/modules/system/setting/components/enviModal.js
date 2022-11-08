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

    const {visible,setVisible,enviData,updatePipelineScm,formValue,fresh,setFresh} = props

    const [form] = Form.useForm()
    const [scmType,setScmType] = useState(1)
    const [height,setHeight] = useState(0)

    useEffect(()=>{
        autoHeight()
    },[height])

    const autoHeight = () =>{
        let winHeight=0
        if (window.innerHeight)
            winHeight = window.innerHeight-120
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight-120
        if (document.documentElement && document.documentElement.clientHeight)
            winHeight = document.documentElement.clientHeight-120
        setHeight(winHeight)
        window.onresize=autoHeight
    }

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

    const scmTitle = ScmType => {
        switch (ScmType) {
            case 1:  return "Git"
            case 5:  return "SVN"
            case 21: return "maven"
            case 22: return "node"
        }
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
            style={{height:height,top:60}}
            className="mf"
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
            <div style={{maxHeight:"calc(100% - 120px)",overflow:"auto"}}>
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

            </div>

        </Modal>
    )
}

export default EnviModal