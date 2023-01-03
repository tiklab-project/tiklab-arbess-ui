import React,{useEffect,useState} from "react";
import {Drawer,Form,Input} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import Btn from "../../../common/btn/btn";
import CodeGitOrGitlab from "./forms/codeGitOrGitlab";
import CodeGiteeOrGithub from "./forms/codeGiteeOrGithub";
import CodeSvn from "./forms/codeSvn";
import TestUnit from "./forms/testUnit";
import BuildMavenOrNode from "./forms/buildMavenOrNode";
import Deploy from "./forms/deploy";
import ScanSonarQuebe from "./forms/scanSonarQuebe";
import GoodsNexus from "./forms/goodsNexus";
import GoodsSsh from "./forms/goodsSsh";
import Condition from "../../condition/components/condition";
import Postpose from "../../postpose/components/task/postpose";
import Variable from "../../variable/components/task/variable";
import Tabs from "../../../common/tabs/tabs";
import {x} from "./delData";
import Inputs from "./forms/inputs";
import "./formDetailsDrawer.scss";

const FormDetailsDrawer = props =>{

    const {taskFormDrawer,setTaskFormDrawer,dataItem,updateStageName} = props

    const [form] = Form.useForm()

    const [handleType,setHandleType] = useState(1)
    const [enter,setEnter] = useState(false)

    const getId = (dataItem,name) =>{
        return dataItem.configId + "_" + name
    }

    useEffect(()=>{
        if(taskFormDrawer){
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
                        [getId(dataItem,"groupId")]:dataItem.groupId,
                        [getId(dataItem,"artifactId")]:dataItem.artifactId,
                        [getId(dataItem,"version")]:dataItem.version,
                        [getId(dataItem,"fileType")]:dataItem.fileType,
                        [getId(dataItem,"fileAddress")]:dataItem.fileAddress,
                        [getId(dataItem,"authName")]:dataItem.auth && dataItem.auth.name+"("+ dataItem.auth.ip+")",
                        [getId(dataItem,"authId")]:dataItem.authId
                    })
                    break
                default:
                    form.setFieldsValue({
                        [dataItem.stagesId+"_name"]:dataItem.name,
                    })

            }
            form.setFieldsValue({
                [getId(dataItem,"name")]:dataItem && dataItem.name,
            })
            form.validateFields()
        }
    },[taskFormDrawer,dataItem])

    const onBlur = e =>{
        setEnter(false)
        if(x(e.target.value,dataItem.name)){
            updateStageName({stagesId:dataItem.stagesId,stagesName:e.target.value})
        }
    }

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
                return <GoodsNexus dataItem={dataItem}/>
            case 52:
                return <GoodsSsh dataItem={dataItem}/>
        }
    }

    const lis = [
        {
            id:1,
            title:"环境变量"
        },
        {
            id:2,
            title:"条件"
        },
        {
            id:3,
            title:"后置处理"
        },
    ]

    const clickHandleType = item =>{
        setHandleType(item.id)
    }
    
    return(
        <Drawer
            placement="right"
            visible={taskFormDrawer}
            onClose={()=>setTaskFormDrawer(false)}
            closable={false}
            destroyOnClose={true}
            mask={false}
            width={480}
            contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
            bodyStyle={{padding:0}}
            className="mf"
        >
            <div className="wrapper">
                <div className="wrapper-head">
                    <div className="wrapper-head-title">
                        编辑
                    </div>
                    <Btn
                        onClick={()=>setTaskFormDrawer(false)}
                        title={<CloseOutlined />}
                        type="text"
                    />
                </div>
                <div className="wrapper-body">
                    <div className="body">
                        <div className="body-taskForm">
                            <div className="taskForm-forms">
                                <Form
                                    id="form"
                                    form={form}
                                    layout="vertical"
                                    autoComplete="off"
                                >
                                    {
                                        dataItem.configId ?
                                        <>
                                            <Inputs
                                                placeholder="任务名称"
                                                label="任务名称"
                                                name="name"
                                                isValid={true}
                                                dataItem={dataItem}
                                            />
                                            {renderForms(dataItem)}
                                        </>
                                        :
                                        <Form.Item name={dataItem.stagesId+"_name"} label="阶段名称" rules={[{required:true, message:"请输入阶段名称"}]}>
                                            <Input
                                                placeholder={enter? "阶段名称，回车保存":"未设置"}
                                                onFocus={()=>setEnter(true)}
                                                onBlur={(e)=>onBlur(e)}
                                                onPressEnter={(e)=>e.target.blur()}
                                            />
                                        </Form.Item>
                                    }
                                </Form>
                            </div>
                            {
                                dataItem.configId &&
                                <>
                                    <Tabs
                                        tabLis={lis}
                                        type={handleType}
                                        onClick={clickHandleType}
                                    />
                                    <div className="taskForm-post">
                                        { handleType===1 && <Variable dataItem={dataItem}/>  }
                                        { handleType===2 && <Condition dataItem={dataItem}/> }
                                        { handleType===3 && <Postpose dataItem={dataItem}/>  }
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default FormDetailsDrawer