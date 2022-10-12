import React from "react";
import {Col,Input,Row,Select} from "antd";
import AddProofButton from "./addProofButton";

const ProofSwitch = props =>{

    const {pipelineList} = props

    const style = "primary"

    return(
        <Row className="proof-content-switch">
            <Col span={6}>
                <Select style={{width:150}} placeholder={"创建人"}>
                    <Select.Option value={1}>全部</Select.Option>
                    <Select.Option value={2}>我创建的</Select.Option>
                </Select>
            </Col>
            <Col span={6}>
                <Select style={{width:150}} placeholder={"类型"}>
                    <Select.Option value={1}>全部</Select.Option>
                    <Select.Option value={2}>password</Select.Option>
                    <Select.Option value={2}>ssh</Select.Option>
                </Select>
            </Col>
            <Col span={6}>
                <Input
                    placeholder={"名称"}
                    style={{maxWidth:350}}
                />
            </Col>
            <Col span={6}>
                <div className="proof-content-btn">
                    <AddProofButton style={style} pipelineList={pipelineList}/>
                </div>
            </Col>
        </Row>
    )
}

export default ProofSwitch