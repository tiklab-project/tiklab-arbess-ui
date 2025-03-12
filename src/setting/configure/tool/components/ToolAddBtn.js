/**
 * @Description: 工具添加按钮
 * @Author: gaomengyuan
 * @Date: 2025/2/8
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/2/8
 */
import React from "react";
import Btn from "../../../../common/component/btn/Btn";
import ToolModal from "./ToolModal";

const ToolAddBtn = (props) => {

    const {isConfig,scmType,visible,setVisible,formValue,setFormValue,findAllScm} = props

    /**
     * 添加工具
     */
    const addTool = () =>{
        setVisible(true)
        if(formValue){
            setFormValue(null)
        }
    }

    return (
        <>
            <Btn
                onClick={addTool}
                type={scmType? "row":"primary"}
                title={scmType? "添加":"添加工具"}
            />
            <ToolModal
                visible={visible}
                setVisible={setVisible}
                formValue={formValue}
                findAllScm={findAllScm}
                externalScmType={scmType}
                isConfig={isConfig}
            />
        </>
    )
}

export default ToolAddBtn;
