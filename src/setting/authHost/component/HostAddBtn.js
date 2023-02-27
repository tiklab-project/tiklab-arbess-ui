import React,{useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Btn from "../../../common/btn/Btn";
import HostModal from "./HostModal";

const CodeBtn = props =>{

    const {hostStore,isConfig,type} = props
    const {createAuthHost,modalVisible,setModalVisible,formValue,setFormValue,updateAuthHost} = hostStore

    const [goodsVisible,setGoodsVisible] = useState(false)

    const btnClick = () =>{
        setFormValue("")
        switch (type) {
            case 52:
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

            <HostModal
                visible={modalVisible}
                setVisible={setModalVisible}
                createAuthHost={createAuthHost}
                formValue={formValue}
                updateAuthHost={updateAuthHost}
            />

            <HostModal
                visible={goodsVisible}
                setVisible={setGoodsVisible}
                createAuthHost={createAuthHost}
                formValue={formValue}
                updateAuthHost={updateAuthHost}
            />
        </>
    )
}

export default inject("hostStore")(observer(CodeBtn))
