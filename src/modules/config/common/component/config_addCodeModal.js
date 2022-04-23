import React from "react";
import {Modal} from "antd";

const lis=[
    {
        id:'a',
        desc:'通用Git'
    },
    {
        id:'b',
        desc:'Gitee'
    },
]

const Config_addCodeModal = props =>{

    const {setCodeData,codeVisible,setCodeVisible,setIsPrompt} = props

    const handleClick = (item,index) =>{
        let newCode = { }
        newCode = {
            codeId:index,
            desc:item.desc
        }
        setCodeData(newCode)
        setCodeVisible(false)
        setIsPrompt(true)
    }

    return(
        <Modal
            visible={codeVisible}
            onCancel={()=>setCodeVisible(false)}
            footer={[]}
            title='选择代码源'
        >
            {
                lis && lis.map((item,index)=>{
                    return   <div
                                onClick={()=>handleClick(item,index)}
                                className='group-desc group-tpl'
                                key={item.id}
                            >
                                <div className='group-desc-tpl'>
                                    <div className='tpl'>
                                        {item.desc}
                                    </div>
                                </div>
                            </div>
                })
            }

        </Modal>
    )
}

export default Config_addCodeModal