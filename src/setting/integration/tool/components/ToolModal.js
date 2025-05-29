/**
 * @Description: 工具添加编辑弹出框
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React, {useEffect, useState} from "react";
import {Form, Input, Select, Upload} from "antd";
import {Validation} from "../../../../common/utils/Client";
import Modals from "../../../../common/component/modal/Modal";
import toolStore from "../store/ToolStore";
import {scmList, scmPlaceholder, scmTitle} from "./ToolCommon";
import {getUser} from "tiklab-core-ui";
import Button from "../../../../common/component/button/Button";

const ToolModal = props =>{

    const {visible,setVisible,formValue,findAllScm,externalScmType='jdk',isConfig} = props;

    const {updatePipelineScm} = toolStore;

    const user = getUser();
    const [form] = Form.useForm()
    //环境配置类型
    const [scmType,setScmType] = useState("jdk");
    //本地上传二进制包
    const [fileList, setFileList] = useState([]);

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
        setScmType(value);
    }

    /**
     * 更改添加方式
     */
    const changeAddType = (value) => {
        if(value==='local'){
            form.setFieldsValue({
                scmAddress: null
            })
        }
        if(value==='pkg'){
            form.setFieldsValue({
                scmAddress: null,
                pkg: []
            })
        }
        setFileList([])
    }

    /**
     * 更新或添加确定
     */
    const onOk = () =>{
        form.validateFields().then((values) => {
            const {pkg,...rest} = values;
            updatePipelineScm({
                scmId: formValue && formValue.scmId,
                ...rest
            }).then(res=>{
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
        form.resetFields();
        setVisible(false);
        setFileList([]);
    }

    const uploadUrl = base_url === '/' ? window.location.origin : base_url;

    return(
        <Modals
            visible={visible}
            onCancel={onCancel}
            onOk={onOk}
            title={formValue?"修改":"添加"}
        >
            <div className="resources-modal">
                <Form
                    form={form}
                    layout="vertical"
                    name="userForm"
                    autoComplete="off"
                    initialValues={{addType:'local'}}
                >
                    <Form.Item name="scmType" label="环境配置类型" rules={[{required:true,message:`请选择环境配置类型`}]}>
                        <Select onChange={changScmType} disabled={formValue || isConfig} placeholder={'环境配置类型'}>
                            {
                                scmList.map(item=>(
                                    <Select.Option value={item} key={item}>
                                        { scmTitle[item] }
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
                        label={'安装方式'}
                        name={'addType'}
                    >
                        <Select onChange={changeAddType}>
                            <Select.Option value={'local'}>本地安装</Select.Option>
                            <Select.Option value={'pkg'}>安装包</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.addType !== currentValues.addType}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('addType') === 'pkg' ? (
                                <>
                                    <Form.Item
                                        label={"二进制包"}
                                        name="pkg"
                                        valuePropName="fileList"
                                        getValueFromEvent={e => Array.isArray(e) ? e : e?.fileList}
                                        rules={[
                                            { required: true, message: `请上传二进制包` },
                                            {
                                                validator: (_, files) => {
                                                    // 检查是否有上传失败的文件
                                                    if (files?.some(f => f.status === 'error')) {
                                                        return Promise.reject('存在上传失败的文件');
                                                    }
                                                    // // 检查文件格式
                                                    // const invalidFiles = files?.filter(file => !file.name?.endsWith('.tar.gz'));
                                                    // if (invalidFiles?.length > 0) {
                                                    //     return Promise.reject('只能上传 .tar.gz 格式的文件');
                                                    // }
                                                    return Promise.resolve();
                                                }
                                            }
                                        ]}
                                    >
                                        <Upload
                                            action={uploadUrl + '/scm/file/upload'}
                                            name={"uploadFile"}
                                            headers={{
                                                ticket: user.ticket,
                                                tenant: user.tenant,
                                            }}
                                            // accept={'.gz'}
                                            maxCount={1}
                                            fileList={fileList}
                                            onChange={({ fileList }) => {
                                                setFileList(fileList);
                                                if(fileList.length > 0 && fileList[0]?.status === 'done'){
                                                    const response = fileList[0].response
                                                    form.setFieldsValue({
                                                        scmAddress: response?.data
                                                    })
                                                }
                                            }}
                                            // beforeUpload={(file) => {
                                            //     return file.name.endsWith('.tar.gz');
                                            // }}
                                        >
                                            {fileList.length < 1 && <Button>上传</Button>}
                                        </Upload>
                                    </Form.Item>
                                    {
                                        fileList.length > 0 && fileList[0]?.response?.code === 0 &&
                                        <Form.Item
                                            label={`${scmTitle[scmType]}安装路径`}
                                            name="scmAddress"
                                            rules={[
                                                {required:true,message:`请输入${scmTitle[scmType]}安装路径`},
                                                Validation(`${scmTitle[scmType]}安装路径`)
                                            ]}
                                        >
                                            <Input placeholder={scmPlaceholder[scmType]} disabled/>
                                        </Form.Item>
                                    }
                                </>
                            ) : (
                                <Form.Item
                                    label={`${scmTitle[scmType]}安装路径`}
                                    name="scmAddress"
                                    rules={[
                                        {required:true,message:`请输入${scmTitle[scmType]}安装路径`},
                                        Validation(`${scmTitle[scmType]}安装路径`)
                                    ]}
                                >
                                    <Input placeholder={scmPlaceholder[scmType]}/>
                                </Form.Item>
                            )
                        }
                    </Form.Item>
                </Form>
            </div>
        </Modals>
    )
}

export default ToolModal
