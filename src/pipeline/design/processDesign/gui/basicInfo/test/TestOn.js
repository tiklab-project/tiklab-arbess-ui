import React,{useState} from "react";
import {Form,Select} from "antd";
import {inject, observer} from "mobx-react";
import AuthFind from "../AuthFind";
import FormsSelect from "../FormsSelect";

/**
 * teston 接口测试
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TestOn = props => {

    const {taskStore,testOnStore} = props

    const {updateTask,dataItem} = taskStore
    const {findTestSpace,testSpace,findTestEnv,testEnv,findTestPlan,testPlan} = testOnStore

    // 测试空间 | 测试计划 | 测试环境 聚焦状态
    const [border,setBorder] = useState(null)

    // 推送地址获取加载状态
    const [isSpin,setSpin] = useState(false)

    /**
     * 获取测试空间 | 测试计划 | 测试环境
     * @param type：类型
     */
    const onFocus = type => {
        const authId = dataItem.task?.authId
        setBorder(type)
        switch (type) {
            case 'testSpace':
                setSpin(true)
                findTestSpace(authId).then(()=>setSpin(false))
                return;
            case 'testPlan':
                findTestPlan({
                    rpyId:dataItem.task?.testSpace?.id,
                    authId:authId,
                })
                return;
            default:
                return findTestEnv({
                    rpyId:dataItem.task?.testSpace?.id,
                    authId:authId,
                    env:type
                })
        }
    }

    /**
     * 切换空间 | API环境 | APP环境 | WEB环境 | 测试计划
     */
    const onChange = (value,type) => {
        setBorder(null)
        updateTask({[type]: {id:value}})
    }

    /**
     * 验证API环境 & APP环境 & WEB环境不能同时为空
     */
    const validatorEnv = (rule, value) => {
        const task = dataItem?.task
        const apiEnvValue = task?.apiEnv?.name
        const appEnvValue = task?.appEnv?.name
        const webEnvValue = task?.webEnv?.name
        if (!apiEnvValue && !appEnvValue && !webEnvValue) {
            return Promise.reject(new Error('API环境、APP环境、WEB环境不能同时为空'));
        }

        return Promise.resolve();
    }

    return (
        <>
            <AuthFind/>
            <Form.Item name={dataItem.taskId+"_testSpace"} label={"测试空间"} rules={[{required:true, message:"测试空间不能为空"}]}>
                <FormsSelect
                    label={"空间"}
                    isSpin={isSpin}
                    border={border==='testSpace'}
                    onBlur={()=>setBorder(null)}
                    onFocus={()=>onFocus('testSpace')}
                    onChange={value=>onChange(value,'testSpace')}
                >
                    {
                        testSpace && testSpace.map(item=>{
                            return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        })
                    }
                </FormsSelect>
            </Form.Item>

            <Form.Item name={dataItem.taskId+"_apiEnv"} label={"API环境"} rules={[{validator: validatorEnv}]}>
                <FormsSelect
                    label={"API环境"}
                    isSpin={false}
                    border={border==='api'}
                    onBlur={()=>setBorder(null)}
                    onFocus={()=>onFocus('api')}
                    onChange={value=>onChange(value,'apiEnv')}
                >
                    {
                        testEnv && testEnv.map(item=>{
                            return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        })
                    }
                </FormsSelect>
            </Form.Item>

            <Form.Item name={dataItem.taskId+"_appEnv"} label={"APP环境"} rules={[{validator: validatorEnv}]}>
                <FormsSelect
                    label={"APP环境"}
                    isSpin={false}
                    border={border==='app'}
                    onBlur={()=>setBorder(null)}
                    onFocus={()=>onFocus('app')}
                    onChange={value=>onChange(value,'appEnv')}
                >
                    {
                        testEnv && testEnv.map(item=>{
                            return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        })
                    }
                </FormsSelect>
            </Form.Item>

            <Form.Item name={dataItem.taskId+"_webEnv"} label={"WEB环境"} rules={[{validator: validatorEnv}]}>
                <FormsSelect
                    label={"WEB环境"}
                    isSpin={false}
                    border={border==='web'}
                    onBlur={()=>setBorder(null)}
                    onFocus={()=>onFocus('web')}
                    onChange={value=>onChange(value,'webEnv')}
                >
                    {
                        testEnv && testEnv.map(item=>{
                            return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        })
                    }
                </FormsSelect>
            </Form.Item>

            <Form.Item name={dataItem.taskId+"_testPlan"} label={"测试计划"} rules={[{required:true, message:"测试计划不能为空"}]}>
                <FormsSelect
                    label={"测试计划"}
                    isSpin={false}
                    border={border==='testPlan'}
                    onBlur={()=>setBorder(null)}
                    onFocus={()=>onFocus('testPlan')}
                    onChange={value=>onChange(value,'testPlan')}
                >
                    {
                        testPlan && testPlan.map(item=>{
                            return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                        })
                    }
                </FormsSelect>
            </Form.Item>
        </>
    )
}

export default inject("taskStore","testOnStore")(observer(TestOn))

