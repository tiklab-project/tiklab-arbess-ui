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
                    <li key='home'
                        onClick={ () => changeCurrentLink(routers[0])}
                        className={currentLink === routers[0].to ? 'header-link-active header-link' : 'header-link'}
                    >
                        {routers[0].title}
                    </li>
                    <li key='system'
                        onClick={ () => changeCurrentLink(routers[1])}
                        className={currentLink === routers[1].to ? 'header-link-active header-link' : 'header-link'}
                    >
                        {routers[1].title}
                    </li>
                </Fragment>
            )
        }
    }

    const onSearch=()=>{}

    return(
        <div className="header">
            <div className={'header-logo'}>doublekit</div>
            <ul className="header-nav">
                {renderRouter()}
            </ul>

            <ul className="header-right header-nav">
                {/*<li className='header-content-right-search-wrap'>*/}
                {/*    <Search placeholder="input search text" onSearch={onSearch} style={{ width: 300 ,height:40}} />*/}
                {/*</li>*/}
                <li  className={'header-link'}>
                    <a href='#' >登录</a>
                </li>
            </ul>
        </div>
    )
}

export default withRouter(Head)