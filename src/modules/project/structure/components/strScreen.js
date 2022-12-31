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
            <Select
                showSearch
                suffixIcon={<CaretDownOutlined />}
                placeholder={"执行人"}
                onChange={value=>changValue(value,"userId")}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option key={"全部"} value={null}>全部执行人</Option>
                {
                    pipelineUserList && pipelineUserList.map(item=>{
                        return <Option key={item.id} value={item.user && item.user.id}>{item.user && item.user.nickname}</Option>
                    })
                }
            </Select>
            <Select
                suffixIcon={<CaretDownOutlined />}
                placeholder={"状态"}
                onChange={value=>changValue(value,"state")}
            >
                <Select.Option key={"0"} value={0}>全部状态</Select.Option>
                <Select.Option key={"1"} value={1}>失败</Select.Option>
                <Select.Option key={"10"} value={10}>成功</Select.Option>
                <Select.Option key={"20"} value={20}>终止</Select.Option>
            </Select>
            <Select
                suffixIcon={<CaretDownOutlined />}
                placeholder={"执行方式"}
                onChange={value=>changValue(value,"type")}
            >
                <Select.Option key={"0"} value={0}>全部执行方式</Select.Option>
                <Select.Option key={"1"} value={1}>手动</Select.Option>
                <Select.Option key={"2"} value={2}>自动</Select.Option>
            </Select>
        </div>
    )
}

export default StrScreen