import React,{useState,useEffect} from "react";
import {Form, Input} from "antd";
import Inputs from "./Inputs";
import CodeGitOrGitlab from "./code/CodeGitOrGitlab";
import CodeGiteeOrGithub from "./code/CodeGiteeOrGithub";
import CodeSvn from "./code/CodeSvn";
import TestUnit from "./test/TestUnit";
import BuildMavenOrNode from "./build/BuildMavenOrNode";
import Deploy from "./deploy/Deploy";
import ScanSonarQuebe from "./scan/ScanSonarQuebe";
import ArtifactNexus from "./artifact/ArtifactNexus";
import ArtifactSsh from "./artifact/ArtifactSsh";
import {WhetherChange} from "../tasks/components/Common";

/**
 * form表单
 * task的基本信息
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Forms = props => {

    const {dataItem,updateStageName} = props

    const [form] = Form.useForm()
    const [enter,setEnter] = useState(false)

    const getId = (dataItem,name) =>{
        return dataItem.taskId + "_" + name
    }

    useEffect(()=>{
        // 初始化表单内容
        switch(dataItem.type){
            case 1:
            case 4:
            case 5:
                form.setFieldsValue({
                    [getId(dataItem,"codeName")]:dataItem && dataItem.codeName,
                    [getId(dataItem,"codeBranch")]:dataItem && dataItem.codeBranch,
                    [getId(dataItem,"codeAlias")]:dataItem && dataItem.codeAlias,
                    [getId(dataItem,"svnFile")]:dataItem && dataItem.svnFile,
                    [getId(dataItem,"authName")]:dataItem.auth && dataItem.auth.name+"("+(dataItem.auth.authType === 1?dataItem.auth.username:"私钥")+")",
                    [getId(dataItem,"authId")]:dataItem.authId,
                })
                break
            case 2:
            case 3:
                form.setFieldsValue({
                    [getId(dataItem,"codeName")]:dataItem && dataItem.codeName,
                    [getId(dataItem,"codeBranch")]:dataItem && dataItem.codeBranch,
                    [getId(dataItem,"codeAlias")]:dataItem && dataItem.codeAlias,
                    [getId(dataItem,"authName")]:dataItem.auth && dataItem.auth.name+"("+ (dataItem.auth.authType === 1?dataItem.auth.message:"私钥") +")",
                    [getId(dataItem,"authId")]:dataItem.authId
                })
                break
            case 21:
            case 22:
                form.setFieldsValue({
                    [getId(dataItem,"buildAddress")]:dataItem && dataItem.buildAddress,
                })
                break
            case 31:
            case 32:
                form.setFieldsValue({
                    [getId(dataItem,"localAddress")]:dataItem && dataItem.localAddress,
                    [getId(dataItem,"deployAddress")]:dataItem && dataItem.deployAddress,
                    [getId(dataItem,"deployOrder")]:dataItem && dataItem.deployOrder,
                    [getId(dataItem,"startAddress")]:dataItem && dataItem.startAddress,
                    [getId(dataItem,"authType")]:dataItem && dataItem.authType?dataItem.authType:1,
                    [getId(dataItem,"authName")]:dataItem.auth && dataItem.auth.name+"("+ dataItem.auth.ip+")",
                    [getId(dataItem,"authId")]: dataItem.authId,
                })
                break
            case 41:
                form.setFieldsValue({
                    [getId(dataItem,"projectName")]:dataItem && dataItem.projectName,
                    [getId(dataItem,"authName")]:dataItem.auth && dataItem.auth.name+"("+(dataItem.auth.authType === 1?dataItem.auth.username:"私钥")+")",
                    [getId(dataItem,"authId")]:dataItem.authId
                })
                break
            case 51:
                form.setFieldsValue({
                    [getId(dataItem,"groupId")]:dataItem.groupId,
                    [getId(dataItem,"artifactId")]:dataItem.artifactId,
                    [getId(dataItem,"version")]:dataItem.version,
                    [getId(dataItem,"fileType")]:dataItem.fileType,
                    [getId(dataItem,"fileAddress")]:dataItem.fileAddress,
                    [getId(dataItem,"authName")]:dataItem.auth && dataItem.auth.name+"("+(dataItem.auth.authType === 1?dataItem.auth.username:"私钥")+")",
                    [getId(dataItem,"authId")]:dataItem.authId
                })
                break
            case 52:
                form.setFieldsValue({
                    [getId(dataItem,"fileAddress")]:dataItem.fileAddress,
                    [getId(dataItem,"putAddress")]:dataItem.putAddress,
                    [getId(dataItem,"authName")]:dataItem.auth && dataItem.auth.name+"("+ dataItem.auth.ip+")",
                    [getId(dataItem,"authId")]:dataItem.authId
                })
                break
            default:
                form.setFieldsValue({
                    [dataItem.stagesId+"_stagesName"]:dataItem.stagesName,
                })

        }
        form.setFieldsValue({
            [getId(dataItem,"taskName")]:dataItem && dataItem.taskName,
        })
    },[dataItem])

    /**
     * 渲染表单
     * @param dataItem
     * @returns {JSX.Element}
     */
    const renderForms = dataItem =>{
        switch (dataItem.type){
            case 1:
            case 4:
                return <CodeGitOrGitlab dataItem={dataItem}/>
            case 2:
            case 3:
                return <CodeGiteeOrGithub dataItem={dataItem}/>
            case 5:
                return <CodeSvn dataItem={dataItem}/>
            case 11:
                return <TestUnit dataItem={dataItem}/>
            case 21:
            case 22:
                return <BuildMavenOrNode dataItem={dataItem}/>
            case 31:
            case 32:
                return <Deploy dataItem={dataItem}/>
            case 41:
                return <ScanSonarQuebe dataItem={dataItem}/>
            case 51:
                return <ArtifactNexus dataItem={dataItem}/>
            case 52:
                return <ArtifactSsh dataItem={dataItem}/>
        }
    }

    /**
     * 改变阶段名称
     * @param e
     */
    const changStageName = e =>{
        setEnter(false)
        if(WhetherChange(e.target.value,dataItem.name)){
            updateStageName({stagesId:dataItem.stagesId,stagesName:e.target.value})
        }
    }

    return (
        <div className='taskForm-forms'>
            <Form id="form" form={form} layout="vertical" autoComplete="off">
                {
                    dataItem.taskId ?
                        <>
                            <Inputs placeholder="任务名称" label="任务名称" name="taskName" isValid={true} dataItem={dataItem}/>
                            {renderForms(dataItem)}
                        </>
                        :
                        <Form.Item name={dataItem.stagesId+"_stagesName"} label="阶段名称" rules={[{required:true, message:"请输入阶段名称"}]}>
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

export default Forms
