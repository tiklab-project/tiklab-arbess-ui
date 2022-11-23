import React,{useEffect,useState} from "react";
import {Select} from "antd";
import {CaretDownOutlined} from "@ant-design/icons";

const {Option} = Select;

const StructureLeftDropdown = props =>{

    const {setState,setEnforcer,setMode,pipelineUserList,pipelineId,changPage} = props

    const [statusValue,setStatusValue] = useState("")
    const [userValue,setUserValue] = useState("")
    const [modeValue,setModeValue] = useState("")

    useEffect(()=>{
        setStatusValue("状态")
        setUserValue("执行人")
        setModeValue("执行方式")
    },[pipelineId])
    
    const changValue = (value,field) => {
        changPage(1)
        switch (field) {
            case "state":
                setStatusValue(value)
                setState(value)
                break
            case "userId":
                setUserValue(value)
                setEnforcer(value)
                break
            case "type":
                setModeValue(value)
                setMode(value)
        }
    }

    //状态
    const stateList = [
        {   type:0,
            tpl:"全部",
        },
        {
            type:1,
            tpl:"失败",
        },
        {
            type:20,
            tpl:"停止",
        },
        {
            type:10,
            tpl:"成功",
        },
    ]

    //执行方式
    const modeList = [
        {   type:0,
            tpl:"全部",
        },
        {
            type:1,
            tpl:"手动",
        },
        {
            type:2,
            tpl:"自动",
        },
    ]

    return(
        <div className="structure-content-left-dropdown">
            <div className="dropdown">
                <Select
                    style={{width:135,marginRight:10}}
                    bordered={false}
                    suffixIcon={<CaretDownOutlined />}
                    value={statusValue}
                    onChange={value=>changValue(value,"state")}
                >
                    {
                        stateList.map(item=>{
                            return <Option key={item.type} value={item.type}>{item.tpl}</Option>
                        })
                    }
                </Select>
                <Select
                    style={{width:140,marginRight:10}}
                    bordered={false}
                    suffixIcon={<CaretDownOutlined />}
                    value={userValue}
                    onChange={value=>changValue(value,"userId")}
                >
                    <Option key={"全部"} value={null}>全部</Option>
                    {
                        pipelineUserList && pipelineUserList.map(item=>{
                            return <Option key={item.id} value={item.id}>{item.nickname}</Option>
                        })
                    }
                </Select>
                <Select
                    style={{width:135,marginRight:10}}
                    bordered={false}
                    suffixIcon={<CaretDownOutlined />}
                    value={modeValue}
                    onChange={value=>changValue(value,"type")}
                >
                    {
                        modeList.map(item=>{
                            return <Option key={item.type} value={item.type}>{item.tpl}</Option>
                        })
                    }
                </Select>
            </div>
        </div>
    )
}

export default StructureLeftDropdown