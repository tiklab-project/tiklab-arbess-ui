import React from "react";
import {Select} from "antd";
import {CaretDownOutlined} from "@ant-design/icons";
import "./HistoryScreen.scss";

const {Option} = Select;

/**
 * 流水线历史筛选
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HistoryScreen = props =>{

    const {params,setParams,changPage,pipelineList,pipelineUserList} = props

    /**
     * 切换选择框value
     * @param value
     * @param field
     */
    const changValue = (value,field) => {
        setParams({
            ...params,
            [field]:value
        })
        changPage(1)
    }

    return(
        <div className="str-screens">
            {
                pipelineList &&
                <Select
                    showSearch
                    suffixIcon={<CaretDownOutlined />}
                    placeholder={"流水线"}
                    onChange={value=>changValue(value,"pipelineId")}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option key={"全部"} value={null}>全部流水线</Option>
                    {
                        pipelineList && pipelineList.map(item=>(
                            <Option key={item.id} value={item.id}>{item.name}</Option>
                        ))
                    }
                </Select>
            }
            {
                pipelineUserList &&
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
                        pipelineUserList && pipelineUserList.map(item=>(
                            <Option key={item.id} value={item.user && item.user.id}>{item.user && item.user.nickname}</Option>
                        ))
                    }
                </Select>
            }
            <Select
                suffixIcon={<CaretDownOutlined />}
                placeholder={"状态"}
                onChange={value=>changValue(value,"state")}
            >
                <Option key={"0"} value={null}>全部状态</Option>
                <Option key={"1"} value={"error"}>失败</Option>
                <Option key={"10"} value={"success"}>成功</Option>
                <Option key={"20"} value={"halt"}>终止</Option>
                <Option key={"30"} value={"run"}>运行中</Option>
            </Select>
            <Select
                suffixIcon={<CaretDownOutlined />}
                placeholder={"执行方式"}
                onChange={value=>changValue(value,"type")}
            >
                <Option key={"0"} value={0}>全部执行方式</Option>
                <Option key={"1"} value={1}>手动</Option>
                <Option key={"2"} value={2}>自动</Option>
            </Select>
        </div>
    )
}

export default HistoryScreen
