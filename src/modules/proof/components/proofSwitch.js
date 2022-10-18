import React from "react";
import {Input,Select} from "antd";
import AddProofButton from "./addProofButton";

const ProofSwitch = props =>{

    const {pipelineList} = props

    return(
        <div className="proof-content-switch">
            <div className="proof-content-switch-left">
                <div className="switch-left">
                    <Select style={{width:150}} placeholder={"创建人"}>
                        <Select.Option value={1}>全部</Select.Option>
                        <Select.Option value={2}>我创建的</Select.Option>
                    </Select>
                </div>
                <div className="switch-left">
                    <Select style={{width:150}} placeholder={"类型"}>
                        <Select.Option value={1}>全部</Select.Option>
                        <Select.Option value={2}>password</Select.Option>
                        <Select.Option value={3}>ssh</Select.Option>
                    </Select>
                </div>
                <div className="switch-left">
                    <Input
                        placeholder={"名称"}
                        style={{width:300}}
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