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
import pip_ssh from "../../../../../assets/images/svg/pip_ssh.svg";
import pip_jdk from "../../../../../assets/images/svg/pip_jdk.svg";
import pip_nexus from "../../../../../assets/images/svg/pip_nexus.svg";
import {productImg} from "tiklab-core-ui";
import {
    git,
    gitee,
    gitlab,
    github,
    svn,
    gitpuk,
    pri_gitlab,
    sonar,
    spotbugs,
    testhubo,
    maventest,
    mvn,
    nodejs,
    build_docker,
    docker,
    k8s,
    liunx,
    message,
    jdk,
    post,
    script,
    upload_hadess,
    upload_ssh,
    upload_nexus,
    download_hadess,
    download_ssh,
    download_nexus,
} from '../../../../../common/utils/Constant';


/**
 * task的标题
 * @param type
 * @returns {string}
 * @constructor
 */
export const taskTitle = type =>{
    switch (type){
        case git:  return "通用Git"
        case gitee: return "Gitee"
        case github: return "Github"
        case gitlab: return "Gitlab"
        case pri_gitlab:  return "自建Gitlab"
        case svn:  return "Svn"
        case gitpuk:  return "GitPuk"
        case maventest: return "Maven单元测试"
        case testhubo: return "TestHubo自动化测试"
        case mvn: return "Maven构建"
        case nodejs: return "Node.Js构建"
        case build_docker: return "Docker构建"
        case liunx: return "主机部署"
        case docker: return "Docker部署"
        case k8s: return "Kubernetes部署"
        case sonar: return "SonarQuebe"
        case spotbugs: return "spotBugs-Java代码扫描"
        case upload_hadess: return "Hadesss上传"
        case upload_ssh: return "Ssh上传"
        case upload_nexus: return "Nexus上传"
        case download_hadess: return "Hadesss下载"
        case download_ssh: return "Ssh下载"
        case download_nexus: return "Nexus下载"
        case script: return "执行脚本"
        case message: return "消息通知"
        case post: return "后置处理"
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
            case git: return pip_git
            case gitee: return pip_gitee
            case github: return pip_github
            case gitlab: return pip_gitlab
            case pri_gitlab:  return pip_gitlab
            case svn:  return pip_svn
            case gitpuk:  return productImg.gitpuk
            case maventest: return pip_ceshi
            case testhubo: return productImg.testhubo
            case mvn: return maven
            case nodejs: return pip_nodejs
            case build_docker: return pip_docker
            case liunx: return pip_liunx
            case docker: return pip_docker
            case k8s: return pip_k8s
            case sonar: return pip_sonar
            case spotbugs: return pip_spotbugs
            case upload_hadess : return productImg.hadess
            case upload_ssh : return pip_ssh
            case upload_nexus : return pip_nexus
            case download_hadess: return productImg.hadess
            case download_ssh: return pip_ssh
            case download_nexus: return pip_nexus
            case script: return pip_shell
            case message: return pip_message
            case post: return pip_post
            case jdk: return pip_jdk
        }
    }

    return (
        <img src={iconType()} alt="" width={width} height={height}/>
    )

}

/**
 * 阶段类型
 * @param type
 * @returns {string}
 * @constructor
 */
export const HeadlineTitle = type =>{
    switch (type) {
        case git:
        case gitlab:
        case pri_gitlab:
        case svn:
        case gitpuk:
        case gitee:
        case github:
            return '源码'
        case sonar:
        case spotbugs:
            return '代码扫描'
        case maventest:
        case testhubo:
            return '测试'
        case mvn:
        case nodejs:
        case build_docker:
            return '构建'
        case upload_hadess:
        case upload_ssh:
        case upload_nexus:
            return '上传'
        case download_hadess:
        case download_ssh:
        case download_nexus:
            return '下载'
        case liunx:
        case docker:
            return '部署'
        case script:
            return '工具'
        default :
            return "阶段名称"
    }
}
