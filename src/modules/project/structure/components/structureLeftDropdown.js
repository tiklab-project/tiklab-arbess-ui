import React ,{useState} from "react";
import { Select  } from 'antd';

const { Option } = Select;

const StructureLeftDropdown = props =>{

    const {findPageHistory,state,setState,enforcer,setEnforcer,mode,setMode} = props
    const pipelineId = localStorage.getItem('pipelineId')

    let params = null
    const change = () =>{
        findPageHistory(params)
    }

    const changeState = (value,e) =>{
        setState(parseInt(e.key))
        params = {
            pipelineId:pipelineId,
            state:e.key,
            name:enforcer,
            type:mode,
            pageParam: {
                pageSize: 10,
                currentPage: 1
            }
        }
        change()
    }

    const changeEnforcer = (value,e) =>{
        if(value==='全部'){
            value=null
        }
        setEnforcer(value)
        params = {
            pipelineId:pipelineId,
            state:state,
            name:value,
            type:mode,
            pageParam: {
                pageSize: 10,
                currentPage: 1
            }
        }
        change()
    }

    const changeMode = (value,e) =>{
        setMode(parseInt(e.key))
        params = {
            pipelineId:pipelineId,
            state:state,
            name:enforcer,
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
            tpl:'全部',
        },
        {
            type:1,
            tpl:'失败',
        },
        {
            type:20,
            tpl:'停止',
        },
        {
            type:30,
            tpl:'成功',
        },
    ]
    //执行人
    const enforcerList = [
        {   type:0,
            tpl:'全部',
        },
        {
            type:1,
            tpl:'admin',
        },
    ]
    //执行方式
    const modeList = [
        {   type:0,
            tpl:'全部',
        },
        {
            type:1,
            tpl:'手动',
        },
        {
            type:2,
            tpl:'自动',
        },
    ]

    return(
        <div className='structure-content-left-dropdown'>
            <div className='dropdown'>
                <Select  style={{width:110,marginRight:10}} defaultValue='状态'
                         onChange={(value,e)=>changeState(value,e)}
                >
                    {
                        stateList.map(item=>{
                            return <Option key={ item.type } value= {item.tpl}>{item.tpl}</Option>
                        })
                    }
                </Select>
                <Select  style={{width:110,marginRight:10}}  defaultValue='执行人'
                         onChange={(value,e)=>changeEnforcer(value,e)}
                >
                    {
                        enforcerList.map(item=>{
                            return <Option key={ item.type } value= {item.tpl}>{item.tpl}</Option>
                        })
                    }
                </Select>
                <Select  style={{width:110,marginRight:10}}  defaultValue='执行方式'
                         onChange={(value,e)=>changeMode(value,e)}
                >
                    {
                        modeList.map(item=>{
                            return <Option key={ item.type } value= {item.tpl}>{item.tpl}</Option>
                        })
                    }
                </Select>
            </div>
        </div>
    )
}

export default StructureLeftDropdown