import React from "react";
import {Select} from "antd";
import {CaretDownOutlined} from "@ant-design/icons";

const {Option} = Select;

const StrScreen = props =>{

    const {setState,setEnforcer,setType,pipelineUserList,changPage} = props

    const changValue = (value,field) => {
        changPage(1)
        switch (field) {
            case "state":
                setState(value)
                break
            case "userId":
                setEnforcer(value)
                break
            case "type":
                setType(value)
        }
    }

    return(
        <div className="str-screens">
            <div className="str-screen">
                <div className="str-screen-user">
                    执行人
                </div>
                <Select
                    suffixIcon={<CaretDownOutlined />}
                    placeholder={"待选择"}
                    onChange={value=>changValue(value,"userId")}
                >
                    <Option key={"全部"} value={null}>全部</Option>
                    {
                        pipelineUserList && pipelineUserList.map(item=>{
                            return <Option key={item.id} value={item.id}>{item.nickname}</Option>
                        })
                    }
                </Select>
            </div>
            <div className="str-screen">
                <div className="str-screen-state">
                    运行状态
                </div>
                <Select
                    suffixIcon={<CaretDownOutlined />}
                    placeholder={"待选择"}
                    onChange={value=>changValue(value,"state")}
                >
                    <Select.Option key={"0"} value={0}>全部</Select.Option>
                    <Select.Option key={"1"} value={1}>失败</Select.Option>
                    <Select.Option key={"10"} value={10}>成功</Select.Option>
                    <Select.Option key={"20"} value={20}>终止</Select.Option>
                </Select>
            </div>
            <div className="str-screen">
                <div className="str-screen-type">
                    触发方式
                </div>
                <Select
                    suffixIcon={<CaretDownOutlined />}
                    placeholder={"待选择"}
                    onChange={value=>changValue(value,"type")}
                >
                    <Select.Option key={"0"} value={0}>全部</Select.Option>
                    <Select.Option key={"1"} value={1}>手动</Select.Option>
                    <Select.Option key={"2"} value={2}>自动</Select.Option>
                </Select>
            </div>
        </div>
    )
}

export default StrScreen