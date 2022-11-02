import React from "react";

const Subtitle = props =>{
    const {type} = props
    return (
        <>
            {
                (()=>{
                    switch (type){
                        case 1:
                            return "通用Git"
                        case 2:
                            return "Gitee"
                        case 3:
                            return "Github"
                        case 4:
                            return "Gitlab"
                        case 5:
                            return "SVN"
                        case 11:
                            return "maven单元测试"
                        case 21:
                            return "maven"
                        case 22:
                            return "node"
                        case 31:
                            return "虚拟机"
                        case 32:
                            return "docker"
                        case 41:
                            return "sonarQuebe"
                        case 51:
                            return "nexus"
                    }
                })()
            }
        </>
    )
}

export default Subtitle