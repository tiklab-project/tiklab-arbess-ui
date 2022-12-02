import React from "react";
import {Form} from "antd";
import {observer} from "mobx-react";
import Mirror from "./mirror";
import Inputs from "./inputs";

const BuildMavenOrNode = props =>{


    return(
        <>
            <Inputs
                placeholder={`"\/\" 代表当前源的根目录`}
                label={"文件地址"}
                name={"buildAddress"}
                addonbefore={"/"}
            />

            <Form.Item name={"buildOrder"}label="执行命令">
                <Mirror
                    name={"buildOrder"}
                    placeholder={"执行命令"}
                />
            </Form.Item>
        </>
    )
}

export default BuildMavenOrNode
