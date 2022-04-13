import React ,{useState} from "react";
import {Button, Drawer,Tree} from "antd";
import {CloseOutlined} from "@ant-design/icons";

const ChangeConfigSorts_drawer = props =>{

    const {changeSortVisible,setChangeSortVisible,data} = props

    return (
        <Drawer
            placement="right"
            style={{marginTop:51}}
            closable={false}
            onClose={()=>setChangeSortVisible(false)}
            visible={changeSortVisible}
        >
            <div className='opt_drawer-top'>
                <div>更改配置顺序</div>
                <div>
                    <Button type="text" onClick={()=>setChangeSortVisible(false)}>
                        <CloseOutlined />
                    </Button>
                </div>
            </div>
            <div style={{padding:20}}>
                {data && data.map((item,index)=>{
                    return(
                        <div key={index}>
                            {item.title}--{item.desc}
                        </div>
                    )
                })}
            </div>
        </Drawer>
    )
}

export default ChangeConfigSorts_drawer