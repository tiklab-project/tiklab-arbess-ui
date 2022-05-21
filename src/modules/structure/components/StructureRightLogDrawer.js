import React from "react";
import { Drawer ,Button} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import './structure_right_logDrawer.scss'

const StructureRightLogDrawer = props =>{
    const {visible,setVisible,drawer,taskAlias} = props

    return(
        <Drawer
            placement='right'
            visible={visible}
            onClose={()=>setVisible(false)}
            closable={false}
            style={{whiteSpace: 'pre-wrap',marginTop:51}}
        >
            <div className='wrapper-head'>
                <div>{taskAlias}</div>
                <div>
                    <Button type='text' onClick={()=>setVisible(false)}>
                        <CloseOutlined />
                    </Button>
                </div>
            </div>
            <div className='wrapper-body'>
                {drawer}
            </div>
        </Drawer>
    )
}

export default StructureRightLogDrawer