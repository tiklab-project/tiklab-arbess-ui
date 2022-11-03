import React from "react";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import IdentifyModal from "./identifyModal";
import {inject,observer} from "mobx-react";

const IdentifyAddBtn = props =>{

    const {identifyStore,authorizeStore,isBtn} = props

    const {visible,setVisible,formValue,setFormValue,createAuth,updateAuth} = identifyStore
    const {findMessage,findCode,authorizeMes,findState} = authorizeStore

    const add = () =>{
        setVisible(true)
        setFormValue("")
    }

    return(
        <div>
            {
                isBtn ?
                    <div onClick={()=>setVisible(true)}>
                        <PlusOutlined />&nbsp;&nbsp;添加
                    </div>
                    :
                    <div>
                        <Button type="primary" onClick={()=>add()}>
                            <PlusOutlined/>添加认证
                        </Button>
                    </div>
            }
            <IdentifyModal
                visible={visible}
                setVisible={setVisible}
                formValue={formValue}
                createAuth={createAuth}
                updateAuth={updateAuth}
                findMessage={findMessage}
                findCode={findCode}
                authorizeMes={authorizeMes}
                findState={findState}
            />
        </div>
    )
}

export default inject("identifyStore","authorizeStore")(observer(IdentifyAddBtn))