import React,{useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Btn from "../../../common/btn/btn";
import ServerModal from "./serverModal";

const ServerBtn = props =>{

    const {serverStore,authorizeStore,isConfig,type} = props

    const {modalVisible,setModalVisible,createAuthServer,formValue,setFormValue,updateAuthServer,callbackUrl} = serverStore
    const {findCode,findAccessToken} = authorizeStore

    const [gitVisible,setGitVisible] = useState(false)
    const [goodsVisible,setGoodsVisible] = useState(false)

    const btnClick = () =>{
        setFormValue("")
        switch (type) {
            case 2:
            case 3:
                setGitVisible(true)
                break
            case 51:
                setGoodsVisible(true)
                break
            default:
                setModalVisible(true)
        }
    }

    return(
        <>
            {
                isConfig ?
                    <Btn
                        type={"row"}
                        onClick={btnClick}
                        title={"添加"}
                        icon={<PlusOutlined/>}
                    />
                    :
                    <Btn
                        onClick={btnClick}
                        type={"primary"}
                        title={"添加配置"}
                        icon={<PlusOutlined/>}
                    />
            }
            <ServerModal
                visible={modalVisible}
                setVisible={setModalVisible}
                createAuthServer={createAuthServer}
                formValue={formValue}
                updateAuthServer={updateAuthServer}
                findCode={findCode}
                isConfig={isConfig}
                type={type}
                callUrl={callbackUrl}
                findAccessToken={findAccessToken}
            />

            <ServerModal
                visible={gitVisible}
                setVisible={setGitVisible}
                createAuthServer={createAuthServer}
                formValue={formValue}
                updateAuthServer={updateAuthServer}
                findCode={findCode}
                isConfig={isConfig}
                type={type}
                callUrl={callbackUrl}
                findAccessToken={findAccessToken}
            />


            <ServerModal
                visible={goodsVisible}
                setVisible={setGoodsVisible}
                createAuthServer={createAuthServer}
                formValue={formValue}
                updateAuthServer={updateAuthServer}
                findCode={findCode}
                isConfig={isConfig}
                type={51}
                callUrl={callbackUrl}
                findAccessToken={findAccessToken}
            />
        </>
    )
}

export default inject("serverStore","authorizeStore")(observer(ServerBtn))