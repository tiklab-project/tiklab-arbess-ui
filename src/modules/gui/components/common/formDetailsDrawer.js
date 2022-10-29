import React from "react";
import {Button,Drawer} from "antd";
import {CloseOutlined,DeleteOutlined} from "@ant-design/icons";
import Forms from "../formType/forms";
import NameType from "./nameType";

const FormDetailsDrawer = props =>{

    const {taskFormDrawer,setTaskFormDrawer,newStage,deletePart} = props

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
            style={{marginTop:50}}
            contentWrapperStyle={{width:600}}
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

export default FormDetailsDrawer