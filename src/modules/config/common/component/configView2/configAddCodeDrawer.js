import React ,{useState} from "react";
import {Button, Drawer} from 'antd';
import ConfigAddCodeDrawerBottom from "./configAddCodeDrawerBottom";
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
        id:4,
        title: 'Gitlab'
    },
    {
        id:3,
        title: 'Github'
    }
]

const ConfigAddCodeDrawer = props =>{

    const {setCodeData,codeDrawer,setCodeDrawer,setIsPrompt,codeBranch,codeName, codeType,setCodeType,
    } = props

    const [codeOpt,setCodeOpt]=useState(0)

    return(
        <Drawer
            closable={false}
            placement="right"
            onClose={()=>setCodeDrawer(false)}
            visible={codeDrawer}
            width={600}
        >
            <div className="wrapper">
                <div className="wrapper-head">
                    <div className="wrapper-head-title"> 选择代码源</div>
                    <div>
                        <Button type='text' onClick={()=>setCodeDrawer(false)}>
                            <CloseOutlined />
                        </Button>
                    </div>
                </div>
                <div className="wrapper-body" id="pipeline-menu-wrapper-body">
                    <div className="body">
                        <div className="body-menu">
                            <ConfigAddCodeDrawerBottom
                                setIsPrompt={setIsPrompt}
                                codeList={codeList}
                                codeOpt={codeOpt}
                                setCodeOpt={setCodeOpt}
                                setCodeData={setCodeData}
                                setCodeDrawer={setCodeDrawer}
                                codeBranch={codeBranch}
                                codeName={codeName}
                                codeType={codeType}
                                setCodeType={setCodeType}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default ConfigAddCodeDrawer