import React,{useEffect} from "react";
import {Form, Input} from "antd";
import Modals from "../../../../common/component/modal/Modal";
import {Validation} from "../../../../common/utils/Client";
import envStore from "../store/EnvStore";

/**
 * 环境管理弹出框，添加，更新
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const EnvModal = props =>{

    const {visible,setVisible,formValue,findEnv} = props

    const {createEnv,updateEnv} = envStore

    const [form] = Form.useForm()

    useEffect(()=>{
        if(visible){
            //  表单初始化
            if(formValue){
                form.setFieldsValue(formValue)
                return
            }
            form.resetFields()
        }
    },[visible])

    /**
     * 认证添加或更新确定
     */
    const onOk = () =>{
        form.validateFields().then((values) => {
            if(formValue){
                const param = {
                    id:formValue.id,
                    ...values,
                }
                updateEnv(param).then(r=>{
                    if(r.code===0){
                        findEnv()
                    }
                })
            }else {
                createEnv(values).then(r=>{
                    if(r.code===0){
                        findEnv()
                    }
                })
            }
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
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Form.Item
                        name="envName"
                        label="名称"
                        rules={[{required:true,message:`名称不能空`},Validation("名称")]}
                    ><Input/>
                    </Form.Item>
                    <Form.Item
                        name="detail"
                        label="说明"
                    ><Input.TextArea autoSize={{minRows: 2, maxRows: 4}}/>
                    </Form.Item>
                </Form>
            </div>
        </Modals>
    )
}

export default EnvModal
