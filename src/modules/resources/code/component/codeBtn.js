import React,{useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import Btn from "../../../../common/btn/btn";
import {inject,observer} from "mobx-react";
import CodeModal from "./codeModal";

const CodeBtn = props =>{

    const {codeStore} = props
    const {createAuthCode,modalVisible,setModalVisible,formValue,setFormValue,updateAuthCode} = codeStore

    const btnClick = () =>{
        setFormValue("")
        setModalVisible(true)
    }

    return(
        <>
            <Btn
                onClick={btnClick}
                type={"primary"}
                title={"添加配置"}
                icon={<PlusOutlined/>}
            />
            <CodeModal
                visible={modalVisible}
                setVisible={setModalVisible}
                createAuthCode={createAuthCode}
                formValue={formValue}
                updateAuthCode={updateAuthCode}
            />
        </>
    )
}

export default inject("codeStore")(observer(CodeBtn))