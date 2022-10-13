import React from "react";
import {Button,Drawer,Popconfirm} from "antd";
import {CloseOutlined,DeleteOutlined} from "@ant-design/icons";
import ConfigName from "../form/configName";
import Forms from "../form/forms";

const ConfigFormDetailsDrawer = props =>{

    const {taskFormDrawer,setTaskFormDrawer,newStage,del,configDataStore} = props
    const {data,setData} = configDataStore

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
            placement="right"
            onClose={()=>setTaskFormDrawer(false)}
            visible={taskFormDrawer}
            closable={false}
            contentWrapperStyle={{width:600,marginTop:55}}
            bodyStyle={{padding:0}}
        >
            <div className="wrapper">
                <div className="wrapper-head">
                    <div className="wrapper-head-title">
                        编辑 &nbsp; &nbsp;
                        <span className="deleted">
                            <Popconfirm
                                title="当前项数据会被清空"
                                onConfirm={()=>deletePart()}
                                okText="确定"
                                cancelText="取消"
                            >
                                <DeleteOutlined/>
                            </Popconfirm>
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
                                <Forms type={newStage}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default ConfigFormDetailsDrawer