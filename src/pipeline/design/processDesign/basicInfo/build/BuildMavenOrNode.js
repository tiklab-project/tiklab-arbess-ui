import React from "react";
import {Form} from "antd";
import Mirror from "../CodeBlock";
import FormsInput from "../FormsInput";

/**
 * 构建
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const BuildMavenOrNode = props =>{

    return(
        <>
            <FormsInput
                name={"buildAddress"}
                placeholder={`"\/\" 代表当前源的根目录`}
                label={"模块地址"}
                addonBefore={"/"}
            />

            <Form.Item name={"buildOrder"} label="执行命令">
                <Mirror
                    name={"buildOrder"}
                    placeholder={"执行命令"}
                />
            </Form.Item>
        </>
    )
}

export default BuildMavenOrNode
