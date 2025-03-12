/**
 * @Description: 工具添加编辑弹出框
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useEffect,useState} from "react";
import {Form, Select, Input, Space} from "antd";
import {Validation} from "../../../../common/utils/Client";
import Modals from "../../../../common/component/modal/Modal";
import {TaskIcon, taskTitle} from "../../../../pipeline/design/processDesign/gui/component/TaskTitleIcon";
import toolStore from "../store/ToolStore";

const scmList = ["jdk","git","svn","maven","nodejs"]

const ToolModal = props =>{

    const {visible,setVisible,formValue,findAllScm,externalScmType='jdk',isConfig} = props;

    const {updatePipelineScm} = toolStore;

    const [form] = Form.useForm()
    const [scmType,setScmType] = useState("jdk");

    useEffect(()=>{
        if(visible){
            // 表单初始化
            if(formValue){
                form.setFieldsValue(formValue)
                setScmType(formValue.scmType)
                return
            }
            form.setFieldsValue({scmType:externalScmType})
            setScmType(externalScmType)
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
     * 更新或添加确定
     */
    const onOk = () =>{
        form.validateFields().then((values) => {
            const params = {
                scmId: formValue && formValue.scmId,
                ...values
            }
            updatePipelineScm(params).then(res=>{
                if(res.code===0){
                    findAllScm()
                }
            })
            onCancel()
        })
    }

    /**
     * 关闭弹出框
     */
    const onCancel = () => {
        form.resetFields()
        setVisible(false)
    }

    return(
        <Modals
            visible={visible}
            onCancel={onCancel}
            onOk={onOk}
            title={formValue?"修改":"添加"}
        >
            <div className="resources-modal">
                <Form form={form} layout="vertical" name="userForm" autoComplete="off">
                    <Form.Item name="scmType" label="环境配置类型" rules={[{required:true,message:`请选择环境配置类型`}]}>
                        <Select onChange={changScmType} disabled={formValue || isConfig} placeholder={'环境配置类型'}>
                            {
                                scmList.map(item=>(
                                    <Select.Option value={item} key={item}>
                                        <Space>
                                            <TaskIcon type={item}/>
                                            {taskTitle(item)}
                                        </Space>
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="名称"
                        name="scmName"
                        rules={[
                            {required:true,message:`请输入${taskTitle(scmType)}名称`},
                            Validation(taskTitle(scmType)+"名称")
                        ]}
                    ><Input placeholder={'名称'}/>
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="scmAddress"
                        rules={[
                            {required:true,message:`请输入${taskTitle(scmType)}地址`},
                            Validation(taskTitle(scmType)+"地址")
                        ]}
                    ><Input placeholder={'地址'}/>
                    </Form.Item>
                </Form>
            </div>
        </Modals>
    )
}

export default ToolModal
