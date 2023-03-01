import React,{useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Btn from "../../../common/btn/Btn";
import ServerModal from "./ServerModal";

/**
 * 服务配置添加按钮
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ServerAddBtn = props =>{

    const {serverStore,authorizeStore,isConfig,type} = props

    const {modalVisible,setModalVisible,createAuthServer,formValue,setFormValue,updateAuthServer,callbackUrl} = serverStore
    const {findCode,findAccessToken,skin} = authorizeStore

    //代码扫描visible
    const [scanVisible,setScanVisible] = useState(false)

    //制品visible
    const [artifactVisible,setArtifactVisible] = useState(false)

    /**
     * 添加按钮操作
     */
    const addServerBtn = () =>{
        setFormValue("")
        switch (type) {
            case 2:
            case 3:
                setModalVisible(true)
                break
            case 51:
                setArtifactVisible(true)
                break
            default:
                setScanVisible(true)
        }
    }

    /**
     * 设置弹出框visible
     * @returns {boolean|*}
     */
    const visible = () =>{
        switch (type) {
            case 2:
            case 3:
                return modalVisible
            case 51:
                return artifactVisible
            default:
                return scanVisible
        }
    }

    /**
     * 设置弹出框setVisible
     * @returns {((value: (((prevState: boolean) => boolean) | boolean)) => void)|*}
     */
    const setVisible = () =>{
        switch (type) {
            case 2:
            case 3:
                return setModalVisible
            case 51:
                return setArtifactVisible
            default:
                return setScanVisible

        }
    }

    return(
        <>
            {
                isConfig ?
                    <Btn
                        type={"row"}
                        onClick={addServerBtn}
                        title={"添加"}
                        icon={<PlusOutlined/>}
                    />
                    :
                    <Btn
                        onClick={addServerBtn}
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

export default inject("serverStore","authorizeStore")(observer(ServerAddBtn))
