import React from "react";
import EmptyText from "../emptyText/EmptyText";

const AgentList = props => {

    const {agentList} = props

    const renderAgent = item =>{
        return (
            <div key={item.id} className='agent-item'>
                <div dangerouslySetInnerHTML={{__html: item.data}}/>
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
                    <EmptyText title={"暂无代办"}/>
            }
        </div>
    )
}

export default AgentList
