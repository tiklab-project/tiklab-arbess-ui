import React from "react";
import {PlusOutlined} from "@ant-design/icons";
import Btn from "../../../common/component/btn/Btn";
import HostModal from "./HostModal";

/**
 * 主机配置添加按钮
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HostAddBtn = props =>{

    const {isConfig,visible,setVisible,formValue,setFormValue,findAuth} = props

    /**
     * 添加认证
     */
    const addHostBtn = () =>{
        setVisible(true)
        if(formValue){
            setFormValue(null)
        }
    }


    return(
        <>
            <Btn
                onClick={addHostBtn}
                type={isConfig?"row":"primary"}
                title={"添加认证"}
                icon={<PlusOutlined/>}
            />

            <HostModal
                visible={visible}
                setVisible={setVisible}
                formValue={formValue || null}
                findAuth={findAuth}
            />

        </>
    )
}

export default HostAddBtn
