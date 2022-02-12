import React,{useEffect} from "react";
import  { Form, Input,Button} from "antd";
import {ApiOutlined} from "@ant-design/icons";
import {observer,inject} from "mobx-react";
import moment from "moment";

const PipelineAdd = props => {
    const {PIPELINE_STORE}=props
     const {createPipeline}=PIPELINE_STORE
    const handSubmit = value => {

        let aa={
            pipelineName:value.pipelineName,
            pipelineCreateUser:'admin',
            pipelineType:1,
            pipelineCreateTime:moment().format("YYYY-MM-DD HH:mm:ss")
        }
        createPipeline(aa)
        props.history.push('/home/deployment',value)
    }
    return(
        <div className='new'>
            <div className='new-content'>
                <Form
                    id='form'
                    name="basic"
                    onFinish={handSubmit}
                >
                    <Form.Item
                        label="流水线名称"
                        name="pipelineName"
                        rules={[{ required: true, message: '请输入流水线名称' }]}
                    >
                        <Input style={{width:400}}/>
                    </Form.Item>
                </Form>
                <div  className={'new-content-type'}>
                    <div className={'new-content-type-choose'} >
                        <p><ApiOutlined />&nbsp;流水线</p>
                        <p>
                            精心地组织一个可以长期运行在多个节点上的任务。适用于构建流水线（更加正式地应当称为工作流），增加或者组织难以采用自由风格的任务类型。
                        </p>
                    </div>
                </div>
                <div className='new-content-btn'>
                    <Button htmlType="submit"  form="form" type='primary' >
                        添加
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default inject('PIPELINE_STORE')(observer(PipelineAdd))