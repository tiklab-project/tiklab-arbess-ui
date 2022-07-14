import React,{Fragment} from "react";
import ConfigCodeSvn from "../configForm/configCodeSvn";
import ConfigCodeGitOrGitlab from "../configForm/configCodeGitOrGitlab"
import ConfigCodeGiteeOrGithub from "../configForm/configCodeGiteeOrGithub";
import ConfigTestUnit from "../configForm/configTestUnit";
import ConfigStructureMaven from "../configForm/configStructureMavenOrNode";
import ConfigDeployType from "../configForm/configDeployType";

const ConfigForm = props =>{
    const {type,del} = props
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
                            return <ConfigStructureMaven/>
                        case 22:
                            return <ConfigStructureMaven/>
                        case 31:
                        case 32:
                            return <ConfigDeployType type={type} del={del}/>
                    }
                })()
            }
        </Fragment>
    )
}

export default ConfigForm