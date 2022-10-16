import React, {useEffect, useState} from "react";
import {Button,Drawer} from "antd";
import {CloseOutlined} from '@ant-design/icons';
import CodeAddDrawerLeft from "./codeAddDrawerLeft";
import CodeAddDrawerRight from "./codeAddDrawerRight";

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

const CodeAddDrawer = props =>{

    const {codeDrawer,setCodeDrawer,del} = props

    const [opt,setOpt] = useState(1) // git或者svn

    return(
        <Drawer
            closable={false}
            placement="right"
            onClose={()=>setCodeDrawer(false)}
            visible={codeDrawer}
            contentWrapperStyle={{width:630,marginTop:55}}
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
                            <CodeAddDrawerLeft
                                leftLis={leftLis}
                                opt={opt}
                                setOpt={setOpt}
                            />
                            <CodeAddDrawerRight
                                {...props}
                                opt={opt}
                                del={del}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default CodeAddDrawer