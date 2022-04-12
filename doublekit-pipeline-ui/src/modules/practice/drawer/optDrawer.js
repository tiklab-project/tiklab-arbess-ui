import React from "react";
import {Drawer,Button} from "antd";
import './optDrawer.scss'
import {CloseOutlined} from "@ant-design/icons";
import OptDrawer_anchor from "./optDrawer_anchor";
import OptDrawer_main from './optDrawer_main'

const OptDrawer = props =>{

    const {newStageVisible,setNewStageVisible,data,setData,drawerType} = props

    return(
        <Drawer
            placement='right'
            visible={newStageVisible}
            style={{marginTop:51}}
            closable={false}
            width={600}
            onClose={()=>setNewStageVisible(false)}
        >
            <div className='opt_drawer-top'>
                <div>选择任务组</div>
                <div>
                    <Button type="text" onClick={()=>setNewStageVisible(false)}>
                        <CloseOutlined />
                    </Button>
                </div>
            </div>
            <div className='opt_drawer-bottom'>
                <OptDrawer_anchor/>
                <OptDrawer_main
                    // aa={aa}
                    drawerType={drawerType}
                    data={data}
                    setData={setData}
                    setNewStageVisible={setNewStageVisible}
                />
            </div>
        </Drawer>
    )
}

export default OptDrawer