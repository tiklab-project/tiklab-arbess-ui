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
                    rpyName:dataItem.task?.testSpace?.name,
                    authId:authId,
                })
                return;
            default:
                return findTestEnv({
                    rpyName:dataItem.task?.testSpace?.name,
                    authId:authId,
                    env:type
                })
        }
    }

    /**
     * 切换空间 | API环境 | APP环境 | WEB环境 | 测试计划
     * @param value：值
     * @param type：类型
     */
    const onChange = (value,type) => {
        setBorder(null)
        updateTask({
            taskId:dataItem.taskId,
            values:{[type]: {id:value}}
        })
    }

    return (
        <>
            <AuthFind/>
            <Form.Item name={dataItem.taskId+"_testSpace"} label={"测试空间"}>
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

            <Form.Item name={dataItem.taskId+"_apiEnv"} label={"API环境"}>
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

            <Form.Item name={dataItem.taskId+"_appEnv"} label={"APP环境"}>
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

            <Form.Item name={dataItem.taskId+"_webEnv"} label={"WEB环境"}>
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

            <Form.Item name={dataItem.taskId+"_testPlan"} label={"测试计划"}>
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

