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

    const {modalVisible,setModalVisible,setFormValue} = serverStore

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
            case 'gitee':
            case 'github':
                setModalVisible(true)
                break
            case 'nexus':
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
            case 'gitee':
            case 'github':
                return modalVisible
            case 'nexus':
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
            case 'gitee':
            case 'github':
                return setModalVisible
            case 'nexus':
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
                type={type}
                isConfig={isConfig}
                serverStore={serverStore}
                authorizeStore={authorizeStore}
            />
        </>
    )
}

export default inject("serverStore","authorizeStore")(observer(ServerAddBtn))
