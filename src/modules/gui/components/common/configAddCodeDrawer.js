import React,{useState} from "react";
import {Button,Drawer} from "antd";
import {CloseOutlined} from '@ant-design/icons';
import ConfigAddCodeLeftDrawer from "./configAddCodeLeftDrawer";
import ConfigAddCodeRightDrawer from "./configAddCodeRightDrawer";

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

    const {codeDrawer,setCodeDrawer,configDataStore} = props

    const [opt,setOpt] = useState(1)
    const [codeOpt,setCodeOpt]=useState(0)
    const [type,setType] = useState("")


    return(
        <Drawer
            closable={false}
            placement="right"
            onClose={()=>setCodeDrawer(false)}
            visible={codeDrawer}
            contentWrapperStyle={{width:600,marginTop:55}}
            bodyStyle={{padding:0}}
        >
            <div className="wrapper">
                <div className="wrapper-head">
                    <div className="wrapper-head-title">选择代码源</div>
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
                                setType={setType}
                            />
                            <ConfigAddCodeRightDrawer
                                opt={opt}
                                codeOpt={codeOpt}
                                setCodeOpt={setCodeOpt}
                                type={type}
                                setType={setType}
                                setCodeDrawer={setCodeDrawer}
                                configDataStore={configDataStore}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default ConfigAddCodeDrawer