import React, {useState,Fragment} from 'react'
import {Input} from "antd";
import {withRouter} from "react-router-dom";

const { Search } = Input;

const Head =props=>{

    const {routers} = props;

    const [currentLink, setCurrentLink] = useState(props.location.pathname);
    const changeCurrentLink = item => {
        setCurrentLink(item.to)
        props.history.push(item.to)
    }
    const renderRouter = () => {
        if (routers) {
            return (
                <Fragment >
                    {
                        routers && routers.map(routers=>{
                          return (
                              <li
                                  key={routers.key}
                                  onClick={ () => changeCurrentLink(routers)}
                                  className={currentLink === routers.to ? 'header-link-active header-link' : 'header-link'}
                              >
                                  {routers.title}
                              </li>
                          )
                        })
                    }
                </Fragment>
            )
        }
    }

    const onSearch=()=>{}

    return(
        <div className="header">
            <div className='header-logo'>doublekit</div>
            <ul className="header-nav">
                {renderRouter()}
            </ul>

            <ul className="header-right header-nav">
                {/*<li className='header-content-right-search-wrap'>*/}
                {/*    <Search placeholder="input search text" onSearch={onSearch} style={{ width: 300 ,height:40}} />*/}
                {/*</li>*/}
                <li  className='header-link'>
                    <a href='#' >登录</a>
                </li>
            </ul>
        </div>
    )
}

export default withRouter(Head)