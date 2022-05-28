import React from "react";
import {Modal,message} from "antd";
import './configAddNewStageModal.scss'

const lis=[
    {
        id:1,
        title:'测试',
        desc:[
            {
                tpl: 11,
                tel:'单元测试',
            }
        ]
    },
    {
        id:2,
        title: '构建',
        desc:[
            {

                tpl: 21,
                tel:'maven'
            },
            {
                tpl: 22,
                tel:'node'
            }
        ]
    },
    {
        id:3,
        title: '部署',
        desc:[
            {
                tpl:31 ,
                tel:'linux'
            },
            {
                tpl:32 ,
                tel:'docker'
            },
        ]
    }
]

const ConfigAddNewStageModal = props =>{

    const {newStageVisible,setNewStageVisible,data,setData,setIsPrompt
    } = props

    const handleClick = (group,item,index)=>{
        const newData = [...data]
        const name = data && data.map(item => item.dataType);
        const groupDesc = group.desc.map(item=>item.tpl)
        for(let i =0;i<name.length;i++){
            for(let j=0;j<groupDesc.length;j++){
                if(name[i] === groupDesc[j]){
                    message.info({
                        content: '已经存在',
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
            dataType:item.tpl
        })
        setData(newData)
        setIsPrompt(true)
        setNewStageVisible(false) 
    }

    return(
        <Modal
            visible={newStageVisible}
            onCancel={()=>setNewStageVisible(false)}
            footer={[]}
            getContainer={false}
            title='选择任务组'
        >
            {
                lis && lis.map(group=>{
                    return(
                        <div className='group' id={group.id} key={group.id}>
                            <div className='group-title'> {group.title} </div>
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
                                                    <div className='tpl'> {item.tel} </div>
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
        </Modal>
    )
}

export default ConfigAddNewStageModal