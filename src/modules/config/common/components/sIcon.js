import React from "react";

const SIcon = props =>{

    const {type} = props

    const icon = icon =>{
        return  <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`#icon-${icon}`} />
                </svg>
    }

    const renderIcon = type =>{
        switch (type) {
            case 1:
                return icon("git")
            case 2:
                return icon("gitee")
            case 3:
                return icon("github")
            case 4:
                return icon("gitlab")
            case 5:
                return icon("svn")
            case 11:
                return icon("ceshi")
            case 21:
                return icon("goujian")
            case 22:
                return icon("nodejs")
            case 31:
                return icon("xuniji")
            case 32:
                return icon("docker")
            case 41:
                return icon("Scan")
            case 51:
                return icon("tuisongshezhi")
            case 52:
                return icon("ssh")
            case 61:
                return icon("mes")
            case 71:
                return icon("jiaoben")
            case 72:
                return icon("jiaoben")
            case 81:
                return icon("chufa")

        }
    }

    return  <>
                {renderIcon(type)}
            </>

}

export default SIcon