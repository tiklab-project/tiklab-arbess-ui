import React from "react";
import {Modal,message} from "antd";
import './config_addNewStageModal.scss'

const lis=[
    {
        id:'a',
        title:'测试',
        desc:[
            {
                tpl:'单元测试'
            }
        ]
    },
    {
        id:'b',
        title: '构建',
        desc:[
            {
                tpl: 'maven',
            },
            {
                tpl: 'node',
            }
        ]
    },
    {
        id:'c',
        title: '部署',
        desc:[
            {
                tpl:'linux'
            },
            {
                tpl:'docker'
            },
        ]
    }
]

const Config_addNewStageModal = props =>{

    const {newStageVisible,setNewStageVisible,data,setData,setIsPrompt
    } = props

    const handleClick = (group,item,index)=>{
        const newData = [...data]
        const name = data && data.map(item => item.desc);
        const groupDesc = group.desc.map(item=>item.tpl)
        for(let i =0;i<name.length;i++){
            for(let j=0;j<groupDesc.length;j++){
                if(name[i] == groupDesc[j]){
                    message.info({
                        content: '已经存在',
                        className: 'custom-class',
                        style: {
                            marginTop: '9vh',
                            marginLeft:'5vh'
                        }
                    }) 
                    return
                }
            }
        } 
        newData.push({
            dataId:index,
            title:group.title,
            desc:item.tpl
        })
        setData(newData)
        setIsPrompt(true)
        setNewStageVisible(false) 
    }

    const group = ( ) =>{
        return lis && lis.map(group=>{
            return(
                <div className='group' id={group.id} key={group.id}>
                    <div className='group-title'>{group.title}</div>
                    <div className='group-content'>
                        {
                            group.desc &&  group.desc.map((item,index)=>{
                                return(
                                    <div
                                        onClick={()=>handleClick(group,item,index)}
                                        className='group-desc'
                                        key={item.tpl}
                                    >
                                        <div className='group-desc-tpl'>
                                            <div className='tpl'>
                                                {item.tpl}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        })
    }

    return(
        <Modal
            visible={newStageVisible}
            onCancel={()=>setNewStageVisible(false)}
            footer={[]}
            getContainer={false}
            title='选择任务组'
        >
            {group()}
        </Modal>
    )
}

export default Config_addNewStageModal