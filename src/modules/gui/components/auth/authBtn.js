import React,{useState} from "react";
import {PlusOutlined} from "@ant-design/icons"
import {observer} from "mobx-react";
import Btn from "../../../../common/btn/btn";
import ServerModal from "./serverModal";
import HostModal from "./hostModal";
import AuthModal from "./authModal";
import authorizeStore from "../../store/authorizeStore";
import authStore from "../../store/auth";

const AuthBtn = props =>{

    const {type} = props

    const {createAuth,createAuthServer,createAuthHost} = authStore
    const {findCode,findState} = authorizeStore

    const [authVisible,setAuthVisible] = useState(false)
    const [serverVisible,setServerVisible] = useState(false)
    const [hostVisible,setHostVisible] = useState(false)


    const btnClick = () =>{
        switch (type) {
            case 1:
            case 4:
            case 5:
                return setAuthVisible(true)
            case 3:
            case 2:
            case 41:
            case 51:
                return setServerVisible(true)
            case 31:
            case 32:
            case 52:
                return setHostVisible(true)
        }
    }

    return(
        <>
            <Btn
                onClick={btnClick}
                title={"添加认证"}
                icon={<PlusOutlined/>}
            />
            <AuthModal
                visible={authVisible}
                setVisible={setAuthVisible}
                createAuth={createAuth}
            />
            <ServerModal
                visible={serverVisible}
                setVisible={setServerVisible}
                createAuthServer={createAuthServer}
                findCode={findCode}
                findState={findState}
                type={type}
            />
            <HostModal
                visible={hostVisible}
                setVisible={setHostVisible}
                createAuthHost={createAuthHost}
            />
        </>
    )
}

export default observer(AuthBtn)