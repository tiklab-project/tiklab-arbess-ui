import React from "react";
import {Modal} from "antd";
import './optModal.scss'

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

const OptModal = props =>{

    const {newStageVisible,setNewStageVisible,data,setData,drawerType} = props

    const handleClick = (group,item,index)=>{
        console.log(group,item,index)
        const newData = [...data]
        if(drawerType==='large'){
            newData.push({
                title:group.title,
                desc:item.tpl
            })
        }
        setData(newData)
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
            title='选择任务组'
        >
            {group()}
        </Modal>
    )
}

export default OptModal