import React from "react";
import {Drawer,Button} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import ConfigName from "../../../../common/configName/configName";

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
                    <div className="log" style={{padding:20}}>
                        <div className="log-content" style={{whiteSpace:"pre-wrap"}}>
                            {drawerContent && drawerContent.runLog}
                        </div>
                    </div>
                 </div>
            </div>
        </Drawer>
    )
}

export default StructureRightLogDrawer