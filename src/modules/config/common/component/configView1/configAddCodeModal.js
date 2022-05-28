import React from "react";
import {Modal} from "antd";

const lis=[
    {
        id:1,
        desc:'通用Git'
    },
    {
        id:2,
        desc:'Gitee'
    },
    {
        id:4,
        desc: 'Gitlab'
    },
    {
        id:3,
        desc: 'Github'
    }
]

const ConfigAddCodeModal = props =>{

    const {setCodeData,codeVisible,setCodeVisible,setIsPrompt} = props

    const handleClick = (item,index) =>{
        let newCode
        newCode = {
            codeId:index,
            codeType:item.id,
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
                    return(
                        <div
                            onClick={()=>handleClick(item,index)}
                            className='group-desc group-tpl'
                            key={item.id}
                        >
                            <div className='group-desc-tpl'>
                                <div className='tpl'>{item.desc}</div>
                            </div>
                        </div>
                    )
                })
            }
        </Modal>
    )
}

export default ConfigAddCodeModal