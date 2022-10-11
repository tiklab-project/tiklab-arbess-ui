import React from "react";

// 快捷（头）
const QuickIn = props =>{

    const {pipelineLength,followLength} = props

    // 不受控制
    const stableList = [
        {
            id:0,
            title: "我的流水线",
            to:"/index/pipeline",
            listLength:pipelineLength
        },
        {
            id:1,
            title:"我的收藏",
            to:"/index/pipeline",
            listLength: followLength
        },
    ]

    const renderStableList = lis => {
        return lis && lis.map(item=>{
            return(
                <div key={item.id} className="quickIn-group" onClick={()=>props.history.push(item.to)}>
                    <div className="quickIn-group-wrap">
                        <div className="quickIn-group-wrap-title">{item.title}</div>
                        <div className="quickIn-group-wrap-number">
                            {item.listLength}
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