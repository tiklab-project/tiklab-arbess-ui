import React from "react";
import { Drawer ,Button} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import "../../structure/components/structureRightLogDrawer.scss";

const WorkSpaceDrawer = props =>{

    const {detailsDrawer,setDetailsDrawer,drawerContent} = props

    return(
        <Drawer
            placement="right"
            visible={detailsDrawer}
            onClose={()=>setDetailsDrawer(false)}
            closable={false}
            width={700}
        >
            <div className="wrapper-head">
                <div>{ drawerContent.title ? drawerContent.title :drawerContent.commitTime }</div>
                <div>
                    <Button type="text" onClick={()=>setDetailsDrawer(false)}>
                        <CloseOutlined />
                    </Button>
                </div>
            </div>
            <div className="wrapper-body">
                <div className="log">
                    <div className="log-content">
                        {drawerContent.commitFile && drawerContent.commitFile.map((item, index) => {
                            return(
                                <div key={index}>
                                    {drawerContent.title ? null : `${index}、`}{item}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default WorkSpaceDrawer