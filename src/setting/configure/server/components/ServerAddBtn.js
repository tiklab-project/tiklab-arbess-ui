/**
 * @Description: 服务配置添加按钮
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import Btn from "../../../../common/component/btn/Btn";
import ServerModal from "./ServerModal";

const ServerAddBtn = props =>{

    const {isConfig,visible,setVisible,formValue,setFormValue,findAuth,type} = props

    /**
     * 添加按钮操作
     */
    const addServerBtn = () =>{
        setVisible(true)
        if(formValue){
            setFormValue(null)
        }
    }


    return(
        <>
            <Btn
                onClick={addServerBtn}
                type={isConfig?"row":"primary"}
                title={isConfig?"添加":"添加服务"}
            />
            <ServerModal
                visible={visible}
                setVisible={setVisible}
                type={type}
                formValue={formValue || null}
                findAuth={findAuth}
                isConfig={isConfig}
            />
        </>
    )
}

export default ServerAddBtn
