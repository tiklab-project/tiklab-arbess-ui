import React, {useState} from "react";
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

    const {newStageVisible,setNewStageVisible,data,setData,
        pipelineId,createTest,createStructure,createDeploy
    } = props

    const handleClick = (group,item,index)=>{
        let paramsTest,paramsStructure,paramsDeploy = {}
        const newData = [...data]
        if(group.title==='测试'){
            switch (item.tpl){
                case '单元测试':
                    paramsTest = {
                        pipelineId:pipelineId,
                        taskType:11
                    }
            }
            createTest(paramsTest).then(res=>{
                console.log('测试',res)
                newData.push({
                    configureId:res.data,
                    step:group.title,
                    desc:item.tpl
                })
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
                console.log('构建',res)
                newData.push({
                    configureId:res.data,
                    step:group.title,
                    desc:item.tpl
                })
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
                console.log('部署',res)
                newData.push({
                    configureId:res.data,
                    step:group.title,
                    desc:item.tpl
                })
                setNewStageVisible(false)
            })
        }

        setData(newData)

        console.log('data',data)
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