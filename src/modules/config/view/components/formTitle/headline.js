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
        }
    }

    return  <>
                {renderType(type)}
            </>
}

export default Headline