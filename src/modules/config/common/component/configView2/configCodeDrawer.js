import React ,{useState} from "react";
import { Drawer } from 'antd';
import ConfigCodeDrawerBottom from "./configCodeDrawerBottom";
import {CloseOutlined} from '@ant-design/icons'

const codeList = [
    {
        id:1,
        title:'通用Git'
    },
    {
        id:2,
        title:'Gitee'
    },
    {
        id:3,
        title: 'GitLab'
    },
    {
        id:4,
        title: 'GitHub'
    }
]

const ConfigCodeDrawer = props =>{

    const {setCodeData,setCodeDrawer,codeDrawer,setIsPrompt,codeBranch,codeName,
    } = props

    const [codeOpt,setCodeOpt]=useState(0)

    return(
        <Drawer
            closable={false}
            placement="right"
            onClose={()=>setCodeDrawer(false)}
            visible={codeDrawer}
            width={600}
            mask={false}
        >
            <nav className="bm-item-list" style={{height:'100%'}}>
                <div className="menu-wrapper visible">
                    <div className="menu-wrapper-head">
                        <div className="menu-wrapper-head-title"> 选择代码源</div>
                        <div onClick={()=>setCodeDrawer(false)}><CloseOutlined /></div>
                    </div>
                    <div className="menu-wrapper-body" id="pipeline-menu-wrapper-body" style={{padding:0}}>
                        <div className="body">
                            <div className="body-menu">
                                <ConfigCodeDrawerBottom
                                    setIsPrompt={setIsPrompt}
                                    codeList={codeList}
                                    codeOpt={codeOpt}
                                    setCodeOpt={setCodeOpt}
                                    setCodeData={setCodeData}
                                    setCodeDrawer={setCodeDrawer}
                                    codeBranch={codeBranch}
                                    codeName={codeName}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </Drawer>
    )
}

export default ConfigCodeDrawer