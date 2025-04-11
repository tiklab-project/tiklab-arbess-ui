/**
 * @Description: 认证配置添加按钮
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import Button from "../../../../common/component/button/Button";
import AuthModal from "./AuthModal";

const AuthAddBtn = props =>{

    const {isConfig,visible,setVisible,formValue,setFormValue,findAuth} = props

    /**
     * 添加认证
     */
    const addAuthBtn = () =>{
        setVisible(true)
        if(formValue){
            setFormValue(null)
        }
    }

    return(
        <>
            <Button
                onClick={addAuthBtn}
                type={isConfig?"row":"primary"}
                title={isConfig?"添加" :"添加认证"}
            />
            <AuthModal
                visible={visible}
                setVisible={setVisible}
                formValue={formValue || null}
                findAuth={findAuth}
            />
        </>
    )
}

export default AuthAddBtn
