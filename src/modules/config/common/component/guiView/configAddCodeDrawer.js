import React, {useState} from "react";
import {Button, Drawer} from "antd";
import ConfigAddCodeLeftDrawer from "./configAddCodeLeftDrawer";
import ConfigAddCodeRightDrawer from "./configAddCodeRightDrawer";
import {CloseOutlined} from "@ant-design/icons";

const leftLis = [
    {
        id:1,
        title:"Git"
    },
    {
        id:2,
        title: "SVN"
    }
]

const ConfigAddCodeDrawer = props =>{

    const {setCodeData,codeDrawer,setCodeDrawer,setIsPrompt,codeType,setCodeType,formInitialValues} = props
    const [opt,setOpt] = useState(1)
    const [codeOpt,setCodeOpt]=useState(0)

    return(
        <Drawer
            closable={false}
            placement="right"
            onClose={()=>setCodeDrawer(false)}
            visible={codeDrawer}
            width={700}
        >
            <div className="wrapper">
                <div className="wrapper-head">
                    <div className="wrapper-head-title"> 选择代码源</div>
                    <div>
                        <Button type="text" onClick={()=>setCodeDrawer(false)}>
                            <CloseOutlined />
                        </Button>
                    </div>
                </div>
                <div className="wrapper-body" id="pipeline-menu-wrapper-body">
                    <div className="body">
                        <div className="body-menu">
                            <ConfigAddCodeLeftDrawer
                                leftLis={leftLis}
                                opt={opt}
                                setOpt={setOpt}
                                setCodeType={setCodeType}
                            />
                            <ConfigAddCodeRightDrawer
                                setIsPrompt={setIsPrompt}
                                opt={opt}
                                codeOpt={codeOpt}
                                setCodeOpt={setCodeOpt}
                                setCodeData={setCodeData}
                                setCodeDrawer={setCodeDrawer}
                                codeType={codeType}
                                setCodeType={setCodeType}
                                formInitialValues={formInitialValues}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default ConfigAddCodeDrawer