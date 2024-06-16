import React,{useEffect,useState} from "react";
import {Select} from "antd";
import agentStore from "../../../setting/configure/agent/store/AgentStore";

const DesignAgent = (props) => {

    const {defaultAgent,setDefaultAgent} = props;

    const {findAgentList} = agentStore;

    //agent列表
    const [agentList,setAgentList] = useState([]);
    // 是否显示下拉图标
    const [showArrow,setShoeArrow] = useState(false)

    useEffect(()=>{
        findAgentList().then(res=>{
            if(res.code===0){
                setAgentList(res.data)
                const defaultAgent = res?.data.find(item=>item.businessType==='default')
                setDefaultAgent(defaultAgent.id)
            }
        })
    },[])

    return (
        <Select
            showSearch
            showArrow={showArrow}
            onMouseEnter={()=>setShoeArrow(true)}
            onMouseLeave={()=>setShoeArrow(false)}
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
        </Select>
    )
}


export default DesignAgent
