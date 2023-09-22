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
import nexus from "../../../../../assets/images/img/nexus.png";
import pip_ssh from "../../../../../assets/images/svg/pip_ssh.svg";
import pip_config from "../../../../../assets/images/svg/pip_config.svg";
import pip_message from "../../../../../assets/images/svg/pip_message.svg";
import pip_shell from "../../../../../assets/images/svg/pip_shell.svg";
import pip_trigger from "../../../../../assets/images/svg/pip_trigger-1.svg";
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
        case 'maventest': return "maven单元测试"
        case 'teston': return "TestOn自动化测试"
        case 'maven': return "maven构建"
        case 'nodejs': return "node"
        case 'liunx': return "主机部署"
        case 'docker': return "Docker"
        case 'sonar': return "SonarQuebe"
        case 'nexus': return "Nexus"
        case 'ssh': return "SSH"
        case 'xpack': return "XPack"
        case 'message': return "消息通知"
        case 'script': return "执行脚本"
        case 81: return "定时触发"
    }
}

export const TaskIcon = props =>{

    const {type, width=16, height=16} = props

    const renderImg = img => <img src={img} alt="maven" style={{width:width,height:height}}/>

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
            case 'liunx': return renderImg(pip_liunx)
            case 'docker': return renderImg(pip_docker)
            case 'sonar': return renderImg(pip_sonar)
            case 'nexus': return renderImg(nexus)
            case 'ssh': return renderImg(pip_ssh)
            case 'xpack': return renderImg(pip_config)
            case 'message': return renderImg(pip_message)
            case 'script': return renderImg(pip_shell)
            case 81: return renderImg(pip_trigger)

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
