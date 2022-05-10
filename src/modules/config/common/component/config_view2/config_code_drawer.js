import React ,{useState} from "react";
import { Drawer } from 'antd';
import Config_code_drawer_bottom from "./config_code_drawer_bottom";
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
    }
]

const Config_code_drawer = props =>{

    const {setCodeData,setCodeDrawer,codeDrawer,setIsPrompt,form,codeBranch,codeName,
        setCodeBranch,setCodeName,
        createProof,findAllGitProof,allGitProofList,findAllDeployProof,allDeployProofList
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
                                <Config_code_drawer_bottom
                                    form={form}
                                    setIsPrompt={setIsPrompt}
                                    codeList={codeList}
                                    codeOpt={codeOpt}
                                    setCodeOpt={setCodeOpt}
                                    setCodeData={setCodeData}
                                    setCodeDrawer={setCodeDrawer}
                                    codeBranch={codeBranch}
                                    setCodeBranch={setCodeBranch}
                                    codeName={codeName}
                                    setCodeName={setCodeName}
                                    createProof={createProof}
                                    findAllGitProof={findAllGitProof}
                                    allGitProofList={allGitProofList}
                                    findAllDeployProof={findAllDeployProof}
                                    allDeployProofList={allDeployProofList}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </Drawer>
    )
}

export default Config_code_drawer