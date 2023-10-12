import React from "react";
import ListEmpty from "./ListEmpty";

/**
 * 代办列表
 */
const AgentList = props => {

    const {agentList} = props

    const renderAgent = item =>{
        return (
            <div key={item.id} className='agent-item'>
                <div className="agent-item-data">
                    <div dangerouslySetInnerHTML={{__html: item.data}}/>
                </div>
                <div className="agent-item-time">{item.createTime}</div>
            </div>
        )
    }

    return (
        <div className='agent-center'>
            {
                agentList && agentList.length>0 ?
                    agentList.map(item=>renderAgent(item))
                    :
                    <ListEmpty title={"暂无代办"}/>
            }
        </div>
    )
}

export default AgentList
