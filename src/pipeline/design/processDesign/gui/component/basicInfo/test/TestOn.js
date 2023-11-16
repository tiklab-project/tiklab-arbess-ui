import React,{useState} from "react";
import {Select} from "antd";
import {observer} from "mobx-react";
import FormsAuth from "../FormsAuth";
import FormsSelect from "../FormsSelect";
import testOnStore from "../../../../../../test/store/TestOnStore";

/**
 * teston接口测试
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TestOn = props => {

    const {taskStore} = props

    const {updateTask,dataItem} = taskStore
    const {findTestSpace,findTestEnv,findTestPlan} = testOnStore

    // 推送地址获取加载状态
    const [isSpin,setSpin] = useState(false);

    const [testSpace,setTestSpace] = useState([]);
    const [testEnv,setTestEnv] = useState([]);
    const [testPlan,setTestPlan] = useState([]);

    /**
     * 获取测试空间 | 测试计划 | 测试环境
     * @param type
     */
    const onFocus = type => {
        const authId = dataItem.task?.authId
        if(!authId) return;
        switch (type) {
            case 'testSpace':
                setSpin(true)
                findTestSpace(authId).then(res=>{
                    setSpin(false)
                    if(res.code===0){
                        setTestSpace(res.data)
                    }
                })
                return;
            case 'testPlan':
                findTestPlan({
                    rpyId:dataItem.task?.testSpace?.id,
                    authId:authId,
                }).then(res=>{
                    if(res.code===0){
                        setTestPlan(res.data)
                    }
                })
                return;
            default:
                findTestEnv({
                    rpyId:dataItem.task?.testSpace?.id,
                    authId:authId,
                    env:type
                }).then(res=>{
                    if(res.code===0){
                        setTestEnv(res.data)
                    }
                })
        }
    }

    /**
     * 切换空间 | API环境 | APP环境 | WEB环境 | 测试计划
     */
    const onChange = (value,type) => {
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
            <FormsAuth />
            <FormsSelect
                rules={[{required:true, message:"测试空间不能为空"}]}
                name={"testSpace"}
                label={"空间"}
                isSpin={isSpin}
                onFocus={()=>onFocus('testSpace')}
                onChange={value=>onChange(value,'testSpace')}
            >
                {
                    testSpace && testSpace.map(item=>{
                        return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                    })
                }
            </FormsSelect>

            <FormsSelect
                rules={[{validator: validatorEnv}]}
                name={"apiEnv"}
                label={"API环境"}
                isSpin={false}
                onFocus={()=>onFocus('api')}
                onChange={value=>onChange(value,'apiEnv')}
            >
                {
                    testEnv && testEnv.map(item=>{
                        return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                    })
                }
            </FormsSelect>

            <FormsSelect
                rules={[{validator: validatorEnv}]}
                name={"appEnv"}
                label={"APP环境"}
                isSpin={false}
                onFocus={()=>onFocus('app')}
                onChange={value=>onChange(value,'appEnv')}
            >
                {
                    testEnv && testEnv.map(item=>{
                        return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                    })
                }
            </FormsSelect>

            <FormsSelect
                rules={[{validator: validatorEnv}]}
                name={"webEnv"}
                label={"WEB环境"}
                isSpin={false}
                onFocus={()=>onFocus('web')}
                onChange={value=>onChange(value,'webEnv')}
            >
                {
                    testEnv && testEnv.map(item=>{
                        return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                    })
                }
            </FormsSelect>

            <FormsSelect
                rules={[{required:true, message:"测试计划不能为空"}]}
                name={"testPlan"}
                label={"测试计划"}
                isSpin={false}
                onFocus={()=>onFocus('testPlan')}
                onChange={value=>onChange(value,'testPlan')}
            >
                {
                    testPlan && testPlan.map(item=>{
                        return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                    })
                }
            </FormsSelect>
        </>
    )
}

export default observer(TestOn)

