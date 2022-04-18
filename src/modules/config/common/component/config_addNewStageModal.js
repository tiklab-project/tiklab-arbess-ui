import React, {useEffect, useState} from "react";
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

    const {newStageVisible,setNewStageVisible,data,setData,
        pipelineId,createTest,createStructure,createDeploy
    } = props

    const handleClick = (group,item)=>{
        let paramsTest,paramsStructure,paramsDeploy = {}
        const newData = [...data]
        const name = data && data.map(item => item.title);
        if(name.includes(group.title)){
            message.info({
                content: '已经存在',
                className: 'custom-class',
                style: {
                    marginTop: '9vh',
                    marginLeft:'5vh'
                },
            });
        }else {
            if(group.title==='测试'){
                switch (item.tpl){
                    case '单元测试':
                        paramsTest = {
                            pipelineId:pipelineId,
                            taskType:11
                        }
                }
                createTest(paramsTest).then(res=>{
                    newData.push({
                        dataId:res.data,
                        title:group.title,
                        desc:item.tpl
                    })
                    setData(newData)
                    setNewStageVisible(false)
                })
            }
            if(group.title==='构建'){
                switch (item.tpl) {
                    case 'maven':
                        paramsStructure = {
                            pipelineId:pipelineId,
                            taskType:21
                        }
                        break
                    case 'node':
                        paramsStructure = {
                            pipelineId:pipelineId,
                            taskType:22
                        }
                }
                createStructure(paramsStructure).then(res=>{
                    newData.push({
                        dataId:res.data,
                        title:group.title,
                        desc:item.tpl
                    })
                    setData(newData)
                    setNewStageVisible(false)
                })
            }
            if(group.title==='部署'){
                switch (item.tpl) {
                    case 'linux':
                        paramsDeploy = {
                            pipelineId:pipelineId,
                            taskType:31
                        }
                        break
                    case 'docker':
                        paramsDeploy = {
                            pipelineId:pipelineId,
                            taskType:32
                        }
                }
                createDeploy(paramsDeploy).then(res=>{
                    newData.push({
                        dataId:res.data,
                        title:group.title,
                        desc:item.tpl
                    })
                    setData(newData)
                    setNewStageVisible(false)
                })
            }
        }
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
                                        onClick={()=>handleClick(group,item)}
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