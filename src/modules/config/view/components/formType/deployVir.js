import React from "react";
import {Form} from "antd";
import Mirror from "./mirror";
import Inputs from "./inputs";


const DeployVir = props =>{

    const {configDataStore} = props

    const {virShellBlock,deployType,setVirShellBlock} = configDataStore
    
    return(
        <>
            <Inputs
                name={"startAddress"}
                placeholder={"/ 启动文件地址"}
                label={"启动文件地址"}
                mode={deployType}
                addonBefore={"/"}
                isValid={true}
            />
            <Form.Item name={"startOrder"} label="启动命令" >
                <Mirror
                    name={"startOrder"}
                    type={deployType}
                    shellBlock={virShellBlock}
                    setShellBlock={setVirShellBlock}
                    placeholder={"启动命令"}
                />
            </Form.Item>
        </>
    )
}

export default DeployVir