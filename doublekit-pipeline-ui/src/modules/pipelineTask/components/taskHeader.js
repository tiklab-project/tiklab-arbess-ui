import React,{Component} from "react";
import { Breadcrumb } from 'antd';
import {withRouter} from "react-router-dom";
import {taskRouter} from "../routes/taskroutes";

class TaskHeader extends Component{
    render() {
        const path=this.props.location.pathname
        return (
            <Breadcrumb  separator=">">
                <Breadcrumb.Item
                    style={{ cursor: "pointer" }}
                    onClick={()=>this.props.history.push('/pipeline')}
                >
                    流水线
                </Breadcrumb.Item>
                {
                    taskRouter.map(item=>{
                    if(item.path===path){
                        return (
                            <Breadcrumb.Item key={item.path} href={item.path}>
                                {item.title}
                            </Breadcrumb.Item>
                        )
                    }
                })
                }
            </Breadcrumb>
        )
    }
}
export default withRouter(TaskHeader)