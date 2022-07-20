import React,{useEffect,useState} from "react";
import {Select} from "antd";

const {Option} = Select;

const StructureLeftDropdown = props =>{

    const {findPageHistory,state,setState,enforcer,setEnforcer,index,setIndex,mode,setMode,
        pipelineUserList,setPageCurrent} = props

    const [statusValue,setStatus] = useState("")
    const [userValue,setUserValue] = useState("")
    const [modeValue,setModeValue] = useState("")
    const pipelineId = localStorage.getItem("pipelineId")

    useEffect(()=>{
        setStatus("状态")
        setUserValue("执行人")
        setModeValue("执行方式")
    },[pipelineId])

    let params = null
    const change = () =>{
        setPageCurrent(1)
        findPageHistory(params).then(()=>{
            if(index!==0){
                setIndex(1)
            }
        })
    }

    const changeState = (value,e) =>{
        setStatus(value)
        setState(parseInt(e.key))
        params = {
            pipelineId:pipelineId,
            state:e.key,
            userId:enforcer,
            type:mode,
            pageParam: {
                pageSize: 10,
                currentPage: 1
            }
        }
        change()
    }

    const changeEnforcer = (value,e) =>{
        if(e.key==="全部"){
            e.key=null
        }
        setUserValue(value)
        setEnforcer(e.key)
        params = {
            pipelineId:pipelineId,
            state:state,
            userId:e.key,
            type:mode,
            pageParam: {
                pageSize: 10,
                currentPage: 1
            }
        }
        change()
    }

    const changeMode = (value,e) =>{
        setModeValue(value)
        setMode(parseInt(e.key))
        params = {
            pipelineId:pipelineId,
            state:state,
            userId:enforcer,
            type:e.key,
            pageParam: {
                pageSize: 10,
                currentPage:1
            }
        }
        change()
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
            type:30,
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
                <Select  style={{width:110,marginRight:10}}
                         value={statusValue}
                         onChange={(value,e)=>changeState(value,e)}
                >
                    {
                        stateList.map(item=>{
                            return <Option key={ item.type } value= {item.tpl}>{item.tpl}</Option>
                        })
                    }
                </Select>
                <Select  style={{width:110,marginRight:10}} 
                         value={userValue}
                         onChange={(value,e)=>changeEnforcer(value,e)}
                >
                    <Option key={"全部"} value={"全部"}>全部</Option>
                    {
                        pipelineUserList && pipelineUserList.map(item=>{
                            return <Option key={ item.user.id } value= {item.user.name}>{item.user && item.user.name}</Option>
                        })
                    }
                </Select>
                <Select  style={{width:110,marginRight:10}}  
                         value={modeValue} 
                         onChange={(value,e)=>changeMode(value,e)}
                >
                    {
                        modeList.map(item=>{
                            return <Option key={ item.type } value= {item.tpl}> {item.tpl} </Option>
                        })
                    }
                </Select>
            </div>
        </div>
    )
}

export default StructureLeftDropdown