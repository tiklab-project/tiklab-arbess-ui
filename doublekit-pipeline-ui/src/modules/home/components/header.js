import React ,{Component} from 'react'
import {Input} from "antd";
import {ArrowRightOutlined} from '@ant-design/icons';
import {homeRoutes} from "../routes/homeRoutes";
import {Link,withRouter} from "react-router-dom";

const routes=homeRoutes.filter(route=>route.isShow)
const { Search } = Input;

class Head extends Component{
    onSearch=()=>{}
    render() {
        return(    
            <div className="top">
                <div className="top-nav">
                    <ul className="top-nav-l">
                        <li>
                            <span className="l-span">double</span>
                        </li>
                       {
                           routes.map(item=>{
                               return(
                                   <li key={item.path}>
                                       <Link to={item.path}>
                                           {item.title}
                                       </Link>
                                   </li>
                               )
                           })
                       }
                    </ul>
                    <ul className="top-nav-r">
                        <li className='top-nav-space'>
                            <Search placeholder="input search text" onSearch={this.onSearch} style={{ width: 300 ,height:40}} />
                        </li>
                        <li>
                            <span className="r-span">欢迎,Admin</span>
                            &nbsp;&nbsp;
                            <a href='#' ><ArrowRightOutlined /></a>
                        </li>
                    </ul>
                </div>
            </div>


        )
    }
}
export default withRouter(Head)