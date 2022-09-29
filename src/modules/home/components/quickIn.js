import React from "react";

// 快捷（头）
const QuickIn = props =>{

    const {matFlowList,followList} = props

    // 不受控制
    const stableList = [
        {
            id:0,
            title: "我的流水线",
            to:"/index/matFlow",
            list:matFlowList
        },
        {
            id:1,
            title:"我的收藏",
            to:"/index/collect",
            list: followList
        },
    ]

    const renderStableList = lis => {
        return lis && lis.map(item=>{
            return(
                <div key={item.id} className="quickIn-group" onClick={()=>props.history.push(item.to)}>
                    <div className="quickIn-group-wrap">
                        <div className="quickIn-group-wrap-title">{item.title}</div>
                        <div className="quickIn-group-wrap-number">
                            {
                                item.list && item.list.length > 0 ? item.list.length :0
                            }
                        </div>
                    </div>
                </div>
            )
        })
    }

    return  <div className="quickIn">
                {renderStableList(stableList)}
            </div>
}

export default QuickIn