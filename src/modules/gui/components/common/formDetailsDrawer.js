import React from "react";
import {Drawer} from "antd";
import {CloseOutlined,DeleteOutlined} from "@ant-design/icons";
import Forms from "../forms/forms";
import SubIcon from "../../../config/components/formTitle/subIcon";
import Btn from "../../../common/btn/btn";
import "./formDetailsDrawer.scss";

const FormDetailsDrawer = props =>{

    const {taskFormDrawer,setTaskFormDrawer,newStage,deletePart} = props

    return(
        <Drawer
            placement="right"
            onClose={()=>setTaskFormDrawer(false)}
            visible={taskFormDrawer}
            closable={false}
            maskStyle={{background:"transparent"}}
            contentWrapperStyle={{width:480,top:48,height:"calc(100% - 48px)"}}
            bodyStyle={{padding:0}}
        >
            <div className="wrapper">
                <div className="wrapper-head">
                    <div className="wrapper-head-title">
                        <SubIcon type={newStage}/>
                        <span className="deleted"
                              onClick={()=>deletePart(newStage)}
                        >
                            <DeleteOutlined/>
                        </span>
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