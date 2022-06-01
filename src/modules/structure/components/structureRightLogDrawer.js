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
                <div className='wrapper-body'>
                    <div className='log'>
                        <div className='log-title'>{configName(drawerContent && drawerContent.taskType)} :</div>
                        <div className='log-content'> {drawerContent && drawerContent.runLog} </div>
                    </div>
                 </div>
            </div>
        </Drawer>
    )
}

export default StructureRightLogDrawer