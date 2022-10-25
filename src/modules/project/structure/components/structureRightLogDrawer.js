import React from "react";
import {Drawer} from "antd";
import ModalTitle from "../../../../common/modalTitle/modalTitle";
import ConfigName from "../../../../common/configName/configName";
import TitleType from "../../../../common/configName/titleType";

const StructureRightLogDrawer = props =>{

    const {visible,setVisible,drawerContent} = props

    return(
        <Drawer
            placement="right"
            visible={visible}
            onClose={()=>setVisible(false)}
            closable={false}
            style={{marginTop:55}}
            contentWrapperStyle={{width:600}}
        >
            <div className="drawers">
                <ModalTitle
                    title={
                            <>
                                <TitleType type={drawerContent.taskType}/>
                                &nbsp;--&nbsp;
                                <ConfigName type={drawerContent.taskType}/>
                            </>
                    }
                    setVisible={setVisible}
                />
                <div className="drawers-body">
                    <div className="log">
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