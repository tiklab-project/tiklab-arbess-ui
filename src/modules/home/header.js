import React, {useState,Fragment,useEffect} from 'react'
import {Input} from "antd";
import {withRouter} from "react-router-dom";
import logo from '../../assets/images/logo.png'

const { Search } = Input;

const Head =props=>{

    const {routers} = props;

    const [currentLink, setCurrentLink] = useState('流水线');
    const nav = localStorage.getItem('nav')

    useEffect(()=>{
        setCurrentLink(nav)
    },[nav])

    const changeCurrentLink = item => {
        localStorage.setItem('nav',item.title)
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
                                  className={currentLink === routers.title ? 'header-link-active header-link' : 'header-link'}
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

    return(
        <div className="header">
            <div className='header-logo'>
                <img src={logo} alt={'logo'} />
            </div>
            <ul className="header-nav">
                {renderRouter()}
            </ul>

            <ul className="header-right header-nav">
                <li  className='header-link'>
                    <a href='/#/login' >登录</a>
                </li>
            </ul>
        </div>
    )
}

export default withRouter(Head)