import React from "react";
import {
    FileProtectOutlined,
    LayoutOutlined,
    SoundOutlined,
    DeploymentUnitOutlined,
    MacCommandOutlined, TeamOutlined, ProjectOutlined
} from "@ant-design/icons";
import Aside from "../../common/component/aside/Aside";

/**
 * 系统设置页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Setting = props =>{

    const applicationRouters =  [
        {
            id: "user",
            title: "用户与权限",
            icon: <TeamOutlined/>,
            children: [
                {
                    id: "/setting/orga",
                    title: "部门",
                    purviewCode: "orga",
                    isUnify:true,
                },
                {
                    id: "/setting/user",
                    title: "用户",
                    purviewCode: "user",
                    isUnify:true,
                },
                {
                    id: "/setting/userGroup",
                    title: "用户组",
                    purviewCode: "user_group",
                    isUnify:true,
                },
                {
                    id: "/setting/dir",
                    title: "用户目录",
                    purviewCode: "user_dir",
                    isUnify:true,
                },
                {
                    id:"/setting/role",
                    title:"权限",
                    purviewCode:"pipeline_permission",
                },
            ]
        },
        {
            id:"message",
            title: "消息",
            icon:<SoundOutlined/>,
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
                    id:"/setting/auth",
                    title:"认证",
                    purviewCode:"pipeline_auth",
                },
                {
                    id:"/setting/tool",
                    title:"工具",
                    purviewCode:"pipeline_env",
                },
            ]
        },
        {
            id:"/setting/server",
            title:"服务集成",
            icon:<MacCommandOutlined />,
            purviewCode:"resources_server",
        },
        {
            id:"/setting/resources",
            title:"资源监控",
            icon:<FileProtectOutlined />,
            purviewCode:"pipeline_resources",
        },
        {
            id:"security",
            title:"安全",
            icon:<LayoutOutlined />,
            children: [
                {
                    id:"/setting/backups",
                    title:"备份与恢复",
                    purviewCode:"restore",
                },
                {
                    id:"/setting/myLog",
                    title:"操作日志",
                    purviewCode:"pipeline_log",
                }
            ]
        },
        {
            id:"licence",
            title:"应用",
            icon:<LayoutOutlined />,
            children: [
                {
                    id:'/setting/version',
                    title: '版本与许可证',
                    purviewCode:'version',
                },
                {
                    id:'/setting/productAuth',
                    title: '应用访问权限',
                },
            ]
        },
    ]

    const templateRouter = [
        {
            id:"base",
            title:"基础数据",
            icon:<ProjectOutlined />,
            children:[
                {
                    id:"/setting/syr/feature",
                    title:"系统功能",
                },
                {
                    id:"/setting/roletrue",
                    title:"系统角色",
                },
                {
                    id:"/setting/project/feature",
                    title:"项目功能",
                },
                {
                    id:"/setting/project/role",
                    title:"项目角色",
                },
                {
                    id:"/setting/project/vRole",
                    title:"项目虚拟角色",
                },
                {
                    id:"/setting/todoTask",
                    title:"待办任务",
                },
                {
                    id:"/setting/task",
                    title:"待办事项",
                },
                {
                    id:"/setting/todoTemp",
                    title:"待办模板 ",
                },
                {
                    id:"/setting/todoType",
                    title:"待办类型 ",
                },
                {
                    id:"/setting/logTemplate",
                    title:"日志模板",
                },
                {
                    id:"/setting/logType",
                    title:"日志类型",
                },
                {
                    id:"/setting/type",
                    title:"消息类型",
                },
                {
                    id:"/setting/sendtrue",
                    title:"消息发送方式",
                },
                {
                    id:"/setting/systemNotice",
                    title:"系统消息通知方案",
                },
                {
                    id:"/setting/projectNotice",
                    title:"项目消息通知方案",
                },
                {
                    id:"/setting/userGrouptrue",
                    title:"用户组true",
                },
            ]
        }
    ]

    // 菜单
    const menus = () => {
        try{
            if(devProduction){
                return [...applicationRouters,...templateRouter]
            }else {
                return applicationRouters
            }
        }catch {
            return applicationRouters
        }
    }

    return (
        <Aside
            {...props}
            outerPath={'/setting'}
            applicationRouters={menus()}
        />
    )
}

export default Setting
