import React,{useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Btn from "../../../common/btn/btn";
import ServerModal from "./serverModal";

const ServerBtn = props =>{

    const {serverStore,authorizeStore,isConfig,type} = props

    const {modalVisible,setModalVisible,createAuthServer,formValue,setFormValue,updateAuthServer,callbackUrl} = serverStore
    const {findCode,findAccessToken,skin} = authorizeStore

    const [scanVisible,setScanVisible] = useState(false)
    const [goodsVisible,setGoodsVisible] = useState(false)

    const visible = () =>{
        switch (type) {
            case 2:
            case 3:
                return modalVisible
            case 51:
                return goodsVisible
            default:
                return scanVisible
        }
    }

    const setVisible = () =>{
        switch (type) {
            case 2:
            case 3:
                return setModalVisible
            case 51:
                return setGoodsVisible
            default:
                return setScanVisible

        }
    }

    const btnClick = () =>{
        setFormValue("")
        switch (type) {
            case 2:
            case 3:
                setModalVisible(true)
                break
            case 51:
                setGoodsVisible(true)
                break
            default:
                setScanVisible(true)
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
                visible={visible()}
                setVisible={setVisible()}
                createAuthServer={createAuthServer}
                formValue={formValue}
                updateAuthServer={updateAuthServer}
                findCode={findCode}
                isConfig={isConfig}
                type={type}
                callUrl={callbackUrl}
                findAccessToken={findAccessToken}
                skin={skin}
            />
        </>
    )
}

export default inject("serverStore","authorizeStore")(observer(ServerBtn))