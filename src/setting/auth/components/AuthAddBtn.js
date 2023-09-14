import React from "react";
import {PlusOutlined} from "@ant-design/icons";
import Btn from "../../../common/component/btn/Btn";
import AuthModal from "./AuthModal";

/**
 * 认证配置添加按钮
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
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
            <Btn
                onClick={addAuthBtn}
                type={isConfig?"row":"primary"}
                title={"添加认证"}
                icon={<PlusOutlined/>}
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
