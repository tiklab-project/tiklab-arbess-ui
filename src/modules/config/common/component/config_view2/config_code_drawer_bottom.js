import React from "react";
import Config_code_git from "../config_common/config_code_git";
import Config_code_gitee from "../config_common/config_code_gitee";
import Config_code_gitlab from "../config_common/config_code_gitlab";

const Config_code_drawer_bottom = props =>{

    const {codeList,codeOpt,setCodeOpt,setCodeData,setCodeDrawer,setIsPrompt,form,
        createProof,findAllGitProof,allGitProofList,
    } = props

    const handleClick = (item,index) =>{
        let newCode = { }
        newCode = {
            codeId:index,
            title:'源码管理',
            desc:item.title
        }
        setCodeData(newCode)
        setCodeOpt(index)
        // setCodeDrawer(false)
        setIsPrompt(true)
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
        </div>
    )
}

export default Config_code_drawer_bottom