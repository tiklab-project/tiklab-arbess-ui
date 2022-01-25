/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-06-22 09:02:16
 */
import React from "react";
import {ProjectLogin, LOGIN_STATUS} from 'doublekit-frame-ui'
import logo from "../../assets/images/logo.png";
import {observer, inject} from 'mobx-react'
class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {}
    }
    
    render(){
        return (
            <div>
                <ProjectLogin 
                    contentImg={logo}
                    fetchMethod={fetchMethod}
                    languageUrl={pluginAddressUrl}
                    {...this.props}
                    loginGoRouter={'/index'}
                    title = {'知识库管理'}
                >
                </ProjectLogin>
            </div>
        )
    }
}
export default inject(LOGIN_STATUS)(observer(Login));