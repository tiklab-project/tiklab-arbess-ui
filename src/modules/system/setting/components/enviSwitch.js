import React from "react";
import {Button, Col, Input, Row, Select} from "antd";

const EnviSwitch = props =>{

    const {add} = props

    const style = "primary"

    return(
        <Row className="envi-content-switch">
            <Col span={8}>
                <Select style={{width:150}} placeholder={"类型"}>
                    <Select.Option value={0}>全部</Select.Option>
                    <Select.Option value={1}>Git</Select.Option>
                    <Select.Option value={5}>SVN</Select.Option>
                    <Select.Option value={22}>maven</Select.Option>
                    <Select.Option value={21}>node</Select.Option>
                </Select>
            </Col>
            <Col span={8}>
                <Input
                    placeholder={"名称"}
                    style={{width:350}}
                />
            </Col>
            <Col span={8}>
                <div className="envi-content-btn">
                    <Button onClick={()=>add()} type={style}>添加配置</Button>
                </div>
            </Col>
        </Row>
    )
}

export default EnviSwitch