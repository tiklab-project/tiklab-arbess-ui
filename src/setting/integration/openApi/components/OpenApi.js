/**
 * @Description: 集成openApi
 * @Author: gaomengyuan
 * @Date: 2025/3/20
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/20
 */
import React from "react";
import {Col, Row} from "antd";
import "./OpenApi.scss";
import {RightOutlined} from "@ant-design/icons";
import BreadCrumb from "../../../../common/component/breadcrumb/BreadCrumb";
import {productImg} from "tiklab-core-ui";


const OpenApi = (props) => {

    const goOpenApiDoc = () =>{
        window.open('/#/openApi')
    }

    return (
        <Row className='integration-openApi arbess-home-limited'>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "18" , offset: "3"}}
                xl={{ span: "16", offset: "4" }}
                xxl={{ span: "14", offset: "5" }}
            >
                <BreadCrumb
                    crumbs={[
                        {title:'openApi'},
                    ]}
                />
                <div className="integration-openApi-ul">
                    <div className="integration-openApi-li" onClick={goOpenApiDoc}>
                        <div className="openApi-li-icon">
                            <img src={productImg.postin} width={18} height={18} alt={''}/>
                        </div>
                        <div className="openApi-li-center">
                            <div className="openApi-li-title">openApi</div>
                            <div className="openApi-li-desc">开放应用程序接口</div>
                        </div>
                        <div className="openApi-li-down">
                            <RightOutlined />
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default OpenApi
