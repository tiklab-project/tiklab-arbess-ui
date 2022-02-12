import React from "react";
import { Menu } from 'antd';
import {Link,withRouter} from "react-router-dom";
import {taskRouters} from "../containers/route";

const LeftNav=props=>{
    const path=props.location.pathname
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
export default withRouter(LeftNav)