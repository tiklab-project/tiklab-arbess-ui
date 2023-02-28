import React,{useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Btn from "../../../common/btn/Btn";
import HostModal from "./HostModal";

/**
 * 主机配置添加按钮
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HostAddBtn = props =>{

    const {hostStore,isConfig,type} = props
    const {createAuthHost,modalVisible,setModalVisible,formValue,setFormValue,updateAuthHost} = hostStore

    const [goodsVisible,setGoodsVisible] = useState(false)

    /**
     * 添加按钮操作
     */
    const addHostBtn = () =>{
        setFormValue("")
        switch (type) {
            case 52:
                setGoodsVisible(true)
                break
            default:
                setModalVisible(true)
        }
    }

    /**
     * 设置弹出框visible
     * @returns {boolean|*}
     */
    const visible = () => {
        switch (type) {
            case 52:
                return goodsVisible
            default:
                return modalVisible
        }
    }

    /**
     * 设置弹出框setVisible
     * @returns {((value: (((prevState: boolean) => boolean) | boolean)) => void)|*}
     */
    const setVisible = () =>{
        switch (type) {
            case 52:
                return setGoodsVisible
            default:
                return setModalVisible
        }
    }

    return(
        <>
            {
                isConfig ?
                    <Btn
                        type={"row"}
                        onClick={addHostBtn}
                        title={"添加"}
                        icon={<PlusOutlined/>}
                    />
                    :
                    <Btn
                        onClick={addHostBtn}
                        type={"primary"}
                        title={"添加配置"}
                        icon={<PlusOutlined/>}
                    />
            }

            <HostModal
                visible={visible()}
                setVisible={setVisible()}
                createAuthHost={createAuthHost}
                formValue={formValue}
                updateAuthHost={updateAuthHost}
            />

        </>
    )
}

export default inject("hostStore")(observer(HostAddBtn))
