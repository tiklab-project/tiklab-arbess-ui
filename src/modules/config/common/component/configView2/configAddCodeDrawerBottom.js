import React, {  useState } from "react";
import { Button } from "antd";
import formAll from "../configForm/formAll";

const ConfigAddCodeDrawerBottom = props =>{

    const {codeList,codeOpt,setCodeOpt,setCodeData,setCodeDrawer,setIsPrompt,
        codeName,codeBranch,codeType,setCodeType,
    } = props

    const [codeId,setCodeId] = useState('')

    let newCode = { }

    const handleClick = (item,index) =>{
        console.log(codeType)
        setCodeId(index)
        setCodeOpt(index)
        setCodeType(item.id)
    }

    const codeBtn = () =>{
        newCode = {
            codeId: codeId,
            codeType:codeType,
            codeName: codeName,
            codeBranch: codeBranch,
        }
        setCodeData(newCode)
        setCodeDrawer(false)
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
                                    <div className='tpl'> {item.title} </div>
                                </div>
                            </div>
                })
            }
            <div className='body-menu_form'>
                {
                    codeOpt === 0 || codeOpt === 2 ?
                        formAll.gitOrGitlab : formAll.giteeOrGithub
                }
            </div>
            <div>
                <Button onClick={()=>codeBtn()}>
                    保存
                </Button>
            </div>
        </div>
    )
}

export default ConfigAddCodeDrawerBottom