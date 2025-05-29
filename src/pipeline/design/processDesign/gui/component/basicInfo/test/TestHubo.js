/**
 * @Description: TestHubo接口测试
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/5/16
 */
import React,{useState} from "react";
import {Select} from "antd";
import {observer} from "mobx-react";
import FormsAuth from "../FormsAuth";
import FormsSelect from "../FormsSelect";
import testHuboStore from "../../../../../../test/testhubo/store/TestHuboStore";

const TestHubo = props => {

    const {taskStore} = props;

    const {updateTask,dataItem} = taskStore;
    const {findTestHuboRepositoryList,findTestHuboPlanList,findTestHuboEnvList} = testHuboStore;

    //推送地址获取加载状态
    const [isSpin,setSpin] = useState(false);
    //测试空间
    const [testSpace,setTestSpace] = useState([]);
    //测试环境
    const [testEnv,setTestEnv] = useState([]);
    //测试计划
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
                findTestHuboRepositoryList({
                    authId
                }).then(res=>{
                    if(res.code===0){
                        setTestSpace(res.data)
                    }
                }).finally(()=>setSpin(false))
                return;
            case 'testPlan':
                findTestHuboPlanList({
                    repositoryId:dataItem.task?.testSpace?.id,
                    authId:authId,
                }).then(res=>{
                    if(res.code===0){
                        setTestPlan(res.data)
                    }
                })
                return;
            default:
                findTestHuboEnvList({
                    repositoryId:dataItem.task?.testSpace?.id,
                    authId:authId,
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
                rules={[{required:true, message:"测试环境不能为空"}]}
                name={["testEnv","name"]}
                label={"测试环境"}
                isSpin={false}
                onFocus={()=>onFocus('testEnv')}
                onChange={value=>onChange(value,'testEnv')}
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

