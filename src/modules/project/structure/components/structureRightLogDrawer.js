import React from "react";
import { Drawer ,Button} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import './structureRightLogDrawer.scss';
import ConfigName from "../../../config/common/component/configCommon/configName";

const StructureRightLogDrawer = props =>{

    const {visible,setVisible,drawerContent} = props

    return(
        <Drawer
            placement='right'
            visible={visible}
            onClose={()=>setVisible(false)}
            closable={false}
            width={600}
        >
            <div className="wrapper">
                <div className='wrapper-head'>
                    <div>{drawerContent && drawerContent.taskAlias}</div>
                    <div>
                        <Button type='text' onClick={()=>setVisible(false)}>
                            <CloseOutlined />
                        </Button>
                    </div>
                </div>
                <div className='wrapper-title'>
                    <ConfigName type={drawerContent.taskType}/>:
                </div>
                <div className='wrapper-body'>
                    <div className='log'>
                        <div className='log-content'> {drawerContent && drawerContent.runLog} </div>
                    </div>
                 </div>
            </div>
        </Drawer>
    )
}

export default StructureRightLogDrawer