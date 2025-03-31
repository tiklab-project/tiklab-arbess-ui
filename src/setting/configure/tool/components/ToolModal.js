/**
 * @Description: 工具添加编辑弹出框
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useEffect,useState} from "react";
import {Form, Select, Input} from "antd";
import {Validation} from "../../../../common/utils/Client";
import Modals from "../../../../common/component/modal/Modal";
import toolStore from "../store/ToolStore";
import {toolGit, toolJdk, toolMaven, toolNode, toolSvn} from "../../../../common/utils/Constant";

export const scmTypeName = {
    [toolJdk]: 'JDK',
    [toolGit]: 'Git',
    [toolSvn]: 'Svn',
    [toolMaven]: 'Maven',
    [toolNode]: 'Node',
};

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
                    onCancel()
                }
            })
        })
    }

    /**
     * 关闭弹出框
     */
    const onCancel = () => {
        form.resetFields()
        setVisible(false)
    }

    const scmList = [toolJdk,toolGit,toolSvn,toolMaven,toolNode];

    const addressPlaceholder = {
        [toolJdk]: '请输入JDK安装路径，如 D:\\jdk-16.0.2\\bin',
        [toolGit]: '请输入Git安装路径，如 D:\\Git\\bin',
        [toolSvn]: '请输入Svn安装路径，如 D:\\SVN-1.14\\bin',
        [toolMaven]: '请输入Maven安装路径，如 D:\\apache-maven-3.9.9\\bin',
        [toolNode]: '请输入Node安装路径，如 D:\\Node-v18.20.7\\bin',
    };

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
                                        {scmTypeName[item]}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={`名称`}
                        name="scmName"
                        rules={[
                            {required:true,message:`请输入名称`},
                            Validation(`名称`)
                        ]}
                    >
                        <Input placeholder={`名称`}/>
                    </Form.Item>
                    <Form.Item
                        label={`${scmTypeName[scmType]}安装路径`}
                        name="scmAddress"
                        rules={[
                            {required:true,message:`请输入${scmTypeName[scmType]}安装路径`},
                            Validation(`${scmTypeName[scmType]}安装路径`)
                        ]}
                    >
                        <Input placeholder={addressPlaceholder[scmType]}/>
                    </Form.Item>
                </Form>
            </div>
        </Modals>
    )
}

export default ToolModal
