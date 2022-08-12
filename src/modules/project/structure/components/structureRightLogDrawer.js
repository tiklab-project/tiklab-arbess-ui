import React from "react";
import "./structureRightLogDrawer.scss";
import {Drawer,Button} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import ConfigName from "../../../config/common/component/configCommon/configName";

const StructureRightLogDrawer = props =>{

    const {visible,setVisible,drawerContent} = props

    return(
        <Drawer
            placement="right"
            visible={visible}
            onClose={()=>setVisible(false)}
            closable={false}
            contentWrapperStyle={{width:600,marginTop:55}}
            bodyStyle={{padding:0}}
        >
            <div className="drawers">
                <div className="drawers-head">
                    <div>
                        {drawerContent && drawerContent.taskAlias}
                        &nbsp;--&nbsp;
                        <ConfigName type={drawerContent.taskType}/>
                    </div>
                    <div>
                        <Button type="text" onClick={()=>setVisible(false)}>
                            <CloseOutlined />
                        </Button>
                    </div>
                </div>
                <div className="drawers-body">
                    <div className="log">
                        <div className="log-content">
                            {drawerContent && drawerContent.runLog}
                        </div>
                    </div>
                 </div>
            </div>
        </Drawer>
    )
}

export default StructureRightLogDrawer