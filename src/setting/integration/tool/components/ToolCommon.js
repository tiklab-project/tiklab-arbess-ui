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
    toolGo,
    toolK8s,
    toolSonarScanner,
    toolSourceFareScanner
} from "../../../../common/utils/Constant";
import maven from "../../../../assets/images/maven.png";
import pip_jdk from "../../../../assets/images/svg/pip_jdk.svg";
import pip_git from "../../../../assets/images/svg/pip_git.svg";
import pip_svn from "../../../../assets/images/svg/pip_svn.svg";
import pip_nodejs from "../../../../assets/images/svg/pip_nodejs.svg";
import pip_go from "../../../../assets/images/svg/pip_go.svg";
import pip_k8s from "../../../../assets/images/svg/pip_k8s.svg";
import pip_sonar from "../../../../assets/images/svg/pip_sonar.svg";
import {productImg} from "tiklab-core-ui";

//工具类型
export const scmList = [
    toolJdk,
    toolGit,
    toolSvn,
    toolMaven,
    toolNode,
    toolGo,
    toolK8s,
    toolSonarScanner,
    toolSourceFareScanner,
];

//工具名称
export const scmTitle = {
    [toolJdk]: 'JDK',
    [toolGit]: 'Git',
    [toolSvn]: 'SVN',
    [toolMaven]: 'Maven',
    [toolNode]: 'Node',
    [toolGo]: 'Go',
    [toolK8s]: 'kubectl',
    [toolSonarScanner]: 'Sonar Scanner',
    [toolSourceFareScanner]: 'sourceFare Scanner',
};

//工具类型
export const scmNameSuffix = {
    [toolJdk]: 'Jdk',
    [toolGit]: 'Git',
    [toolSvn]: 'Svn',
    [toolMaven]: 'Maven',
    [toolNode]: 'Nodejs',
    [toolGo]: 'Go',
    [toolK8s]: 'kubectl',
    [toolSonarScanner]: 'Sonar',
    [toolSourceFareScanner]: 'sourceFare',
};

//工具图片
export const scmImage = {
    [toolJdk]: pip_jdk,
    [toolGit]: pip_git,
    [toolSvn]: pip_svn,
    [toolMaven]: maven,
    [toolNode]: pip_nodejs,
    [toolGo]: pip_go,
    [toolK8s]: pip_k8s,
    [toolSonarScanner]: pip_sonar,
    [toolSourceFareScanner]: productImg.sourcefare,
}

//工具说明
export const scmPlaceholder = {
    [toolJdk]: '请输入JDK安装路径，如 D:\\jdk-16.0.2\\bin',
    [toolGit]: '请输入Git安装路径，如 D:\\Git\\bin',
    [toolSvn]: '请输入Svn安装路径，如 D:\\SVN-1.14\\bin',
    [toolMaven]: '请输入Maven安装路径，如 D:\\apache-maven-3.9.9\\bin',
    [toolNode]: '请输入Node安装路径，如 D:\\Node-v18.20.7\\bin',
    [toolGo]: '请输入Go安装路径，如 D:\\Go-v18.20.7\\bin',
    [toolK8s]: '请输入kubectl安装路径，如 D:\\kubectl-v18.20.7\\kubectl',
    [toolSonarScanner]: '请输入Sonar Scanner安装路径，如 D:\\sonar-v18.20.7\\bin',
    [toolSourceFareScanner]: '请输入sourceFare Scanner安装路径，如 D:\\sourceFare-v18.20.7\\bin',
};
