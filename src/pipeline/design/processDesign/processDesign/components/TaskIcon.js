import React from "react";
import maven from "../../../../../assets/images/img/maven.png";
import nexus from "../../../../../assets/images/img/nexus.png";
import pip_helmet from "../../../../../assets/images/svg/pip_helmet.svg"
import testonImg from 'tiklab-eam-ui/es/assests/img/teston.png';
import pip_config from "../../../../../assets/images/svg/pip_config.svg";

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

    const renderImg = img => <img src={img} alt="maven" style={{width:16,height:16}}/>

    const iconType = type =>{
        switch (type) {
            case 'git':  return renderIcon("git")
            case 'gitee':  return renderIcon("gitee")
            case 'github':  return renderIcon("github")
            case 'gitlab':  return renderIcon("gitlab")
            case 'svn':  return renderIcon("SVN")
            case 'xcode':  return renderImg(pip_helmet)
            case 'maventest': return renderIcon("ceshi")
            case 'teston': return renderImg(testonImg)
            case 'maven': return renderImg(maven)
            case 'nodejs': return renderIcon("nodejs")
            case 'liunx': return renderIcon("xuniji")
            case 'docker': return renderIcon("docker")
            case 'sonar': return renderIcon("sonarqube")
            case 'nexus': return renderImg(nexus)
            case 'ssh': return renderIcon("ssh")
            case 'xpack': return renderImg(pip_config)
            case 'message': return renderIcon("mes")
            case 'bat': return renderIcon("jiaoben")
            case 'shell': return renderIcon("jiaoben")
            case 81: return renderIcon("chufa")

        }
    }

    return  <>
                {iconType(type)}
            </>

}

export default TaskIcon
