import React from "react";
import {Drawer} from "antd";
import ModalTitle from "../../../../common/modalTitle/modalTitle";

const WorkSpaceDrawer = props =>{

    const {detailsDrawer,setDetailsDrawer,drawerContent} = props

    return(
        <Drawer
            placement="right"
            visible={detailsDrawer}
            onClose={()=>setDetailsDrawer(false)}
            closable={false}
            style={{marginTop:50,height:"calc(100vh - 50px)"}}
            contentWrapperStyle={{width:600}}
        >
            <div className="drawers">
                <ModalTitle
                    title={drawerContent.title ? drawerContent.title:drawerContent.commitTime}
                    setVisible={setDetailsDrawer}
                />
                <div className="drawers-body">
                    <div className="log">
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