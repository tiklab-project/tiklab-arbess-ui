import React,{useContext} from "react";
import {Button,Drawer,Modal} from "antd";
import {CloseOutlined,DeleteOutlined,ExclamationCircleOutlined} from "@ant-design/icons";
import Forms from "../formType/forms";
import NameType from "./nameType";
import {observer} from "mobx-react";
import ConfigStore from "../../store/configStore";
import TestContext from "./testContext";

const FormDetailsDrawer = props =>{

    const {taskFormDrawer,setTaskFormDrawer,newStage,del} = props
    const {updateConfigure} = ConfigStore

    const context = useContext(TestContext)
    const {data,setData} = context.configDataStore
    const pipelineId = context.pipelineId

    const deletePart = newStage => {
        Modal.confirm({
            title: "删除",
            icon: <ExclamationCircleOutlined />,
            content: "删除后数据无法恢复",
            onOk:()=>delPart(newStage),
            okText: "确认",
            cancelText: "取消",
        });

    }
    
    const delPart = newStage => {
        del(newStage)
        const params = {
            pipelineId,
            taskType:newStage,
            message:"delete"
        }
        updateConfigure(params)
        for (let i = 0 ;i<data.length;i++){
            if(data[i].dataType === newStage){
                data.splice(i,1)
            }
            setData([...data])
        }
        setTaskFormDrawer(false)
    }
    

    const renderIcon = newStage =>{
        switch (newStage) {
            case 1:return "git"
            case 2:return "gitee"
            case 3:return "github"
            case 4:return "gitlab"
            case 5:return "-_ssh"
            case 11:return "ceshi"
            case 21:return "quanxian"
            case 22:return "nodejs"
            case 31:return "xuniji"
            case 32:return "docker"
        }
    }

    return(
        <Drawer
            placement="right"
            onClose={()=>setTaskFormDrawer(false)}
            visible={taskFormDrawer}
            closable={false}
            contentWrapperStyle={{width:630,marginTop:55}}
            bodyStyle={{padding:0}}
        >
            <div className="wrapper">
                <div className="wrapper-head">
                    <div className="wrapper-head-title">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#icon-${renderIcon(newStage)}`} />
                        </svg>
                        <span style={{paddingRight:10}}>
                            <NameType type={newStage}/>
                        </span>
                        <span className="deleted" onClick={()=>deletePart(newStage)}>
                            <DeleteOutlined/>
                        </span>
                    </div>
                    <div>
                        <Button type="text" onClick={()=>setTaskFormDrawer(false)}>
                            <CloseOutlined />
                        </Button>
                    </div>
                </div>
                <div className="wrapper-body">
                    <div className="body">
                        <div className="body-taskForm">
                            <div className="taskForm-forms">
                                <Forms type={newStage}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default observer(FormDetailsDrawer)