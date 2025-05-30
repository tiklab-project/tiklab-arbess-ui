/**
 * @Description: Agent
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/11
 */
import React,{useEffect,useState} from "react";
import {Select} from "antd";
import agentStore from "../../../setting/configure/agent/store/AgentStore";
import SearchSelect from "../../../common/component/search/SearchSelect";

const DesignAgent = (props) => {

    const {defaultAgent,setDefaultAgent} = props;

    const {findAgentList} = agentStore;

    //agent列表
    const [agentList,setAgentList] = useState([]);

    useEffect(()=>{
        //获取agent列表
        findAgentList({
            displayType:'yes'
        }).then(res=>{
            if(res.code===0){
                setAgentList(res.data)
                const defaultAgent = res?.data.find(item=>item.businessType==='default')
                setDefaultAgent(defaultAgent.id)
            }
        })
    },[])

    return (
        <SearchSelect
            showSearch
            className='design-agent'
            value={defaultAgent}
            onChange={value=>setDefaultAgent(value)}
            filterOption = {(input, option) =>
                (Array.isArray(option.children) ? option.children.join('') : option.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {
                agentList && agentList.map(item=>(
                    <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                ))
            }
        </SearchSelect>
    )
}


export default DesignAgent
