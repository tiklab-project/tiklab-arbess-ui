import React from "react";
import {Drawer} from "antd";
import ModalTitle from "../../../../common/modalTitle/modalTitle";
import Subtitle from "../../../config/components/formTitle/subtitle";
import HlineIcon from "../../../config/components/formTitle/hlineIcon";

const StructureRightLogDrawer = props =>{

    const {visible,setVisible,drawerContent} = props

    return(
        <Drawer
            placement="right"
            visible={visible}
            onClose={()=>setVisible(false)}
            closable={false}
            style={{marginTop:50,height:"calc(100vh - 50px)"}}
            contentWrapperStyle={{width:600}}
        >
            <div className="drawers">
                <ModalTitle
                    title={
                            <>
                                <HlineIcon type={drawerContent.taskType}/>
                                &nbsp;--&nbsp;
                                <Subtitle type={drawerContent.taskType}/>
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