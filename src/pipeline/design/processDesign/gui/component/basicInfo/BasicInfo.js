/**
 * @Description: 任务表单
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/11
 */
import React,{useState,useEffect} from "react";
import {observer} from "mobx-react";
import {Form, Input} from "antd";
import {WhetherChange} from "../TaskCommon";
import CodeGit from "./code/CodeGit";
import CodeSvn from "./code/CodeSvn";
import CodeThird from "./code/CodeThird";
import ScanSonarQube from "./scan/ScanSonarQube";
import ScanSpotbugs from "./scan/ScanSpotbugs";
import TestMvnUnit from "./test/TestMvnUnit";
import TestHubo from "./test/TestHubo";
import BuildMaven from "./build/BuildMaven";
import BuildNode from "./build/BuildNode";
import BuildDocker from "./build/BuildDocker";
import DeployLinux from "./deploy/DeployLinux";
import DeployDocker from "./deploy/DeployDocker";
import DeployK8s from "./deploy/DeployK8s";
import {
    pipeline_task_update,
    build_docker,
    docker,
    git,
    gitee,
    github,
    gitlab,
    gitpuk,
    k8s,
    liunx,
    maventest,
    mvn,
    nodejs,
    pri_gitlab,
    sonar,
    spotbugs,
    svn,
    testhubo,
    script,
    upload_hadess,
    upload_ssh,
    download_hadess,
    download_ssh,
    build_go,
    sourcefare,
} from "../../../../../../common/utils/Constant";
import ToolScript from "./tool/ToolScript";
import UploadHadess from "./upload/UploadHadess";
import UploadSsh from "./upload/UploadSsh";
import DownloadHadess from "./download/DownloadHadess";
import DownloadSsh from "./download/DownloadSsh";
import BuildGo from "./build/BuildGo";
import ScanSourceFare from "./scan/ScanSourceFare";

const BasicInfo = props => {

    const {taskStore,stageStore} = props;

    const {dataItem,setDataItem,updateTaskName,taskPermissions} = taskStore;
    const {updateStageName} = stageStore;

    const taskUpdate = taskPermissions?.includes(pipeline_task_update);

    const [form] = Form.useForm();
    const [enter,setEnter] = useState(false);

    useEffect(()=>{
        return ()=>{
            form.resetFields();
        }
    },[]);

    useEffect(()=>{
        // 初始化表单内容
        const {formType,task,taskName,stageName} = dataItem;
        if(formType==="stage"){
            form.setFieldsValue({taskName: stageName});
            return;
        }
        console.log(dataItem)
        if(!task) return;
        form.setFieldsValue({
            ...task,
            authId: task?.authId || null,
            taskName: taskName,
        })
        form.validateFields().then();
    },[dataItem?.task, dataItem?.stageName])

    /**
     * 渲染表单
     */
    const renderForms = dataItem =>{
        switch (dataItem.taskType){
            case git:
                return <CodeGit {...props}/>
            case svn:
                return <CodeSvn {...props}/>
            case gitee:
            case github:
            case gitlab:
            case pri_gitlab:
            case gitpuk:
                return <CodeThird {...props}/>
            case maventest:
                return <TestMvnUnit {...props}/>
            case testhubo:
                return <TestHubo {...props}/>
            case nodejs:
                return <BuildNode {...props}/>
            case mvn:
                return <BuildMaven {...props}/>
            case build_docker:
                return <BuildDocker {...props}/>
            case build_go:
                return <BuildGo {...props} />
            case liunx:
                return <DeployLinux {...props}/>
            case docker:
                return <DeployDocker {...props}/>
            case k8s:
                return <DeployK8s {...props}/>
            case sonar:
                return <ScanSonarQube {...props}/>
            case spotbugs:
                return <ScanSpotbugs {...props}/>
            case sourcefare:
                return <ScanSourceFare {...props} />
            case upload_hadess:
                return <UploadHadess {...props}/>
            case upload_ssh:
                return <UploadSsh {...props}/>
            case download_hadess:
                return <DownloadHadess {...props}/>
            case download_ssh:
                return <DownloadSsh {...props}/>
            case script:
                return <ToolScript {...props}/>
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
                updateTaskName(value)
            }
            return
        }
        if(WhetherChange(value,dataItem.stageName)){
            updateStageName({stageId:dataItem.stageId,stageName:value}).then(res=>{
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
            <Form form={form} layout="vertical" autoComplete="off" >
                <Form.Item
                    name={"taskName"}
                    label={dataItem?.formType==='task'? "任务名称":"阶段名称"}
                    rules={[{required:true, message:"名称不能为空"}]}
                >
                    <Input
                        disabled={!taskUpdate}
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
