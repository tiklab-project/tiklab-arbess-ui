import React,{Fragment} from "react";

const ConfigName = props =>{
    const {type} = props
    return (
        <Fragment>
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
                            return "单元测试"
                        case 21:
                            return "maven"
                        case 22:
                            return "node"
                        case 31:
                            return "linux"
                        case 32:
                            return "docker"
                    }
                })()
            }
        </Fragment>
    )
}

export default ConfigName