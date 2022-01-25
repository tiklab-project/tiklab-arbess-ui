/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-06-01 14:44:20
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-28 10:20:12
 */
const orgaRouter = [
    {
        title: '系统权限中心',
        icon: 'icon1_megaphone-money',
        key: "/index/sysmgr/systemFeature",
        encoded: "system",
        children: [
            {
                title: '功能管理',
                icon: 'icon1_lcd-tv',
                key: '/index/sysmgr/systemFeature',
                encoded: "systemFeature",
            },
            {
                title: '角色管理',
                icon: 'icon1_gameboy',
                key: '/index/sysmgr/systemRole',
                encoded: "systemRole",
            }
        ]
    },
    {
        title: '项目权限中心',
        icon: 'icon1_gold-bars',
        key: "/index/sysmgr/projectFeature",
        encoded: "project",
        children: [
            {
                title: '功能管理',
                icon: 'icon1_gameboy',
                key: '/index/sysmgr/projectFeature',
                encoded: "projectFeature",
            },
            {
                title: '角色管理',
                icon: 'icon1_user5',
                key: '/index/sysmgr/projectRole',
                encoded: "projectRole",
            }   
        ]
    },
    {
        title: "导入数据",
        icon: 'icon1_user',
        key: '/index/sysmgr/loadData',
        encoded: "SysMessage",
    }

];
export default orgaRouter;