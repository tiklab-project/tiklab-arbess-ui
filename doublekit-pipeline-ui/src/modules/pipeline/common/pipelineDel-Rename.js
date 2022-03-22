import React from 'react'
import {Input, Form, Button, Popconfirm, message} from "antd";
import './pipelineDel-Rename.scss'
import {observer,inject} from "mobx-react";

/*
 *流水线设置
 */
const PipelineDelRename= props=>{

    const {PipelineStore}=props
    const {deletePipeline,updatePipeline}=PipelineStore

    const [form]=Form.useForm()

    const pipelineId=localStorage.getItem('pipelineId')

    const onConfirm=()=>{
        deletePipeline(pipelineId)
        props.history.push('/home/pipeline')
    }

    const onFinish=(values)=>{
        const params={
            pipelineId:pipelineId,
            pipelineName:values.pipelineName
        }
        updatePipeline(params).then(res=>{
            if(res.data==='0'){
                message.info('名称已经存在')
            }else {
                localStorage.setItem('pipelineName',values.pipelineName);
                props.history.push('/home/task/work')
            }
        })
    }

    return(
        <div className='assembly task'>
            <div className='assembly-top'>
                <Form onFinish={onFinish} form={form} layout="inline" autoComplete = "off">
                    <Form.Item
                        label="重命名"
                        name='pipelineName'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='assembly-bottom'>
                <Popconfirm
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