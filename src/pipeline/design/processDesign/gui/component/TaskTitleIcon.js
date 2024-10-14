import React from "react";
import pip_git from "../../../../../assets/images/svg/pip_git.svg";
import pip_gitee from "../../../../../assets/images/svg/pip_gitee.svg";
import pip_github from "../../../../../assets/images/svg/pip_github.svg";
import pip_gitlab from "../../../../../assets/images/svg/pip_gitlab.svg";
import pip_svn from "../../../../../assets/images/svg/pip_svn.svg";
import pip_ceshi from "../../../../../assets/images/svg/pip_ceshi.svg";
import maven from "../../../../../assets/images/maven.png";
import pip_nodejs from "../../../../../assets/images/svg/pip_nodejs.svg";
import pip_liunx from "../../../../../assets/images/svg/pip_liunx.svg";
import pip_docker from "../../../../../assets/images/svg/pip_docker.svg";
import pip_k8s from "../../../../../assets/images/svg/pip_k8s.svg";
import pip_sonar from "../../../../../assets/images/svg/pip_sonar.svg";
import pip_message from "../../../../../assets/images/svg/pip_message.svg";
import pip_shell from "../../../../../assets/images/svg/pip_shell.svg";
import pip_post from "../../../../../assets/images/svg/pip_post.svg";
import pip_spotbugs from "../../../../../assets/images/svg/pip_spotbugs.svg";
import pip_nexus from "../../../../../assets/images/svg/pip_nexus.svg";
import {productImg} from "tiklab-core-ui";

/**
 * task的标题
 * @param type
 * @returns {string}
 * @constructor
 */
export const taskTitle = type =>{
    switch (type){
        case 'git':  return "通用Git"
        case 'gitee':  return "Gitee"
        case 'github':  return "Github"
        case 'gitlab':  return "Gitlab"
        case 'svn':  return "SVN"
        case 'gitpuk':  return "GitPuk"
        case 'maventest': return "Maven单元测试"
        case 'testhubo': return "TestHubo自动化测试"
        case 'maven': return "Maven构建"
        case 'nodejs': return "Node.Js构建"
        case 'build_docker': return "Docker构建"
        case 'liunx': return "主机部署"
        case 'docker': return "Docker部署"
        case 'k8s': return "Kubernetes部署"
        case 'sonar': return "SonarQuebe"
        case 'spotbugs': return "spotBugs-Java代码扫描"
        case 'artifact_maven':return "Maven推送"
        case 'artifact_docker':return "Docker推送"
        case 'artifact_nodejs':return "Node.Js推送"
        case 'pull_maven':return "Maven拉取"
        case 'pull_nodejs':return "Node.Js拉取"
        case 'pull_docker':return "Docker拉取"
        case 'message': return "消息通知"
        case 'script': return "执行脚本"
        case 'post': return "后置处理"
    }
}

/**
 * task的图标
 * @param props
 * @returns {Element}
 * @constructor
 */
export const TaskIcon = props =>{

    const {type, width=16, height=16} = props

    const iconType = () =>{
        switch (type) {
            case 'git':  return pip_git
            case 'gitee':  return pip_gitee
            case 'github':  return pip_github
            case 'gitlab':  return pip_gitlab
            case 'svn':  return pip_svn
            case 'gitpuk':  return productImg.gitpuk
            case 'maventest': return pip_ceshi
            case 'testhubo': return productImg.testhubo
            case 'maven': return maven
            case 'nodejs': return pip_nodejs
            case 'build_docker': return pip_docker
            case 'liunx': return pip_liunx
            case 'docker': return pip_docker
            case 'k8s': return pip_k8s
            case 'sonar': return pip_sonar
            case 'spotbugs': return pip_spotbugs
            case 'artifact_maven': return maven
            case 'artifact_docker': return pip_docker
            case 'artifact_nodejs': return pip_nodejs
            case 'pull_maven': return maven
            case 'pull_nodejs': return pip_nodejs
            case 'pull_docker': return pip_docker
            case 'message': return pip_message
            case 'script': return pip_shell
            case 'post': return pip_post
            case 'hadess': return productImg.hadess
            case 'nexus': return pip_nexus
        }
    }

    return (
        <img src={iconType()} alt="" width={width} height={height}/>
    )

}

export const HeadlineTitle = type =>{
    switch (type) {
        case 'git':
        case 'gitlab':
        case 'svn':
        case 'gitpuk':
        case 'gitee':
        case 'github':
            return '源码'
        case 'sonar':
        case 'spotbugs':
            return '代码扫描'
        case 'maventest':
        case 'testhubo':
            return '测试'
        case 'maven':
        case 'nodejs':
        case 'build_docker':
            return '构建'
        case 'artifact_maven':
        case 'artifact_nodejs':
        case 'artifact_docker':
            return '推送制品'
        case 'pull_maven':
        case 'pull_nodejs':
        case 'pull_docker':
            return '拉取制品'
        case 'liunx':
        case 'docker':
            return '部署'
        default :
            return "阶段名称"
    }
}
