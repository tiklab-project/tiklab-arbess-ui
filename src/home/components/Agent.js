import React from 'react';
import BreadCrumb from "../../common/component/breadcrumb/BreadCrumb";
import AgentList from "../../common/component/list/AgentList";

const Agent = props => {
    return (
        <div className='agent'>
            <div className='agent-content home-limited'>
                <BreadCrumb firstItem={'待办'}/>

            </div>
        </div>
    )
}

export default Agent
