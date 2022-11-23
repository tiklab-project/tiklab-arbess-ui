import React,{useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import Btn from "../../../common/btn/btn";
import {inject,observer} from "mobx-react";
import HostModal from "./hostModal";

const CodeBtn = props =>{

    const {hostStore,isConfig} = props
    const {createAuthHost,modalVisible,setModalVisible,formValue,setFormValue,updateAuthHost} = hostStore

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
            <HostModal
                visible={modalVisible}
                setVisible={setModalVisible}
                createAuthHost={createAuthHost}
                formValue={formValue}
                updateAuthHost={updateAuthHost}
            />
        </>
    )
}

export default inject("hostStore")(observer(CodeBtn))