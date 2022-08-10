import React from "react";
import "./dynamicList.scss";
import EmptyText from "./emptyText";

const DynamicList = props =>{

    const {dynamicList,pageNumber,dynamicTitle,dynamicClick} = props

    const goUser = item => {
        props.history.push("/index/system/base")
        // if(item.id === userId){
        //     props.history.push("/index/system/base")
        // }else {
        //     props.history.push("/index/system/list")
        // }
    }

    const goMatFlow = matFlowName => {
        props.history.push(`/index/task/${matFlowName}/work`)
    }

    const dynamic = dynamicClick =>{
        switch (dynamicClick) {
            case "返回":
                props.history.push("/index")
                break
            case "更多":
                props.history.push("/index/dynamic")
        }
    }

    return(
        <div className={`dynamic ${dynamicClick ==="更多" ? "dynamic-shadow" : ""}`}>
            <div className="dynamic-top">
                <div className="dynamic-top-title">{dynamicTitle}</div>
                <div className="dynamic-top-ac">
                    <div onClick={()=>dynamic(dynamicClick)}>
                        {dynamicClick}
                    </div>
                </div>
            </div>
            <div className="dynamic-list">
                {
                    dynamicList && dynamicList.length  > 0 ?
                        dynamicList.map((item,index)=> {
                            return <div className="dynamic-list-listHeader" key={index}>
                                <div>
                                    <span>{(index+1)+(pageNumber-1)*15}、用户</span>
                                    <span className="name" onClick={()=>goUser(item.user)}>
                                        {item.user && item.user.name}
                                    </span>
                                    <span>{item.massage}</span>
                                    <span className="name"
                                          onClick={() => goMatFlow(item.matFlow && item.matFlow.matflowName)}
                                    >
                                        {item.matFlow && item.matFlow.matflowName}
                                    </span>
                                    <span>{item.news}</span>
                                </div>
                                <div>{item.createTime}</div>
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