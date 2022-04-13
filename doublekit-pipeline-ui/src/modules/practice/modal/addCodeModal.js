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

const AddCodeModal = props =>{

    const {codeData,setCodeData,codeVisible,setCodeVisible} = props

    const handleClick = item =>{
        console.log('item',item)
        if(item){
            setCodeData(item.desc)
            setCodeVisible(false)
        }
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
                                onClick={()=>handleClick(item)}
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

export default AddCodeModal