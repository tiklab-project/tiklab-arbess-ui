/**
 * @Description: Kubernetes集群添加按钮
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from "react";
import Button from "../../../../common/component/button/Button";
import K8sModal from "./K8sModal";

const K8sAddBtn = props =>{

    const {isConfig,visible,setVisible,formValue,setFormValue,findAuth} = props

    /**
     * 添加认证
     */
    const addK8sBtn = () =>{
        setVisible(true)
        if(formValue){
            setFormValue(null)
        }
    }

    return(
        <>
            <Button
                onClick={addK8sBtn}
                type={isConfig?"row":"primary"}
                title={isConfig?"添加":"添加Kubernetes"}
            />
            <K8sModal
                visible={visible}
                setVisible={setVisible}
                formValue={formValue}
                setFormValue={setFormValue}
                findAuth={findAuth}
            />
        </>
    )
}

export default K8sAddBtn
