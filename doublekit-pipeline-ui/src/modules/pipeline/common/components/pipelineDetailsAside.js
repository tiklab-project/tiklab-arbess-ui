import React from "react";
import { Menu } from 'antd';
import {Link,withRouter} from "react-router-dom";
import {taskRouters} from "../containers/route";

const PipelineDetailsAside=props=>{

    let path=props.location.pathname
    if(path==='/home/task/build'){
        path='/home/task/history'
    }else if(path==='/home/task/post'){
        path='/home/task/config'
    }

    return(
        <div  className='task-left-nav'>
            <Menu
                style={{ width: 200 }}
                selectedKeys={[path]}
                mode="inline"
            >
                {
                    taskRouters.map(item=>{
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
        </div>
    )
}

export default withRouter(PipelineDetailsAside)