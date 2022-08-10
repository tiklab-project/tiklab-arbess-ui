import React from "react";
import {PrivilegeButton} from "tiklab-privilege-ui";

const QuickIn = props =>{

    // 不受控制
    const stableList = [
        {
            id:1,
            title:"我的收藏",
            to:"/index/collect",
        },
        {
            id:2,
            title: "我的流水线",
            to:"/index/matFlow",
        },
    ]

    // 受控制
    const inStableLis = [
        {
            id:3,
            title: "用户中心",
            to:"/index/system/base",
            enCode:"A",
        },
        {
            id:4,
            title: "权限管理",
            to:"/index/system/power/role",
            enCode:"E2",
        },
        {
            id:5,
            title: "凭证管理",
            to:"/index/system/proof",
            enCode:"F",
        },
    ]

    const renderStableList = lis => {
        return lis && lis.map(item=>{
            return(
                <div key={item.id} className="head-group" onClick={()=>props.history.push(item.to)}>
                    <div className="head-group-wrap">
                        <div className="head-group-wrap-title">{item.title}</div>
                    </div>
                </div>
            )
        })
    }

    const renderInStableList = lis => {
        return lis && lis.map(item=>{
            return(
                <PrivilegeButton key={item.id} code={item.enCode} {...props}>
                    <div key={item.id} className="head-group" onClick={()=>props.history.push(item.to)}>
                        <div className="head-group-wrap">
                            <div className="head-group-wrap-title">{item.title}</div>
                        </div>
                    </div>
                </PrivilegeButton>
            )
        })
    }

    return  <div className="homePage-head">
                {renderStableList(stableList)}
                {renderInStableList(inStableLis)}
            </div>
}

export default QuickIn