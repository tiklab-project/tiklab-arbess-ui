import React from "react";
import maven from "../../../../../assets/images/img/maven.png";
import nexus from "../../../../../assets/images/img/nexus.png";

/**
 * task图标
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TaskIcon = props =>{

    const {type} = props

    const renderIcon = icon =>{
        return  <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`#icon-${icon}`} />
                </svg>
    }

    const iconType = type =>{
        switch (type) {
            case 1:
                return renderIcon("git")
            case 2:
                return renderIcon("gitee")
            case 3:
                return renderIcon("github")
            case 4:
                return renderIcon("gitlab")
            case 5:
                return renderIcon("SVN")
            case 11:
                return renderIcon("ceshi")
            case 21:
                return <img src={maven} alt="maven" style={{width:16,height:16}}/>
            case 22:
                return renderIcon("nodejs")
            case 31:
                return renderIcon("xuniji")
            case 32:
                return renderIcon("docker")
            case 41:
                return renderIcon("sonarqube")
            case 51:
                return <img src={nexus} alt="nexus" style={{width:14,height:16}}/>
            case 52:
                return renderIcon("ssh")
            case 61:
                return renderIcon("mes")
            case 71:
                return renderIcon("jiaoben")
            case 72:
                return renderIcon("jiaoben")
            case 81:
                return renderIcon("chufa")

        }
    }

    return  <>
                {iconType(type)}
            </>

}

export default TaskIcon
