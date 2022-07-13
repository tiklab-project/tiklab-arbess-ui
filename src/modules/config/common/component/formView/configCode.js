import React,{Fragment} from "react";
import {CloseOutlined} from "@ant-design/icons";
import ConfigName from "../configCommon/configName";
import ConfigForm from "../configCommon/configForm";

const ConfigCode = props =>{

    const {setCodeVisible,codeData,del} = props

    const code = () => {
        return  codeData ?
            <div className="configView1-wrapper">
                <div className="configView1-wrapper-newStage">
                    <div className="desc">
                        <div className="desc-head">
                            <ConfigName type={codeData.codeType}/>
                        </div>
                        <div className="desc-delete" onClick={()=>del(1)}>
                            <CloseOutlined />
                        </div>
                    </div>
                    <div className="desc-input">
                        <ConfigForm type={codeData.codeType}/>
                    </div>
                </div>
            </div>
            :
            <div className="configView1-wrapper-handle" onClick={()=>setCodeVisible(true)}>
                添加代码源
            </div>
    }

    return(
        <Fragment>
            <div className="configView1-wrapper-Headline">源码管理</div>
            { code () }
        </Fragment>
    )
}

export default ConfigCode
