/**
 * @Description:
 * @Author: gaomengyuan
 * @Date: 2025/4/7
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/4/7
 */
import {
    toolGit,
    toolJdk,
    toolMaven,
    toolNode,
    toolSvn,
    toolGo
} from "../../../../common/utils/Constant";
import maven from "../../../../assets/images/maven.png";
import pip_jdk from "../../../../assets/images/svg/pip_jdk.svg";
import pip_git from "../../../../assets/images/svg/pip_git.svg";
import pip_svn from "../../../../assets/images/svg/pip_svn.svg";
import pip_nodejs from "../../../../assets/images/svg/pip_nodejs.svg";
import pip_go from "../../../../assets/images/svg/pip_go.svg";

//工具类型
export const scmList = [
    toolJdk,
    toolGit,
    toolSvn,
    toolMaven,
    toolNode,
    toolGo
];

//工具名称
export const scmTitle = {
    [toolJdk]: 'JDK',
    [toolGit]: 'Git',
    [toolSvn]: 'Svn',
    [toolMaven]: 'Maven',
    [toolNode]: 'Node',
    [toolGo]: 'Go',
};

//工具图片
export const scmImage = {
    [toolJdk]: pip_jdk,
    [toolGit]: pip_git,
    [toolSvn]: pip_svn,
    [toolMaven]: maven,
    [toolNode]: pip_nodejs,
    [toolGo]: pip_go,
}

//工具说明
export const scmPlaceholder = {
    [toolJdk]: '请输入JDK安装路径，如 D:\\jdk-16.0.2\\bin',
    [toolGit]: '请输入Git安装路径，如 D:\\Git\\bin',
    [toolSvn]: '请输入Svn安装路径，如 D:\\SVN-1.14\\bin',
    [toolMaven]: '请输入Maven安装路径，如 D:\\apache-maven-3.9.9\\bin',
    [toolNode]: '请输入Node安装路径，如 D:\\Node-v18.20.7\\bin',
    [toolGo]: '请输入Go安装路径，如 D:\\Go-v18.20.7\\bin',
};
