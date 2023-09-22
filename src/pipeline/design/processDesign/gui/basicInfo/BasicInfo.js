import React,{useState,useEffect} from "react";
import {Form, Input} from "antd";
import {WhetherChange} from "../gui/Common";
import FormsInput from "./FormsInput";
import CodeGiteeOrGithubOrXcode from "./code/CodeGiteeOrGithub";
import CodeGitOrGitlab from "./code/CodeGitOrGitlab";
import CodeSvn from "./code/CodeSvn";
import CodeXcode from "./code/CodeXcode";
import ScanSonarQuebe from "./scan/ScanSonarQuebe";
import TestMvnUnit from "./test/TestMvnUnit";
import TestOn from "./test/TestOn";
import BuildMavenOrNode from "./build/BuildMavenOrNode";
import ArtifactNexus from "./artifact/ArtifactNexus";
import ArtifactSsh from "./artifact/ArtifactSsh";
import ArtifactXpack from "./artifact/ArtifactXpack";
import DeployLinuxOrDocker from "./deploy/DeployLinuxOrDocker";

/**
 * task的基本信息
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const BasicInfo = props => {

    const {dataItem,updateStageName} = props

    console.log(dataItem,"dataItem")

    const [form] = Form.useForm()
    const [enter,setEnter] = useState(false)

    /**
     * 设置表单文本框id
     */
    const getId = name => dataItem.taskName + "_" + name

    useEffect(()=>{
        // 初始化表单内容
        const task = dataItem && dataItem.task

        const authHost = task?.auth ? task.auth.name+"("+ task.auth.ip+")" : null
        const authAuth = task?.auth ? task.auth.name+"("+(task.auth.authType===1 ? task.auth.username:"私钥")+")" : null

        switch(dataItem.taskType){
            case 'git':
            case 'gitlab':
            case 'svn':
                form.setFieldsValue({
                    [getId("taskName")]:dataItem?.taskName,
                    [getId("codeName")]:task?.codeName,
                    [getId("codeBranch")]:task?.codeBranch,
                    [getId("codeAlias")]:task?.codeAlias,
                    [getId("svnFile")]:task?.svnFile,
                    [getId("authName")]:authAuth,
                    [getId("authId")]:task?.authId,
                })
                break
            case 'xcode':
                form.setFieldsValue({
                    [getId("taskName")]:dataItem?.taskName,
                    [getId("codeName")]:task?.repository?.name,
                    [getId("codeBranch")]:task?.branch?.name,
                    [getId("codeAlias")]:task?.codeAlias,
                    [getId("authName")]:authAuth,
                    [getId("authId")]:task?.authId,
                })
                break
            case 'gitee':
            case 'github':
                form.setFieldsValue({
                    [getId("taskName")]:dataItem?.taskName,
                    [getId("codeName")]:task?.codeName,
                    [getId("codeBranch")]:task?.codeBranch,
                    [getId("codeAlias")]:task?.codeAlias,
                    [getId("authName")]:authAuth,
                    [getId("authId")]:task?.authId
                })
                break
            case 'maven':
            case 'nodejs':
                form.setFieldsValue({
                    [getId("taskName")]:dataItem?.taskName,
                    [getId("buildAddress")]:task?.buildAddress,
                    [getId("productRule")]:task?.productRule,
                })
                break
            case 'liunx':
            case 'docker':
                form.setFieldsValue({
                    [getId("taskName")]:dataItem?.taskName,
                    [getId("deployAddress")]:task?.deployAddress,
                    [getId("deployOrder")]:task?.deployOrder,
                    [getId("startAddress")]:task?.startAddress,
                    [getId("authType")]:task.authType ? task.authType:1,
                    [getId("authName")]: authHost,
                    [getId("authId")]:task?.authId,
                })
                break
            case 'sonar':
                form.setFieldsValue({
                    [getId("taskName")]:dataItem?.taskName,
                    [getId("projectName")]:task?.projectName,
                    [getId("authName")]: authAuth,
                    [getId("authId")]:task?.authId
                })
                break
            case 'teston':
                form.setFieldsValue({
                    [getId("taskName")]:dataItem?.taskName,
                    [getId("testSpace")]:task?.testSpace?.name,
                    [getId("apiEnv")]:task?.apiEnv?.name,
                    [getId("appEnv")]:task?.appEnv?.name,
                    [getId("webEnv")]:task?.webEnv?.name,
                    [getId("testPlan")]:task?.testPlan?.name,
                    [getId("authName")]: authAuth,
                    [getId("authId")]:task?.authId
                })
                break
            case 'nexus':
                form.setFieldsValue({
                    [getId("taskName")]:dataItem?.taskName,
                    [getId("groupId")]:task?.groupId,
                    [getId("artifactId")]:task?.artifactId,
                    [getId("version")]:task?.version,
                    [getId("putAddress")]:task?.repository?.name,
                    [getId("authName")]:authAuth,
                    [getId("authId")]:task?.authId
                })
                break
            case 'xpack':
                form.setFieldsValue({
                    [getId("taskName")]:dataItem?.taskName,
                    [getId("groupId")]:task?.groupId,
                    [getId("artifactId")]:task?.artifactId,
                    [getId("version")]:task?.version,
                    [getId("putAddress")]:task?.repository?.name,
                    [getId("authName")]: authAuth,
                    [getId("authId")]:task?.authId
                })
                break
            case 'ssh':
                form.setFieldsValue({
                    [getId("taskName")]:dataItem?.taskName,
                    [getId("putAddress")]:task?.putAddress,
                    [getId("authName")]:authHost,
                    [getId("authId")]:task?.authId
                })
                break
            case 'maventest':
                form.setFieldsValue({
                    [getId("taskName")]:dataItem?.taskName,
                })
                break
            default:
                form.setFieldsValue({
                    [dataItem.stageId+"_stageName"]:dataItem?.stageName,
                })
        }
        form.validateFields().then(r => {})
        return ()=>form.resetFields(null)
    },[dataItem.taskName])

    /**
     * 渲染表单
     * @param dataItem
     * @returns {JSX.Element}
     */
    const renderForms = dataItem =>{
        switch (dataItem.taskType){
            case 'git':
            case 'gitlab':
                return <CodeGitOrGitlab dataItem={dataItem}/>
            case 'gitee':
            case 'github':
                return <CodeGiteeOrGithubOrXcode dataItem={dataItem}/>
            case 'svn':
                return <CodeSvn dataItem={dataItem}/>
            case 'xcode':
                return <CodeXcode dataItem={dataItem}/>
            case 'maventest':
                return <TestMvnUnit dataItem={dataItem}/>
            case 'teston':
                return <TestOn dataItem={dataItem}/>
            case 'nodejs':
            case 'maven':
                return <BuildMavenOrNode dataItem={dataItem}/>
            case 'liunx':
            case 'docker':
                return <DeployLinuxOrDocker dataItem={dataItem}/>
            case 'sonar':
                return <ScanSonarQuebe dataItem={dataItem}/>
            case 'nexus':
                return <ArtifactNexus dataItem={dataItem}/>
            case 'ssh':
                return <ArtifactSsh dataItem={dataItem}/>
            case 'xpack':
                return <ArtifactXpack dataItem={dataItem}/>
        }
    }

    /**
     * 改变阶段名称
     * @param e
     */
    const changStageName = e =>{
        setEnter(false)
        if(WhetherChange(e.target.value,dataItem.stageName)){
            updateStageName({stageId:dataItem.stageId,stageName:e.target.value})
        }
    }

    return (
        <div className='taskForm-forms'>
            <Form form={form} layout="vertical" autoComplete="off">
                {
                    dataItem?.taskName ?
                        <>
                            <FormsInput
                                placeholder="任务名称"
                                label="任务名称"
                                name="taskName"
                                isValid={true}
                                dataItem={dataItem}
                            />
                            {renderForms(dataItem)}
                        </>
                        :
                        <Form.Item name={dataItem.stageId+"_stageName"} label="阶段名称" rules={[{required:true, message:"请输入阶段名称"}]}>
                            <Input
                                // bordered={enter}
                                placeholder={enter? "阶段名称，回车保存":"未设置"}
                                className={`${enter?'':'input-hover'}`}
                                onFocus={()=>setEnter(true)}
                                onBlur={(e)=>changStageName(e)}
                                onPressEnter={(e)=>e.target.blur()}
                            />
                        </Form.Item>
                }
            </Form>
        </div>
    )
}

export default BasicInfo
