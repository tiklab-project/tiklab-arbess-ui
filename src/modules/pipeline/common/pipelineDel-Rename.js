import React, {useEffect, useState} from 'react'
import {Input, Form, Button, Popconfirm} from "antd";
import './pipelineDel-Rename.scss'
import {observer,inject} from "mobx-react";

/*
 *流水线设置
 */
const PipelineDelRename= props=>{

    const {PipelineStore}=props
    const {deletePipeline,updatePipeline,findAllPipelineStatus,pipelineList}=PipelineStore

    const [form]=Form.useForm()
    const [, forceUpdate] = useState({})

    const pipelineId=localStorage.getItem('pipelineId')

    useEffect(()=>{
        findAllPipelineStatus()
        forceUpdate({})
    },[])

    const onConfirm=()=>{
        deletePipeline(pipelineId)
        props.history.push('/home/pipeline')
    }

    const onFinish=(values)=>{
        const params={
            pipelineId:pipelineId,
            pipelineName:values.pipelineName
        }
        updatePipeline(params).then(()=>{
            localStorage.setItem('pipelineName',values.pipelineName);
            props.history.push('/home/task/work')
        })
    }

    return(
        <div className='task del-rename'>
            <Form onFinish={onFinish} form={form} layout="inline" autoComplete = "off">
                <Form.Item
                    label="重命名"
                    name='pipelineName'
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if(value){
                                    let nameArray = []
                                    if(pipelineList){
                                        nameArray = pipelineList && pipelineList.map(item =>  item.pipelineName);
                                    }
                                    if (nameArray.includes(value)) {
                                        return Promise.reject('名称已经存在');
                                    }
                                    return Promise.resolve()
                                }else {
                                    return Promise.reject()
                                }
                            },
                        }),
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            htmlType="submit"
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            确定
                        </Button>
                    )}
                </Form.Item>
            </Form>

            <div style={{marginTop:100}}>
                <Popconfirm
                    style={{marginTop:100}}
                    title="你确定删除吗"
                    onConfirm={onConfirm}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button type="primary" >
                        删除流水线
                    </Button>
                </Popconfirm>

            </div>
        </div>
    )
}
export default inject('PipelineStore')(observer(PipelineDelRename))