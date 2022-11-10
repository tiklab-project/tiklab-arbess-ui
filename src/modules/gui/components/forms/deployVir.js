import React from "react";
import {Form} from "antd";
import Mirror from "./mirror";
import Inputs from "./inputs";


const DeployVir = props =>{

    const {configDatastore} = props

    const {virShellBlock,deployType,setVirShellBlock} = configDatastore
    
    return(
        <>
            <Inputs
                placeholder={"/ 启动文件地址"}
                label={"启动文件地址"}
                name={"startAddress"}
                mode={deployType}
                addonbefore={"/"}
                isValid={true}
            />
            <Form.Item name={"startOrder"} label="启动命令" >
                <Mirror
                    name={"startOrder"}
                    type={deployType}
                    shellBlock={virShellBlock}
                    setShellBlock={setVirShellBlock}
                />
            </Form.Item>
        </>
    )
}

export default DeployVir