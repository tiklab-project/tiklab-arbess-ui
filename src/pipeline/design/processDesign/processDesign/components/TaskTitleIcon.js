import React from "react";
import maven from "../../../../../assets/images/img/maven.png";
import nexus from "../../../../../assets/images/img/nexus.png";
import pip_helmet from "../../../../../assets/images/svg/pip_helmet.svg"
import pip_config from "../../../../../assets/images/svg/pip_config.svg"
import testonImg from 'tiklab-eam-ui/es/assests/img/teston.png';

/**
 * task的标题&&图标
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TaskTitleIcon = props =>{

    const {type} = props

    const renderSubIcon = (icon,title) =>{
        return <>
            <span className="subicon-icon" style={{paddingRight:8}}>
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`#icon-${icon}`} />
                </svg>
            </span>
            <span className="subicon-title">{title}</span>
        </>
    }

    const renderSubImg = (img,title) =>{
        return (
            <>
                <img src={img} alt="maven" style={{width:25,height:20,paddingRight:8}}/>
                <span className="subicon-title">{title}</span>
            </>
        )
    }

    const subIconType = type =>{
        switch (type) {
            case 'git': return renderSubIcon("git","通用Git")
            case 'gitee': return renderSubIcon("gitee","Gitee")
            case 'github': return renderSubIcon("github","Github")
            case 'gitlab': return renderSubIcon("gitlab","Gitlab")
            case 'svn': return renderSubIcon("SVN","SVN")
            case 'xcode': return renderSubImg(pip_helmet,"XCode")
            case 'maventest': return renderSubIcon("ceshi","maven单元测试")
            case 'teston': return renderSubImg(testonImg,"testOn自动化测试")
            case 'maven': return renderSubImg(maven,"maven构建")
            case 'nodejs': return renderSubIcon("nodejs","Node")
            case 'liunx': return renderSubIcon("xuniji","虚拟机")
            case 'docker': return renderSubIcon("docker","Docker")
            case 'sonar': return renderSubIcon("sonarqube","SonarQuebe")
            case 'nexus': return renderSubImg(nexus,"nexus",)
            case 'ssh': return renderSubIcon("ssh","SSH")
            case 'xpack': return renderSubImg(pip_config,"XPack")
            case 'message': return renderSubIcon("mes","消息通知")
            case 'bat': return renderSubIcon("jiaoben","执行bat脚本")
            case 'shell': return renderSubIcon("jiaoben","执行shell脚本")
            case 81: return renderSubIcon("chufa","定时触发")
        }
    }

    return  <>
                {subIconType(type)}
            </>
}

export default TaskTitleIcon
