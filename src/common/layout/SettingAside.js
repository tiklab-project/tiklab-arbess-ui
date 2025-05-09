/**
 * @Description: 系统设置
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React, {useState} from "react";
import {
    DeploymentUnitOutlined,
    LayoutOutlined,
    MacCommandOutlined,
    SafetyCertificateOutlined,
    SoundOutlined,
    TeamOutlined,
    ScheduleOutlined,
} from "@ant-design/icons";
import Aside from "../component/aside/SettingAside";
import {SecurityEnhance} from "tiklab-security-ui";
import {LicenceEnhance} from "tiklab-licence-ui";
import ipRoster from "../../assets/images/pip-feature-ipRoster.png";
import customLogo from "../../assets/images/pip-feature-customLogo.png";

const applicationRouters =  [
    {
        id: "user",
        title: "用户",
        icon: <TeamOutlined/>,
        children: [
            {
                id: "/setting/user",
                title: "用户",
                purviewCode: "user",
                isUnify:"/setting/user",
            },
            {
                id: "/setting/orga",
                title: "部门",
                purviewCode: "orga",
                isUnify:"/setting/orga",
            },
            {
                id: "/setting/userGroup",
                title: "用户组",
                purviewCode: "user_group",
                isUnify:"/setting/userGroup",
            },
            {
                id: "/setting/dir",
                title: "用户目录",
                purviewCode: "user_dir",
                isUnify:"/setting/dir",
            },
        ]
    },
    {
        id:"/setting/role",
        title:"权限",
        purviewCode:"pipeline_permission",
        icon: <ScheduleOutlined />,
    },
    {
        id:"message",
        title: "消息",
        icon: <SoundOutlined/>,
        children: [
            {
                id:"/setting/notice",
                title:"消息通知方案",
                purviewCode:"message_setting",
            },
            {
                id:"/setting/send",
                title: "消息发送方式",
                purviewCode: "message_type",
            },
        ]
    },
    {
        id:"configure",
        title:"流水线配置",
        icon:<DeploymentUnitOutlined />,
        children:[
            {
                id:"/setting/agent",
                title:"Agent",
            },
            {
                id:"/setting/grouping",
                title:"分组",
            },
            {
                id:"/setting/env",
                title:"环境",
            },
            {
                id:"/setting/host",
                title:"主机",
                purviewCode:"resources_host",
            },
            {
                id:"/setting/hostGroup",
                title:"主机组",
            },
            {
                id:"/setting/k8s",
                title:"Kubernetes集群",
                purviewCode:"resources_server",
            },
        ]
    },
    {
        id:"integration",
        title:"集成与开放",
        icon: <MacCommandOutlined />,
        children: [
            {
                id:"/setting/tool",
                title:"工具集成",
                purviewCode:"pipeline_env",
            },
            {
                id:"/setting/server",
                title:"服务集成",
                purviewCode:"resources_server",
            },
            {
                id:"/setting/openApi",
                title: "openApi",
            },
        ]
    },
    {
        id:"security",
        title:"安全",
        icon:<SafetyCertificateOutlined />,
        children: [
            {
                id:"/setting/backups",
                title:"备份与恢复",
                purviewCode:"restore",
            },
            {
                id:"/setting/myLog",
                title:"操作日志",
                // purviewCode:"pipeline_log",
            },
            {
                id:"/setting/ipRoster",
                title: "IP黑白名单",
                isEnhance: true,
            },
        ]
    },
    {
        id:"licence",
        title:"系统",
        icon:<LayoutOutlined />,
        children: [
            {
                id:'/setting/version',
                title: '版本与许可证',
            },
            {
                id:'/setting/productAuth',
                title: '系统访问权限',
            },
            {
                id:'/setting/customLogo',
                title: '自定义Logo',
                isEnhance:true,
            },
            {
                id:"/setting/resources",
                title:"资源监控",
                purviewCode:"pipeline_resources",
            },
        ]
    },
]

const Setting = props =>  {

    //licence增强功能弹出框
    const [licenceVisible,setLicenceVisible] = useState(false);
    //security增强功能弹出框
    const [securityVisible,setSecurityVisible] = useState(false);

    /**
     * 引导订阅
     * @param data
     */
    const enhance = data => {
        const {id} = data;
        if(id==='/setting/customLogo'){
            setLicenceVisible(true)
        }
        if(id==='/setting/ipRoster'){
            setSecurityVisible(true)
        }
    }


    return (
        <Aside
            {...props}
            enhance={enhance}
            outerPath={'/setting'}
            applicationRouters={applicationRouters}
        >
            <SecurityEnhance
                visible={securityVisible}
                setVisible={setSecurityVisible}
                bgroup={'sward'}
                list={[
                    {id:'ipRoster',title:'IP黑白名单',icon:ipRoster}
                ]}
            />
            <LicenceEnhance
                visible={licenceVisible}
                setVisible={setLicenceVisible}
                bgroup={'sward'}
                list={[
                    {id:'logo',title:'自定义Logo',icon:customLogo}
                ]}
            />
        </Aside>
    )

}

export default Setting

