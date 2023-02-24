import React from "react";
import {Form} from "antd";
import Mirror from "../basic/mirror";
import Inputs from "../basic/inputs";


const DeployVir = props =>{

    const {dataItem} = props

    return(
        <>
            <Inputs
                name={"startAddress"}
                placeholder={"/ 启动文件地址"}
                label={"启动文件地址"}
                addonBefore={"/"}
                isValid={true}
                dataItem={dataItem}
            />
            <Form.Item name={"startOrder"} label="启动命令" >
                <Mirror
                    name={"startOrder"}
                    placeholder={"启动命令"}
                    dataItem={dataItem}
                    mirrorValue={dataItem.startOrder}
                />
            </Form.Item>
        </>
    )
}

export default DeployVir
