import React from 'react';
import BreadcrumbContent from "../../common/breadcrumb/Breadcrumb";
import AgentList from "../../common/list/AgentList";

const AgentDetail = props => {
    return (
        <div className='agent'>
            <div className='agent-content home-limited'>
                <BreadcrumbContent firstItem={'代办'}/>

            </div>
        </div>
    )
}

export default AgentDetail
