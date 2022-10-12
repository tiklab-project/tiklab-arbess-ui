import React from "react";

// 快捷（头）
const QuickIn = props =>{

    const {pipelineLength,followLength,setListType} = props

    // 不受控制
    const stableList = [
        {
            id:1,
            title: "我的流水线",
            listLength:pipelineLength
        },
        {
            id:2,
            title:"我的收藏",
            listLength: followLength
        },
    ]

    const goPipeline = id =>{
        setListType(id)
        props.history.push("/index/pipeline")
    }

    const renderStableList = lis => {
        return lis && lis.map(item=>{
            return(
                <div key={item.id} className="quickIn-group" onClick={()=>goPipeline(item.id)}>
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