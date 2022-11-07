import React from "react";
import {PlusOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Btn from "../../../../common/btn/btn";
import ServerModal from "./serverModal";

const ServerBtn = props =>{

    const {serverStore,authorizeStore,isConfig,type} = props

    const {modalVisible,setModalVisible,createAuthServer,formValue,setFormValue,updateAuthServer} = serverStore
    const {findCode,findState} = authorizeStore

    const btnClick = is =>{
        setFormValue(is)
        setModalVisible(true)
    }

    return(
        <>
            {
                isConfig ?
                    <Btn
                        onClick={()=>btnClick("config")}
                        title={"添加"}
                        icon={<PlusOutlined/>}
                    />
                    :
                    <Btn
                        onClick={()=>btnClick("sys")}
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
                findState={findState}
                isConfig={isConfig}
                type={type}
            />
        </>
    )
}

export default inject("serverStore","authorizeStore")(observer(ServerBtn))