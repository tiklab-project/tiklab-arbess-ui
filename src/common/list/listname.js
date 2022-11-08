import React from "react";
import "./projectList.scss";

const ProjectList = props => {

    const {text,onClick,colors} = props

    return  <span
                className={`mf-projectList ${onClick?"mf-projectList-href":""}`}
                onClick={onClick}
            >
                <span className={`mf-projectList-icon icon-${colors}`}>
                    {text.substring(0,1).toUpperCase()}
                </span>
                <span className={`${onClick?"mf-projectList-name":""}`}>
                    {text}
                </span>
            </span>
}

export default ProjectList