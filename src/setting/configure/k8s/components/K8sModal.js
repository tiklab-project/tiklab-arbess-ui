/**
 * @Description: Kubernetes集群添加编辑弹出框
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React, {useEffect, useState} from "react";
import {Form, Input, Select} from "antd";
import Modals from "../../../../common/component/modal/Modal";
import {Validation} from "../../../../common/utils/Client";
import k8sStore from "../store/K8sStore";
import {getUser} from "tiklab-core-ui";
import toolStore from "../../../integration/tool/store/ToolStore";

const K8sModal = (props) => {

    const {visible,setVisible,formValue,findAuth} = props

    const {createKubectl,updateKubectl} = k8sStore;
    const {findPipelineScmList} = toolStore;

    const [form] = Form.useForm();
    const user = getUser();

    const [scmList,setScmList] = useState([]);

    useEffect(()=>{
        findPipelineScmList({
            scmType: 'k8s'
        }).then(res=>{
            if(res.code===0){
                setScmList(res.data)
            }
        })
    },[])

    useEffect(()=>{
        if(visible){
            form.setFieldsValue(formValue)
        }
    },[visible])

    /**
     * 添加或修改Kubernetes集群
     */
    const onOk = () => {
        form.validateFields().then(values => {
            if(formValue){
                const params = {
                    id:formValue.id,
                    ...values,
                }
                updateKubectl(params).then(r=>{
                    if(r.code===0){
                        findAuth()
                    }
                })
            }else {
                createKubectl({
                    ...values,
                    user:{id:user.userId}
                }).then(r=>{
                    if(r.code===0){
                        findAuth()
                    }
                })
            }
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

    return (
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
                    autoComplete="off"
                    initialValues={{type:"common",authWay:1,authType:1}}
                >
                    <Form.Item
                        name="name"
                        label="名称"
                        rules={[{required:true,message:`名称不能空`},Validation("名称")]}
                    >
                        <Input placeholder={'名称'}/>
                    </Form.Item>
                    <Form.Item
                        name={['toolKubectl','scmId']}
                        label={'Kubectl版本'}
                        rules={[
                            { required: true, message: 'Kubectl版本不能空' },
                        ]}
                    >
                        <Select placeholder={'Kubectl版本'}>
                            {
                                scmList && scmList.map(item=>(
                                    <Select.Option value={item.scmId} key={item.scmId}>
                                        {item.scmName}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="kubeConfig"
                        label="Kubeconfig"
                        rules={[
                            { required: true, message: 'Kubeconfig不能空' },
                            {
                                validator: (_, value) => {
                                    if (!value) return Promise.resolve();
                                    // 1. 检查是否为有效 JSON/YAML
                                    let config;
                                    try {
                                        config = JSON.parse(value);
                                    } catch (e1) {
                                        try {
                                            const jsYaml = require('js-yaml');
                                            config = jsYaml.load(value);
                                        } catch (e2) {
                                            return Promise.reject(new Error('既不是有效的 JSON 也不是有效的 YAML'));
                                        }
                                    }
                                    // 2. 检查必需字段
                                    const requiredTopLevelFields = ['apiVersion', 'kind', 'clusters', 'contexts', 'users'];
                                    for (const field of requiredTopLevelFields) {
                                        if (!config[field]) {
                                            return Promise.reject(new Error(`缺少必需的顶级字段: ${field}`));
                                        }
                                    }
                                    // 3. 验证 clusters
                                    if (!Array.isArray(config.clusters) || config.clusters.length === 0) {
                                        return Promise.reject(new Error('clusters 必须是非空数组'));
                                    }
                                    for (const cluster of config.clusters) {
                                        if (!cluster.cluster || !cluster.cluster.server) {
                                            return Promise.reject(new Error('每个 cluster 必须包含 server 字段'));
                                        }
                                        // 验证 server URL
                                        const serverRegex = /^https?:\/\/[a-zA-Z0-9.-]+(:\d+)?(\/[a-zA-Z0-9_.-]*)*$/;
                                        if (!serverRegex.test(cluster.cluster.server)) {
                                            return Promise.reject(new Error(`无效的 server URL: ${cluster.cluster.server}`));
                                        }
                                        // 验证证书数据
                                        if (cluster.cluster['certificate-authority-data']) {
                                            const certRegex = /^[A-Za-z0-9+/]+={0,2}$/;
                                            if (!certRegex.test(cluster.cluster['certificate-authority-data'])) {
                                                return Promise.reject(new Error('certificate-authority-data 必须是有效的 Base64 编码'));
                                            }
                                        }
                                    }
                                    // 4. 验证 users
                                    if (!Array.isArray(config.users) || config.users.length === 0) {
                                        return Promise.reject(new Error('users 必须是非空数组'));
                                    }
                                    for (const user of config.users) {
                                        if (!user.user) {
                                            return Promise.reject(new Error('每个 user 必须包含 user 字段'));
                                        }
                                        // 验证客户端证书
                                        if (user.user['client-certificate-data']) {
                                            const certRegex = /^[A-Za-z0-9+/]+={0,2}$/;
                                            if (!certRegex.test(user.user['client-certificate-data'])) {
                                                return Promise.reject(new Error('client-certificate-data 必须是有效的 Base64 编码'));
                                            }
                                        }
                                        // 验证客户端密钥
                                        if (user.user['client-key-data']) {
                                            const keyRegex = /^[A-Za-z0-9+/]+={0,2}$/;
                                            if (!keyRegex.test(user.user['client-key-data'])) {
                                                return Promise.reject(new Error('client-key-data 必须是有效的 Base64 编码'));
                                            }
                                        }
                                        // 验证 token
                                        if (user.user.token) {
                                            const tokenRegex = /^[a-zA-Z0-9._-]+$/;
                                            if (!tokenRegex.test(user.user.token)) {
                                                return Promise.reject(new Error('token 包含无效字符'));
                                            }
                                        }
                                    }
                                    // 5. 验证 contexts
                                    if (!Array.isArray(config.contexts) || config.contexts.length === 0) {
                                        return Promise.reject(new Error('contexts 必须是非空数组'));
                                    }
                                    for (const context of config.contexts) {
                                        if (!context.context || !context.context.cluster || !context.context.user) {
                                            return Promise.reject(new Error('每个 context 必须包含 cluster 和 user 字段'));
                                        }
                                        // 验证命名空间（可选）
                                        if (context.context.namespace) {
                                            const nsRegex = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/;
                                            if (!nsRegex.test(context.context.namespace)) {
                                                return Promise.reject(new Error('namespace 名称不符合 Kubernetes 命名规范'));
                                            }
                                        }
                                    }
                                    // 6. 验证 current-context
                                    if (config['current-context']) {
                                        const contextNames = config.contexts.map(ctx => ctx.name);
                                        if (!contextNames.includes(config['current-context'])) {
                                            return Promise.reject(new Error(`current-context '${config['current-context']}' 不存在于 contexts 中`));
                                        }
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <Input.TextArea
                            rows={15}
                            placeholder={`apiVersion: v1\nclusters:\n- cluster:\n    server: https://kubernetes.example.com\n    certificate-authority-data: LS0t...\n  name: my-cluster`}
                        />
                    </Form.Item>
                </Form>
            </div>
        </Modals>
    )
}

export default K8sModal
