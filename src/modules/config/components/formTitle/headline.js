import React from "react";


const Headline = props =>{
    const {type} = props

    const renderType = type => {
        if(type>0 && type<10){
            return "源码"
        }else if(type>10 && type<20){
            return "测试"
        }else if(type>20 && type<30){
            return "构建"
        }else if(type>30 && type<40){
            return "部署"
        }else if(type>40 && type<50){
            return "代码扫描"
        }
    }

    return renderType(type)
}

export default Headline