import React from "react";
import {Input,Select} from "antd";
import AddProofButton from "./addProofButton";
import {SearchOutlined} from "@ant-design/icons";

const ProofSwitch = props =>{

    const {pipelineList} = props

    return(
        <div className="proof-content-switch">
            <div className="proof-content-switch-left">
                <div className="switch-left">
                    <Select style={{width:150}} defaultValue={1}>
                        <Select.Option value={1}>所有创建人</Select.Option>
                        <Select.Option value={2}>我创建的</Select.Option>
                    </Select>
                </div>
                <div className="switch-left">
                    <Select style={{width:150}} defaultValue={1}>
                        <Select.Option value={1}>所有类型</Select.Option>
                        <Select.Option value={2}>password</Select.Option>
                        <Select.Option value={3}>ssh</Select.Option>
                    </Select>
                </div>
                <div className="switch-left">
                    <Input
                        placeholder={"名称"}
                        style={{width:300}}
                        prefix={<SearchOutlined />}
                    />
                </div>
            </div>
            <div className="proof-content-btn">
                <AddProofButton style={"primary"} pipelineList={pipelineList}/>
            </div>
        </div>
    )
}

export default ProofSwitch