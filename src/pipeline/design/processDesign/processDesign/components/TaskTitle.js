import React from "react";

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
        case 'teston': return "testOn自动化测试"
        case 'maven': return "maven构建"
        case 'nodejs': return "node"
        case 'liunx': return "虚拟机"
        case 'docker': return "Docker"
        case 'sonar': return "SonarQuebe"
        case 'nexus': return "Nexus"
        case 'ssh': return "SSH"
        case 'xpack': return "XPack"
        case 'message': return "消息通知"
        case 'bat': return "执行bat脚本"
        case 'shell': return "执行shell脚本"
        case 81: return "定时触发"
    }
}

