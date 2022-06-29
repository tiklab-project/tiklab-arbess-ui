import React from "react";
import {Button, Drawer} from "antd";
import {CloseOutlined,DeleteOutlined} from "@ant-design/icons";
import ConfigName from "../configCommon/configName";
import ConfigForm from "../configCommon/configForm";

const ConfigFormDetailsDrawer = props =>{

    const {data,setData,taskFormDrawer,setTaskFormDrawer,newStage,del} = props

    const deletePart = () => {
        del(newStage)
        for (let i = 0 ;i<data.length;i++){
            if(data[i].dataType === newStage){
                data.splice(i,1)
            }
            setData([...data])
        }
        setTaskFormDrawer(false)
    }

    return(
        <Drawer
            closable={false}
            placement="right"
            onClose={()=>setTaskFormDrawer(false)}
            visible={taskFormDrawer}
            width={600}
        >
            <div className="wrapper">
                <div className="wrapper-head">
                    <div className="wrapper-head-title">
                        编辑 &nbsp; &nbsp;
                        <span className="deleted" onClick={()=>deletePart()}>
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
                            <div className="taskForm-top">
                                <div className="taskForm-top_title">
                                    <ConfigName type={newStage}/>
                                </div>
                            </div>
                            <div>
                                <ConfigForm type={newStage}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default ConfigFormDetailsDrawer