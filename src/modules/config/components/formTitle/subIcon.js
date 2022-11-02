import React from "react";


const SubIcon = props =>{

    const {type} = props

    const renderSubIcon = (icon,title) =>{
        return <>
            <span className="subicon-icon" style={{paddingRight:5}}>
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
                return renderSubIcon("-_ssh","svn")
            case 11:
                return renderSubIcon("ceshi","maven单元测试")
            case 21:
                return renderSubIcon("quanxian","maven")
            case 22:
                return renderSubIcon("nodejs","node")
            case 31:
                return renderSubIcon("xuniji","虚拟机")
            case 32:
                return renderSubIcon("docker","docker")
            case 41:
                return renderSubIcon("ceshi","sonarQuebe")
            case 51:
                return renderSubIcon("quanxian","nexus")
        }
    }


    return  <>
                {subIconType(type)}
            </>
}

export default SubIcon