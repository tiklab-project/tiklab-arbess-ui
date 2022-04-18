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

    const {setCodeData,createCode,pipelineId,codeVisible,setCodeVisible} = props

    const handleClick = (item,index) =>{
        let newCode = { }
        const params = {
            pipelineId:pipelineId,
            taskType:index+1
        }
        createCode(params).then(res=>{
            newCode = {
                codeId:res.data,
                desc:item.desc,
            }
            setCodeData(newCode)
            setCodeVisible(false)
        })
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