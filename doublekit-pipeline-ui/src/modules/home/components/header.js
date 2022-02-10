import React  from 'react'
import {Input} from "antd";
import {ArrowRightOutlined} from '@ant-design/icons';
import {Link,withRouter} from "react-router-dom";

const { Search } = Input;

const Head =()=>{
    const headerRoutes=[
        {
            to:'/home/pipeline',
            title: "流水线",
        },
        {
            to:'/home/system',
            title:'系统设置'
        }
    ]
    const onSearch=()=>{}
    return(
        <div className="top">
            <div className="top-nav">
                <ul className="top-nav-l">
                    <li>
                        <span className="l-span">doublekit</span>
                    </li>
                    {
                        headerRoutes.map(item=>{
                            return(
                                <li key={item.to}>
                                    <Link to={item.to}>
                                        {item.title}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <ul className="top-nav-r">
                    <li className='top-nav-space'>
                        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 300 ,height:40}} />
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
export default withRouter(Head)