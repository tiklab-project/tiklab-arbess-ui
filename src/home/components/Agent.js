import React from 'react';
import Breadcrumb from "../../common/component/breadcrumb/Breadcrumb";
import AgentList from "../../common/component/list/AgentList";

const Agent = props => {
    return (
        <div className='agent'>
            <div className='agent-content home-limited'>
                <Breadcrumb firstItem={'代办'}/>

            </div>
        </div>
    )
}

export default Agent
