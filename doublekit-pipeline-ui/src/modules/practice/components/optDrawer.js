import React,{useState} from "react";
import {Drawer,Card} from "antd";
import './optDrawer.scss'

const OptDrawer = props =>{

    const {visible,setVisible,setData} = props

    const add = () =>{
        setData('单元测试');
        setVisible(false)
    }

    return(
        <Drawer
            placement='right'
            onClose={()=>setVisible(false)}
            visible={visible}
            style={{marginTop:50}}
        >
            <Card
                style={{ width: 200 }}
                hoverable={true}
                onClick={add}
            >
                单元测试
            </Card>
        </Drawer>
    )
}

export default OptDrawer