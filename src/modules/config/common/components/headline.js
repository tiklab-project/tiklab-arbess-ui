import React from "react";


const Headline = props =>{
    const {type} = props

    const renderType = type => {
        const zz = Math.floor(type/10)
        switch (zz) {
            case 0: return "源码"
            case 1: return "测试"
            case 2: return "构建"
            case 3: return "部署"
            case 4: return "代码扫描"
            case 5: return "推送制品"
            case 6: return "消息通知"
            case 7:
                return type ===71?"执行bat脚本":"执行shell脚本"
            case 81: return "定时触发"
        }
    }

    return  <>
                {renderType(type)}
            </>
}

export default Headline