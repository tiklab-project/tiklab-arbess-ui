import React from "react";
import { Drawer ,Button} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import './structureRightLogDrawer.scss'

const StructureRightLogDrawer = props =>{

    const {visible,setVisible,drawerContent,configName} = props

    return(
        <Drawer
            placement='right'
            visible={visible}
            onClose={()=>setVisible(false)}
            closable={false}
            width={600}
            style={{whiteSpace: 'pre-wrap',marginTop:51}}
        >
            <div className='wrapper-head'>
                <div>{drawerContent && drawerContent.taskAlias}</div>
                <div>
                    <Button type='text' onClick={()=>setVisible(false)}>
                        <CloseOutlined />
                    </Button>
                </div>
            </div>
            <div className='wrapper-body'>
                <div className='wrapper-body-title'>{configName(drawerContent && drawerContent.taskType)} :</div>
                <div> {drawerContent && drawerContent.runLog} </div>
            </div>
        </Drawer>
    )
}

export default StructureRightLogDrawer