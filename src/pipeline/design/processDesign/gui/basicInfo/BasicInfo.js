import React,{useState,useEffect} from "react";
import {Form, Input} from "antd";
import {WhetherChange} from "../Common";
import CodeGiteeOrGithubOrXcode from "./code/CodeGiteeOrGithub";
import CodeGitOrGitlab from "./code/CodeGitOrGitlab";
import CodeSvn from "./code/CodeSvn";
import CodeXcode from "./code/CodeXcode";
import ScanSonarQuebe from "./scan/ScanSonarQuebe";
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

    /**
     * 设置表单文本框id
     */
    const getId = name => dataItem.taskId + "_" + name

    useEffect(()=>{

        // 初始化表单内容
        const task = dataItem && dataItem.task

        console.log(task)

        switch(dataItem.taskType){
            case 'git':
            case 'gitlab':
            case 'svn':
            case 'gitee':
            case 'github':
            case 'xcode':
                form.setFieldsValue({
                    taskName:dataItem?.taskName,
                    [getId("codeName")]:dataItem.taskType==='xcode' ? task.repository?.name : task?.codeName,
                    [getId("codeBranch")]:dataItem.taskType==='xcode' ? task.branch?.name : task?.codeBranch,
                    [getId("codeAlias")]:task?.codeAlias,
                    [getId("svnFile")]:task?.svnFile,
                    [getId("authId")]:task?.authId,
                })
                break
            case 'maven':
            case 'nodejs':
            case 'build_docker':
                form.setFieldsValue({
                    taskName:dataItem?.taskName,
                    [getId("buildAddress")]:task?.buildAddress,
                    [getId("buildOrder")]:task?.buildOrder,
                    [getId("dockerFile")]:task?.dockerFile,
                    [getId("dockerOrder")]:task?.dockerOrder,
                })
                break
            case 'liunx':
            case 'docker':
                form.setFieldsValue({
                    taskName:dataItem?.taskName,
                    [getId("authType")]:task?.authType || 1,
                    [getId("deployAddress")]:task?.deployAddress,
                    [getId("deployOrder")]:task?.deployOrder,
                    [getId("startAddress")]:task?.startAddress,
                    [getId("localAddress")]:task?.localAddress,
                    [getId("dockerImage")]:task?.dockerImage,
                    [getId("startOrder")]:task?.startOrder,
                    [getId("rule")]:task?.rule,
                    [getId("authId")]:task?.authId,
                })
                break
            case 'sonar':
                form.setFieldsValue({
                    taskName:dataItem?.taskName,
                    [getId("projectName")]:task?.projectName,
                    [getId("authId")]:task?.authId,
                })
                break
            case 'teston':
                form.setFieldsValue({
                    taskName:dataItem?.taskName,
                    [getId("testSpace")]:task?.testSpace?.name,
                    [getId("apiEnv")]:task?.apiEnv?.name,
                    [getId("appEnv")]:task?.appEnv?.name,
                    [getId("webEnv")]:task?.webEnv?.name,
                    [getId("testPlan")]:task?.testPlan?.name,
                    [getId("authId")]:task?.authId,
                })
                break
            case 'artifact_maven':
            case 'artifact_docker':
                form.setFieldsValue({
                    taskName:dataItem?.taskName,
                    [getId("artifactType")]:task?.artifactType,
                    [getId("putAddress")]:task?.artifactType==='ssh'? task?.putAddress : task?.repository?.name,
                    [getId("fileAddress")]:task?.fileAddress,
                    [getId("rule")]:task?.rule,
                    [getId("groupId")]:task?.groupId,
                    [getId("version")]:task?.version,
                    [getId("artifactId")]:task?.artifactId,
                    [getId("dockerImage")]:task?.dockerImage,
                    [getId("authId")]:task?.authId,
                })
                break
            case 'pull_maven':
            case 'pull_docker':
                form.setFieldsValue({
                    taskName:dataItem?.taskName,
                    [getId("pullType")]:task?.pullType,
                    [getId("remoteAddress")]:task?.remoteAddress,
                    [getId("localAddress")]:task?.localAddress,
                    [getId("transitive")]:task?.transitive,
                    [getId("groupId")]:task?.groupId,
                    [getId("version")]:task?.version,
                    [getId("artifactId")]:task?.artifactId,
                    [getId("dockerImage")]:task?.dockerImage,
                    [getId("putAddress")]:task?.repository?.name,
                    [getId("authId")]:task?.authId,
                })
                break
            default:
                form.setFieldsValue({
                    taskName: dataItem.formType==='task'? dataItem?.taskName : dataItem?.stageName
                })
        }
        form.validateFields().then()
        return ()=>form.resetFields(null)
    },[dataItem?.taskId])

    /**
     * 渲染表单
     */
    const renderForms = dataItem =>{
        switch (dataItem.taskType){
            case 'git':
            case 'gitlab':
                return <CodeGitOrGitlab />
            case 'gitee':
            case 'github':
                return <CodeGiteeOrGithubOrXcode />
            case 'svn':
                return <CodeSvn />
            case 'xcode':
                return <CodeXcode />
            case 'maventest':
                return <TestMvnUnit />
            case 'teston':
                return <TestOn />
            case 'nodejs':
                return <BuildNode />
            case 'maven':
                return <BuildMaven />
            case 'build_docker':
                return <BuildDocker />
            case 'liunx':
                return <DeployLinux />
            case 'docker':
                return <DeployDocker />
            case 'sonar':
                return <ScanSonarQuebe />
            case 'artifact_maven':
                return <ArtifactPushMaven />
            case 'artifact_docker':
                return <ArtifactPushDocker />
            case 'pull_maven':
                return <ArtifactPullMaven />
            case 'pull_docker':
                return <ArtifactPullDocker />
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

export default BasicInfo
