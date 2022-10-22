import React,{useState} from "react";
import {Button,Drawer} from "antd";
import {CloseOutlined} from '@ant-design/icons';
import AddDrawerLeft from "./addDrawerLeft";
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

    const {codeDrawer,setCodeDrawer} = props

    const [opt,setOpt] = useState(1) // git或者svn

    const onClick = index => {
        setOpt(index)
    }

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
                            <AddDrawerLeft
                                leftLis={leftLis}
                                opt={opt}
                                onClick={onClick}
                            />
                            <CodeAddDrawerRight
                                opt={opt}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default CodeAddDrawer