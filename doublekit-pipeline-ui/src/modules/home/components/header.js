import React, {useState} from 'react'
import {Input} from "antd";
import {ArrowRightOutlined} from '@ant-design/icons';
import {withRouter} from "react-router-dom";

const { Search } = Input;

const Head =props=>{
    const {
        routers,
    } = props;
    const [currentLink, setCurrentLink] = useState(props.location.pathname);
    const changeCurrentLink = item => {
        setCurrentLink(item.to)
        props.history.push(item.to)
    }
    const renderRouter = () => {
        if (routers) {
            return (
                <div className={'header-content-link'}>
                    <li key='home' onClick={ () => changeCurrentLink(routers[0])} className={currentLink === routers[0].to ? 'header-content-link-active' : null}> {routers[0].title}</li>
                    <li key='system' onClick={ () => changeCurrentLink(routers[1])} className={currentLink === routers[1].to ? 'header-content-link-active' : null}> {routers[1].title}</li>
                </div>
            )
        }
    }
    const onSearch=()=>{}
    return(
        <div className="header">
            <div className="header-content">
                <ul className="header-content-left">
                    <li className={'header-content-logo'}>doublekit</li>
                    {renderRouter()}
                </ul>
                <ul className="header-content-right">
                    {/*<li className='header-content-right-search-wrap'>*/}
                    {/*    <Search placeholder="input search text" onSearch={onSearch} style={{ width: 300 ,height:40}} />*/}
                    {/*</li>*/}
                    <li className={'header-content-right-text'}>
                        <span >欢迎,Admin</span>
                        &nbsp;&nbsp;
                        <a href='#' ><ArrowRightOutlined /></a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default withRouter(Head)