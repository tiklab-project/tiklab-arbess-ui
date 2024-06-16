import React,{useState,useEffect} from "react";
import {observer} from "mobx-react";
import {Form, Input} from "antd";
import {WhetherChange} from "../Common";
import CodeGit from "./code/CodeGit";
import CodeSvn from "./code/CodeSvn";
import CodeThird from "./code/CodeThird";
import ScanSonarQuebe from "./scan/ScanSonarQuebe";
import ScanSpotbugs from "./scan/ScanSpotbugs";
import TestMvnUnit from "./test/TestMvnUnit";
import TestOn from "./test/TestOn";
import BuildMaven from "./build/BuildMaven";
import BuildNode from "./build/BuildNode";
import BuildDocker from "./build/BuildDocker";
import DeployLinux from "./deploy/DeployLinux";
import DeployDocker from "./deploy/DeployDocker";
import ArtifactPushMaven from "./artifact/ArtifactPushMaven";
import ArtifactPushDocker from "./artifact/ArtifactPushDocker";
import ArtifactPullMaven from "./artifact/ArtifactPullMaven";
import ArtifactPullDocker from "./artifact/ArtifactPullDocker";

/**
 * task的基本信息
 */
const BasicInfo = props => {

    const {taskStore,stageStore} = props

    const {dataItem,setDataItem,updateTaskName} = taskStore
    const {updateStageName} = stageStore

    const [form] = Form.useForm()
    const [enter,setEnter] = useState(false)

    useEffect(()=>{
        return ()=>form.resetFields()
    },[])

    useEffect(()=>{
        // 初始化表单内容
        const {taskType,task} = dataItem
        switch(taskType){
            case 'git':
            case 'gitlab':
            case 'svn':
            case 'gitee':
            case 'github':
            case 'gittok':
            case 'maven':
            case 'nodejs':
            case 'build_docker':
            case 'liunx':
            case 'docker':
            case 'sonar':
            case 'spotbugs':
            case 'artifact_maven':
            case 'artifact_docker':
            case 'pull_maven':
            case 'pull_docker':
            case 'maventest':
                form.setFieldsValue({
                    ...task,
                    taskName:dataItem?.taskName,
                    putAddress:task?.artifactType==='ssh'? task?.putAddress : task?.repository?.name,
                })
                break
            case 'teston':
                form.setFieldsValue({
                    taskName:dataItem?.taskName,
                    testSpace:task?.testSpace?.name,
                    apiEnv:task?.apiEnv?.name,
                    appEnv:task?.appEnv?.name,
                    webEnv:task?.webEnv?.name,
                    testPlan:task?.testPlan?.name,
                    authId:task?.authId,
                })
                break
            default:
                form.setFieldsValue({
                    taskName: dataItem.formType==='task'? dataItem?.taskName : dataItem?.stageName
                })
        }
        form.validateFields().then()
    },[])

    /**
     * 渲染表单
     */
    const renderForms = dataItem =>{
        switch (dataItem.taskType){
            case 'git':
                return <CodeGit {...props}/>
            case 'svn':
                return <CodeSvn {...props}/>
            case 'gitee':
            case 'github':
            case 'gitlab':
            case 'gittok':
                return <CodeThird {...props}/>
            case 'maventest':
                return <TestMvnUnit {...props}/>
            case 'teston':
                return <TestOn {...props}/>
            case 'nodejs':
                return <BuildNode {...props}/>
            case 'maven':
                return <BuildMaven {...props}/>
            case 'build_docker':
                return <BuildDocker {...props}/>
            case 'liunx':
                return <DeployLinux {...props}/>
            case 'docker':
                return <DeployDocker {...props}/>
            case 'sonar':
                return <ScanSonarQuebe {...props}/>
            case 'spotbugs':
                return <ScanSpotbugs {...props}/>
            case 'artifact_maven':
                return <ArtifactPushMaven {...props}/>
            case 'artifact_docker':
                return <ArtifactPushDocker {...props}/>
            case 'pull_maven':
                return <ArtifactPullMaven {...props}/>
            case 'pull_docker':
                return <ArtifactPullDocker {...props}/>
        }
    }

    /**
     * 改变阶段名称
     * @param e
     */
    const changName = e =>{
        setEnter(false)
        const value = e.target.value
        if(dataItem.formType==="task"){
            if(WhetherChange(value,dataItem.taskName)){
                return updateTaskName(value)
            }
            return
        }
        if(WhetherChange(value,dataItem.stageName)){
            return updateStageName({stageId:dataItem.stageId,stageName:value}).then(res=>{
                if(res.code===0){
                    setDataItem({
                        ...dataItem,
                        stageName:value
                    })
                }
            })
        }
    }

    return (
        <div className='taskForm-forms'>
            <Form form={form} layout="vertical" autoComplete="off">
                <Form.Item
                    name={"taskName"}
                    label={dataItem?.formType==='task'? "任务名称":"阶段名称"}
                    rules={[{required:true, message:"名称不能为空"}]}
                >
                    <Input
                        placeholder={enter? "阶段名称，回车保存":"未设置"}
                        className={`${enter?'':'input-hover'}`}
                        onFocus={()=>setEnter(true)}
                        onBlur={(e)=>changName(e)}
                        onPressEnter={(e)=>e.target.blur()}
                    />
                </Form.Item>
                {
                    dataItem?.formType==='task' &&
                    renderForms(dataItem)
                }
            </Form>
        </div>
    )
}

export default observer(BasicInfo)
