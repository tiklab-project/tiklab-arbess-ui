import React from "react";
import {Drawer} from "antd";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import Subtitle from "../../../config/common/components/subtitle";
import HlineIcon from "../../../config/common/components/hlineIcon";

const StructureRightLogDrawer = props =>{

    const {visible,setVisible,drawerContent} = props

    return(
        <Drawer
            placement="right"
            visible={visible}
            onClose={()=>setVisible(false)}
            closable={false}
            maskStyle={{background:"transparent"}}
            contentWrapperStyle={{width:700,top:48,height:"calc(100% - 48px)"}}
            bodyStyle={{padding:0}}
            className="mf"
        >
            <div className="structureModal">
                <div className="structureModal-up">
                    <ModalTitle
                        setVisible={setVisible}
                        title={
                            <>
                                <HlineIcon type={drawerContent.taskType}/>
                                &nbsp;-- &nbsp;
                                <Subtitle type={drawerContent.taskType}/>
                            </>
                        }
                    />
                </div>
                <div className="structureModal-content">
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