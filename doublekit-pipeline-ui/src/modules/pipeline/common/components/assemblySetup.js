import React,{useEffect} from 'react'
import {Input, Form, Button, Popconfirm, message} from "antd";
import {observer,inject} from "mobx-react";

const AssemblyTask=props=>{

    const {ASSEMBLYSETUP_STORE}=props

    const {deletePipeline,updatePipeline}=ASSEMBLYSETUP_STORE

    const [form]=Form.useForm()

    const pipelineId=localStorage.getItem('pipelineId')

    const onConfirm=()=>{
        deletePipeline(pipelineId)
        props.history.push('/home/pipeline')
    }

    const onFinish=(values)=>{
        let params={
            pipelineId:localStorage.getItem('pipelineId'),
            pipelineName:values.pipelineName
        }
        updatePipeline(params).then(res=>{
            if(res.data===null){
                message.info('名称已经存在')
            }else {
                localStorage.setItem('pipelineName',values.pipelineName);
                props.history.push('/home/task/work')
            }
        })
    }

    return(
        <div className='task-assembly'>
            <div className='task-assembly-top'>
                <Form onFinish={onFinish} form={form} layout="inline">
                    <Form.Item  label="重命名" name='pipelineName'>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='task-assembly-bottom'>
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
export default inject('ASSEMBLYSETUP_STORE')(observer(AssemblyTask))