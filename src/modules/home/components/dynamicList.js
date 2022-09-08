import React from "react";
import "./dynamicList.scss";
import EmptyText from "./emptyText";

const DynamicList = props =>{

    const {dynamicList,pageNumber,dynamicTitle,dynamicClickText} = props

    const goUser = () => {
        props.history.push("/index/system/list")
    }

    const goMatFlow = matFlowName => {
        props.history.push(`/index/task/${matFlowName}/work`)
    }

    const dynamic = dynamicClickText =>{
        switch (dynamicClickText) {
            case "返回":
                props.history.push("/index")
                break
            case "更多":
                props.history.push("/index/dynamic")
        }
    }

    return(
        <div className={`dynamic ${dynamicClickText==="更多" ? "dynamic-shadow" : ""}`}>
            <div className="dynamic-top">
                <div className="dynamic-top-title">{dynamicTitle}</div>
                <div className="dynamic-top-ac">
                    <div onClick={()=>dynamic(dynamicClickText)}>
                        {dynamicClickText}
                    </div>
                </div>
            </div>
            <div className="dynamic-list">
                {
                    dynamicList && dynamicList.length  > 0 ?
                        dynamicList.map((item,index)=> {
                            return <div className="dynamic-list-item" key={index}>
                                <div className="dynamic-item">
                                    <div className="dynamic-item-title">
                                        <span>{(index+1)+(pageNumber-1)*15}、用户</span>
                                        <span
                                            // className="dynamic-item-name" onClick={()=>goUser()}
                                        >
                                        {item.user && item.user.name}
                                    </span>
                                    <span>{item.massage}</span>
                                    <span className="dynamic-item-name"
                                          onClick={()=>goMatFlow(item.matFlow && item.matFlow.matflowName)}
                                    >
                                        {item.matFlow && item.matFlow.matflowName}
                                    </span>
                                    <span>{item.news}</span>
                                </div>
                                <div>{item.createTime}</div>
                            </div>
                        </div>
                        })
                        :
                        <EmptyText/>
                }
            </div>
        </div>
    )
}

export default DynamicList