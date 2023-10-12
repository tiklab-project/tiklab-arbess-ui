import React,{useState,useEffect} from "react";
import {Form, Input} from "antd";
import {WhetherChange} from "../gui/Common";
import CodeGiteeOrGithubOrXcode from "./code/CodeGiteeOrGithub";
import CodeGitOrGitlab from "./code/CodeGitOrGitlab";
import CodeSvn from "./code/CodeSvn";
import CodeXcode from "./code/CodeXcode";
import ScanSonarQuebe from "./scan/ScanSonarQuebe";
import TestMvnUnit from "./test/TestMvnUnit";
import TestOn from "./test/TestOn";
import BuildMavenOrNode from "./build/BuildMavenOrNode";
import BuildDocker from "./build/BuildDocker";
import ArtifactNexus from "./artifact/ArtifactNexus";
import ArtifactSsh from "./artifact/ArtifactSsh";
import ArtifactXpack from "./artifact/ArtifactXpack";
import DeployLinux from "./deploy/DeployLinux";
import DeployDocker from "./deploy/DeployDocker";

/**
 * task的基本信息
 */
const BasicInfo = props => {

    const {taskStore,stageStore} = props

    const {dataItem,setDataItem,updateTaskName} = taskStore
    const {updateStageName} = stageStore

    const [form] = Form.useForm()
    const [enter,setEnter] = useState(false)

    console.log(dataItem)

    /**
     * 设置表单文本框id
     */
    const getId = name => dataItem.taskId + "_" + name

    useEffect(()=>{
        // 初始化表单内容
        const task = dataItem && dataItem.task

        const authHost = task?.auth ? task.auth.name+"("+ task.auth.ip+")" : null
        const authAuth = task?.auth ? task.auth.name+"("+(task.auth.authType===1 ? task.auth.username:"私钥")+")" : null

        switch(dataItem.taskType){
            case 'git':
            case 'gitlab':
            case 'svn':
            case 'gitee':
            case 'github':
                form.setFieldsValue({
                    taskName:dataItem?.taskName,
                    [getId("codeName")]:task?.codeName,
                    [getId("codeBranch")]:task?.codeBranch,
                    [getId("codeAlias")]:task?.codeAlias,
                    [getId("svnFile")]:task?.svnFile,
                    [getId("authName")]:authAuth,
                })
                break
            case 'xcode':
                form.setFieldsValue({
                    taskName:dataItem?.taskName,
                    [getId("codeName")]:task?.repository?.name,
                    [getId("codeBranch")]:task?.branch?.name,
                    [getId("codeAlias")]:task?.codeAlias,
                    [getId("authName")]:authAuth,
                })
                break
            case 'maven':
            case 'nodejs':
            case 'build_docker':
                form.setFieldsValue({
                    taskName:dataItem?.taskName,
                    [getId("buildAddress")]:task?.buildAddress,
                    [getId("productRule")]:task?.productRule,
                    [getId("dockerName")]:task?.dockerName,
                    [getId("dockerVersion")]:task?.dockerVersion,
                    [getId("dockerFile")]:task?.dockerFile,
                    [getId("dockerOrder")]:task?.dockerOrder,
                })
                break
            case 'liunx':
            case 'docker':
                form.setFieldsValue({
                    taskName:dataItem?.taskName,
                    [getId("deployAddress")]:task?.deployAddress,
                    [getId("deployOrder")]:task?.deployOrder,
                    [getId("startAddress")]:task?.startAddress,
                    [getId("authType")]:task?.authType ? task.authType:1,
                    [getId("authName")]: authHost,
                })
                break
            case 'sonar':
                form.setFieldsValue({
                    taskName:dataItem?.taskName,
                    [getId("projectName")]:task?.projectName,
                    [getId("authName")]: authAuth,
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
                    [getId("authName")]: authAuth,
                })
                break
            case 'nexus':
            case 'xpack':
                form.setFieldsValue({
                    taskName:dataItem?.taskName,
                    [getId("groupId")]:task?.groupId,
                    [getId("artifactId")]:task?.artifactId,
                    [getId("version")]:task?.version,
                    [getId("putAddress")]:task?.repository?.name,
                    [getId("authName")]:authAuth,
                })
                break
            case 'ssh':
                form.setFieldsValue({
                    taskName:dataItem?.taskName,
                    [getId("putAddress")]:task?.putAddress,
                    [getId("authName")]:authHost,
                })
                break
            case 'maventest':
                form.setFieldsValue({
                    taskName:dataItem?.taskName,
                })
                break
            default:
                form.setFieldsValue({
                    taskName: dataItem?.stageName
                })
        }
        form.validateFields().then(r => {})
        return ()=>{form.resetFields(null)}
    },[dataItem.taskId])

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
            case 'maven':
                return <BuildMavenOrNode />
            case 'build_docker':
                return <BuildDocker />
            case 'liunx':
                return <DeployLinux />
            case 'docker':
                return <DeployDocker />
            case 'sonar':
                return <ScanSonarQuebe />
            case 'nexus':
                return <ArtifactNexus />
            case 'ssh':
                return <ArtifactSsh />
            case 'xpack':
                return <ArtifactXpack />
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
