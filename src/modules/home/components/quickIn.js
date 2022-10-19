import React from "react";

// 快捷（头）
const QuickIn = props =>{

    const {pipelineLength,followLength,setListType} = props

    // 不受控制
    const stableList = [
        {
            id:1,
            title: "我的流水线",
            icon:"#icon-icon-test",
            listLength:pipelineLength
        },
        {
            id:2,
            title:"我的收藏",
            icon:"#icon-renwu",
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
                <div
                    key={item.id}
                    className="quickIn-group"
                    onClick={()=>goPipeline(item.id)}
                >
                    <div className="quickIn-group-wrap">
                        <div className="quickIn-group-wrap-title">
                            <span className="quickIn-group-icon">
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`${item.icon}`}/>
                                </svg>
                            </span>
                            <span>{item.title}</span>
                        </div>
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