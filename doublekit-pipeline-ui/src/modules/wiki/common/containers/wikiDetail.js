/*
 * @Descripttion: 知识库详情页
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-30 15:06:15
 */
import React, { useState,useEffect } from "react";
import { Layout,Row,Col } from 'antd';
import WikideAside from "../components/wikiDetailAside";
import "../components/wikiDetail.scss";
import { renderRoutes } from "react-router-config";
import {observer, inject} from "mobx-react";
import {SYSTEM_ROLE_STORE} from "doublekit-privilege-ui"
import {getUser} from "doublekit-frame-ui"

const WikiDetail = (props)=>{
    // 解析props
    const {wikiStore,wikiDetailStore,systemRoleStore,route} = props;

    // 解析wikiStore，wikiDetailStore
    const {searchwiki, getWikilist, wikilist} = wikiStore;
    const {setWikiId} = wikiDetailStore;
    const {getInitProjectPermissions} = systemRoleStore;

    // 当前知识库名字
    const [wikiname,setWikiname] = useState();

    // 获取当前知识库id
    const wikiId = localStorage.getItem("wikiId")


    useEffect(() => {
        // 从信息页面跳入知识库详情页面时，获取知识库id
        let search = props.location.search;
        if(search !== "") {
            search = search.split("=")
            localStorage.setItem("wikiId", search[1]);
            setWikiId(search[1])
        }
        searchwiki(localStorage.getItem("wikiId")).then((res)=> {
            setWikiname(res.name)
        })

        //获取知识库列表
        getWikilist()

        // 初始化权限
        getInitProjectPermissions(getUser().userId, localStorage.getItem("wikiId"))
        return 
    }, [wikiId])


    return (
        <Layout className="wikidetail">
            <WikideAside 
                wikiName={wikiname}
                wikilist={wikilist} 
                searchwiki = {searchwiki} 
                {...props}
            />
            <Layout className="wikidetail-content">
                <Row style={{height: "100%"}}>
                    <Col className="wikidetail-content-col" xl={{span: 18,offset:3}} lg={{span: 20,offset:2}}>
                        {renderRoutes(route.routes)}
                    </Col>
                </Row>
            </Layout>
            
        </Layout>
    )
    
}
export default inject(SYSTEM_ROLE_STORE,'wikiStore','wikiDetailStore')(observer(WikiDetail));