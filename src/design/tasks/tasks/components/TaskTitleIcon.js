import React from "react";
import maven from "../../../../assets/images/img/maven.png";
import nexus from "../../../../assets/images/img/nexus.png";


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

    const subIconType = type =>{
        switch (type) {
            case 1:
                return renderSubIcon("git","通用git")
            case 2:
                return renderSubIcon("gitee","Gitee")
            case 3:
                return renderSubIcon("github","Github")
            case 4:
                return renderSubIcon("gitlab","Gitlab")
            case 5:
                return renderSubIcon("SVN","SVN")
            case 11:
                return renderSubIcon("ceshi","maven单元测试")
            case 21:
                return  <>
                            <img src={maven} alt="maven" style={{width:20,height:20,paddingRight:8}}/>
                            <span className="subicon-title">maven构建</span>
                        </>
            case 22:
                return renderSubIcon("nodejs","node")
            case 31:
                return renderSubIcon("xuniji","虚拟机")
            case 32:
                return renderSubIcon("docker","docker")
            case 41:
                return renderSubIcon("sonarqube","sonarQuebe")
            case 51:
                return  <>
                            <img src={nexus} alt="maven" style={{width:25,height:20,paddingRight:8}}/>
                            <span className="subicon-title">nexus</span>
                        </>
            case 52:
                return renderSubIcon("ssh","SSH")
            case 61:
                return renderSubIcon("mes","消息通知")
            case 71:
                return renderSubIcon("jiaoben","执行bat脚本")
            case 72:
                return renderSubIcon("jiaoben","执行shell脚本")
            case 81:
                return renderSubIcon("chufa","定时触发")

        }
    }


    return  <>
                {subIconType(type)}
            </>
}

export default TaskTitleIcon
