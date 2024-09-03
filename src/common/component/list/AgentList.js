import React from "react";
import ListEmpty from "./ListEmpty";
import Profile from "../profile/Profile";

/**
 * 待办
 */
const AgentList = props => {

    const {agentList} = props

    const renderAgent = item =>{
        const {actionType,action,user,createTime,data} = item
        const dataObj = data && JSON.parse(data)
        return (
            <div key={item.id} className="agent-item" onClick={()=>goDynaLink(item)}>
                <div className="agent-item-data">
                    <Profile
                        userInfo={user}
                    />
                    <div className='item-data-info'>
                        <div className='item-data-info-name'>{user?.nickname || user?.name} {actionType?.name}</div>
                        <div className='item-data-info-desc'>
                            <div className='desc-action'> {action}</div>
                            {
                                dataObj?.message &&
                                <div className='desc-message'>{dataObj.message}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="agent-item-time">{createTime}</div>
            </div>
        )
    }

    return (
        <div className='arbess-agent-center'>
            {
                agentList && agentList.length>0 ?
                    agentList.map(item=>renderAgent(item))
                    :
                    <ListEmpty />
            }
        </div>
    )
}

export default AgentList
