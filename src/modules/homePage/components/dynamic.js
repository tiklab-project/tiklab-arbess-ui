import React, {Fragment} from "react";
import {Button, List} from "antd";

const Dynamic = props =>{

    const {dynamicList,userId} = props

    const goUser = item => {
        if(item.id === userId){
            props.history.push("/index/system")
        }else {
            props.history.push("/index/system/list")
        }
    }
    
    const goPipeline = item =>{
        localStorage.setItem("pipelineName",item.pipelineName)
        localStorage.setItem("pipelineId",item.pipelineId)
        props.history.push("/index/task")
    }

    return(
        <div className="homePage-content-dynamic">
            <div className="dynamic-top">
                <div className="dynamic-top-title">近期动态</div>
                <div>
                    {
                        dynamicList && dynamicList.length === 0
                        ? null:
                        <Button onClick={()=>props.history.push("/index/dynamic")}>
                            更多
                        </Button>
                    }
                </div>
            </div>
            <div className="dynamic-bottom">
                <List
                    size="large"
                    bordered
                    locale={{emptyText:
                            <Fragment>
                                <svg className="icon" aria-hidden="true" >
                                    <use xlinkHref="#icon-meiyouxiangguan"/>
                                </svg>
                                <div>没有数据</div>
                            </Fragment>
                    }}
                    dataSource={dynamicList}
                    renderItem={(item,index) => <List.Item>
                        <div  className="dynamic-bottom-listHeader">
                            <div>
                                <span>{index+1}、用户</span>
                                <span className="name" onClick={()=>goUser(item.user)}>
                                   {item.user && item.user.name}
                                </span>
                                <span>{item.massage}</span>
                                <span className="name" onClick={()=>goPipeline(item.pipeline)}>
                                    {item.pipeline && item.pipeline.pipelineName}
                                </span>
                                <span>{item.news}</span>
                            </div>
                            <div>{item.createTime}</div>
                        </div>
                    </List.Item>}
                />
            </div>
        </div>
    )
}

export default Dynamic