import React ,{useEffect}from "react";
import { Breadcrumb } from 'antd';
import {withRouter} from "react-router-dom";
import {taskRouters} from "../containers/route";
import {inject, observer} from "mobx-react";

const TaskHeader = props => {
    const {location}=props
    return(
        <Breadcrumb  separator=">">
            <Breadcrumb.Item
                style={{ cursor: "pointer" }}
                onClick={()=>props.history.push('/home/pipeline')}
            >
                流水线
            </Breadcrumb.Item>

            <Breadcrumb.Item>
                {localStorage.getItem('pipelineName')}
            </Breadcrumb.Item>

            {
                taskRouters.map(item=>{
                    if(item.to===location.pathname){
                        return (
                            <Breadcrumb.Item key={item.key} href={item.to}>
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