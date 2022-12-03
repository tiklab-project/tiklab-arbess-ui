import React from "react";

const Subtitle = props =>{
    const {type} = props
    return (
        <>
            {
                (()=>{
                    switch (type){
                        case 1:  return "通用Git"
                        case 2:  return "Gitee"
                        case 3:  return "Github"
                        case 4:  return "Gitlab"
                        case 5:  return "SVN"
                        case 11: return "maven单元测试"
                        case 21: return "maven"
                        case 22: return "node"
                        case 31: return "虚拟机"
                        case 32: return "docker"
                        case 41: return "sonarQuebe"
                        case 51: return "nexus"
                        case 52: return "SSH"
                        case 61: return "消息通知"
                        case 71: return "执行bat脚本"
                        case 72: return "执行shell脚本"
                        case 81: return "定时触发"
                    }
                })()
            }
        </>
    )
}

export default Subtitle