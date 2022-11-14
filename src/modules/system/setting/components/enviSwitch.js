import React from "react";
import {Input,Select} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const EnviSwitch = props =>{

    return(
        <div className="envi-content-switch">
            <div className="envi-content-switch-left">
                <div className="switch-left">
                    <Select style={{width:150}} defaultValue={0}>
                        <Select.Option value={0}>所有类型</Select.Option>
                        <Select.Option value={1}>Git</Select.Option>
                        <Select.Option value={5}>SVN</Select.Option>
                        <Select.Option value={22}>maven</Select.Option>
                        <Select.Option value={21}>node</Select.Option>
                    </Select>
                </div>
                <div className="switch-left">
                    <Input
                        style={{width:300}}
                        placeholder={"名称"}
                        prefix={<SearchOutlined />}
                    />
                </div>
            </div>
        </div>
    )
}

export default EnviSwitch