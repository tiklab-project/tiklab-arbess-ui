import React from "react";
import {Drawer} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import Btn from "../../../../common/btn/btn";
import AddDrawerContent from "./addDrawerContent";
import "./addDrawer.scss";

const AddDrawer = props =>{

    const {setNewStageDrawer,newStageDrawer} = props

    return(
        <Drawer
            closable={false}
            placement="right"
            onClose={()=>setNewStageDrawer(false)}
            visible={newStageDrawer}
            maskStyle={{backgroundColor:"transparent"}}
            style={{top:48}}
            contentWrapperStyle={{width:600,height:"calc(100% - 48px)"}}
            bodyStyle={{padding:0}}
        >
            <div className="wrapper">
                <div className="wrapper-head">
                    <div className="wrapper-head-title"> 选择任务组</div>
                    <Btn
                        onClick={()=>setNewStageDrawer(false)}
                        title={<CloseOutlined />}
                        type="text"
                    />
                </div>
                <div className="wrapper-body">
                    <AddDrawerContent setNewStageDrawer={setNewStageDrawer}/>
                </div>
            </div>
        </Drawer>
    )
}

export default AddDrawer