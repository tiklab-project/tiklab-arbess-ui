import React from "react";
import {inject,observer} from "mobx-react";
import {PlusOutlined} from "@ant-design/icons";
import Btn from "../../../common/btn/Btn";
import AuthModal from "./AuthModal";

/**
 * 认证配置添加按钮
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AuthAddBtn = props =>{

    const {authStore,isConfig} = props

    const {createAuth,modalVisible,setModalVisible,formValue,setFormValue,updateAuth} = authStore

    /**
     * 添加认证
     */
    const addAuthBtn = () =>{
        setFormValue("")
        setModalVisible(true)
    }

    return(
        <>
            {
            isConfig ?
                <Btn
                    type={"row"}
                    onClick={()=>addAuthBtn("config")}
                    title={"添加认证"}
                    icon={<PlusOutlined/>}
                />
                :
                <Btn
                    onClick={addAuthBtn}
                    type={"primary"}
                    title={"添加认证"}
                    icon={<PlusOutlined/>}
                />
            }
            <AuthModal
                visible={modalVisible}
                setVisible={setModalVisible}
                createAuth={createAuth}
                formValue={formValue}
                updateAuth={updateAuth}
            />
        </>
    )
}

export default inject("authStore")(observer(AuthAddBtn))
