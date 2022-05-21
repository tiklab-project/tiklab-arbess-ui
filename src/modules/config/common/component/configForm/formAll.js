import React from "react";
import ConfigCodeGit from './configCodeGit'
import ConfigCodeGitee from "./configCodeGitee";
import ConfigCodeGitlab from "./configCodeGitlab";
import ConfigTestUnit from "./configTestUnit";
import ConfigStructureMaven from "./configStructureMaven";
import ConfigStructureNode from "./configStructureNode";
import ConfigDeployLinux from "./configDeployLinux";
import ConfigDeployDocker from "./configDeployDocker";

export default {
    git:<ConfigCodeGit/>,
    gitee:<ConfigCodeGitee/>,
    gitlab:<ConfigCodeGitlab/>,
    unit:<ConfigTestUnit/>,
    maven:<ConfigStructureMaven/>,
    node:<ConfigStructureNode/>,
    linux:<ConfigDeployLinux/>,
    docker:<ConfigDeployDocker/>,
}