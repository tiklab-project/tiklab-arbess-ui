import React from "react";

const WorkLine = props => {

    const {icon,title} = props

    return <div className="workSpace-title --mf-first-level-title">
                {icon}
                <span className="workSpace-title-name">
                    {title}
                </span>
            </div>
}

export default WorkLine