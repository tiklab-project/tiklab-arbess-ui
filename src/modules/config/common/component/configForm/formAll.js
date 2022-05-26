import React from "react";
import ConfigCodeGitOrGitlab from './configCodeGitOrGitlab'
import ConfigCodeGiteeOrGithub from "./configCodeGiteeOrGithub";
import ConfigTestUnit from "./configTestUnit";
import ConfigStructureMaven from "./configStructureMaven";
import ConfigStructureNode from "./configStructureNode";
import ConfigDeployLinux from "./configDeployLinux";
import ConfigDeployDocker from "./configDeployDocker";

export default {
    gitOrGitlab:<ConfigCodeGitOrGitlab/>,
    giteeOrGithub:<ConfigCodeGiteeOrGithub/>,
    unit:<ConfigTestUnit/>,
    maven:<ConfigStructureMaven/>,
    node:<ConfigStructureNode/>,
    linux:<ConfigDeployLinux/>,
    docker:<ConfigDeployDocker/>,
}