import React,{useEffect,useState} from "react";
import {Form,Select,Input} from "antd";
import {Validation} from "../../../../common/utils/Client";
import Modals from "../../../../common/component/modal/Modal";

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

const ToolModal = props =>{

    const {visible,setVisible,enviData,updatePipelineScm,formValue,findAllScm} = props

    const [form] = Form.useForm()
    const [scmType,setScmType] = useState(1)

    useEffect(()=>{
        if(visible){
            // 表单初始化
            if(formValue){
                form.setFieldsValue(formValue)
                return
            }
            form.resetFields()
        }
    },[visible])

    /**
     * 切换环境配置类型
     * @param value
     */
    const changScmType = value => {
        setScmType(value)
    }

    /**
     * 环境标题
     * @param ScmType
     * @returns {string}
     */
    const scmTitle = ScmType => {
        switch (ScmType) {
            case 1:  return "Git"
            case 5:  return "SVN"
            case 21: return "Maven"
            case 22: return "Node"
        }
    }

    /**
     * 环境配置是否已经存在
     * @param scmType
     * @returns {*}
     */
    const isGray = scmType => {
        return enviData.some(item=>item.scmType===scmType)
    }

    /**
     * 更新或添加确定
     */
    const onOk = () =>{
        form.validateFields().then((values) => {
            const params = {
                scmId:formValue && formValue.scmId,
                ...values
            }
            updatePipelineScm(params).then(res=>{
                if(res.code===0){
                    findAllScm()
                }
            })
            setVisible(false)
        })
    }

    return(
        <Modals
            visible={visible}
            onCancel={()=>setVisible(false)}
            onOk={onOk}
            title={formValue?"修改":"添加"}
        >
            <div className="resources-modal">
                <Form form={form} layout="vertical" name="userForm" autoComplete="off">
                    <Form.Item name="scmType" label="环境配置类型" rules={[{required:true,message:`请选择环境配置类型`}]}>
                        <Select onChange={changScmType} disabled={formValue && formValue} placeholder={'环境配置类型'}>
                            {
                                lis.map(item=>(
                                    <Select.Option value={item.scmType} key={item.scmType} disabled={isGray(item.scmType)}>
                                        {scmTitle(item.scmType)}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="名称"
                        name="scmName"
                        rules={[
                            {required:true,message:`请输入${scmTitle(scmType)}名称`},
                            Validation(scmTitle(scmType)+"名称")
                        ]}
                    ><Input placeholder={'名称'}/>
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="scmAddress"
                        rules={[
                            {required:true,message:`请输入${scmTitle(scmType)}地址`},
                            Validation(scmTitle(scmType)+"地址")
                        ]}
                    ><Input placeholder={'地址'}/>
                    </Form.Item>
                </Form>
            </div>
        </Modals>
    )
}

export default ToolModal
