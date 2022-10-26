import React from "react";

export const userRouter = [
    {
        key:"1",
        label: "账号与成员",
        enCode: "I",
        icon:"#icon-gongzuotongji",
        children: [
            {
                key:"/index/system/dashbord",
                label:"组织管理",
                icon:"#icon-gongzuotongji",
                enCode:"F",
            },
            {
                key:"/index/system/directory",
                label:"目录管理",
                icon:"#icon-gongzuotongji",
                enCode:"G",
            },
            {
                key:"/index/system/list",
                label:"用户列表",
                icon:"#icon-gongzuotongji",
                enCode:"H",
            }
        ]
    },
    {
        key:"2",
        label:"系统权限",
        icon:"#icon-gongzuotongji",
        enCode:"E",
        children:[
            {
                key:"/index/system/syr/feature",
                label:"系统功能",
                icon:"#icon-gongzuotongji",
                enCode:"E1",
            },
            {
                key:"/index/system/syr/role",
                label:"系统角色",
                icon:"#icon-gongzuotongji",
                enCode:"E2",
            }
        ]
    },
    {
        key:"3",
        label:"项目权限",
        icon:"#icon-gongzuotongji",
        enCode:"I",
        children:[
            {
                key:"/index/system/project/feature",
                label:"项目功能",
                icon:"#icon-gongzuotongji",
                enCode:"I2",
            },
            {
                key:"/index/system/project/role",
                label:"项目角色",
                icon:"#icon-gongzuotongji",
                enCode:"I2",
            }
        ]
    },
    {
        key:"/index/system/proof",
        label:"凭证管理",
        icon:"#icon-gongzuotongji",
        enCode:"F",
    },
    {
        key:"/index/system/plugin",
        label:"插件管理",
        icon:"#icon-gongzuotongji",
        enCode:"G",
    },
    {
        key:"/index/system/envi",
        label:"环境配置",
        icon:"#icon-gongzuotongji",
        enCode:"J",
    },
    {
        key:"4",
        label:"待办事项",
        icon:"#icon-gongzuotongji",
        enCode:"I",
        children: [
            {
                key:"/index/system/task",
                label:"待办事项",
                icon:"#icon-gongzuotongji",
                enCode:"J",
            },
            {
                key:"/index/system/myTodoTask",
                label:"我的待办事项 ",
                icon:"#icon-gongzuotongji",
                enCode:"F",
            },
            {
                key:"/index/system/todoTemp",
                label:"代办模板 ",
                icon:"#icon-gongzuotongji",
                enCode:"F",
            }
        ]
    },
    {
        key:"5",
        label:"系统日志",
        icon:"#icon-gongzuotongji",
        enCode:"I",
        children: [
            {
                key:"/index/system/myLog",
                label:"我的日志",
                icon:"#icon-gongzuotongji",
                enCode:"H",
            },
            {
                key:"/index/system/logTemplate",
                label:"日志模板",
                icon:"#icon-gongzuotongji",
                enCode:"H",
            }
        ]
    },
    {
        key:"6",
        label: "消息中心",
        icon:"#icon-gongzuotongji",
        enCode: "I",
        children: [
            {
                key:"/index/system/mes/management",
                label:"消息管理",
                icon:"#icon-gongzuotongji",
                enCode:"J",
            },
            {
                key:"/index/system/mes/type",
                label:"消息类型管理",
                icon:"#icon-gongzuotongji",
                enCode:"J",
            },
            {
                key:"/index/system/mes/sendType",
                label:"消息发送方式",
                icon:"#icon-gongzuotongji",
                enCode:"J",
            },
            {
                key:"/index/system/mes/template",
                label:"消息模板管理",
                icon:"#icon-gongzuotongji",
                enCode:"J",
            },
        ]
    },
    {
        key:"/index/system/info",
        label:"系统信息",
        icon:"#icon-gongzuotongji",
        enCode:"H",
    },
]

