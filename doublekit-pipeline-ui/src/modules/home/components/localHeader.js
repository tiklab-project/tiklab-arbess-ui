/**
 * @name: localHeader
 * @author: mahai
 * @date: 2021-09-01 16:48
 * @description：localHeader
 * @update: 2021-09-01 16:48
 */
import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {Col, Row, Dropdown, Menu, Button} from "antd";
import { useAccountConfig,loginOutLocal,loginOutAcc,useBasePortal } from 'doublekit-frame-ui';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
const LocalHeader = props => {
    const {
        logo,
        AppConfigComponent,
        MessageIconComponent,
        portalLoginStore,
        languageSelectData = [], // 切换语言包的数据
        redirect,
        routers,
        ...rest
    } = props;
    const authData = useAccountConfig();

    // 拦截出来
    useBasePortal(portalLoginStore, props.history, redirect);

    const { i18n } = useTranslation();
    
    const [lan, setLan] = useState(i18n.language);
    const [currentLink, setCurrentLink] = useState(props.location.pathname);

    const onClickLan = ({ key }) => {
        i18n.changeLanguage(languageSelectData[key].value)
        setLan(languageSelectData[key].value)
    };

    const menu = (
        <Menu onClick={onClickLan}>
            {
                languageSelectData.map((item, index) => {
                    return <Menu.Item key={index} value={item.value}>{item.label}</Menu.Item>
                })
            }
        </Menu>
    );
    
    
    const projectLogout = () => {
        if(authData.authType === "acc"){
            loginOutAcc(authData.authAccConfig.accUrl)
        }
        if(authData.authType === "local"){
            loginOutLocal(props.history,portalLoginStore)
        }
        
    }

    const changeCurrentLink = item => {
        setCurrentLink(item.to)
        props.history.push(item.to)
    }

    const renderRouter = () => {
        if (routers) {
            return (
                <div className={'frame-header-link'}>
                    <div key='home' onClick={ () => changeCurrentLink(routers[0])} className={currentLink === routers[0].to ? 'frame-header-link-active' : null}> {routers[0].title}</div>
                    <div key='project' onClick={ () => changeCurrentLink(routers[1])} className={currentLink === routers[1].to ? 'frame-header-link-active' : null}> {routers[1].title}</div>
                    <div key='workItem' onClick={ () => changeCurrentLink(routers[2])} className={currentLink === routers[2].to ? 'frame-header-link-active' : null}> {routers[2].title}</div>
                    {/* <WorkMenu setCurrentLink = {setCurrentLink} currentLink ={currentLink}/> */}
                    
                    <div key='programs' onClick={ () => changeCurrentLink(routers[3])} className={currentLink === routers[3].to ? 'frame-header-link-active' : null}> {routers[3].title}</div>
                    {/* <div key='system' onClick={ () => changeCurrentLink(routers[5])} className={currentLink === routers[5].to ? 'frame-header-link-active' : null}> {routers[5].title}</div> */}
                </div>
            )
        }
    }
    
    return(
        <Row className="frame-header">
            <Col span={12}>
                <div className={'frame-header-right'}>
                    {AppConfigComponent}
                    {logo && <div className={'frame-header-logo'}><img src={logo} alt={'logo'} /></div> }
                    
                    {renderRouter()}
                </div>
            </Col>
            <Col span={12}>
                <div className={'frame-header-right'}>
                    {/* <div className='frame-header-right-search-wrap'>
                        <Search />
                    </div> */}
                    <div className={'frame-header-right-text'}>
                        {/* {
                            MessageIconComponent
                        } */}

                        <Dropdown overlay={menu} className={'frame-header-dropdown'}>
                            <Button>{lan}</Button>
                        </Dropdown>
                        <span onClick={projectLogout}>退出</span>
                    </div>
                </div>
            </Col>
        </Row>
    )
}
export default withRouter(inject("portalLoginStore")(observer(LocalHeader)));