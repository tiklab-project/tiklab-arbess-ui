import React, { useState} from 'react';
import {Col, Row, Dropdown, Button} from "antd";
import { withRouter } from 'react-router';
const LocalHeader = props => {

    const {headerRoutes,logo} = props
    const [currentLink, setCurrentLink] = useState(props.location.pathname);

    const changeCurrentLink = item => {
        setCurrentLink(item.to)
        props.history.push(item.to)
    }

    const renderRouter = () => {
        if (headerRoutes) {
            return (
                <div className='frame-header-link'>
                    {
                        headerRoutes && headerRoutes.map(routers=>{
                            return (
                                <div
                                    key={routers.key}
                                    onClick={ () => changeCurrentLink(routers)}
                                    className={currentLink === routers.to ? 'frame-header-link-active' : null}
                                >
                                    {routers.title}
                                </div>
                            )
                        })
                    }
               </div>
            )
        }
    }
    
    return(
        <Row className="frame-header">
            <Col span={12}>
                <div className='frame-header-right'>
                    <div className='frame-header-logo'>doublekit</div>
                    {renderRouter()}
                </div>
            </Col>
            <Col span={12}>
                <div className='frame-header-right'>
                    {/* <div className='frame-header-right-search-wrap'>
                        <Search />
                    </div> */}
                    <div className='frame-header-right-text'>
                        <Button>lan</Button>
                        <span>退出</span>
                    </div>
                </div>
            </Col>
        </Row>
    )
}
export default withRouter(LocalHeader);