import React from "react";
import pip_git from "../../../../../assets/images/svg/pip_git.svg";
import pip_gitee from "../../../../../assets/images/svg/pip_gitee.svg";
import pip_github from "../../../../../assets/images/svg/pip_github.svg";
import pip_gitlab from "../../../../../assets/images/svg/pip_gitlab.svg";
import pip_svn from "../../../../../assets/images/svg/pip_svn.svg";
import pip_helmet from "../../../../../assets/images/svg/pip_helmet.svg";
import pip_ceshi from "../../../../../assets/images/svg/pip_ceshi.svg";
import maven from "../../../../../assets/images/img/maven.png";
import pip_nodejs from "../../../../../assets/images/svg/pip_nodejs.svg";
import pip_liunx from "../../../../../assets/images/svg/pip_liunx.svg";
import pip_docker from "../../../../../assets/images/svg/pip_docker.svg";
import pip_sonar from "../../../../../assets/images/svg/pip_sonar.svg";
import pip_message from "../../../../../assets/images/svg/pip_message.svg";
import pip_shell from "../../../../../assets/images/svg/pip_shell.svg";
import pip_post from "../../../../../assets/images/svg/pip_post.svg";
import pip_spotbugs from "../../../../../assets/images/svg/pip_spotbugs.svg";
import testonImg from "tiklab-eam-ui/es/assests/img/teston.png";

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
        case 'xcode':  return "XCode"
        case 'maventest': return "Maven单元测试"
        case 'teston': return "TestOn自动化测试"
        case 'maven': return "Maven构建"
        case 'nodejs': return "Node.Js构建"
        case 'build_docker': return "Docker构建"
        case 'liunx': return "主机部署"
        case 'docker': return "Docker部署"
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

    const renderImg = img => <img src={img} alt="maven" style={{width,height}}/>

    const iconType = type =>{
        switch (type) {
            case 'git':  return renderImg(pip_git)
            case 'gitee':  return renderImg(pip_gitee)
            case 'github':  return renderImg(pip_github)
            case 'gitlab':  return renderImg(pip_gitlab)
            case 'svn':  return renderImg(pip_svn)
            case 'xcode':  return renderImg(pip_helmet)
            case 'maventest': return renderImg(pip_ceshi)
            case 'teston': return renderImg(testonImg)
            case 'maven': return renderImg(maven)
            case 'nodejs': return renderImg(pip_nodejs)
            case 'build_docker': return renderImg(pip_docker)
            case 'liunx': return renderImg(pip_liunx)
            case 'docker': return renderImg(pip_docker)
            case 'sonar': return renderImg(pip_sonar)
            case 'spotbugs': return renderImg(pip_spotbugs)
            case 'artifact_maven': return renderImg(maven)
            case 'artifact_docker': return renderImg(pip_docker)
            case 'artifact_nodejs': return renderImg(pip_nodejs)
            case 'pull_maven': return renderImg(maven)
            case 'pull_nodejs': return renderImg(pip_nodejs)
            case 'pull_docker': return renderImg(pip_docker)
            case 'message': return renderImg(pip_message)
            case 'script': return renderImg(pip_shell)
            case 'post': return renderImg(pip_post)
        }
    }

    return  <>
                { iconType(type) }
            </>

}

/**
 * task的标题&&图标
 */
export const TaskTitleIcon = props =>{

    const {type} = props

    return  <>
                <TaskIcon type={type} width={20} height={22}/>
                <span style={{paddingLeft:8}}>
                    { taskTitle(type) }
                </span>
            </>
}


export const HeadlineTitle = type =>{
    switch (type) {
        case 'git':
        case 'gitlab':
        case 'svn':
        case 'xcode':
        case 'gitee':
        case 'github':
            return '源码'
        case 'sonar':
        case 'spotbugs':
            return '代码扫描'
        case 'maventest':
        case 'teston':
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
