import React from "react";
import {Button,Input,Select} from "antd";

const EnviSwitch = props =>{

    const {add} = props

    return(
        <div className="envi-content-switch">
            <div className="envi-content-switch-left">
                <div className="switch-left">
                    <Select style={{width:150}} placeholder={"类型"}>
                        <Select.Option value={0}>全部</Select.Option>
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
                    />
                </div>
            </div>
            <div>
                <Button onClick={()=>add()} type="primary">添加配置</Button>
            </div>
        </div>
    )
}

export default EnviSwitch