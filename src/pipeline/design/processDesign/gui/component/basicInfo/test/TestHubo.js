import React,{useState} from "react";
import {Select} from "antd";
import {observer} from "mobx-react";
import FormsAuth from "../FormsAuth";
import FormsSelect from "../FormsSelect";
import testHuboStore from "../../../../../../test/testhubo/store/TestHuboStore";

/**
 * TestHubo接口测试
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TestHubo = props => {

    const {taskStore} = props

    const {updateTask,dataItem} = taskStore
    const {findTestSpace,findTestEnv,findTestPlan} = testHuboStore

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
                    if(res.code===0){
                        setTestSpace(res.data)
                    }
                }).finally(()=>setSpin(false))
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
        if (!apiEnvValue && !appEnvValue) {
            return Promise.reject(new Error('API环境、APP环境不能同时为空'));
        }
        return Promise.resolve();
    }

    return (
        <>
            <FormsAuth />

            <FormsSelect
                rules={[{required:true, message:"测试空间不能为空"}]}
                name={["testSpace","name"]}
                label={"测试空间"}
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
                rules={[{required:true, message:"测试计划不能为空"}]}
                name={["testPlan","name"]}
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

            <FormsSelect
                rules={[{validator: validatorEnv}]}
                name={["apiEnv","name"]}
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
                name={["appEnv","name"]}
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


        </>
    )
}

export default observer(TestHubo)

