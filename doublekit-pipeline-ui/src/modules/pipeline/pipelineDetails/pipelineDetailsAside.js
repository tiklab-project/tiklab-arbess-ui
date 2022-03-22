import React from "react";
import { Menu } from 'antd';
import {Link,withRouter} from "react-router-dom";
import {taskRouters} from "./route";

const PipelineDetailsAside=props=>{

    let path=props.location.pathname
    if(path==='/home/task/build'){
        path='/home/task/history'
    }else if(path==='/home/task/post'){
        path='/home/task/config'
    }

    return(
        <Menu
            style={{ width: 220 }}
            selectedKeys={[path]}
            mode="inline"
        >
            {
                taskRouters  && taskRouters.map(item=>{
                    return(
                        <Menu.Item key={item.to} icon={item.icon}>
                            <Link to={item.to}>
                                {item.title}
                            </Link>
                        </Menu.Item>
                    )
                })
            }
        </Menu>
    )
}

export default withRouter(PipelineDetailsAside)