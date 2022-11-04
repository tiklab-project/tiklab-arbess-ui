import React,{useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import Btn from "../../../../common/btn/btn";
import {inject,observer} from "mobx-react";
import ScanModal from "./scanModal";

const CodeBtn = props =>{

    const {scanStore} = props
    const {createAuthCodeScan,modalVisible,setModalVisible,formValue,setFormValue,updateAuthCodeScan} = scanStore

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
            <ScanModal
                visible={modalVisible}
                setVisible={setModalVisible}
                createAuthCodeScan={createAuthCodeScan}
                formValue={formValue}
                updateAuthCodeScan={updateAuthCodeScan}
            />
        </>
    )
}

export default inject("scanStore")(observer(CodeBtn))