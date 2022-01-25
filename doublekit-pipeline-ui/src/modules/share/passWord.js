/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-14 14:27:39
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-16 09:20:33
 */
import React, { useMemo, useEffect, useCallback, useState, useRef } from "react";
import { inject, observer } from "mobx-react";
import { Input, Button } from 'antd';
import logo from "../../assets/images/logo.png"
import "./passWord.scss"
import { data } from "autoprefixer";
import { withRouter } from "react-router";
const PassWord = (props) => {
    const {shareStore} = props;
    const { verifyAuthCode } = shareStore
    const [value,setValue] = useState();
    const change = (e) => {
        setValue(e.target.value)
    }
    const jump = ()=> {
        verifyAuthCode({shareLink:`${props.match.params.shareId}${props.location.search}`,authCode:value}).then((data)=> {
            if(data.data === "true"){
                props.history.push({pathname: `/shareDocument/${props.match.params.id}/${props.match.params.shareId}${props.location.search}`,state: {password: data.data}})
            }
        })
    }
    useEffect(()=> {
        console.log(props)
    })
    return <div className="documment-password">
        <div className="password-log">
            <img src={logo} alt="" />
            <span>知识库</span>
        </div>
        <div className="password-box">
            <div className="box-title">
                <svg className="user-icon" aria-hidden="true">
                    <use xlinkHref="#icon1_user5"></use>
                </svg>
                <span>
                    admin
                </span>

            </div>
            <div className="box-content">
                <div className="box-text">请填写提取码：</div>
                <div className="box-input">
                    <Input onChange = {(e)=> change(e)}/>
                    <Button type="primary" onClick = {()=>jump()}>确定</Button>
                </div>
            </div>
        </div>

    </div>
}
// export default PassWord;
export default inject("shareStore")(observer(withRouter(PassWord)));