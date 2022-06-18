import React, {useState,useEffect} from 'react';
import {Row,Col,Avatar,Button,Dropdown,Menu,Input} from 'antd';
import {useTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import logo from '../../assets/images/logo.png';
import portrait from '../../assets/images/portrait.jpg';

const  {Search} = Input
const Head =props=>{

    const {routers,languageSelectData=[]} = props;

    const { i18n } = useTranslation();
    let path = props.location.pathname
    const [lan, setLan] = useState(i18n.language);
    const [currentLink, setCurrentLink] = useState(path);

    useEffect(()=>{
        if (path.indexOf('/index/task') === 0) {
            path='/index/pipeline'
        }
        if(path.indexOf('/index/system') === 0){
            path='/index/system'
        }
        if(path === '/index/collect' || path === '/index/new' || path.indexOf('/index/config')===0 ){
            path= '/index/pipeline'
        }
        setCurrentLink(path)
    },[path])

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


    const changeCurrentLink = item => {
        props.history.push(item.to)
    }

    const renderRouter = () => {
        if (routers) {
            return routers && routers.map(routers=>{
                return (
                    <div
                        key={routers.key}
                        onClick={ () => changeCurrentLink(routers)}
                        className={currentLink === routers.to ? 'headers-active ' : null}
                    >
                        {routers.title}
                    </div>
                )
            })
        }
    }

    const logout = () => {
        props.history.push('/login')
    }

    const groupMenu = (
        <Menu>
            <Menu.Item key='1' onClick={logout}>退出</Menu.Item>
        </Menu>
    )

    return(
        <Row className="frame-header">
            <Col span={12}>
                <div className='frame-header-right'>
                    <div className='frame-header-logo'>
                        <img src={logo} alt='logo' />
                    </div>
                    <div className='headers-link'>{renderRouter()}</div>
                </div>
            </Col>
            <Col span={12}>
                <div className='frame-header-right'>
                    <div className='frame-header-right-search-wrap'>
                        {/*<Search />*/}
                    </div>
                    <div className='frame-header-right-text'>
                        <Dropdown overlay={menu} className='frame-header-dropdown'>
                            <Button>{lan}</Button>
                        </Dropdown>
                        <div/>
                        <Dropdown overlay={groupMenu} placement="bottom" >
                            <Avatar src={portrait} />
                        </Dropdown>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default withRouter(Head)