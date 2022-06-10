import React,{Fragment} from "react";
import formAll from "../configForm/formAll";

const ConfigForm = props =>{
    const {type} = props
    return(
        <Fragment>
            {
                (()=>{
                    switch (type){
                        case 1:
                            return formAll.gitOrGitlab
                        case 2:
                            return formAll.giteeOrGithub
                        case 3:
                            return formAll.giteeOrGithub
                        case 4:
                            return formAll.gitOrGitlab
                        case 5:
                            return formAll.svn
                        case 11:
                            return formAll.unit
                        case 21:
                            return formAll.mavenOrNode
                        case 22:
                            return formAll.mavenOrNode
                        case 31:
                            return formAll.linux
                        case 32:
                            return formAll.docker
                    }
                })()
            }
        </Fragment>
    )
}

export default ConfigForm