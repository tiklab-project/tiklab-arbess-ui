import React, {useState,Fragment,useEffect} from 'react'
import {Input} from "antd";
import {useTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import logo from '../../assets/images/logo.png'

const { Search } = Input;

const Head =props=>{

    const {routers} = props;

    const [currentLink, setCurrentLink] = useState('流水线');
    const nav = localStorage.getItem('nav')
    const { i18n } = useTranslation();
    const [lan, setLan] = useState(i18n.language);

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
                                  className={currentLink === routers.title ? 'headers-link-active headers-link' : 'headers-link'}
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
        <div className="headers">
            <div className='headers-logo'>
                <img src={logo} alt={'logo'} />
            </div>
            <ul className="headers-nav">
                {renderRouter()}
            </ul>

            <ul className="headers-right header-nav">
                <li  className='headers-link'>
                    <span onClick={()=>props.history.push('/login')}>登录</span>
                </li>
            </ul>
        </div>
    )
}

export default withRouter(Head)