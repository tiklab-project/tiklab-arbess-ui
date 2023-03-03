import React from "react";
import {Form} from "antd";
import Mirror from "../CodeBlock";
import FormsItem from "../FormsItem";

/**
 * 部署 -- Vir
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DeployVir = props =>{

    return(
        <>
            <FormsItem
                name={"startAddress"}
                placeholder={"/ 启动文件地址"}
                label={"启动文件地址"}
                addonBefore={"/"}
                isValid={true}
            />
            <Form.Item name={"startOrder"} label="启动命令" >
                <Mirror
                    name={"startOrder"}
                    placeholder={"启动命令"}
                />
            </Form.Item>
        </>
    )
}

export default DeployVir
