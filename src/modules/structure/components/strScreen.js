import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {CaretDownOutlined} from "@ant-design/icons";
import "./strScreen.scss";

const {Option} = Select;

const StrScreen = props =>{

    const {id,changPage,findPageHistory,findUserAllHistory,pipelineList,pipelineUserList} = props

    const [pipelineId,setPipelineId] = useState("")
    const [state,setState] = useState(0)
    const [userId,setUseId] = useState(null)
    const [type,setType] = useState(0)

    useEffect(()=>{
        if(id){
            setPipelineId(id)
        }
    },[pipelineId])

    const params = {
        pipelineId:pipelineId,
        state:state,
        userId:userId,
        type:type
    }
    const changValue = (value,field) => {
        changPage(1)
        params[field] = value
        switch (field) {
            case 'pipelineId':
                setPipelineId(value)
                break
            case 'state':
                setState(value)
                break
            case 'userId':
                setUseId(value)
                break
            case 'type':
                setType(value)
        }
        if(pipelineList){
            findUserAllHistory()
        }
        else {
            findPageHistory(params)
        }
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
