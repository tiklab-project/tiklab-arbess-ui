import React from "react";
import {Form} from "antd";
import Mirror from "../basicInfo/mirror";
import Inputs from "../basicInfo/inputs";

const BuildMavenOrNode = props =>{

    const {dataItem} = props

    return(
        <>
            <Inputs
                name={"buildAddress"}
                placeholder={`"\/\" 代表当前源的根目录`}
                label={"模块地址"}
                addonBefore={"/"}
                dataItem={dataItem}
            />

            <Form.Item name={"buildOrder"} label="执行命令">
                <Mirror
                    name={"buildOrder"}
                    placeholder={"执行命令"}
                    dataItem={dataItem}
                    mirrorValue={dataItem.buildOrder}
                />
            </Form.Item>
        </>
    )
}

export default BuildMavenOrNode
