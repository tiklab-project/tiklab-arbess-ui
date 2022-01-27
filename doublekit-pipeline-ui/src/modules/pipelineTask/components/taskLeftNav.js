import React,{Component} from "react";
import { Menu } from 'antd';
import {taskRouter} from "../routes/taskroutes";
import {Link,withRouter} from "react-router-dom";

const routes=taskRouter.filter(route=>route.isShow)

class LeftNav extends Component{
    render() {
        const path=this.props.location.pathname
        return(
            <div  className='task-left-nav'>
                <Menu
                    defaultSelectedKeys={['/task/work']}
                    style={{ width: 200 }}
                    selectedKeys={[path]}
                    mode="inline"
                >
                    {
                        routes.map(item=>{
                            return(
                                <Menu.Item key={item.path} icon={item.icon}>
                                    <Link to={item.path}>
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
}
export default withRouter(LeftNav)