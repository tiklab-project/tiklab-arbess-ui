import React,{Fragment} from "react";
import ConfigCodeGitOrGitlab from "../configForm/configCodeGitOrGitlab"
import ConfigCodeGiteeOrGithub from "../configForm/configCodeGiteeOrGithub";
import ConfigTestUnit from "../configForm/configTestUnit";
import ConfigStructureMavenOrNode from "../configForm/configStructureMavenOrNode";
import ConfigDeploy from "../configForm/configDeploy";
import ConfigCodeSvn from "../configForm/configCodeSvn";

const ConfigForm = props =>{
    const {type} = props
    return(
        <Fragment>
            {
                (()=>{
                    switch (type){
                        case 1:
                        case 4:
                            return <ConfigCodeGitOrGitlab/>
                        case 2:
                        case 3:
                            return <ConfigCodeGiteeOrGithub/>
                        case 5:
                            return <ConfigCodeSvn/>
                        case 11:
                            return <ConfigTestUnit/>
                        case 21:
                        case 22:
                            return <ConfigStructureMavenOrNode/>
                        case 31:
                        case 32:
                            return <ConfigDeploy type={type}/>
                    }
                })()
            }
        </Fragment>
    )
}

export default ConfigForm