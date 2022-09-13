import React from "react";
import {Drawer,Button} from "antd";
import {CloseOutlined} from "@ant-design/icons";

const WorkSpaceDrawer = props =>{

    const {detailsDrawer,setDetailsDrawer,drawerContent} = props

    return(
        <Drawer
            placement="right"
            visible={detailsDrawer}
            onClose={()=>setDetailsDrawer(false)}
            closable={false}
            contentWrapperStyle={{width:600,marginTop:55}}
            bodyStyle={{padding:0}}
        >
            <div className="drawers">
                <div className="drawers-head">
                    <div>{drawerContent.title ? drawerContent.title:drawerContent.commitTime}</div>
                    <div>
                        <Button type="text" onClick={()=>setDetailsDrawer(false)}>
                            <CloseOutlined />
                        </Button>
                    </div>
                </div>
                <div className="drawers-body">
                    <div className="log" style={{padding:20}}>
                        <div className="log-content" style={{whiteSpace:"pre-wrap"}}>
                            {drawerContent.commitFile && drawerContent.commitFile.map((item,index)=>{
                                return <div key={index}>{drawerContent.title ? null : `${index+1}、`}{item}</div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default WorkSpaceDrawer