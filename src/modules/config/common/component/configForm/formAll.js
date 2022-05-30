import React from "react";
import ConfigCodeGitOrGitlab from './configCodeGitOrGitlab'
import ConfigCodeGiteeOrGithub from "./configCodeGiteeOrGithub";
import ConfigTestUnit from "./configTestUnit";
import ConfigStructureMaven from "./configStructureMavenOrNode";
import ConfigDeployLinux from "./configDeployLinux";
import ConfigDeployDocker from "./configDeployDocker";

export default {
    gitOrGitlab:<ConfigCodeGitOrGitlab/>,
    giteeOrGithub:<ConfigCodeGiteeOrGithub/>,
    unit:<ConfigTestUnit/>,
    mavenOrNode:<ConfigStructureMaven/>,
    linux:<ConfigDeployLinux/>,
    docker:<ConfigDeployDocker/>,
}