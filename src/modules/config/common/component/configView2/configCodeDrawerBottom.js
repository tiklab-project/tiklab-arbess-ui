import React, { useEffect, useState } from "react";
import { Button } from "antd";
import formAll from "../configForm/formAll";

const ConfigCodeDrawerBottom = props =>{

    const {codeList,codeOpt,setCodeOpt,setCodeData,setCodeDrawer,setIsPrompt,
        codeName,codeBranch,
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
                        formAll.git
                        : null
                }
                {
                    codeOpt === 1 ?
                        formAll.gitee
                        :null
                }
                {
                    codeOpt === 2 ?
                        formAll.gitlab
                        :null
                }
                {
                    codeOpt === 3 ?
                        formAll.github
                        :null
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

export default ConfigCodeDrawerBottom