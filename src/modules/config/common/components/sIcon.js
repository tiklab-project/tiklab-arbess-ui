import React from "react";

const SIcon = props =>{

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
                return renderIcon("svn")
            case 11:
                return renderIcon("ceshi")
            case 21:
                return renderIcon("goujian")
            case 22:
                return renderIcon("nodejs")
            case 31:
                return renderIcon("xuniji")
            case 32:
                return renderIcon("docker")
            case 41:
                return renderIcon("Scan")
            case 51:
                return renderIcon("tuisongshezhi")
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

export default SIcon