# 1、assets 
静态资源

| 文件         | 说明 |
|------------|----|
| images     | 图片 |

# 2、common
公共组件以及方法

| 文件          | 说明  |
|-------------|-----|
| component   | 组件  |
| language    | 语言  |
| layout      | 布局  |
| lazy        | 懒加载 |
| styles      | 样式  |
| utils       | 工具  |

## 2.1、component
公共组件

| 文件         | 说明                      |
|------------|-------------------------|
| aside      | 侧边栏(二级，流水线，设置)          |
| breadcrumb | 面包屑                     |
| btn        | 按钮                      |
| drawer     | 抽屉                      |
| echarts    | 图表                      |
| editor     | 代码编辑器                   |
| list       | 列表组件(动态，删除编辑操作，图标，空列表)  |
| loading    | 加载                      |
| modal      | 弹出框                     |
| page       | 分页                      |
| profile    | 头像                      |
| search     | 搜索(文本，下拉，时间)            |
| tabs       | 标签页                     |

## 2.2、language
语言包，用于国际化配置

## 2.3、layout
布局

| 文件            | 说明                           |
|---------------|------------------------------|
| Layout        | 单页面的布局，集成导航、帮助链接和用户认证等功能     |
| PipelineAside | 流水线侧边栏，提供可展开/收起的导航功能         |
| Portal        | 主要布局框架，处理整体页面结构              |
| PortalFeature | 企业特性                         |
| PortalMessage | 消息通知                         |
| SettingAside  | 设置页面的侧边栏导航                   |

## 2.4、lazy
懒加载

| 文件            | 说明                   |
|---------------|----------------------|
| SyncComponent | 组件懒加载实现              |

## 2.5、styles
样式

| 文件        | 说明        |
|-----------|-----------|
| Normalize | 基础样式      |
| Index     | 主题样式，公共样式 |

## 2.6、utils
工具类

| 文件           | 说明           |
|--------------|--------------|
| Requset      | 网络请求封装       |
| Client       | 基本工具(分页、防抖等) |

# 3、home
首页

# 4、login
| 文件                 | 说明       |
|--------------------|----------|
| ExcludeProductUser | 没有应用访问权限 |
| Login              | 登录       |
| LoginRpw           | 首次登录修改密码 |
| Logout             | 退出       |
| NotFound           | 404      |
| SysException       | 系统异常     |

# 5、pipeline
流水线相关功能模块

| 文件         | 说明          |
|------------|-------------|
| authorize  | 流水线授权回调地址页面 |
| design     | 流水线设计       |
| history    | 流水线历史       |
| overview   | 流水线概况       |
| pipeline   | 流水线列表       |
| setting    | 流水线设置       |
| statistics | 流水线统计       |
| test       | 流水线测试       |

## 5.1、design
流水线设计

| 文件            | 说明      |
|---------------|---------|
| processDesign | 流水线流程设计 |
| postprocess   | 流水线后置处理 |
| trigger       | 流水线触发器  |
| variable      | 流水线变量   |

## 5.2、setting
流水线设置

| 文件         | 说明       |
|------------|----------|
| basicInfo  | 流水线基础信息  |

## 5.3、test
流水线测试

| 文件         | 说明            |
|------------|---------------|
| maven      | 单元测试          |
| spotbugs   | Java代码扫描      |
| sonarQube  | sonarQube代码扫描 |
| testhubo   | testhubo自动化测试 |

# 6、setting
系统设置模块

| 文件          | 说明    |
|-------------|-------|
| base        | 基础数据  |
| configure   | 流水线配置 |
| home        | 设置首页  |
| licence     | 应用    |
| message     | 消息    |
| privilege   | 权限    |
| resources   | 资源监控  |
| security    | 安全    |
| server      | 服务集成  |
| user        | 用户    |

## 6.1、base
| 文件          | 说明    |
|-------------|-------|
| log         | 日志配置  |
| message     | 消息配置  |
| privilege   | 权限配置  |
| user        | 用户配置  |

## 6.2、configure
流水线配置

| 文件       | 说明           |
|----------|--------------|
| agent    | Agent        |
| auth     | 认证配置         |
| env      | 流水线应用        |
| grouping | 流水线环境        |
| host     | 主机配置         |
| k8s      | Kubernetes集群 |
| tool     | 工具配置         |
| server   | 服务配置         |

## 6.2、configure
资源配置

| 文件       | 说明           |
|----------|--------------|
| host     | 主机配置         |
| k8s      | Kubernetes集群 |

## 6.2、integration
集成与开发

| 文件       | 说明      |
|----------|---------|
| openApi  | openApi |
| server   | 服务集成    |
| tool     | 工具集成    |

# 7、配置文件
| 文件            | 说明           |
|---------------|--------------|
| webpack.*.js  | webpack配置    |
| package.json  | 项目依赖配置       |
| .env.*        | 环境变量配置       |

