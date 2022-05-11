import React, { useEffect, useState } from "react";
import { Button } from "antd";
import Config_code_git from "../config_form/config_code_git";
import Config_code_gitee from "../config_form/config_code_gitee";
import Config_code_gitlab from "../config_form/config_code_gitlab";

const Config_code_drawer_bottom = props =>{

    const {codeList,codeOpt,setCodeOpt,setCodeData,setCodeDrawer,setIsPrompt,form,
        codeName,codeBranch,setCodeName,setCodeBranch,
        createProof,findAllGitProof,allGitProofList,
    } = props

    const [codeId,setCodeId] = useState('')
    const [desc,setDesc] = useState('通用Git')

    let newCode = { }

    const handleClick = (item,index) =>{
        setCodeId(index)
        setDesc(item.title)
        setCodeOpt(index)
    }

    const codeBtn = () =>{
        if(desc) {
            newCode = {
                codeId: codeId,
                title: '源码管理',
                desc: desc,
                codeName: codeName,
                codeBranch: codeBranch,
            }
            console.log(newCode)
            setCodeData(newCode)
            setCodeDrawer(false)
            setIsPrompt(true)
        }
    }

    return(
        <div className='body-menu_bottom'>
            {
                codeList && codeList.map((item,index)=>{
                    return   <div
                                onClick={()=>handleClick(item,index)}
                                className={codeOpt === index ? 'group-desc group-tpl gray':'group-desc group-tpl'}
                                key={item.id}
                                style={{width:170}}
                            >
                                <div className='group-desc-tpl'>
                                    <div className='tpl'>
                                        {item.title}
                                    </div>
                                </div>
                            </div>
                })
            }
            <div className='body-menu_form'>
                {
                    codeOpt === 0 ?
                        <Config_code_git
                            setCodeName={setCodeName}
                            setCodeBranch={setCodeBranch}
                            createProof={createProof}
                            findAllGitProof={findAllGitProof}
                            allGitProofList={allGitProofList}
                        />
                        : null
                }
                {
                    codeOpt === 1 ?
                        <Config_code_gitee
                            form={form}
                            setCodeName={setCodeName}
                            setCodeBranch={setCodeBranch}
                        />
                        :null
                }
                {
                    codeOpt === 2 ?
                        <Config_code_gitlab
                            createProof={createProof}
                            findAllGitProof={findAllGitProof}
                            allGitProofList={allGitProofList}
                        />
                        :null
                }
            </div>
            <div style={{textAlign:'right'}}>
                <Button onClick={()=>codeBtn()}>
                    保存
                </Button>
            </div>
        </div>
    )
}

export default Config_code_drawer_bottom