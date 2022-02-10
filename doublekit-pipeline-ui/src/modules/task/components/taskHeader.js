import React from "react";
import { Breadcrumb } from 'antd';
import {withRouter} from "react-router-dom";
import {taskRouters} from "../route";


const TaskHeader=(props)=>{
    const path=props.location.pathname
    return(
        <Breadcrumb  separator=">">
            <Breadcrumb.Item
                style={{ cursor: "pointer" }}
                onClick={()=>props.history.push('/home/pipeline')}
            >
                流水线
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                任务
            </Breadcrumb.Item>
            {
                taskRouters.map(item=>{
                    if(item.to===path){
                        return (
                            <Breadcrumb.Item key={item.to} href={item.to}>
                                {item.title}
                            </Breadcrumb.Item>
                        )
                    }
                })
            }
        </Breadcrumb>
    )
}
export default withRouter(TaskHeader)