import React from "react";
import {PlusOutlined} from "@ant-design/icons";
import Btn from "../../../common/btn/btn";
import AuthModal from "./authModal";
import {inject,observer} from "mobx-react";

const AuthBtn = props =>{

    const {authStore,isConfig} = props

    const {createAuth,modalVisible,setModalVisible,formValue,setFormValue,updateAuth} = authStore

    const btnClick = () =>{
        setFormValue("")
        setModalVisible(true)
    }

    return(
        <>
            {
                isConfig ?
                    <Btn
                        type={"row"}
                        onClick={()=>btnClick("config")}
                        title={"添加认证"}
                        icon={<PlusOutlined/>}
                    />
                    :
                    <Btn
                        onClick={btnClick}
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

export default inject("authStore")(observer(AuthBtn))