export const Router = [
    {
        key:"1",
        label: "账号与成员",
        enCode: "I",
        icon:"#icon-gongzuotongji",
        children: [
            {
                key:"/index/system/dashbord",
                label:"组织管理",
                icon:"#icon-gongzuotongji",
                enCode:"F",
            },
            {
                key:"/index/system/directory",
                label:"目录管理",
                icon:"#icon-gongzuotongji",
                enCode:"G",
            },
            {
                key:"/index/system/list",
                label:"用户列表",
                icon:"#icon-gongzuotongji",
                enCode:"H",
            }
        ]
    },
    {
        key:"2",
        label:"系统权限",
        icon:"#icon-gongzuotongji",
        enCode:"E",
        children:[
            // {
            //     key:"/index/system/syr/feature",
            //     label:"系统功能",
            //     icon:"#icon-gongzuotongji",
            //     enCode:"E1",
            // },
            {
                key:"/index/system/syr/role",
                label:"系统角色",
                icon:"#icon-gongzuotongji",
                enCode:"E2",
            }
        ]
    },
    {
        key:"3",
        label:"项目权限",
        icon:"#icon-gongzuotongji",
        enCode:"I",
        children:[
            // {
            //     key:"/index/system/project/feature",
            //     label:"项目功能",
            //     icon:"#icon-gongzuotongji",
            //     enCode:"I2",
            // },
            {
                key:"/index/system/project/role",
                label:"项目角色",
                icon:"#icon-gongzuotongji",
                enCode:"I2",
            }
        ]
    },
    {
        key:"/index/system/proof",
        label:"凭证管理",
        icon:"#icon-gongzuotongji",
        enCode:"F",
    },
    {
        key:"/index/system/plugin",
        label:"插件管理",
        icon:"#icon-gongzuotongji",
        enCode:"G",
    },
    {
        key:"/index/system/envi",
        label:"环境配置",
        icon:"#icon-gongzuotongji",
        enCode:"J",
    },
    {
        key:"4",
        label:"待办事项",
        icon:"#icon-gongzuotongji",
        enCode:"I",
        children: [
            {
                key:"/index/system/task",
                label:"待办事项",
                icon:"#icon-gongzuotongji",
                enCode:"J",
            },
            {
                key:"/index/system/myTodoTask",
                label:"我的待办事项 ",
                icon:"#icon-gongzuotongji",
                enCode:"F",
            },
            // {
            //     key:"/index/system/todoTemp",
            //     label:"代办模板 ",
            //     icon:"#icon-gongzuotongji",
            //     enCode:"F",
            // }
        ]
    },
    {
        key:"5",
        label:"系统日志",
        icon:"#icon-gongzuotongji",
        enCode:"I",
        children: [
            {
                key:"/index/system/myLog",
                label:"我的日志",
                icon:"#icon-gongzuotongji",
                enCode:"H",
            },
            // {
            //     key:"/index/system/logTemplate",
            //     label:"日志模板",
            //     icon:"#icon-gongzuotongji",
            //     enCode:"H",
            // }
        ]
    },
    {
        key:"6",
        label: "消息中心",
        icon:"#icon-gongzuotongji",
        enCode: "I",
        children: [
            // {
            //     key:"/index/system/mes/management",
            //     label:"消息管理",
            //     icon:"#icon-gongzuotongji",
            //     enCode:"J",
            // },
            // {
            //     key:"/index/system/mes/type",
            //     label:"消息类型管理",
            //     icon:"#icon-gongzuotongji",
            //     enCode:"J",
            // },
            {
                key:"/index/system/mes/sendType",
                label:"消息发送方式",
                icon:"#icon-gongzuotongji",
                enCode:"J",
            },
            // {
            //     key:"/index/system/mes/template",
            //     label:"消息模板管理",
            //     icon:"#icon-gongzuotongji",
            //     enCode:"J",
            // },
        ]
    },
    {
        key:"/index/system/info",
        label:"系统信息",
        icon:"#icon-gongzuotongji",
        enCode:"H",
    },
]